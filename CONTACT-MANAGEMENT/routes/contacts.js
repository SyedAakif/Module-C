const express = require('express');
const router = express.Router();

// @route   GET api/contacts
// @desc    get all the users Contact's
//@access   Private
router.get('/', (req,res) => {
    res.send('Get all Contacts')
})  

// @route   POST api/contacts
// @desc    Add a New Contact 
//@access   Private
router.post('/', (req,res) => {
    res.send('Add new Contacts')
})  

// @route   PUT api/contacts/:id (this is called Selector with id)
// @desc    Update a Contact 
//@access   Private
router.put('/:id', (req,res) => {
    res.send('Update the Contact')
})  

// @route   DELETE api/contacts/:id (this is called Selector with id)
// @desc    Delete the Contact 
//@access   Private
router.delete('/:id', (req,res) => {
    res.send('Delete the Contact')
})  

module.exports = router;