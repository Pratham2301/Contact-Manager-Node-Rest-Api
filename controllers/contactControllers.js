const Contacts = require('../models/Contacts');
const asyncHandler = require("express-async-handler");


//////////////////////////////////////////////////////////////////

const getAllContacts = asyncHandler(async (req, res) => {

    data = await Contacts.find();
    res.send(data);

});

//////////////////////////////////////////////////////////////////

const addContact = asyncHandler(async (req, res) => {

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        throw new Error("Invalid Data");
    }

    const contact = await Contacts.create({ name, email, phone });
    res.json(contact);

});

//////////////////////////////////////////////////////////////////

const getSpecificContact = asyncHandler(async (req, res) => {
    // console.log(req.params.id);

    const contact = await Contacts.findById(req.params.id);

    if(!contact){
        throw new Error("Contact Not Found");
    }

    res.json(contact);
});

//////////////////////////////////////////////////////////////////

const updateContact = asyncHandler(async (req, res) => {
    res.send("update a contact");
});

//////////////////////////////////////////////////////////////////

const deleteContact = asyncHandler(async (req, res) => {
    res.send("delete a contact");
});


//////////////////////////////////////////////////////////////////

module.exports = {
    getAllContacts,
    addContact,
    getSpecificContact,
    updateContact,
    deleteContact
};