// const { json } = require('body-parser');
// const { Template } = require('ejs');
const express = require('express');
const router = express.Router();
const { getItemsListByUserId, deleteTaskById, changeCategory } = require("../db/database");
const taskSort = require("../lib/taskSort");
const db = require('../db/dbsetup');
const { route } = require('./login');


router.get("/", (req, res) => {
  const user_id = req.session.id;
  getItemsListByUserId(user_id)
    .then((todos) => {
      res.json(todos);
    });
});

router.get("/list", (req, res) => {
  let query = `SELECT * FROM s`;
  console.log(query);
  db.query(query)
    .then(data => {
      const widgets = data.rows;
      res.json({ widgets });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

router.post('/delete', function (req, res) {
  console.log("REID", req.session)
  console.log("REQ", req.body)
  deleteTaskById(req.session.id, req.body.taskId)
    .then(() => {
      res.status(201).send();
    });
})

router.post("/", function (req, res) {
  console.log("REQ:\n", req.body["new-todo"]);
  if (!req.body["new-todo"]) {
    res.status(400).json({ error: 'invalid request: no data in POST body' });
    return;
  }
  taskSort(req.body["new-todo"], req.session.id)
    .then(() => {
      res.status(201).send();
    });
});

router.post('/delete', function (req, res) {
  // console.log("REID", req.session)
  // console.log("REQ", req.body)
  deleteTaskById(req.session.id, req.body.taskId)
    .then(() => {
      res.status(201).send();
    });
})

router.post("/edit", (req, res) => {
  console.log("REID", req.session)
  console.log("REQ", req.body)
  changeCategory(req.session.id, req.body.title, req.body.category)
    .then(() => {
      console.log(res.body);
      res.status(201).send();
    })
})

// router.post("/:id/delete", (req, res) => {
//   res.redirect("");
// });
module.exports = router;

