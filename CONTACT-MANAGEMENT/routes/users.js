const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config')

const User = require('../models/User');

// @route   Post api/users
// @desc    Register a User
//@access   Public
router.post('/', [
    // **** This is from Express Validator ****** //
    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Enter a Valid Email').isEmail(),
    check('password', 'Password must be atleast 6 charcters').isLength({ min: 6 })
    // ****************************************** //
],async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body
    
    try {
        let user = await User.findOne({ email });  // findOne = Used to find the data in database that user exists or not

        if(user) {
            return res.status(400).json({ msg: 'A user with this email already exists.' })
        }

        user = new User({
            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password, salt)
        
        await user.save();

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

        // res.send('User Created in Mongodb.');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error')
    }
})  

module.exports = router;