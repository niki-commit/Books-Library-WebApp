import express from "express";
import pg from "pg";
import env from "dotenv";
import cors from "cors";

const app = express();
const port = 8000;
env.config();

app.use(cors());
app.use(express.json());

const db = new pg.Client({
    user: process.env.USER_NAME,
    host: process.env.HOST,
    database: "booksapp",
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
})
db.connect();

// get all books
app.get("/books", async (req, res) => {
    try {
        const books = await db.query("SELECT * FROM books;");
        res.json(books.rows);
    } catch (error) {
        console.error(error);
    }
})

// create a new book
app.post("/books", async (req, res) => {
    const { title, summary, bookPublishYear } = req.body;
    try {
        const newBook = await db.query("INSERT INTO books(title, summary, book_publish_year) VALUES($1, $2, $3);",
            [title, summary, bookPublishYear])
        res.json(newBook);
    } catch (error) {
        console.error(error);
    }
})

// edit a book
app.put("/books/:id", async (req, res) => {
    const { id } = req.params;
    const { title, summary, bookPublishYear } = req.body;
    try {
        const editBook = await db.query("UPDATE books SET title=$1, summary=$2, book_publish_year=$3 WHERE id=$4;",
            [title, summary, bookPublishYear, id]);
        res.json(editBook);
    } catch (error) {
        console.error(error);
    }
})

// Delete a book
app.delete("/books/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deleteBook = await db.query("DELETE FROM books WHERE id=$1;", [id]);
        res.json(deleteBook);
    } catch (error) {
        console.error(error);
    }
})

app.listen(port, () => {
    console.log(`server running on ${port}`);
})