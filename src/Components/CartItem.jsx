import React from "react";
import {Row, Col} from 'reactstrap'

class CartItem extends React.Component {
  state = {};
  render() {
    return (
      <div>
        <Row>
          <Col md="5">
            <img src={this.state.product.imageurl} width="100%" alt="" />
          </Col>
          <Col md="7">
            <div style={divStyle} className="mb-3 px-3">
              <p>Product name: {this.state.product.name}</p>
            </div>
            <div style={divStyle} className="mb-3 px-3">
              <p>Product brand: {this.state.product.brand}</p>
            </div>
            <div style={divStyle} className="my-3 px-3">
              <p>Description: {this.state.product.description} </p>
            </div>
            <div style={divStyle} className="my-3 px-3">
              <p>Category: {this.state.product.category} </p>
            </div>
            <div style={divStyle} className="my-3 px-3">
              <p>Product price: {this.state.product.price} $</p>
            </div>
            <div>
              <Button onClick={this.deleteProduct}>Delete</Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default CartItem;
