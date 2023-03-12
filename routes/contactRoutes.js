const express = require('express');
const router = express.Router();

const {
    getAllContacts, 
    addContact, 
    getSpecificContact, 
    updateContact, 
    deleteContact
} = require('../controllers/contactControllers');





router.get("/", getAllContacts);

router.post("/", addContact);

router.get("/:id", getSpecificContact);

router.put("/:id", updateContact);

router.delete("/:id", deleteContact);




module.exports = router;
