var express = require('express');
var app = express();
var path = require('path');

app.set('views', __dirname);
app.set('path', __dirname);
app.use(express.static(path.join(__dirname)));

app.get('/', function(req, res, next) {
	res.sendFile(path.join(__dirname + '/wtshell.html'));
});

var server = app.listen(3000, function() {
	console.log('Express server has started on port 3000');
});