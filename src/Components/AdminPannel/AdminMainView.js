import React, { Component } from "react";
import { Menu, Segment } from "semantic-ui-react";
import AllOrders from "./AllOrders";
import MainVeiw from "../UserPannel/MainView";
import NewProduct from "./NewProduct";

export default class AdminMainView extends Component {
  state = { activeItem: "Main", activeBlock: "Main", admin: true };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name, activeBlock: name });
  };

  handleActiveBlock = (block) => {
    switch (block) {
      case "Main":
        return <MainVeiw admin={true} />;
      case "New":
        return (
          <NewProduct
            history={() => {
              this.setState({ activeBlock: "Main", activeItem: "Main" });
            }}
          />
        );
      case "Orders":
        return <AllOrders />;
      default:
        return null
    }
  };

  render() {
    const { activeItem } = this.state;
    const { activeBlock } = this.state;

    return (
      <div>
        <Menu fluid tabular>
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
          </Menu.Menu>
        </Menu>
        <Segment attached="top">{this.handleActiveBlock(activeBlock)}</Segment>
      </div>
    );
  }
}
