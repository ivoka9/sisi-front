import React from "react";
import { Link } from "react-router-dom";

function Card(props) {
  const isAdmin = props.admin;

  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <Link to={props.id}>
        <div className="card h-100">
          <img className="card-img-top" alt="Item" src={props.img[0]} />
          <div className="card-body">
            <h4 className="card-title">{props.name}</h4>
            <p className="card-text">$ {props.price}</p>
          </div>

          {isAdmin ? (
            <button
              id={props.id}
              onClick={props.handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
          ) : null}
        </div>
      </Link>
    </div>
  );
}

export default Card;
