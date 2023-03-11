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
        // return res.send("Invalid Data");
    }

    const userData = await Contacts.create({ name, email, phone });
    res.send(userData);

});

//////////////////////////////////////////////////////////////////

const getSpecificContact = asyncHandler(async (req, res) => {
    res.send("get specific contact");
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