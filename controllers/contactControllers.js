const express = require('express');


const getAllContacts = (req, res) => {
    res.send("get all contacts");
}

const addContact = (req, res)=>{
    res.send("add a contact");
};

const getSpecificContact = (req, res)=>{
    res.send("get specific contact");
};

const updateContact = (req, res)=>{
    res.send("update a contact");
};

const deleteContact = (req, res)=>{
    res.send("delete a contact");
};



module.exports = {getAllContacts, addContact, getSpecificContact, updateContact, deleteContact};