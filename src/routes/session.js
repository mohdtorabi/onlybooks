const express = require('express');
const router = express.Router();

module.exports = (db) => {
  //get specific session
  router.get('/:id', (req, res) => {
    const session = req.params.id;
    db.query(
      `SELECT * FROM session
              WHERE id = $1;`,
      [session]
    )
      .then((data) => {
        const session = data.rows[0];
        res.send(session);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  router.post('/', (req, res) => {
    const book_club_id = req.body.book_club_id;
    const book_id = req.body.book_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;

    //first check if book club with name exists

    const queryParams = [book_club_id, book_id, start_date, end_date];

    db.query(
      `INSERT INTO session (book_club_id, book_id, start_date, end_date)
              VALUES ($1, $2, $3, $4)
              RETURNING *;`,
      queryParams
    )
      .then((data) => {
        const session = data.rows[0];
        return res.status(200).send(session);
      })
      .catch((err) => {
        return res.status(500).send('error');
      });
  });

  //update session
  router.put('/', (req, res) => {
    const id = req.body.id;
    const book_id = req.body.book_id;
    const start_date = req.body.start_date;
    const end_date = req.body.end_date;

    const queryParams = [id, book_id, start_date, end_date];
    db.query(
      `UPDATE session
                SET book_id = $2,
                start_date = $3,
                end_date = $4,
                updated = CLOCK_TIMESTAMP()
                WHERE id = $1
                RETURNING *;`,
      [queryParams]
    )
      .then((data) => {
        res.send(data.rows);
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });

  return router;
};
