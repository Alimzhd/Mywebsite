import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DEFAULT_PORT = parseInt(process.env.PORT || "3000", 10);

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8",
};

const server = http.createServer((req, res) => {
  // CORS & No-cache for smooth local development
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");

  let reqPath = decodeURIComponent(req.url.split("?")[0]);
  if (reqPath === "/") reqPath = "/index.html";

  const safePath = path.normalize(path.join(__dirname, reqPath));
  if (!safePath.startsWith(__dirname)) {
    res.statusCode = 403;
    res.end("403 Forbidden");
    return;
  }

  fs.stat(safePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.end(`<!DOCTYPE html>
<html lang="id">
<head><meta charset="utf-8"><title>404 — Redawn News</title>
<style>body{font-family:sans-serif;padding:40px;text-align:center;background:#120c0a;color:#fff;}a{color:#f87171;}</style>
</head>
<body>
  <h1>404 — Halaman Tidak Ditemukan</h1>
  <p>Berkas <code>${reqPath}</code> tidak ada.</p>
  <p><a href="/index.html">Kembali ke Beranda</a></p>
</body>
</html>`);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.setHeader("Content-Type", contentType);

    const stream = fs.createReadStream(safePath);
    stream.pipe(res);
  });
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`
\x1b[38;2;239;68;68m╔══════════════════════════════════════════════════════════════════╗
║                    REDAWN NEWS — DEV SERVER                      ║
║               Material 3 Expressive News Portal                  ║
╠══════════════════════════════════════════════════════════════════╣\x1b[0m
  \x1b[1m> Beranda:\x1b[0m   \x1b[36mhttp://localhost:${port}/index.html\x1b[0m
  \x1b[1m> Artikel:\x1b[0m   \x1b[36mhttp://localhost:${port}/detail-putin-trump.html?id=putin-trump\x1b[0m
\x1b[38;2;239;68;68m╚══════════════════════════════════════════════════════════════════╝\x1b[0m
  \x1b[2m(Tekan Ctrl+C untuk menghentikan server)\x1b[0m
`);
  });

  server.once("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.log(`Port ${port} sedang digunakan, mencoba port ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error("Server error:", err);
      process.exit(1);
    }
  });
}

startServer(DEFAULT_PORT);

