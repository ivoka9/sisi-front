import React from "react";
import { Form, Button } from "semantic-ui-react";
class NewProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  handleCloudanaryUpload = async (e) => {
    e.preventDefault();
    const url = process.env.REACT_APP_CLOUD;
    console.log(url);
    let imgArrayUrl = [];
    const files = e.target.images.files;
    for (let i = 0; i < files.length; i++) {
      const data = new FormData();
      data.append("file", files[i]);
      data.append("upload_preset", "sisi_store");
      const res = await fetch(url, {
        method: "POST",
        body: data,
      });
      const data_json = await res.json();
      imgArrayUrl.push(data_json.url);
    }
    return imgArrayUrl;
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ isLoading: true });
    const URL = process.env.REACT_APP_URL + "admin/item/new";
    const data = new FormData();
    data.append("name", e.target.name.value);
    data.append("price", e.target.price.value);
    data.append("description", e.target.description.value);
    data.append("token", localStorage.getItem("token"));
    const imgUrlArray = await this.handleCloudanaryUpload(e);
    data.append("img", imgUrlArray);

    await fetch(URL, { method: "post", body: data });
    this.setState({ isLoading: false });
    this.props.history();
  };

  render() {
    if (this.state.isLoading) return <h1>Creating POST</h1>;
    return (
      <Form size="big" onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Product Name"
            placeholder="Product Name"
            name="name"
          />
          <Form.Input
            fluid
            label="Product Price"
            placeholder="Price"
            name="price"
          />
        </Form.Group>
        <Form.TextArea
          label="Descripiton"
          placeholder="Product Description"
          name="description"
        />
        <Form.Input label="Product Images" name="images" type="file" multiple />
        <Form.Field>
          <Button type="submit" positive fluid>
            Add New Product
          </Button>
        </Form.Field>
      </Form>
    );
  }
}

export default NewProduct;
