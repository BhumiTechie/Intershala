const nodemailer = require('nodemailer');
const ErrorHandler = require('../utils/Errorhandling');

exports.sendmail = (req, res, next, url) =>{
	const transporter = nodemailer.createTransport({
		service : 'gmail',
		host : "smtp.gmail.com",
		post : 465,
		auth :{
			user : process.env.MAIL_EMAIL_ADDRESS,
			pass : process.env.MAIL_PASSWORD,
		}
	});
      const mailOptions = {
		from : "bhumika Private Limited",
		to : email,
		subject : "Password Reset Link",
        // text : "Do not share this Link to anyone"
         html : `<h1>Please click on the link to reset your password </h1> <a href= "${url}">password reset</a>`,
		  
	  };
	  transporter.sendmail(mailOptions, (error, info)=>{
		if(error) return next(new ErrorHandler(err , 500));
		console.log(info);
		return res.status(200).json({
			message : "Email has been sent to your email address successfully",
			url ,
		})
	  })
}