import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

function App() {

  const [newUser, setNewUser] = useState({
    name: "",
    bio: ''
  })
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isId, setIsId] = useState("");
  console.log("App.js newUser: ", newUser);


  const deleteUser = id => {
    console.log("ID: ", id);
    axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(res => {
        axios.get('http://localhost:8000/api/users')
          .then(res => setUsers(res.data))
      })
      .catch(err => { console.log(err) })
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users')
      .then(res => {
        console.log("App.js aWA .get res", res);
        setUsers(res.data);
      })
      .catch(err => { console.log(err) });
  }, []);

  const handleChanges = (e) => {
    setNewUser({
      ...newUser,
      [e.target.name]: e.target.value
    })

  }

  const postNewUser = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8000/api/echo`, newUser)
      .then(res => {
        console.log("postNewUser res", res);
        axios
          .get('http://localhost:8000/api/users')
          .then(res => {
            console.log("App.js aWA .get res", res);
            setUsers(res.data);
          })
          .catch(err => { console.log(err) });
      })
      .catch(err => {
        console.log(err);
      })
  }


  const editUser = (e, id, user) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8000/api/users/${id}`, user)
      .then(res => {
        console.log("editUser .put res", res);
        setNewUser({
          name: "",
          bio: ''
        })
        axios
          .get('http://localhost:8000/api/users')
          .then(res => {
            console.log("App.js aWA .get res", res);
            setUsers(res.data);
          })
          .catch(err => { console.log(err) });
      })
      .catch(err => { console.log(err) });
  }

  return (
    <div className="App">
      <h1>APP.js</h1>

      <form id="new-user-form" action="">
        <input
          onChange={handleChanges}
          placeholder="New User" type="text" name="name" />
        <textarea
          onChange={handleChanges}
          placeholder="Bio" type="text" name="bio" />
        <button onClick={postNewUser} >Submit New User</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="user-card">
          <h1>{user.name}</h1>
          {isEditing && isId === user.id && (
            <input
              id={user.id}
              placeholder="Edit Name"
              name="name"
              type="text"
              onChange={handleChanges}

            />

          )}
          <p>{user.bio}</p>
          {isEditing && isId === user.id && (
            <input id={user.id}
              placeholder="Edit Bio"
              name="bio"
              type="text"
              onChange={handleChanges}

            />
          )}
          <div className="action-btns">
            {!isEditing && (
              <button onClick={() => {
                setIsEditing(true)
                setIsId(user.id)
                setNewUser(user);
              }

              }>Edit</button>
            )}
            {isEditing && isId === user.id && (
              <div className="editing-btns">
                <button onClick={(e) => {
                  setIsEditing(false)
                  editUser(e, user.id, newUser)
                }
                }>Submit Changes</button>
                <button
                  onClick={(e) => {
                    setIsEditing(false)

                  }
                  }
                >Cancel</button>
              </div>

            )}

            <button
              onClick={() => deleteUser(user.id)}
            >Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
