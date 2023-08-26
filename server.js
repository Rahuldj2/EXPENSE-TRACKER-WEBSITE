// server.js
const express = require("express");
const mysql = require("mysql");
const app = express();

const cors = require("cors"); // Import the cors package


app.use(cors()); // Use cors middleware to enable CORS

const port = 5000;



// MySQL Connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "RahulSQL2002",//my database password
  database: "expensehandler",
  insecureAuth: true,
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

app.use(express.json());

let initID=0;

// const getID= async ()=>{
//   const query = 'select count(*) as count from expensetable';
//   let id=0;
//   connection.query(query,(err,result)=>{
//     if (err) throw err;
//     console.log("Result isisis: " + JSON.stringify(result, null, 2));
//     id=result[0].count+1;
//     console.log("my inside func id is ",id);
//     // console.log(id);
//     initID=id;
//   })
//   // return initID;
  

// }
// app.post("/api/addExpense", async(req, res) => {
//   const { date, description, amount } = req.body;
//   console.log(req.body);
//   await getID();
//   console.log("my id is ",initID);
//   const query = `INSERT INTO expensetable VALUES( ${initID},"${date}","${description}" ,${amount})`;
//   connection.query(query, [initID,date, description, amount], (error, results) => {
//     if (error) throw error;
//     res.send("Expense added successfully");
//   });

//   // initID+=1;
// });


// Modify the getID function to return a promise
const getID = () => {
  return new Promise((resolve, reject) => {
    const query = 'select count(*) as count from expensetable';
    connection.query(query, (err, result) => {
      if (err) reject(err);
      const id = result[0].count + 1;
      resolve(id);
    });
  });
};

app.post("/api/addExpense", async (req, res) => {
  const { date, description, amount } = req.body;
  console.log(req.body);

  try {
    const newID = await getID(); // Wait for the ID to be fetched
    console.log("my id is ", newID);

    const query = `INSERT INTO expensetable VALUES( ${newID},"${date}","${description}" ,${amount})`;

    connection.query(query, [newID, date, description, amount], (error, results) => {
      if (error) throw error;
      res.send("Expense added successfully");
    });
  } catch (error) {
    console.error("Error fetching ID:", error);
    res.status(500).send("Internal Server Error");
  }
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
  const query = "SELECT * FROM expensetable order by expense_date asc";
  connection.query(query, (error, results) => {
    if (error) throw error;
    // console.log(results);
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
