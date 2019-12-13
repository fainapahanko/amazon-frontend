import React from 'react'
import { DotLoader } from 'react-spinners';
import { Container, Label, Input } from 'reactstrap'
import SingleProduct from './SingleProduct'
import "../index.css"
const override = {
    position: "absolute",
    top: "30%",
    left: "40%"
}

 

class Main extends React.Component {
    state = { 
        isLoading: true,
        products: [],
        backgroundColor: "white"
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.fetchProducts()
        }, 1500);
    }
    fetchProducts = async() => {
        let response = await fetch("http://localhost:4000/products",{
            method: "GET"
        })
        let products = await response.json()
        this.setState({
            products: products,
            isLoading: false,
            backgroundColor: "#D7E1E9"
        }) 
    }
    render() { 
        return (
            <Container fluid className="main-container" style={{backgroundColor: this.state.backgroundColor}}>
            {this.state.isLoading ? <div style={override}><div><h2 className="loader-title">AMAZON</h2></div><DotLoader size={70} style={{marginLeft: "150px"}} color={'#FF2970'} /></div> : this.state.products && <>  <div> <Label for="exampleSelect">Select</Label>
        <Input type="select" name="select" id="exampleSelect">
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </Input> </div>  {this.state.products.map((pr, i) => <SingleProduct product={pr} key={i} />)}</>}
            </Container> 
        );
    }
}
 
export default Main;