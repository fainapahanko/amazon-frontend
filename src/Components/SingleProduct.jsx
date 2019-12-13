import React from 'react';
import {Link} from 'react-router-dom'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import "../index.css"

class SingleProduct extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="box">
            <Card>
              <Link to={"/details/" + this.props.product._id} style={{ textDecoration: 'none' , color: "black"}}>
              <CardImg top width="100%" src={this.props.product.imageUrl} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.product.name}</CardTitle>
                <CardSubtitle>{this.props.product.brand}</CardSubtitle>
                <CardText>{this.props.product.description} </CardText>
                <Button>Buy</Button>
              </CardBody>
              </Link>
            </Card>
          </div>
        );
    }
}
 
export default SingleProduct;