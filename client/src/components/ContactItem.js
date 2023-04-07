// import './ContactItem.css';
import { useState,useEffect } from "react";

function ContactItem({ index, contact, onDelete, onUpdate }) {
  const [name, setName] = useState(contact.name);
  const [mobile, setMobile] = useState(contact.mobile);
  const [edit, setedit] = useState(false);

  function handleDelete() {
    let option = window.confirm("Are you sure You want to delete the contact?");
    if (option) {
      onDelete(contact._id);
      alert("Deleted Successfully");
    }
  }

  function handleEdit(e) {
    e.preventDefault();
    setedit(!edit);
  }

  function handleSave(e) {
    // e.preventDefault();
    onUpdate(contact._id, {name ,mobile});
  }
  

  return (
    <>
      <form>
        <div className='contact-item'>
        <p className="item-idx">{index+1}</p>
          <div className="form-data">
            <div className='form-group'>
              <input
                id='name-input'
                className={'contact-name form-control'+((!edit)?'-plaintext':'')}
                type='text'
                readOnly={!edit}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <input
                id='name-input'
                className={'contact-mobile form-control'+((!edit)?'-plaintext':'')}
                type='text'
                readOnly={!edit}
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                required
              />
            </div>
          </div>
          <div className='actions'>
            {!edit ? (
              <button className='edit-btn btn btn-outline-dark' onClick={handleEdit}>
                Edit
              </button>
            ) : (
              <button type='submit' className='save-btn btn btn-outline-success' onClick={handleSave}>
                Save
              </button>
            )}
            {!edit ? (
            <button className='delete-btn btn btn-outline-danger' onClick={handleDelete}>
              Delete
              </button>
            ): (
              <button className='delete-btn'>
              Cancel
              </button>
              )}
          </div>
        </div>
      </form>
    </>
  );
}

export default ContactItem;
