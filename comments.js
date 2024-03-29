// Create web server
// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var url = require('url');
var comments = [];
var server = http.createServer(function(req, res) {
    var urlObj = url.parse(req.url, true);
    var pathname = urlObj.pathname;
    if (pathname === '/') {
        fs.readFile(path.join(__dirname, 'index.html'), 'utf8', function(err, data) {
            if (err) {
                res.end('404 Not Found');
            } else {
                var htmlStr = data;
                var htmlContent = '';
                comments.forEach(function(item) {
                    htmlContent += `<li>${item}</li>`;
                });
                htmlStr = htmlStr.replace('^_^', htmlContent);
                res.end(htmlStr);
            }
        });
    } else if (pathname === '/addComment') {
        var comment = urlObj.query.comment;
        comments.push(comment);
        res.statusCode = 302;
        res.setHeader('Location', '/');
        res.end();
    } else {
        fs.readFile(path.join(__dirname, pathname), 'utf8', function(err, data) {
            if (err) {
                res.end('404 Not Found');
            } else {
                res.end(data);
            }
        });
    }
});
server.listen(8080, function() {
    console.log('server is listening on 8080');
});