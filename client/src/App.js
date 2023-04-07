import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const res = await axios.get('/contacts');
        setContacts(res.data);
        setFilteredContacts(res.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchContacts();
  }, []);


  

  function Phonenumber(inputtxt) {
    var phoneno = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/;
  if(inputtxt.match(phoneno)) {
    return true;
  }
  else {
    alert("Not a Valid Mobile Number");
    return false;
  }
}

  async function addContact(contact) {
    if (Phonenumber(contact.mobile)) {
      try {
      const res = await axios.post('/contacts', contact);
      setContacts([...contacts, res.data]);
      setFilteredContacts([...contacts, res.data]);
      return true;  
    } catch (err) {
        // console.error(err.response.data.message);
        alert(err.response.data.message);
        return false;
    }
    }
    
  }

  async function updateContact(id, updates) {
    if (Phonenumber(updates.mobile)) {
      try {
        await axios.put(`/contacts/${id}`, updates);
        const index = contacts.findIndex((c) => c._id === id);
        const newContacts = [...contacts];
        newContacts[index] = { ...newContacts[index], ...updates };
        setContacts(newContacts);
        setFilteredContacts(newContacts);
      } catch (err) {
        alert("Invalid Input");
      }
    }
  }

  function deleteContact(id) {
    axios.delete(`/contacts/${id}`)
      .then(() => {
        const newContacts = contacts.filter((c) => c._id !== id);
        setContacts(newContacts);
        setFilteredContacts(newContacts);
      })
      .catch((err) => console.error(err));
  }

  async function handleFilterChange(event) {
    const query = event.target.value.toLowerCase().trim();
    const data = await axios.get("/contacts/search?q=" + query);
    console.log(data)
    const newContacts = contacts.filter((c) => {
      return c.name.toLowerCase().includes(query) || c.mobile.includes(query);
    });
    setFilteredContacts(newContacts);
  }

  return (
    <div className="container-fluid app">
      <div className='app-top'>

      <h1 className="title m-lg-3 text-center">Address Book Manager</h1>
        <ContactForm onSave={addContact} />
      <div className="filter">
        <div className='contactlist-name'>Contact List</div>
        <div className='form-group'>
        <label htmlFor="filter-input">Filter by Name/Mobile:</label>
        <input className='ml-lg-5' id="filter-input" type="text" placeholder="Enter name or mobile" onChange={handleFilterChange} />
        </div>
      </div>
      </div>
      <div className='app-bottom'>
      <ContactList contacts={filteredContacts} onUpdate={updateContact} onDelete={deleteContact} />
      </div>
      </div>
  );
}

export default App;
