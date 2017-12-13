const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	
	data: {
		X_data: String,
		Y_data: String,
		Z_data: String
	},
	
	description: String
});

module.exports = mongoose.model('Record', recordSchema);