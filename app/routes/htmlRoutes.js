const path = require('path');
const fs = require('fs');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/survey', (req, res) => {
    if (req.cookies['friend']) {
        let friendData = JSON.parse(req.cookies['friend']);
        res.clearCookie('friend', { httpOnly: true });
        
        fs.readFile(path.join(rootDir, 'app', 'views', 'survey.html'), (err, html) => {
            if (err) throw err;

            html = html.replace('%img%', friendData.photo);
            html = html.replace(/%name%/g, friendData.name);
        });

        res.send(html);
    } else {
        res.sendFile(path.join(rootDir, 'app', 'views', 'survey.html'));
    }
    
});

router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'app', 'views', 'home.html'));
});

module.exports = router;