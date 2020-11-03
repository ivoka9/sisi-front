import React from "react";

function Login(props) {
  return (
    <div>
      <form onSubmit={props.login}>
        <input type="text" name="username"></input>
        <input type="text" name="password"></input>
        <button type="submit">submit</button>
      </form>
    </div>
  );
}

export default Login;
