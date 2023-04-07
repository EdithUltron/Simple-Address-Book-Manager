// Define the API endpoints

// API endpoint for getting all contacts
app.get('/contacts', async (req, res) => {
  const name = req.query.name || '';
  const mobile = req.query.mobile || '';

  const query = {
    name: { $regex: `.*${name}.*`, $options: 'i' },
    mobile: { $regex: `.*${mobile}.*`, $options: 'i' },
  };

  try {
    const contacts = await Contact.find(query).sort({ name: 'asc' });
    res.json(contacts);
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// API endpoint for adding a new contact
app.post('/contacts', async (req, res) => {
  const name = req.body.name;
  const mobile = req.body.mobile;

  const newContact = new Contact({ name, mobile });

  try {
    const existingContact = await Contact.findOne({ mobile });
    if (existingContact) {
      return res.status(400).json('Mobile number already exists');
    }
    await newContact.save();
    res.json('Contact added');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});

// API endpoint for updating a contact
app.put('/contacts/:id', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const mobile = req.body.mobile;

  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).json('Contact not found');
    }
    contact.name = name;
    contact.mobile = mobile;
    await contact.save();
    res.json('Contact updated');
  } catch (err) {
    res.status(400).json('Error: ' + err);
  }
});