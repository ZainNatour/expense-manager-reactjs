import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app"; // Import Firebase
import { firestore } from "../firebase";
import { Link as RouterLink } from "react-router-dom";

// styling
import {
  List,
  ListItem,
  ListItemText,
  Button,
  Container,
  Typography,
  TextField,
} from "@mui/material";
import styled from "@emotion/styled";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const useStyles = styled((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
}));

const ExpensesList = () => {
  const classes = useStyles();
  const [searchTerm, setSearchTerm] = useState("");
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Initialize Firebase if it's not already initialized

    const fetchExpenses = async () => {
      try {
        const expensesCollection = await firestore.collection("expenses").get();
        const expensesData = expensesCollection.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setExpenses(expensesData);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    };

    fetchExpenses();
  }, []);

  const handleDeleteExpense = (expenseId) => {
    try {
      // Delete the expense from Firestore
      const firestore = firebase.firestore();
      firestore.collection("expenses").doc(expenseId).delete();

      // Update the UI by filtering out the deleted expense
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== expenseId)
      );
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredExpenses = expenses.filter((expense) =>
    expense.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ width: "90%" }}>
      <Typography variant="h4" component="h2" style={{ marginTop: "2rem" }}>
        Expenses List
      </Typography>
      <TextField
        label="Search"
        variant="outlined"
        value={searchTerm}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem", marginTop: "2rem" }}
      />
      <List className={classes.root} sx={{ marginBottom: "2rem" }}>
        {filteredExpenses.map((expense) => (
          <ListItem alignItems="flex-start" key={expense.id}>
            <ListItemText
              primary={`Name: ${expense.name}`}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Amount: {expense.amount}
                  </Typography>
                  {` — Date: ${expense.date.toDate().toLocaleDateString()}`}
                </>
              }
            />
            <Button
              component={RouterLink}
              to={`/edit/${expense.id}`}
              color="primary"
            >
              Edit
            </Button>
            {/* <Button
              onClick={() => handleDeleteExpense(expense.id)}
              color="secondary"
            >
              Delete
            </Button> */}
            <IconButton aria-label="delete" size="large">
              <DeleteIcon
                fontSize="inherit"
                onClick={() => handleDeleteExpense(expense.id)}
              />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Button
        sx={{ position: "fixed", bottom: "50px", margin: "auto" }}
        variant="contained"
        color="primary"
        component={RouterLink}
        to="/add"
      >
        Add Expense
      </Button>
    </Container>
  );
};

export default ExpensesList;
