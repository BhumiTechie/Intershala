require("dotenv").config({path : "./.env"});
const express = require('express');
const app = express();
const { homepage } = require("./controllers/indexController");
// DB CONNECTION 
require("./models/database").connectDatabase();

//logger 
const logger = require('morgan');
app.use(logger("tiny"));

// BODY PARSER
app.use(express.json());
app.use(express.urlencoded({extended: false}))

// SESSION AND COOKIE PARSER
const session = require('express-session');
const cookieparser = require('cookie-parser');
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieparser());


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
