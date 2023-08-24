// server.js
const express = require("express");
const mysql = require("mysql");
const app = express();

const cors = require("cors"); // Import the cors package

// ... (other code) ...

app.use(cors()); // Use cors middleware to enable CORS

const port = 5000;



// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "**",//my database password
  database: "expensehandler",
  insecureAuth: true,
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use(express.json());

let initID=4;
app.post("/api/addExpense", (req, res) => {
  const { date, description, amount } = req.body;
  console.log(req.body);
  const query = `INSERT INTO expensetable VALUES( ${initID},"${date}","${description}" ,${amount})`;
  connection.query(query, [initID,date, description, amount], (error, results) => {
    if (error) throw error;
    res.send("Expense added successfully");
  });

  initID+=1;
});

app.delete("/api/deleteExpense/:expenseId", (req, res) => {
  const expenseId = req.params.expenseId;
  const query = `DELETE FROM expensetable WHERE expenseId = ${expenseId}`;
  connection.query(query, [expenseId], (error, results) => {
    if (error) throw error;
    res.send("Expense deleted successfully");
  });
});

app.get("/api/getExpenses", (req, res) => {
  const query = "SELECT * FROM expensetable order by expense_date desc";
  connection.query(query, (error, results) => {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
