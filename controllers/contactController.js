const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

//@description GET all contacts
//@route GET /api/contacts
//@access private
const getAllContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({user_id: req.user.id});
  res.status(200).json({ message: "All contacts", contacts });
});

//@description GET contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with ${req.params.id} not found`);
  } else {
    res
      .status(200)
      .json({ message: `Get contact for ${req.params.id}`, contact });
  }
});

//@description Create contacts
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("REQ body is: " + req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id
  });
  res.status(201).json({ message: "Contact Created", contact });
});

//@description Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with ${req.params.id} not found`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res
    .status(200)
    .json({
      message: `Contact updated for ${req.params.id}`,
      Old: contact,
      Updated: updatedContact,
    });
});

//@description Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error(`Contact with ${req.params.id} not found`);
  }
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }
  
  const deletedContact = await Contact.findByIdAndDelete(req.params.id);
  res
    .status(200)
    .json({
      message: `Contact deleted for ${req.params.id}`,
      Old: contact,
      Deleted: deletedContact,
    });
});

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
