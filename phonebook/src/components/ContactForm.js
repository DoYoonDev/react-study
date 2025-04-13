import React, { useState } from "react";
import { TextField, Box, Button } from "@mui/material";
import usePhoneBookStore from "../stores/usePhoneBook";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const {addContact} = usePhoneBookStore();
  const hanleAddContact = () => {
    if (!name.trim() || !phoneNumber.trim) {
      alert("이름과 전화번호를 입력해주세요.");
      return;
    }

    addContact(name, phoneNumber);
  }

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <h2>연락처 추가</h2>
      <TextField
        id="outlined-basic"
        label="이름"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        id="outlined-basic"
        label="전화번호"
        variant="outlined"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <Button variant="contained" size="large" onClick={hanleAddContact}>
        추가하기
      </Button>
    </Box>
  );
};

export default ContactForm;
