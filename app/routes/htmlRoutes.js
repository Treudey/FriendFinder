const path = require('path');
const fs = require('fs');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

router.get('/survey', (req, res) => {
    
    // we grab the string in the query if there is one
    const userName = req.query.name; 

    // and if there is a user query we put that user's match data into the modal in the html
    if (userName) {
        const data  = fs.readFileSync(path.join(rootDir, 'app', 'data', 'friends.json'));
        const friendsData = JSON.parse(data);
        const user = friendsData.find(obj => obj.name === userName);
        
        fs.readFile(path.join(rootDir, 'app', 'views', 'survey.html'), (err, html) => {
            if (err) throw err;

            html = html.toString('utf8');
            html = html.replace('%img%', user.match.photo);
            html = html.replace(/%name%/g, user.match.name);
            res.send(html);
        });
    
    // if there's no query string we simply send the regular html
    } else {
        res.sendFile(path.join(rootDir, 'app', 'views', 'survey.html'));
    }
    
});

router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'app', 'views', 'home.html'));
});

module.exports = router;