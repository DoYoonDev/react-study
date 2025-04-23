Markdown

# React 연락처 앱 개발 정리

## 1. React 프로젝트 생성

```bash
npx create-react-app phonebook-app
cd phonebook-app
2. Zustand 설치
Bash

npm install zustand
# 또는
yarn add zustand
3. Material-UI (MUI) 설치 (선택 사항)
Bash

npm install @mui/material @emotion/react @emotion/styled
# 또는
yarn add @mui/material @emotion/react @emotion/styled
4. Zustand 스토어 생성 (src/stores/usePhoneBook.js)
JavaScript

import { create } from 'zustand';

const usePhoneBookStore = create((set, get) => ({
  phoneBook: [],
  searchTerm: '',
  searchResults: [],
  addContact: (name, phoneNumber) =>
    set((state) => ({
      phoneBook: [...state.phoneBook, { id: Date.now(), name, phoneNumber }],
    })),
  setSearchTerm: (term) => set({ searchTerm: term }),
  searchContacts: () => {
    const term = get().searchTerm;
    const results = get().phoneBook.filter(contact =>
      contact.name.toLowerCase().includes(term.toLowerCase()) ||
      contact.phoneNumber.includes(term)
    );
    set({ searchResults: results });
  },
}));

export default usePhoneBookStore;
5. 연락처 추가 폼 컴포넌트 생성 (src/components/ContactForm.js)
JavaScript

import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import usePhoneBookStore from "../stores/usePhoneBook";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const { addContact } = usePhoneBookStore();

  const handleAddContact = () => {
    if (!name.trim() || !phoneNumber.trim()) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }
    addContact(name, phoneNumber);
    setName("");
    setPhoneNumber("");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <h2>연락처 추가</h2>
      <TextField
        label="이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        label="전화번호"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button variant="contained" size="large" onClick={handleAddContact}>
        추가하기
      </Button>
    </Box>
  );
};

export default ContactForm;
6. 검색 입력 컴포넌트 생성 (src/components/SearchBox.js)
JavaScript

import React from 'react';
import usePhoneBookStore from '../stores/usePhoneBook';

const SearchBox = () => {
  const { searchTerm, setSearchTerm, searchContacts } = usePhoneBookStore();

  const handleInputChange = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    searchContacts();
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
7. 연락처 목록 컴포넌트 생성 (src/components/ContactList.js)
JavaScript

import React from 'react';
import usePhoneBookStore from '../stores/usePhoneBook';
import SearchBox from './SearchBox';

const ContactList = () => {
  const { searchResults } = usePhoneBookStore();

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
8. App 컴포넌트 수정 (src/App.js)
JavaScript

import React from 'react';
import './App.css';
import { Grid } from '@mui/material';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';

function App() {
  return (
    <div className="App">
      <h1>연락처 앱</h1>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ContactForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <ContactList />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
9. App.css 수정 (선택 사항)
CSS

.App {
  font-family: sans-serif;
  padding: 20px;
}

.contact-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
}
10. 프로젝트 실행
Bash

npm start
# 또는
yarn start