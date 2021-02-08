const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM book_club`, [])
      .then((data) => {
        if (data) {
          res.status(200).send(data.rows[0]);
        } else {
          res.send(false);
        }
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const name = req.body.name;
    const is_private = req.body.private;
    const image_url = req.body.image_url;

    //first check if book club with name exists
    db.query(
      `SELECT * FROM book_club
              WHERE name = $1;`,
      [name]
    ).then((data) => {
      if (data.rows[0] !== undefined) {
        return res.send('exists');
      }
      const queryParams = [name, is_private, image_url];

      db.query(
        `INSERT INTO book_club (name, private, image_url)
              VALUES ($1, $2, $3)
              RETURNING *;`,
        queryParams
      )
        .then((data) => {
          const club = data.rows[0];
          return res.status(200).send(club);
        })
        .catch((err) => {
          return res.status(500).send('error');
        });
    });
  });

  return router;
};
