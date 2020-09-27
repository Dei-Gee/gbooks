const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get("/searchbooks", async (req, res, next) => {
    let query = "";
    let options = "";

    if(req.query !== null || req.query !== {})
    {
        query = req.query.query;

        // dynamically adding queries to the option string for more detailed search
        for (var key in req.query) {
            switch(key) {
                case "author":
                    options += `+inauthor:${req.query[key]}`;
                break;
                case "booktitle":
                    options += `+intitle:${req.query[key]}`;
                break;
                case "publisher":
                    options += `+inpublisher:${req.query[key]}`;
                break;
                case "subject":
                    options += `+subject:${req.query[key]}`;
                break;
                case "isbn":
                    options += `+isbn:${req.query[key]}`;
                break;
                case "lccn":
                    options += `+lccn:${req.query[key]}`;
                break;
                case "oclc":
                    options += `+oclc:${req.query[key]}`;
                break;
                default: 
                    options += "";
            }
        }
    }

    const results = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}${options}&key=${process.env.API_KEY}`);

    res.render('index', {
        title: 'Express',
        books: results.data
    })
});

module.exports = router;