import express = require('express');
import bodyParser = require('body-parser');
import http = require('http');
import url = require('url');

import DataStore from './data/data-store';

let sample = DataStore.newList('Sample');
DataStore.addItem(sample.id, 'item 1');
DataStore.addItem(sample.id, 'item 2');
DataStore.addItem(sample.id, 'item 3');

// routes
import ListRoute from './routes/list';

export default class App {
	public static create(): express.Application {
		var app = express();
		app.use(bodyParser.json());

		app.use('/list', (new ListRoute()).getRoutes());

		return app;
	}
}

var app = App.create();
var port = 4444;
app.listen(port, function(){
  console.log('Server started - listening on port: ' + port);
});