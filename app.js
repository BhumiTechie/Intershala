require("dotenv").config({path : "./.env"});
const express = require('express');
const app = express();
const { homepage } = require("./controllers/indexController");

//logger 
const logger = require('morgan');

app.use(logger("tiny"));

app.use("/", homepage)

app.listen(process.env.PORT, () => {
    console.log(`server running on port ${process.env.PORT}`);
});
