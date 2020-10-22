import React from "react";
import Card from "./Card";

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
    const URL = "https://sisi-api-store.herokuapp.com/";
    const data = await fetch(URL);
    const data_json = await data.json();
    this.setState({
      cards: data_json.allItems,
      loading: false,
    });
  }

  handleDelete = async (e) => {
    e.preventDefault();
    const url =
      "https://sisi-api-store.herokuapp.com/admin/item/delete/" + e.target.id;
    await fetch(url, { method: "DELETE" });
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
        <header className="jumbotron my-4">
          <h1 className="display-3">A Warm Welcome!</h1>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa,
            ipsam, eligendi, in quo sunt possimus non incidunt odit vero aliquid
            similique quaerat nam nobis illo aspernatur vitae fugiat numquam
            repellat.
          </p>
        </header>
        <div className="row text-center">{Cards}</div>
      </div>
    );
  }
}

export default MainView;
