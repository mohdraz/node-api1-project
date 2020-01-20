import React, { Component } from "react";
import axios from "axios";
import UserCard from "./UserCard";
export default class UserList extends Component {
  constructor(props) {
    super(props);
    console.log("props: ", this.props);
  }

  render() {
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>user lists</h2>
        {this.props.userList.map(user => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    );
  }
}

// handleDelete={this.handleDelete}
