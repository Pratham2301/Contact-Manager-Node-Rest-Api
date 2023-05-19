const Contacts = require('../models/contactsModel');
const asyncHandler = require("express-async-handler");


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//  @desc Get all contacts
//  @route GET /api/contacts
//  @access private

const getAllContacts = asyncHandler(async (req, res) => {

    let data = await Contacts.find({ user_id: req.user._id });

    res.status(200).json(data);

});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//  @desc Create New contact
//  @route POST /api/contacts
//  @access private

const addContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        throw new Error("Invalid Data");
    }


    console.log("id is : ", req.user)

    const contact = await Contacts.create({
        name: name,
        email: email,
        phone: phone,
        user_id: req.user._id,
    });

    res.status(200).json(contact);

});

/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//  @desc Get contact
//  @route GET /api/contacts/:id
//  @access private

const getSpecificContact = asyncHandler(async (req, res) => {

    // console.log(req.params.id);

    const contact = await Contacts.findById(req.params.id);

    if (contact.user_id.toString() !== req.user._id) {
        res.status(403);
        throw new Error("User don't have permission to view other user's contacts");
    }

    if (!contact) {
        throw new Error("Contact Not Found");
    }

    res.json(contact);
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//  @desc Update contact
//  @route PUT /api/contacts/:id
//  @access private

const updateContact = asyncHandler(async (req, res) => {

    // console.log(req.params.id);

    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user._id) {
        res.status(403);
        throw new Error("User don't have permission to edit other user's contacts");
    }

    const updatedContact = await Contacts.findByIdAndUpdate(
        contact._id,
        req.body,
        { new: true }
    );

    if (!contact) {
        throw new Error("Contact Not Found");
    }

    res.json(updatedContact);
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

//  @desc Delete contact
//  @route DELETE /api/contacts/:id
//  @access private

const deleteContact = asyncHandler(async (req, res) => {

    // console.log(req.params.id);

    const contact = await Contacts.findById(req.params.id);

    if (!contact) {
        throw new Error("Contact Not Found");
    }

    if (contact.user_id.toString() !== req.user._id) {
        res.status(403);
        throw new Error("User don't have permission to delete other user's contacts");
    }

    const deletedContact = await Contacts.deleteOne({ _id: req.params.id });

    res.json(deletedContact);
});


/////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////

module.exports = {
    getAllContacts,
    addContact,
    getSpecificContact,
    updateContact,
    deleteContact
};