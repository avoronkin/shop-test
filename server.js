// var path = require('path');
var connect = require('connect');
var fs = require('fs');
var tinylr = require('tiny-lr');
var gutil = require('gulp-util');

module.exports = function (port, lrport) {
    var lr = tinylr();
    lr.listen(lrport);

    var app = connect();
    app.use("/", connect.static(__dirname + '/dist'));
    app.use(function (request, response, next) {
        fs.readFile('./dist/index.html', function (err, html) {
            if (err) {
                throw err;
            }
            response.writeHeader(200, {
                "Content-Type": "text/html"
            });
            response.write(html);
            response.end();
        });
    });
    app.listen(port);

    gutil.log('Listening on', port + ' / ' + lrport);

    return {
        lr: lr,
        app: app
    };
};
