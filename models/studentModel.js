const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
     firstname : String,
     lastname : String,
     avatar : String,
     contact : String,
     city: String ,
     gender : String,
    email: {
        type: String,
        unique: true, // unique used for not duplicate records
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
        maxlength: [15, "Password must be at most 15 characters"]
    },
    resetPasswordToken : {
        type : String,
        default : "0",
    },
}, { timestamps: true });

studentSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        return next(); // If password is not modified, proceed to the next middleware
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

studentSchema.methods.comparepassword = async function (Password) {
    return await bcrypt.compare(Password, this.password);
};

// TOKEN Created
studentSchema.methods.getjwttoken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES
    });
};

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
