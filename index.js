// implement your API here
const express = require('express'); //equivalent to import sthg from sthg

const server = express(); // creates a server 
const db = require('./data/db.js');  // call in the db functions
server.use(express.json()); //middleware which allows express to read json
//route/request handlers
const cors = require('cors');
server.use(cors())

console.log("HIIIIIIIIII");
/* ROUTES  */
server.get('/', (req, res) => {

  res.send('Hello Node 23!');

})

server.get('/api/users', (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.status(500).json({ error: "The users information could not be retrieved." });
    })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;


  db
    .findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    })
    .catch(() => {
      res.status(500).json({ error: "The user could not be retrieved" });
    })
})

server.post('/api/echo', (req, res) => {
  const newUser = req.body;

  const name = req.body.name;
  const bio = req.body.bio;

  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  }
  db
    .insert(newUser)
    .then(user => {
      res.status(201).json(newUser);
    })
    .catch(err => {
      res.status(500).json({ error: "There was an error while saving the user to the database" })
    })

})

server.put('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const updatedUser = req.body;
  const { name, bio } = req.body

  if (!name || !bio) {
    res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db
      .update(userId, updatedUser)
      .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(404).json({ errorMessage: 'The user with the specified ID does not exist.' })
        }

      })
      .catch(() => {
        res.status(500).json({ error: "couldn't update that user" });
      })


  }


})

server.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;


  db
    .remove(userId)
    .then(user => {
      if (user) {
        res.status(200).json({ userId: userId, message: 'the user was deleted', user: [user] });
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }

    })
    .catch(() => {
      res.status(500).json({ error: "couldn't update that user" });
    })

})




/* POST | /api/users
GET | /api/users
GET | /api/users /: id
DELETE | /api/users /: id
PUT | /api/users /: id 

  `find()`
  `findById()`
  `insert()`
  `update()`
  `remove()` */


//listen for requests in a particular port on localhost
const port = 8000; //localhost 8000
server.listen(port, () => console.log('\n=== API on port 8000 ===\n'));