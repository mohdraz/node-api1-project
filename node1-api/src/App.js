import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Link } from "react-router-dom";

import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

import logo from "./logo.svg";
import "./index.scss";

function App() {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users")
      .then(res => {
        setUserList(res.data);
      })
      .catch(err => console.log(err));
  }, []);
  return (
    <main>
      <div className="app">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Node1 API</h1>
        </header>
      </div>
      <section className="navBar">
        <Link to="/">User List</Link>
        <Link to="/add-user">Add User</Link>
      </section>
      <section className="content">
        <Route
          exact
          path="/"
          render={props => <UserList {...props} userList={userList} />}
        />

        <Route exact path="/add-user" component={AddUser} />
      </section>
    </main>
  );
}

export default App;
