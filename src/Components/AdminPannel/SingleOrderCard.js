import React from "react";
import { Card, Button } from "semantic-ui-react";

function SingleOrderCard(props) {
  return (
    <Card className="mx-auto mt-5">
      <Card.Content>
        <Card.Header>{props.name}</Card.Header>
        <Card.Description>{props.address}</Card.Description>
        <Card.Description textAlign="center">
          <div className="ui div mt-3">
            {props.done ? (
              <Button id={props.id} onClick={props.handleSingleOrder} positive>
                See Details
              </Button>
            ) : (
              <Button id={props.id} onClick={props.handleSingleOrder} negative>
                See Details
              </Button>
            )}
          </div>
        </Card.Description>
      </Card.Content>
    </Card>
  );
}

export default SingleOrderCard;
