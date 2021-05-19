const express = require('express');
const router = express.Router();

// @route   GET api/auth
// @desc    Get the Logged in User
//@access   Private
router.get('/', (req,res) => {
    res.send('Get Logged in User')
}) 

// @route   POST api/auth
// @desc    Authorize the User and Get the token
//@access   Public
router.post('/', (req,res) => {
    res.send('Login the User')
})

module.exports = router;