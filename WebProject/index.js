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
mongoose.connect('mongodb://localhost/companies', {
		useMongoClient: true
});



// Companies
app.get('/api/company', function(req, res) {
	models.company.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/api/company', urlencodedParser, function(req, res) {
	models.company.create({
		name: req.body.name,
		fullName: req.body.fullName,
		information: {
			email: req.body.email,
			phone: req.body.phone
		}
	}, function(err, company){
		if (err) {
			res.status(500).send(err);
		}
		if (company) {
			res.status(200).send(company);
		}
	});
});

app.get('/api/company/:companyId', function(req, res) {
	models.company.findById(
		new mongoose.Types.ObjectId(req.params.companyId),
		(err, company) => {
			if (err) {
				res.status(500).send(err);
			}
			if (company) {
				res.status(200).send(company);
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});

app.put('/api/company/:companyId', urlencodedParser, function(req, res) {
	models.company.findByIdAndUpdate(
		new mongoose.Types.ObjectId(req.params.companyId),
		{
			name: req.body.name,
			fullName: req.body.fullName,
			information: {
				email: req.body.email,
				phone: req.body.phone
			}
		}, function(err, company){
			if (err){
				res.status(500).send(err);
			}
			if (company){
				res.status(200).send(company);
			}
		});
});

app.delete('/api/company/:companyId', function(req, res) {
	models.company.findByIdAndRemove(
		new mongoose.Types.ObjectId(req.params.companyId),
		(err, company) => {
			if (err) {
				res.status(500).send(err);
			}
			if (company) {
				res.status(200).send('success');
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});

// Employee
app.get('/api/employee', function(req, res) {
	models.employee.find((err, data) => {
		if (err) {
			res.status(500).send(err);
		} else {
			res.status(200).send(data);
		}
	});
});

app.post('/api/employee', urlencodedParser, function(req, res) {
	const companyQuery = models.company.findById(req.body.companyId).exec();
	companyQuery
		.then((compObj) => {
			const newEmployee = new models.employee();
			newEmployee.company = compObj;
			newEmployee.name = req.body.name;
			newEmployee.fullName = req.body.fullName;
			newEmployee.information = {
				email: req.body.email,
				phone: req.body.phone,
				birthday: new Date(req.body.birthday)
			};
			
			return newEmployee.save();
		})
		.then((result) => {
			res.status(200).send(result);
		})
		.catch((err) => res.status(500).send(err));
});

app.get('/api/employee/:employeeId', function(req, res) {
	models.employee.findById(
		new mongoose.Types.ObjectId(req.params.employeeId),
		(req, employee) => {
			if (err) {
				res.status(500).send(err);
			}
			if (employee) {
				res.status(200).send(employee);
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});

app.put('/api/employee/:employeeId', urlencodedParser, function(req, res) {
	models.employee.findByIdAndUpdate(
		new mongoose.Types.ObjectId(req.oarams.employeeId),
		{
			name: req.body.name,
			fullName: req.body.fullName,
			information: {
				email: req.body.email,
				phone: req.body.phone,
				birthday: new Date(req.body.birthday)
			}
		}, function(err, employee) {
			if (err) {
				res.status(500).send(err);
			}
			if (employee) {
				res.status(200).send(employee);
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});

app.delete('/api/employee/:employeeId', function(req, res) {
	models.employee.findByIdAndRemove(
		new mongoose.Types.ObjectId(req.params.employeeId),
		(err, employee) => {
			if (err) {
				res.status(500).send(err);
			}
			if (employee) {
				res.status(200).send('success');
			} else {
				res.status(404).send('No found with that ID');
			}
		});
});

