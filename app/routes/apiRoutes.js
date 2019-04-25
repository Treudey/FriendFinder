const path = require('path');
const fs = require('fs');

const express = require('express');

const rootDir = require('../util/path');

const app = express();
const router = express.Router();



const findFriend = (friendArr, user) => {
    let matchedFriend;
    let bestDifference = 40;

    friendArr.forEach(el => {
        let totalDifference = 0;
        for (let i = 0; i < el.scores.length; i++) {
            const friendScore = user.scores[i]
            const myScore = el.scores[i];
            totalDifference += Math.abs(parseInt(myScore) - parseInt(friendScore));
        }

        if (totalDifference < bestDifference) {
            bestDifference = totalDifference;
            matchedFriend = el;
        }
    });

    return matchedFriend;
};

router.get('/friends', (req, res) => {
    // display JSON of all friends
    res.json(friendsData);
});

router.post('/friends', (req, res) => {
    // deal with submitted data

    const data  = fs.readFileSync(path.join(rootDir, 'app', 'data', 'friends.json'));
    let friendsData = JSON.parse(data);
    
    let userData = {
        name: req.body.username,
        photo: req.body.imgLink,
        scores: []
    };

    for (const key in req.body) {
        const element = req.body[key];
        if (key.includes('Q')) {
            userData.scores.push(parseInt(element.replace('option', '')))
        }
    }
    
    let matchFriend = findFriend(friendsData, userData);
    matchFriend = JSON.stringify(matchFriend, null, 2);

    fs.writeFileSync(path.join(rootDir, 'app', 'data', 'matchedFriend.json'), matchFriend);

    friendsData.push(userData);
    friendsData = JSON.stringify(friendsData, null, 2);

    fs.writeFile(path.join(rootDir, 'app', 'data', 'friends.json'), friendsData, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });

    console.log(matchFriend);

    res.redirect('/survey');
});

module.exports = router;