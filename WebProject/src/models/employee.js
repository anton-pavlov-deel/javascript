const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
	company: {
		type: Schema.ObjectId,
		ref: "Company",
		required: true
	},
	
	name: {
		type: String,
		required: true,
		unique: true
	},
	
	fullName: String,
	
	information: {
		email: String,
		phone: String,
		birthday: Date
	}
});

module.exports = mongoose.model('Employee', employeeSchema);