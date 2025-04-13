import React from 'react'
import usePhoneBookStore from '../stores/usePhoneBook';

const ContactList = () => {
  const { phoneBook } = usePhoneBookStore();
  console.log(phoneBook);
  return (
    <div>
        <h2>연락처 목록</h2>
        {phoneBook.map((contact) => (
        <div key={contact.id} className='contact-item'>
            <p>{contact.name}</p>
            <p>{contact.phoneNumber}</p>
        </div>
        ))}
    </div>
  )
}

export default ContactList
