import ContactItem from './ContactItem';
// import './ContactList.css';

function ContactList({ contacts, onUpdate, onDelete }) {
  return (
    <div className="contact-list">
      {contacts.length === 0 ? (
        <div className="no-contacts">No contacts to display</div>
      ) : (
        contacts.map((contact,idx) => (
          <ContactItem index={idx} key={contact._id} contact={contact} onUpdate={onUpdate} onDelete={onDelete} />
        ))
      )}
    </div>
  );
}

export default ContactList;
