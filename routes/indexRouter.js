const express = require('express');
const router = express.Router();

const {homepage , studentsignup } = require("../controllers/indexController")

// router.get('/', (req, res, next) => {
//     res.json({ message: 'Hello World!' });
// });

// GET
router.get('/', homepage  );

// POST /student/signup

router.post('/student/signup', studentsignup)




module.exports = router