import React, { useState, useEffect } from "react";
import axios from "axios";
import '../styles/ViewExpenses.css'

const ViewExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    async function fetchExpenses() {
      try {
        const response = await axios.get("http://localhost:5000/api/getExpenses");
        setExpenses(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error fetching expenses:", error);
      }
    }
    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expenses</h2>
      <table className="expense-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.expenseId}>
              <td>{new Date(expense.expense_date).toLocaleDateString()}</td>
              <td>{expense.description}</td>
              <td>Rs{expense.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ViewExpenses;
