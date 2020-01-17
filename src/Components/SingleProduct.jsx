import React from 'react';
import {Link} from 'react-router-dom'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import "../index.css"

class SingleProduct extends React.Component {
    state = {  }
    addToCartSingle = () => {
      this.props.addToCart(this.props.product.price)
    }
    render() { 
        return ( 
            <div className="box">
            <Card>
              <Link to={"/details/" + this.props.product._id} style={{ textDecoration: 'none' , color: "black"}}>
              <CardImg top width="100%" src={this.props.product.imageurl} alt="Card image cap" />
              </Link>
              <CardBody>
                <CardTitle>{this.props.product.name}</CardTitle>
                <CardSubtitle>{this.props.product.price}$</CardSubtitle>
                <Button onClick={this.addToCartSingle}>Buy</Button>
              </CardBody>
            </Card>
          </div>
        );
    }
}
 
export default SingleProduct;