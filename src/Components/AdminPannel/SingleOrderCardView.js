import React, { useState, useEffect } from "react";
import { Item, Button } from "semantic-ui-react";

function SingleOrderCardView(props) {
  const [information, setInformation] = useState("");
  const [orderDone, setOrderDone] = useState(false);

  useEffect(() => {
    const fetchingData = async () => {
      const url = process.env.REACT_APP_URL+ "admin/order/" + props.id;
      const data = await fetch(url);
      const data_json = await data.json();
      setInformation(data_json.order);
    };
    fetchingData();
  }, [orderDone]);

  const handleSendItem = async () => {
    const url = process.env.REACT_APP_URL+ "order/done/" + props.id;
    await fetch(url, { method: "put" });
    setOrderDone(true);
  };
  if (information === "") return <h1>Loading</h1>;

  return (
    <Item>
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
