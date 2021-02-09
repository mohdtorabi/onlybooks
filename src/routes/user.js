const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

module.exports = (db) => {
  //get all users
  router.get('/', (req, res) => {
    db.query(`SELECT * FROM users;`, [])
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

  //get a single user by id
  router.get('/:id', (req, res) => {
    const userId = req.params.id;
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
            res.send(false);
          }
        })
        .catch((err) => {
          res.status(500).json({ error: err.message });
        });
    }
  });

  //create user route
  router.post('/', (req, res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const image_url = req.body.image_url;
    db.query(
      `SELECT * FROM users
              WHERE email = $1;`,
      [email]
    ).then((data) => {
      if (data.rows[0] !== undefined) {
        return res.send('exists');
      }
      if (password !== password2) {
        return res.send('mismatch');
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const queryParams = [
        firstName,
        lastName,
        email,
        hashedPassword,
        image_url,
      ];

      db.query(
        `INSERT INTO users (firstName, lastName, email, password, image_url)
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *;`,
        queryParams
      )
        .then((data) => {
          const listing = data.rows[0];
          return res.status(200).send(listing);
        })
        .catch((err) => {
          return res.status(500).send('error');
        });
    });
  });

  //update user route
  router.put('/', (req, res) => {
    const id = req.body.id;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;
    const image_url = req.body.image_url;

    //check if email exists in db
    db.query(
      `SELECT * FROM users
              WHERE email = $1;`,
      [email]
    ).then((data) => {
      if (data.rows[0] !== undefined) {
        return res.send('exists');
      }
      if (password !== password2) {
        return res.send('mismatch');
      }
      const hashedPassword = bcrypt.hashSync(password, 10);
      const queryParams = [
        firstName,
        lastName,
        email,
        hashedPassword,
        image_url,
        id,
      ];
      db.query(
        `UPDATE users
        SET firstName = $1,
        lastName = $2,
        email = $3,
        password = $4,
        image_url = $5
        WHERE users.id = $6
        RETURNING *;`,
        queryParams
      )
        .then((data) => {
          const user = data.rows[0];
          return res.status(200).send(user);
        })
        .catch((err) => {
          return res.status(500).json({ error: err.message });
        });
    });
  });
  return router;
};
