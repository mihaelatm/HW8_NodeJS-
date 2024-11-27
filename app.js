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

app.post("/books", async (req, res) => {
  try {
    const { title, author, year } = req.body;

    const newBook = await Book.create({
      title,
      author,
      year,
    });

    res.status(201).json(newBook);
  } catch (error) {
    console.error("Error creating  books:", error);
    res.status(500).json({ message: "Failed to create books" });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;

    const updatedRowsCount = await Book.update(
      {
        title,
        author,
        year,
      },
      {
        where: { id },
      }
    );

    if (updatedRowsCount === 0) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({ message: "Book updated successfully" });
  } catch (error) {
    console.error("Error updating  books:", error);
    res.status(500).json({ message: "Failed to update books" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
