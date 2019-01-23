
const express = require("express");
const router = express.Router();

const taskC = require('../controllers/task.controller');

router.post('/addTask',taskC.addTask);
router.get('/delete/:id', taskC.delete);
router.post('/editTask/:id', taskC.editTask);
router.post('/search', taskC.search);
router.post('/state', taskC.state);
module.exports = router;