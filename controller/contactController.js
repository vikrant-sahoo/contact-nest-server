import express from "express";
import { ContactModel } from "../models/Contact.js";

const createContact = async (req, res) => {
      const {name, email, phone, address} = req.body;

      try {
            const newContact = new ContactModel({
                  name,
                  email,
                  phone,
                  address,
                  postedBy: req.user._id
            });
            const result = await newContact.save();
            return res.status(201).json({ success: true, ...result._doc });
      } catch (err) {
            return res.status(500).json(err.message);
      }
};

const getContacts = async (req, res) => {
      try {
            const contacts = await ContactModel.find( { postedBy: req.user._id } );
            return res.status(200).json( {success: true, contacts} );
      } catch (err) {
            return res.status(500).json({error: err.message});
      }
};

const deleteContact = async (req, res) => {
      const {id} = req.params;
      if (!id) {
            return res.status(401).json({error: "No ID Specified..."});
      }
      try {
            const contact = await ContactModel.findOne( { _id: id } );
            if (!contact) {
                  return res.status(401).json({error: "Record Not Found..!"});
            }
            const deleteRecord = await ContactModel.findByIdAndDelete({ _id: id });
            const contacts = await ContactModel.find( { postedBy: req.user._id } )
            return res.status(200).json( {success: true, contacts} );
      } catch (err) {
            return res.status(500).json({error: err.message});
      }
};

export {createContact, getContacts, deleteContact};