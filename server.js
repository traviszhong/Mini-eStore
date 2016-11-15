'use strict';

var app = require('./index');
var http = require('http');


var server;

/*
 * Create and start HTTP server.
 */

server = http.createServer(app);
server.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080);
server.on('listening', function () {
    console.log('Server listening on http://localhost:%d', this.address().port);
});
