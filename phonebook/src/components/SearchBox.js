import React from 'react';
import usePhoneBookStore from '../stores/usePhoneBook';

const SearchBox = () => {
  const { searchTerm, setSearchTerm, searchContacts } = usePhoneBookStore();

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    searchContacts(); // 입력이 변경될 때마다 검색 실행 (실시간 검색)
  };

  return (
    <div>
      <input
        type="text"
        placeholder="이름 또는 전화번호로 검색"
        value={searchTerm}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBox;