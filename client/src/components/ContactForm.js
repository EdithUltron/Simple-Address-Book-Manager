import { useState } from 'react';
// import './ContactForm.css';

function ContactForm({ onSave, onCancel }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onSave({ name, mobile });
    setName('');
    setMobile('');
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact-formitem">
        <div className="form-data">
      <div className="form-group">
        <label htmlFor="name-input">Name:</label>
        <input className="ml-3" id="name-input" type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="mobile-input">Mobile:</label>
        <input className='ml-3' id="mobile-input" type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
      </div>
        </div>
        <div className="actions">
      <button type="submit" className="btn btn-outline-success sav-btn">Save</button>
      <button type="button" className="btn btn-outline-danger delete-btn" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </form>
  );
}

export default ContactForm;
