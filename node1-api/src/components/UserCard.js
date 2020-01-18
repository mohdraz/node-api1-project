import React from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Card, CardTitle, CardText } from "reactstrap";

export default function UserCard(props) {
  const { name, bio } = props.user;

  const handleDelete = e => {
    e.preventDefault();
    let id = props.user.id;
    axios
      .delete(`http://localhost:5000/api/users/${id}`)
      .then(res => {
        console.log("deleted user", res);
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="card">
      <Card>
        <CardTitle>{name}</CardTitle>
        <CardText> {bio} </CardText>
        <button onClick={handleDelete}>Delete</button>

        <button onClick={() => <Redirect to="/add-user" />}>Edit</button>
      </Card>
    </div>
  );
}
