import "./App.css";
import ExpenseList from "./pages/ExpensesList";
import AddExpense from "./pages/AddExpense";
import AnalyzeExpenses from "./pages/AnalyzeExpenses";
import { Route, Routes } from "react-router-dom";
import EditExpense from "./pages/EditExpense";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a delay for loading (remove this in your actual application)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Routes>
          <Route path="/manage" element={<ExpenseList />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/analyze" element={<AnalyzeExpenses />} />
          <Route path="/edit/:id" element={<EditExpense />} />
        </Routes>
      )}
      <Navbar />
    </>
  );
}

export default App;
