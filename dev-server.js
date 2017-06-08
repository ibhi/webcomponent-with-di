var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.config.js');
var path = require('path');
var users = require('./users.json');
var compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
	hot: true,
	// filename: config.output.filename,
	publicPath: config.output.publicPath,
	contentBase: config.output.path,
	compress: true,
	stats: 'errors-only',
	setup: function(app) {
		// Here you can access the Express app object and add your own custom middleware to it.
		// For example, to define custom handlers for some paths:
		app.get('/users', function(req, res) {
		res.json(JSON.stringify(users));
		});
	},
});
server.listen(8080, 'localhost', function() {});
