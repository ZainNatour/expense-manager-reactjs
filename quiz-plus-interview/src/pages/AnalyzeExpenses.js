import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { firebaseConfig } from "../firebase";
import { Bar } from "react-chartjs-2"; // Import a chart library (e.g., Chart.js)
import {
  Chart,
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
// styles
import { Container, Typography, Box, Paper } from "@mui/material";
import styled from "@emotion/styled";

const StyledPaper = styled(Paper)({
  padding: `16px`,
  marginBottom: `16px`,
});

Chart.register(BarController, CategoryScale, LinearScale, BarElement);

function AnalyzeExpenses() {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const firestore = firebase.firestore();
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

  // Calculate overall expenses
  const overallExpenses = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  );

  // Calculate expenses for the current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const expensesThisMonth = expenses
    .filter((expense) => {
      const date = new Date(expense.date.toDate());
      return (
        date.getMonth() + 1 === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((total, expense) => total + expense.amount, 0);

  // Calculate highest expense this month
  const highestExpenseThisMonth = expenses
    .filter((expense) => {
      const date = new Date(expense.date.toDate());
      return (
        date.getMonth() + 1 === currentMonth &&
        date.getFullYear() === currentYear
      );
    })
    .reduce((max, expense) => (expense.amount > max ? expense.amount : max), 0);

  // Example function to group expenses by month and calculate total expenses
  const prepareChartData = () => {
    const groupedExpenses = {};

    expenses.forEach((expense) => {
      const date = new Date(expense.date.toDate());
      const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
      if (!groupedExpenses[monthYear]) {
        groupedExpenses[monthYear] = 0;
      }
      groupedExpenses[monthYear] += expense.amount;
    });

    const labels = Object.keys(groupedExpenses);
    const data = Object.values(groupedExpenses);

    return { labels, data };
  };

  const chartData = prepareChartData();

  return (
    <Container>
      <Typography variant="h4" component="h2" sx={{ marginTop: "2rem" }}>
        Expenses Analysis
      </Typography>
      <Box className="statistics">
        <StyledPaper>
          <Typography variant="h6">
            Overall Expenses: ${overallExpenses.toFixed(2)}
          </Typography>
        </StyledPaper>
        <StyledPaper>
          <Typography variant="h6">
            Expenses This Month: ${expensesThisMonth.toFixed(2)}
          </Typography>
        </StyledPaper>
        <StyledPaper>
          <Typography variant="h6">
            Highest Expense This Month: ${highestExpenseThisMonth.toFixed(2)}
          </Typography>
        </StyledPaper>
      </Box>
      <Box className="chart-container">
        <Bar
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: "Total Expenses",
                data: chartData.data,
                backgroundColor: "rgba(75, 192, 192, 0.6)", // Example color
              },
            ],
          }}
          options={{
            scales: {
              y: {
                type: "linear",
                beginAtZero: true,
              },
            },
          }}
        />
      </Box>
    </Container>
  );
}

export default AnalyzeExpenses;
