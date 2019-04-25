const path = require('path');
const fs = require('fs');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();



router.get('/survey', (req, res) => {

    const matchedFriendPath = path.join(rootDir, 'app', 'data', 'matchedFriend.json');
    let data  = fs.readFileSync(matchedFriendPath);
    let friendData; 

    try {
        friendData = JSON.parse(data);
        
    } catch (err) {
        data = null;
    }
    
    if (friendData) {
        fs.truncate(matchedFriendPath, 0, () => console.log('file emptied'));
        
        fs.readFile(path.join(rootDir, 'app', 'views', 'survey.html'), (err, html) => {
            if (err) throw err;

            html = html.toString('utf8');
            html = html.replace('%img%', friendData.photo);
            html = html.replace(/%name%/g, friendData.name);
            res.send(html);
        });
    
    } else {
        res.sendFile(path.join(rootDir, 'app', 'views', 'survey.html'));
    }
    
});

router.get('/', (req, res) => {
    res.sendFile(path.join(rootDir, 'app', 'views', 'home.html'));
});

module.exports = router;