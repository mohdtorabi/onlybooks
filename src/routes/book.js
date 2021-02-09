const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get all books
  router.get('/', (req, res) => {
    const isbn = req.params.isbn;
    db.query(`SELECT * FROM book;`, [isbn])
      .then((data) => {
        const books = data.rows;
        res.send(books);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  //get book by isbn
  router.get('/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    db.query(
      `SELECT * FROM book
              WHERE isbn = $1;`,
      [isbn]
    )
      .then((data) => {
        const book = data.rows[0];
        res.send(book);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const isbn = req.body.isbn;
    const name = req.body.name;
    const author = req.body.author;
    const pages = req.body.pages;
    const genre = req.body.genre;
    const description = req.body.description;
    const image_url = req.body.image_url;

    //first check if book club with name exists
    db.query(
      `SELECT * FROM book
              WHERE isbn = $1;`,
      [isbn]
    ).then((data) => {
      if (data.rows[0] !== undefined) {
        return res.send('exists');
      }
      const queryParams = [
        isbn,
        name,
        author,
        pages,
        genre,
        description,
        image_url,
      ];

      db.query(
        `INSERT INTO book (isbn, name, author, pages, genre, description, image_url)
              VALUES ($1, $2, $3, $4, $5, $6, $7)
              RETURNING *;`,
        queryParams
      )
        .then((data) => {
          const book = data.rows[0];
          return res.status(200).send(book);
        })
        .catch((err) => {
          return res.status(500).send('error');
        });
    });
  });

  return router;
};
