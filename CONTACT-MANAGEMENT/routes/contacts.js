const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

const auth = require('../middleware/auth');
const User = require('../models/User');
const Contact = require('../models/Contact');

// @route   GET api/contacts
// @desc    get all the users Contact's
//@access   Private
router.get('/', auth, async (req,res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({
            date: -1
        })
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error') 
    }
})  

// @route   POST api/contacts
// @desc    Add a New Contact 
//@access   Private
router.post('/', [auth, [
    check('name', 'Name is Required').not().isEmpty()
] ], async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            phone,
            type,
            user: req.user.id
        })

        const contact = await newContact.save();

        res.json(contact);

    } catch (err) {+
        console.error(err);
        res.status(500).send('Server Error')
    }

})  

// @route   PUT api/contacts/:id (this is called Selector with id)
// @desc    Update a Contact 
//@access   Private
router.put('/:id', auth, async(req, res) => {
    
    const { name, email, phone, type } = req.body;

    const contactFields = {};

    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (type) contactFields.type = type;
        
    try {
        let contact = await Contact.findById(req.params.id);

        // Check if the Contact Exists
        if (!contact) {
            return res.status(404).json({ msg: 'this Contact does not exists.' })
        }
        // If the Contact exists, then make sure the currently signed in user owns the contact
        if (contact.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'You do not have the correct authorization to update this contact' })
        }
        // Update contact if above conditions pass
        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields }, // $set is used to define what we need to update
            { new: true } // Used to creat the new contact if its not there
        );
        // Return the Updated Contact    
        res.json(contact);

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' })
    }
});

// @route   DELETE api/contacts/:id (this is called Selector with id)
// @desc    Delete the Contact 
//@access   Private
router.delete('/:id', auth, async(req,res) => {
    try {
        let contact = await Contact.findById(req.params.id);

        // Check if the Contact Exists
        if (!contact) {
            return res.status(404).json({ msg: 'this Contact does not exists.' })
        }
        // If the Contact exists, then make sure the currently signed in user owns the contact
        if (contact.user.toString() !== req.user.id) {
            res.status(401).json({ msg: 'You do not have the correct authorization to update this contact' })
        }
        // Find and Remove the Contact from MongoDB
        await Contact.findByIdAndRemove(req.params.id);

        // Return the Confirmation Message   
        res.json({ msg: 'This Contact has been Removed' });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server Error' })
    }
})  

module.exports = router;