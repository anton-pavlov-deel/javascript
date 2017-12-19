const express = require('express');
const mongoose = require('mongoose');
const models = require('./src/models');
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({
	extended: false
});

const port = 3000;
const app = express();
app.get('/',(req,res) => res.send('The server is working'));
app.listen(port, () => console.log(`The server is working on a port ${port}`));

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/records', {
		useMongoClient: true
});



// Records
app.get('/api/record', function(req, res) {
	models.record.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/api/record', urlencodedParser, function(req, res) {
	console.log("!!! name: "+JSON.stringify(req.headers));
	/*models.record.create({
		name: req.body.name,
		data: {
			X_data: req.body.X_data,
			Y_data: req.body.Y_data,
			Z_data: req.body.Z_data
		},
		description: req.body.description
	}, function(err, record){
		if (err) {
			res.status(500).send(err);
		}
		if (record) {
			res.status(200).send(record);
		}
	});*/
});

app.get('/api/record/:recordId', function(req, res) {
	models.record.findById(
		new mongoose.Types.ObjectId(req.params.recordId),
		(err, record) => {
			if (err) {
				res.status(500).send(err);
			}
			if (record) {
				res.status(200).send(record);
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});

app.put('/api/record/:recordId', urlencodedParser, function(req, res) {
	models.record.findByIdAndUpdate(
		new mongoose.Types.ObjectId(req.params.recordId),
		{
			name: req.body.name,
			data: {
				X_data: req.body.X_data,
				Y_data: req.body.Y_data,
				Z_data: req.body.Z_data
			},
			description: req.body.description
		}, function(err, record){
			if (err){
				res.status(500).send(err);
			}
			if (record){
				res.status(200).send(record);
			}
		});
});

app.delete('/api/record/:recordId', function(req, res) {
	models.record.findByIdAndRemove(
		new mongoose.Types.ObjectId(req.params.recordId),
		(err, record) => {
			if (err) {
				res.status(500).send(err);
			}
			if (record) {
				res.status(200).send('success');
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});