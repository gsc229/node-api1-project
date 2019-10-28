// implement your API here
const express = require('express'); //equivalent to import sthg from sthg

const server = express(); // creates a server 
const db = require('./data/db.js');  // call in the db functions
server.use(express.json()); //middleware which allows express to read json
//route/request handlers
server.get('/', (req, res) => {

  res.send('Hello Node 23!');

})

server.get('/api/users/', (req, res) => {
  db
    .find()
    .then(users => {
      res.json(users);
    })
    .catch(err => {
      res.send(err);
    })
})

server.get('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      res.status(500).json({ error: 'failed to get user from db' })
    })
})

server.post('/api/echo', (req, res) => {
  const newUser = req.body;

  db
    .insert(newUser)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
      res.status(500).json({ error: "couldn't add new user" })
    })

})

server.put('/api/users/:id', (req, res) => {
  const id = req.params.id;
  const updatedUser = req.body;
  db
    .update(id, updatedUser)
    .then(user => {
      res.json(user)
    })
    .catch(err => {
      res.status(500).json({ error: "couldn't update that user" });
    })

})

server.delete('/api/users/:id', (req, res) => {
  const id = req.params.id;
  db
    .remove(id)
    .then(user => {
      res.json(user);
    })
    .catch(err => {
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