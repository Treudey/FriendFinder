const path = require('path');
const fs = require('fs');

const express = require('express');

const rootDir = require('../util/path');

const router = express.Router();

// this is the function that finds the best match for a user
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
    fs.readFile(path.join(rootDir, 'app', 'data', 'friends.json'), (err, data) => {
        const friendsData = JSON.parse(data);
        res.json(friendsData);
    });
});

router.post('/friends', (req, res) => {

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
    
    // find the corrosponding matched friend and add it to the user data
    const matchFriend = findFriend(friendsData, userData);
    const simpleMatchData = {
        name: matchFriend.name,
        photo: matchFriend.photo
    };

    userData.match = simpleMatchData;

    //update the match friends match with the current user
    const simpleUserData = {
        name: userData.name,
        photo: userData.photo
    }
    matchFriend.match = simpleUserData;
    
    friendsData.push(userData);
    
    // create a string to send as a query to '/survey' to interpret and show a modal
    const queryUserName = encodeURIComponent(userData.name);
    friendsData = JSON.stringify(friendsData, null, 2);

    fs.writeFile(path.join(rootDir, 'app', 'data', 'friends.json'), friendsData, err => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });

    console.log(matchFriend);

    res.redirect('/survey?name=' + queryUserName);
});

module.exports = router;