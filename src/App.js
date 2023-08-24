import React,{useRef}from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddExpenseForm from "./components/AddExpenseForm";
import DeleteExpenseForm from "./components/DeleteExpenseForm";
import ViewExpenses from "./components/ViewExpenses";
import './App.css';

function Home() {
  return (
    <div>
      <h2>Expense Tracker</h2>
      <div className="buttons">
        <Link to="/add">Add Expense</Link>
        <Link to="/delete">Delete Expense</Link>
        <Link to="/view">View Expenses</Link>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <Router>
        {/* <div> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddExpenseForm />} />
            <Route path="/delete" element={<DeleteExpenseForm />} />
            <Route path="/view" element={<ViewExpenses />} />
          </Routes>
        {/* </div> */}
      </Router>
    </div>
  );
}

export default App;
