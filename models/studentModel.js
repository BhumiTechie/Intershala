
const mongoose = require('mongoose');

const studentModel = new mongoose.Schema({
     email :{
        type : String,
		unique : true, // unique used for not duplicate records
        required : [true, " Email is required"],
		match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
	 },
	 password : {
		type : String,
		required : [true, " Password is required"],
		minlength : [6, " Password must be at least 6 characters "],
		maxlength :[15 , " password must be at least 15 characters"]
	 }
}, {timestamps: true})

const Student = mongoose.model("Student", studentModel);

module.exports = Student;