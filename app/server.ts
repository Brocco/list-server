import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');
import url = require('url');

// routes
import ListRoute from './routes/list';

export default class App {
	public static create(): express.Application {
		var app = express();
		app.use(bodyParser.json());

		app.use('/list', (new ListRoute()).getRoutes());
		app.use('/item', (new ListRoute()).getRoutes());

		return app;
	}
}

var app = App.create();
var port = 4444;
app.listen(port, function(){
  console.log('Server started - listening on port: ' + port);
});