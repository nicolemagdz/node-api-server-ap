const http = require('http');
const url = require('url');
const dt = require('./datetime');

// Create a server
const server = http.createServer((request, response) => {
    console.log(`Incoming request: ${request.method} ${request.url}`);

    response.setHeader('Content-Type', 'application/json');

    const parsedUrl= url.parse(request.url, true);

    if (parsedUrl.pathname === '/api/date' && request.method === 'GET') {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ dateTime: dt.myDateTime() }));
    }

    if (parsedUrl.pathname === '/') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<h3>Hello World! --MERNa IaC Server Node.js API on Azure Portal</h3>');
        response.write("The date and time are currently: " + dt.myDateTime() + "<br><br>");
        response.write("req.url="+request.url+"<br><br>");
        response.write("Consider adding '/test?year=2017&month=July' to the URL.<br><br>");
        response.end('<h3>The End. V2</h3>');
        return;
    }

    response.writeHead(404, { 'Content-Type': 'application/json'});
    response.end(JSON.stringify({ error: 'Resource not found' }));
});

const port = process.env.PORT || 1337;
server.listen(port, () => {
    console.log("Server running at http://localhost:%d", port);
});
