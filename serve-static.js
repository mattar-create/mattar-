const http = require('http');
const fs = require('fs');
const path = require('path');
const root = __dirname;
const port = Number(process.env.PORT || 4180);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.avif': 'image/avif',
  '.otf': 'font/otf',
};
http.createServer((req, res) => {
  let pathname = decodeURIComponent(req.url.split('?')[0]);
  if (pathname === '/') pathname = '/index.html';
  const file = path.normalize(path.join(root, pathname));
  if (!file.startsWith(root)) {
    res.writeHead(403);
    res.end('forbidden');
    return;
  }
  fs.readFile(file, (error, body) => {
    if (error) {
      res.writeHead(404);
      res.end('missing');
      return;
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream' });
    res.end(body);
  });
}).listen(port, '127.0.0.1');

