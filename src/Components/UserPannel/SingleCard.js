import React from "react";
import { Link } from "react-router-dom";

class SingleCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      loading: true,
      firstImg: null,
    };
  }

  async componentDidMount() {
    const url =
      "https://sisi-api-store.herokuapp.com/" + this.props.match.params.id;
    const data = await fetch(url);
    const data_json = await data.json();
    this.setState({
      data: data_json.showItem,
      loading: false,
      firstImg: data_json.showItem.img[0],
    });
  }

  handleChangeImg = (e) => {
    this.setState({ firstImg: e.target.src });
  };

  render() {
    if (this.state.loading) return <h1>Loading</h1>;
    const { img, name, price, description } = this.state.data;
    const images = img.map((picture, index) => (
      <div key={index} className="col-md-3 col-sm-6 mb-4">
        <img
          key={index}
          alt="item"
          style={{ height: "100px" }}
          onClick={this.handleChangeImg}
          className="img-fluid img-sub"
          src={picture}
        />
      </div>
    ));

    return (
      <div className="container">
        <h1 className="my-4"> {name} </h1>
        <div className="row">
          <div className="col-md-8">
            <img
              alt="main item"
              style={{ height: "200px" }}
              src={this.state.firstImg}
            />
          </div>
          <div className="col-md-4">
            <h3 className="my-3"> ${price}</h3>
            <div className="row mt-3">
              <Link
                to={"/order/" + this.props.match.params.id}
                className="btn btn-lg btn-primary"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
        <div className="row">{images}</div>
        <h3 className="my-3"> Description</h3>
        <p> {description}</p>
      </div>
    );
  }
}

export default SingleCard;
