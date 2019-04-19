const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/friends', (req, res) => {
    // display JSON of all friends
});

router.post('/friends', (req, res) => {
    // deal with submitted data
    const friendData =  JSON.stringify(req.body);
    res.redirect('/survey');
});

module.exports = router;