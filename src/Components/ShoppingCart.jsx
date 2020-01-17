import React from 'react';
import { Container, Row } from 'reactstrap'
import SingleProduct from './SingleProduct';

class ShoppingCart extends React.Component {
    state = {  }
    componentDidMount = () => {
        console.log(this.props)
    }
    render() { 
        return ( 
            <Container fluid>
                <Row>
                {this.props.shoppingCart && this.props.shoppingCart.map((pr,k) => (<SingleProduct product={pr} key={k} />))}
                </Row>
                <h3>Total: {this.props.total} $</h3>
            </Container>
         );
    }
}
 
export default ShoppingCart;