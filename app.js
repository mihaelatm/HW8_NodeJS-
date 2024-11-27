import express from "express";
import Book from "./models/book.js";
import sequelize from "./config/db.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ message: "Failed to fetch books" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
