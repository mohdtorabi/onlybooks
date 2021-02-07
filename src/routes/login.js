const express = require('express');
const router = express.Router();

module.exports = (db) => {
  router.get('/', (req, res) => {
    const userId = req.session.user_id;
    if (userId) {
      db.query(
        `SELECT * FROM users
              WHERE id = $1;`,
        [userId]
      )
        .then((data) => {
          if (data) {
            res.status(200).send(data.rows[0]);
          } else {
            req.session = null;
            res.send(false);
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  return router;
};
