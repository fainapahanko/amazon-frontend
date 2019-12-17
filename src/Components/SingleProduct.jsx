import React from 'react';
import {Link} from 'react-router-dom'
import {
    Card, CardImg, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
  import "../index.css"

class SingleProduct extends React.Component {
    state = {  }
    render() { 
        return ( 
            <div className="box">
            <Card>
              <Link to={"/details/" + this.props.book.asin} style={{ textDecoration: 'none' , color: "black"}}>
              <CardImg top width="100%" src={this.props.book.img} alt="Card image cap" />
              <CardBody>
                <CardTitle>{this.props.book.title}</CardTitle>
                <CardSubtitle>{this.props.book.price}$</CardSubtitle>
                <Button>Buy</Button>
              </CardBody>
              </Link>
            </Card>
          </div>
        );
    }
}
 
export default SingleProduct;