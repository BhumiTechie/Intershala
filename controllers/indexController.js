const { catchAsyncError } = require("../middleware/catchAsyncError");
let ErrorHandler = require('../utils/Errorhandling');
const { sendToken } = require("../utils/SendToken");
const Student = require("../models/studentModel");


exports.homepage = catchAsyncError(async (req, res, next) => {
    res.json({ message: "Secure Home Page" });
});

exports.currentUser = catchAsyncError(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({student});
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
    // res.json(req.body);
    const student = await new Student(req.body).save();
    // res.status(201).json(student);
    sendToken(student, 201, res)
});

exports.studentsignin = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({email : req.body.email}).select("+password").exec();
     
   if(!student) return next(new ErrorHandler("User not found with this email address", 404));

   const isMatch = await student.comparepassword(req.body.password);
   console.log('Password match:', isMatch);

   if (!isMatch) {
       console.log('Incorrect password');
       return next(new ErrorHandler("Incorrect password", 500));
   }
   sendToken(student, 200, res)
});

exports.studentsignout = catchAsyncError(async (req, res, next) => {
    res.clearCookie("token");
    res.json({message: 'Successfully Signout!!'});
   
});

exports.studentsendmail = catchAsyncError(async (req, res, next) => {
    const student = await Student.findOne({email:req.body.email}).exec();
    if(!student)
        return next(new ErrorHandler("User not found with this email address", 404));

      const url = `${req.protocol} : //${req.get("host")}/student/forget-link/${student._id}`;

    
    res.json({student , url});
});


