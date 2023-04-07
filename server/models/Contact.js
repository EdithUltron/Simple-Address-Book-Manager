import mongoose from "mongoose";

// Define the schema for a contact
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create a model for the contacts collection
const Contact = mongoose.model('Contact', contactSchema,"contacts");

export default  Contact ;