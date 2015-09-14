/// <reference path="../typings/tsd.d.ts" />

import express = require('express');

var port = process.env.port || 3001;


var app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

var server = app.listen(port, () => {
    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);
});