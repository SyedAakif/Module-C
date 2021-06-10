const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET api/auth
// @desc    Get the Logged in User
//@access   Private
router.get('/', auth, async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (err) {
        console.error(err.msg);
        res.status(500).send('Server Error.')
    }
}) 

// @route   POST api/auth
// @desc    Authorize the User and Get the token
//@access   Public
router.post('/', [
    check('email', 'Please provide a Valid email').isEmail(),
    check('password', 'Please enter a Password').exists()  // exists: Adds a validator to check for the existence of the current fields in the request. This means the value of the fields may not be undefined; all other values are acceptable.
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email })
        
        if (!user) {
            return res.status(400).json({ msg: 'A user with this email does not exists' })
        }
        
        const isMatch = await bcrypt.compare(password, user.password); // this will return true and false

        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect Password.' })
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600000
        }, (err,token) => {
            if (err) throw err;
            res.json({ token })
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }

})

module.exports = router;