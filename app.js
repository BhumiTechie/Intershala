require("dotenv").config({path : "./.env"});
const express = require('express');
const app = express();
const { homepage } = require("./controllers/indexController");

//logger 
const logger = require('morgan');
app.use(logger("tiny"));

// routes
app.use("/", require("./routes/indexRouter"));

// error handlers
const Errorhandler = require("./utils/Errorhandling");
const { generatedError } = require("./middleware/error")
app.all("*", (req, res,next)=>{
    next(new Errorhandler(`Requested URL Not Found ${req.url}`, 404));
});
app.use( generatedError)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
