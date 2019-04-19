const path = require('path');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/survey', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'app', 'views', 'survey.html'));
});

router.get('/', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'app', 'views', 'home.html'));
});

module.exports = router;