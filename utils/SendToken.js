exports.sendToken = (user, statusCode , res) =>{
	const token = user.getjwttoken();
	res.json({token});
}