import React, { useState, useEffect } from "react";
import { Item, Button } from "semantic-ui-react";
import "../../Css/SingleOrderCardView.css";
import Ops from "../../Css/Ops.jpg";

function SingleOrderCardView(props) {
  const [information, setInformation] = useState("");
  const [orderDone, setOrderDone] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      const url = process.env.REACT_APP_URL + "admin/order/" + props.id;
      const data = await fetch(url);
      const data_json = await data.json();
      console.log(data_json.order.items[0]);
      if (data_json.order.items[0]) {
        setInformation(data_json.order);
      } else {
        setInformation("Item deleted");
      }
    };
    fetchingData();
  }, [orderDone]);

  const handleSendItem = async () => {
    const url = process.env.REACT_APP_URL + "order/done/" + props.id;
    const data = new FormData();
    data.append("token", localStorage.getItem("token"));
    await fetch(url, { method: "put", body: data });
    setOrderDone(true);
  };
  if (information === "") return <h1>Loading</h1>;
  if (information === "Item deleted")
    return (
      <div className="background">
        <img src={Ops}></img>
        <h1 className="middle">Opps Sorry but the item was deleted</h1>
      </div>
    );
  return (
    <Item className="m-2">
      <Item.Image size="large" src={information.items[0].img[0]} />

      <Item.Content>
        <Item.Header>{information.nameOfBuyer}</Item.Header>
        <Item.Meta>{`${information.street} ${information.state} ${information.zip} `}</Item.Meta>
        <Item.Description>{information.items[0].name}</Item.Description>
        <Item.Extra>${information.items[0].price}</Item.Extra>
        {information.done ? (
          <Button disabled>Was Send</Button>
        ) : (
          <Button positive onClick={handleSendItem}>
            Send it
          </Button>
        )}
      </Item.Content>
    </Item>
  );
}

export default SingleOrderCardView;
