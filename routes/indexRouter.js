const express = require('express');
const router = express.Router();

const {homepage , studentsignup ,
	studentsignin,
	studentsignout,
	currentUser,
	studentsendmail
	
} = require("../controllers/indexController");
const { isAuthenticated } = require('../middleware/auth');

// router.get('/', (req, res, next) => {
//     res.json({ message: 'Hello World!' });
// });

// GET
router.get('/',isAuthenticated, homepage);

// GET
router.post('/student', isAuthenticated, currentUser);

// POST request for student signup
router.post('/student/signup', studentsignup);

// POST request for student signin
router.post('/student/signin', studentsignin);

// GET request for student signout
router.get('/student/signout', studentsignout);

// GET request for student send mail
router.post('/student/send-mail', studentsendmail);

module.exports = router;


