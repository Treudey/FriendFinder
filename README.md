# FriendFinder
This full-stack site that matches the most compatible users together using Express and Node. It takes a users's name, photo, and asnwers to ten questions then finds the most compatible friend in the FriendFinder database!

This application uses Express to handle routing and is deployed on Heroku.

## Live Site
https://enigmatic-springs-20660.herokuapp.com

## Technologies
  * Node.js
  * Express.js
  * Heroku
  * HTML
  * CSS + Bootstrap
  * Javascript + jQuery

## Business Logic

The friend data is stored as an array of JSON objects like this:

```json
{
  "name":"Ahmed",
  "photo":"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
  "scores":[
      5,
      1,
      4,
      4,
      5,
      1,
      2,
      5,
      4,
      1
    ]
}
```

The user's most compatible friend is determined in the following way:

   * The differences between current user's scores and other users' scores are compared, question by question. The differences are added up to calculate the `totalDifference`.
     * Example:
       * User 1: `[5, 1, 4, 4, 5, 1, 2, 5, 4, 1]`
       * User 2: `[3, 2, 6, 4, 5, 1, 2, 5, 4, 1]`
       * Total Difference: **2 + 1 + 2 =** **_5_**
    * The closest match will be the user with the least amount of difference.
    
## Author
**Alex Treude**  [Treudey](https://github.com/Treudey)

## License
MIT
