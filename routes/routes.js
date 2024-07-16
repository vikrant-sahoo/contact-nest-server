import express from "express";
import { Register, Login, Auth } from "../controller/userController.js";
import { body } from "express-validator";
import { VerifyUser } from "../middleware/VerifyUser.js";
import { createContact, getContacts, deleteContact } from "../controller/contactController.js";

const router = express.Router();

// User Routes
router.post("/register", [
      body("name").trim().notEmpty().withMessage("Name cannot be Empty."),
      body("email").trim().notEmpty().withMessage("Email cannot be Empty.").isEmail().withMessage("Invalid Email..!"),
      body("password").trim().notEmpty().withMessage("Password cannot be Empty").isLength({min: 5, max: 30}).withMessage("Password length should be between 5 and 30 characters.")
], Register);

router.post("/login", [
      body("email").trim().notEmpty().withMessage("Email cannot be Empty.").isEmail().withMessage("Invalid Email..!"),
      body("password").trim().notEmpty().withMessage("Password cannot be Empty").isLength({min: 5, max: 30}).withMessage("Password length should be between 5 and 30 characters.")
], Login);

router.get("/verify", VerifyUser, Auth);

// Contact Routes
router.post("/add-contact", VerifyUser, createContact);

router.get("/contacts", VerifyUser, getContacts);

router.delete("/contact/:id", VerifyUser, deleteContact);

export { router as Router };