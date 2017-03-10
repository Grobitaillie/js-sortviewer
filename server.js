var express = require('express');

var app = express();
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/model'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.listen(4200);