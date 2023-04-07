import express  from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import Contact from "./models/Contact.js";

// Create an instance of Express app
const app = express();
dotenv.config();

// Connect to the MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Middleware to parse JSON data from the request body
app.use(express.json());

// API endpoint for creating a new contact
app.post("/contacts", async (req, res) => {
  try {
    // Check if a contact with the given mobile number already exists
    const existingContact = await Contact.findOne({ mobile: req.body.mobile });
    if (existingContact) {
      return res.status(409).json({ message: "Contact already exists" });
    }

    // Create a new contact
    const newContact = new Contact({
      name: req.body.name,
      mobile: req.body.mobile,
    });

    // Save the new contact to the database
    const savedContact = await newContact.save();

    // Send a success response with the saved contact data
    res.status(201).json(savedContact);
  } catch (err) {
    // Handle any errors that occur during contact creation
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint for getting a list of all contacts
app.get("/contacts", async (req, res) => {
  try {
    // Retrieve all contacts from the database
    const contacts = await Contact.find().sort("name");

    // Send a success response with the contact list
    res.json(contacts);
  } catch (err) {
    // Handle any errors that occur during contact retrieval
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint for filtering contacts by name or mobile number
app.get("/contacts/search/", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    // Find contacts whose name or mobile number contains the search term
    const contacts = await Contact.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { mobile: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort("name");

    // Send a success response with the filtered contact list
    res.json(contacts);
  } catch (err) {
    // Handle any errors that occur during contact retrieval
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint for updating a contact
app.put("/contacts/:id", async (req, res) => {
  try {
    const contactId = req.params.id;

    // Find the contact to update by ID
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Update the contact's name and/or mobile number
    if (req.body.name) {
      contact.name = req.body.name;
    }
    if (req.body.mobile) {
      contact.mobile = req.body.mobile;
    }

    // Save the updated contact to the database
    const savedContact = await contact.save();

    // Send a success response with the saved contact data
    res.json(savedContact);
  } catch (err) {
    // Handle any errors that occur during contact update
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// API endpoint for deleting a contact
app.delete("/contacts/:id", async (req, res) => {
  try {
    const contactId = req.params.id;
    // Find the contact to delete by ID
    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    // Delete the contact from the database
    await contact.deleteOne();

    // Send a success response
    res.json({ message: "Contact deleted successfully" });
  } catch (err) {
    // Handle any errors that occur during contact deletion
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server and listen for incoming requests
const port = 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
