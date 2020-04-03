# Installation 
```
  npm install
  npm start
```

# Outline for API Spec
I would move the local storage data and calls in redux out to the server.  
On app load instead of doing a local storage get you would make a GET request for your current game state and game history. In REST you might have this as two separate calls as a players' game history can be stored and requested separately.
If you were using graphql then you would have one endpoint and query for all the data you would need on app load

## REST

User_id, device_id, or cookie_id  
GET /game/<user_id> <--- loads game state for user, (loads state of current game)  
GET /history/<user_id> <--- loads game history for user, (player wins, losses, ties)

Making changes to the board  
POST /game/<game_id>  <--- for every move, (returns board state, game has ended, etc)

There's work you can do on client side such as game validation and tracking the scoreboard from the response of each move.  
With redux + REST you would dispatch an action for each move made, update visually on client side, then when server comes back with a response you can dispatch a success action to sync state.

