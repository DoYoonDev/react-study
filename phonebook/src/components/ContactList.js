import React from 'react';
import usePhoneBookStore from '../stores/usePhoneBook';
import SearchBox from './SearchBox';

const ContactList = () => {
  const { searchResults } = usePhoneBookStore(); // 변경: phoneBook 대신 searchResults 사용

  return (
    <div>
      <h2>연락처 목록</h2>
      <SearchBox />
      {searchResults.length > 0 ? (
        searchResults.map((contact) => (
          <div key={contact.id} className='contact-item'>
            <p>{contact.name}</p>
            <p>{contact.phoneNumber}</p>
          </div>
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default ContactList;