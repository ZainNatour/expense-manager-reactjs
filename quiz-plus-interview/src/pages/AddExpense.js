import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebase";
import { Container, Typography, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
const StyledForm = styled("form")({
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

export default function AddExpense() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const firestore = firebase.firestore();

    // Check if date is not empty and is a valid date format
    if (!date || isNaN(new Date(date))) {
      console.error("Invalid date format");
      return;
    }

    try {
      await firestore.collection("expenses").add({
        name,
        amount: parseFloat(amount),
        date: new Date(date),
      });

      // Clear the form inputs after adding the expense
      setName("");
      setAmount("");
      setDate("");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" sx={{ margin: "2rem" }}>
        Add Expense
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="Name"
          type="text"
          value={name}
          onChange={handleNameChange}
        />
        <TextField
          label="Amount"
          type="number"
          value={amount}
          onChange={handleAmountChange}
        />
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Expense
        </Button>
      </StyledForm>
    </Container>
  );
}
