import "./App.css";
import ExpenseList from "./pages/ExpensesList";
import AddExpense from "./pages/AddExpense";
import AnalyzeExpenses from "./pages/AnalyzeExpenses";
import { Route, Routes, useNavigate } from "react-router-dom";
import EditExpense from "./pages/EditExpense";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";
import Loading from "./components/Loading";

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Get the navigate function

  useEffect(() => {
    // Simulate a delay for loading (remove this in your actual application)
    const timer = setTimeout(() => {
      setLoading(false);
      navigate("/manage");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

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
