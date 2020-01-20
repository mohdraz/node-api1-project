import React from "react";
import axios from "axios";
import { Form, Field, withFormik } from "formik";

function AddUser() {
  return (
    <Form className="addUser">
      <Field type="text" name="user" placeholder="user" />
      <Field type="text" name="bio" placeholder="bio" />
      <button>Submit</button>
    </Form>
  );
}

const FormikAddUser = withFormik({
  mapPropsToValues({ user, bio }) {
    return {
      user: user || "",
      bio: bio || ""
    };
  },

  handleSubmit(values, { props }) {
    console.log("values: ", values);
    axios
      .post("http://localhost:5000/api/users/", {
        user: values.user,
        bio: values.bio
      })
      .then(res => {
        console.log("user submitted", res);
        props.history.push("/");
      })
      .catch(err => console.log(err));
  }
})(AddUser);

export default FormikAddUser;
