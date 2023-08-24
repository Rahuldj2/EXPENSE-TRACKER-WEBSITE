// DeleteExpenseForm.js
import React, { useState } from "react";
import axios from "axios";

const DeleteExpenseForm = () => {
  const [expenseId, setExpenseId] = useState("");

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:5000/api/deleteExpense/${expenseId}`);
      // Clear input field
      setExpenseId("");
    } catch (error) {
      console.error("Error deleting expense:", error);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <input
        type="number"
        value={expenseId}
        onChange={(e) => setExpenseId(e.target.value)}
        placeholder="Expense ID"
      />
      <button type="submit">Delete Expense</button>
    </form>
  );
};

export default DeleteExpenseForm;
