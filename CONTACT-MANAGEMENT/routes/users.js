const express = require('express');
const router = express.Router();

// @route   Post api/users
// @desc    Register a User
//@access   Public
router.post('/', (req,res) => {
    res.send('Register a User')
})  

module.exports = router;