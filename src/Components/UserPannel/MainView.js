import React from "react";
import Card from "./Card";
import "../../Css/MainView.css";

class MainView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: null,
      loading: true,
      admin: props.admin,
      update: true,
    };
  }

  async componentDidMount() {
    const URL = process.env.REACT_APP_URL;
    const data = await fetch(URL);
    const data_json = await data.json();
    this.setState({
      cards: data_json.allItems,
      loading: false,
    });
  }

  handleDelete = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_URL + "admin/item/delete/" + e.target.id;
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    await fetch(url, { method: "DELETE", body: data });
    this.componentDidMount();
  };

  render() {
    if (this.state.loading) {
      return <h3>loading</h3>;
    }
    const Cards = this.state.cards.map((element) => (
      <Card
        name={element.name}
        price={element.price}
        img={element.img}
        id={element._id}
        key={element._id}
        admin={this.props.admin}
        handleDelete={this.handleDelete}
      ></Card>
    ));
    return (
      <div className="container">
        <header className="jumbotron my-4 img">
          <h1 className="display-3">Buy ! </h1>
          <p className="lead">Super Cool Shop</p>
        </header>
        <div className="row text-center">{Cards}</div>
      </div>
    );
  }
}

export default MainView;
