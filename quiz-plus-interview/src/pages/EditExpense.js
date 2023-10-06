import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { useParams } from "react-router-dom";

import { Container, Typography, TextField, Button } from "@mui/material";
import styled from "@emotion/styled";
const StyledForm = styled("form")({
  padding: "30px",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

function EditExpense() {
  const { id } = useParams(); // Get the expense ID from the URL parameter
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  // Fetching data
  useEffect(() => {
    const fetchExpense = async () => {
      try {
        const expenseDoc = await firestore.collection("expenses").doc(id).get();

        if (expenseDoc.exists) {
          // Populate the expense details from Firestore
          const expenseData = expenseDoc.data();
          setName(expenseData.name);
          setAmount(expenseData.amount.toString());
          setDate(expenseData.date.toDate().toISOString().split("T")[0]);
        } else {
          console.error("Expense not found");
        }
      } catch (error) {
        console.error("Error fetching expense:", error);
      }
    };

    fetchExpense();
  }, [id]);

  // Handlers
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

    // Check if date is not empty and is a valid date format
    if (!date || isNaN(new Date(date))) {
      console.error("Invalid date format");
      return;
    }

    try {
      await firestore
        .collection("expenses")
        .doc(id)
        .update({
          name,
          amount: parseFloat(amount),
          date: new Date(date),
        });

      // Redirect to the Manage Expenses page after updating the expense
      window.location.href = "/manage";
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  // JSX

  return (
    <Container>
      <Typography variant="h4" component="h2" sx={{ margin: "2rem" }}>
        Edit Expense
      </Typography>
      <StyledForm onSubmit={handleSubmit}>
        <TextField
          label="name"
          type="text"
          value={name}
          onChange={handleNameChange}
        ></TextField>
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
          Save
        </Button>
      </StyledForm>
    </Container>
  );
}

export default EditExpense;
