const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const dbConfig = {
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	waitForConnections: true,
	connectionLimit: 100,
	queueLimit: 0,
};

app.get("/items", async (req, res) => {
  try {
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      "SELECT id, itemName, itemCategory, locationDescription, healthStatus FROM ItemsForCollection"
    );
    await connection.end();
    return res.status(200).json(rows);
  } catch (error) {
    console.error("Database error fetching items:", error);
    return res.status(500).json({ message: "Failed to fetch items." });
  }
});

app.post("/items", async (req, res) => {
  const {
    itemName,
    itemCategory,
    locationDescription,
    healthStatus,
  } = req.body;

  try {
    const connection = await mysql.createConnection(dbConfig);
    const [results] = await connection.execute(
      "INSERT INTO ItemsForCollection (itemName, itemCategory, locationDescription, healthStatus) VALUES (?, ?, ?, ?)",
      [itemName, itemCategory, locationDescription, healthStatus]
    );
    await connection.end();
    return res.status(201).json({ id: results.insertId });
  } catch (error) {
    console.error("Database error creating item:", error);
    return res.status(500).json({ message: "Failed to create item." });
  }
});

// TODO (Member 2): Implement update route for items.
// app.put("/items/:id", (req, res) => {});

// TODO (Member 2): Implement delete route for items.
// app.delete("/items/:id", (req, res) => {});

app.listen(port, () => {
  console.log(`GreenRecycle SG server running on port ${port}`);
});
