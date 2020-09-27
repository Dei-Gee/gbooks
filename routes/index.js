const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  const books = "test";
  res.render('index', { 
    title: 'Express', 
    books: {}
  });
});

module.exports = router;
