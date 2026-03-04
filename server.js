const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

const dbPath = path.join(__dirname, "database.json");

function readDB() {
  return JSON.parse(fs.readFileSync(dbPath));
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

app.post("/signup", (req, res) => {
  const { email } = req.body;
  const db = readDB();
  db.emails.push({ email, date: new Date() });
  writeDB(db);
  res.json({ message: "Email saved!" });
});

app.post("/preorder", (req, res) => {
  const { option, price } = req.body;
  const db = readDB();
  db.preorders.push({ option, price, date: new Date() });
  writeDB(db);
  res.json({ success: true });
});

app.post("/checkout", (req, res) => {
  const order = req.body;
  const db = readDB();
  db.orders.push({ ...order, date: new Date() });
  writeDB(db);
  res.json({ message: "Order saved!" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});