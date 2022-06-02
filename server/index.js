const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());
//cors = cross origin resource sharing ทำหน้าที่อนุญาติการ request ต่างๆหรือไม่

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root1234",
  database: "employeesystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employee", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const wage = req.body.wage;

  db.query(
    "INSERT INTO employee (name, age, country, position, wage) VALUES (?,?,?,?,?)",
    [name, age, country, position, wage],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.listen("3001", () => {
  console.log("Server is running on Port 3001");
});
