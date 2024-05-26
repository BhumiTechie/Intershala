const nodemailer = require('nodemailer');

exports.sendmail = (email, url , next) =>{
	const transporter = nodemailer.createTransport({
		service : 'gmail',
		host : "smtp.gmail.com",
		port : 465,
		auth :{
			user : 'bhumika@gmail.com',
			pass : "",
		}
	});
      const mailOptions = {
		from : "bhumika Private Limited",
		to : email,
		subject : "Password Reset Link",
        // text : "Do not share this Link to anyone"
         html : `<h1>Please click on the link to reset your password </h1> <a href= "${url}">password reset</a>`,
		  
	  };
	  transporter.sendMail(mailOptions, (error, info)=>{
		if(error) return next(new ErrorHandler(err , 500));
		console.log(info);
		return res.status(200).json({
			message : "Email has been sent to your email address successfully",
			url ,
		})
	  })
}