const http = require('http');
const fetch = require('node-fetch');

const url = "https://repl.it";
http.createServer((req, res) => {

  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });
  req.on('end', () => {
    let oldHost = req.headers.host;
    req.headers.host = url.replace('https://', '');
    let ref = req.headers.referer;
    if('referer' in req.headers)
      req.headers.referer = req.headers.referer.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.amazingmech2418.repl.co', url.replace('https://', ''));
    if('origin' in req.headers)
      req.headers.origin = req.headers.origin.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.amazingmech2418.repl.co', url.replace('https://', ''));
    fetch(url + req.url, {
    "headers": req.headers,
    "body": req.method=='POST'?body:null,
    "method": req.method,
    "mode": "cors",
    "referrer": ref?ref.replace(oldHost, url.replace('https://', '')).replace('repl.it', url.replace('https://', '')).replace('node-proxy.amazingmech2418.repl.co', url.replace('https://', '')):null
    }).then(n=>{
      let headers = {};
      for (var pair of n.headers.entries()) {
        if(!['content-encoding', 'transfer-encoding', 'content-length', 'connection', 'via'].includes(pair[0]))
        headers[pair[0]] = pair[1];
      }
      res.writeHead(n.status, headers);
      return n.arrayBuffer();
    }).then(n=>{
      res.end(Buffer.from(n))
    }).catch(console.log);
  });
  
}).listen(3000);