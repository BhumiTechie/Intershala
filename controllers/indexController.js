const { catchAsyncError } = require("../middleware/catchAsyncError");

exports.homepage =catchAsyncError( async ( req, res, next) => {
	try {
		res.json({message : "Home Page"})
	} catch (error) {
		res.json(error);
	}
});

exports.studentsignup = catchAsyncError( async ( req, res, next) => {
	res.json(req.body);
})