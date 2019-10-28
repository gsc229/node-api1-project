// implement your API here
const express = require('express'); //equivalent to import sthg from sthg

const server = express(); // creates a server 
const db = require('./data/db.js');  // call in the db functions

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