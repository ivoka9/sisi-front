import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import AllOrders from "./AllOrders";
import MainVeiw from "../UserPannel/MainView";
import NewProduct from "./NewProduct";
import Login from "./Login";

export default class AdminMainView extends Component {
  state = {
    activeItem: "Login",
    activeBlock: "Login",
    admin: true,
    token: localStorage.getItem("token") || null,
    username: localStorage.getItem("username") || null,
  };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, activeBlock: name });
  };

  handleLogin = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("username", e.target.username.value);
    data.append("password", e.target.password.value);
    const res = await fetch(process.env.REACT_APP_URL + "user/login", {
      method: "POST",
      body: data,
    });
    if (res.status === 200) {
      const res_json = await res.json();
      this.setState({
        username: res_json.username,
        activeItem: "Main",
        activeBlock: "Main",
      });
      localStorage.setItem("token", res_json.token);
      localStorage.setItem("username", res_json.username);
    } else if (res.status === 401) {
      this.setState({
        activeItem: "Login",
        activeBlock: "Login",
      });
    }
  };

  handleActiveBlock = (block) => {
    switch (block) {
      case "Main":
        return <MainVeiw admin={true} token={this.state.token} />;
      case "New":
        return (
          <NewProduct
            history={() => {
              this.setState({ activeBlock: "Main", activeItem: "Main" });
            }}
          />
        );
      case "Orders":
        return <AllOrders token={this.state.token} />;
      case "Login":
        return <Login login={this.handleLogin} />;
      case "Logout":
        return localStorage.clear(), this.handleActiveBlock("Main");
      default:
        return null;
    }
  };

  render() {
    const { activeItem } = this.state;
    const { activeBlock } = this.state;

    return (
      <div>
        <Menu fluid tabular>
          <Menu.Menu position="left">
            <Menu.Item
              name={this.state.username ? this.state.username : null}
            />
          </Menu.Menu>
          <Menu.Menu position="right">
            <Menu.Item
              name="Main"
              active={activeItem === "Main"}
              onClick={this.handleItemClick}
              color={activeItem === "Main" ? "green" : "black"}
            />
            <Menu.Item
              name="New"
              active={activeItem === "New"}
              onClick={this.handleItemClick}
              color={activeItem === "New" ? "green" : "black"}
            />
            <Menu.Item
              name="Orders"
              active={activeItem === "Orders"}
              onClick={this.handleItemClick}
              color={activeItem === "Orders" ? "green" : "black"}
            />
            {this.state.username ? (
              <Menu.Item
                name="Logout"
                active={activeItem === "Logout"}
                onClick={() => {
                  localStorage.clear();
                  this.setState({
                    activeBlock: "Main",
                    username: null,
                    activeItem: "Main",
                  });
                }}
                color={activeItem === "Logout" ? "green" : "black"}
              />
            ) : (
              <Menu.Item
                name="Login"
                active={activeItem === "Login"}
                onClick={this.handleItemClick}
                color={activeItem === "Login" ? "green" : "black"}
              />
            )}
          </Menu.Menu>
        </Menu>
        {this.handleActiveBlock(activeBlock)}
      </div>
    );
  }
}
