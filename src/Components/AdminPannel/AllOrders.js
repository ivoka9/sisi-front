import React, { useEffect, useState } from "react";
import SingleOrderCard from "./SingleOrderCard";
import SingleOrderCardView from './SingleOrderCardView'
import { Card } from "semantic-ui-react";

function AllOrders(props) {
  const [orders, setOrders] = useState("");
  const [singleOrder, setSingleOrder] = useState(false);

  useEffect(() => {
    fetchingData();
    async function fetchingData() {
      const url = process.env.REACT_APP_URL +"admin/orders";
      const data = await fetch(url);
      const data_json = await data.json();
      setOrders(data_json.orders);
    }
  }, []);

  const handleSingleOrder = (e, { id }) => {
    setSingleOrder(id);
  };

  if (orders === "") {
    return <h1>Order</h1>;
  }
  if (singleOrder) {
    return <SingleOrderCardView id={singleOrder}/>;
  }
  const singleOrders = orders.map((order) => {
    return (
      <SingleOrderCard
        key={order._id}
        id={order._id}
        name={order.nameOfBuyer}
        address={`${order.street} ${order.state} ${order.zip} `}
        done={order.done}
        handleSingleOrder={handleSingleOrder}
      />
    );
  });
  return <Card.Group>{singleOrders}</Card.Group>;
}

export default AllOrders;
