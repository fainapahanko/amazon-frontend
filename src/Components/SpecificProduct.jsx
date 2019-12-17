import React from 'react';
import {Container, Row, Col, Button, Input, Form, FormGroup, Label} from 'reactstrap'
import { DotLoader } from 'react-spinners';
import { withRouter} from 'react-router-dom'
const override = {
    position: "absolute",
    top: "30%",
    left: "40%"
}

const divStyle = {
    width: "100%",
    minHeight: "60px",
    backgroundColor: "white",
    fontSize: "20px",
}

class SpecificProduct extends React.Component {
    state = { 
        product: {},
        isLoading: true,
        obj: {},
     }
    componentDidMount = () => {
        console.log(this.props.match.params.id)
        setTimeout(() => {
            this.fetchProduct()
        }, 1500);
    }
    // addComment = async() => {
    //     this.setState({
    //         isLoading: true
    //     })
    //     let response = await fetch("http://localhost:4000/reviews",{
    //         method: "POST",
    //         body: JSON.stringify(this.state.obj),
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     return response.json()
    // }
    fetchProduct = async()=>{
        let response = await fetch("http://localhost:4000/books/" + this.props.match.params.id, {
            method: "GET"
        })
        let product = await response.json()
        this.setState({
            product: product,
            isLoading: false,
        })
        console.log(this.state)
    }
    render() { 
        return ( 
            <Container fluid style={{backgroundColor: "#D7E1E9", minHeight: "100vh", padding: "50px 100px"}} >
                {this.state.isLoading ? <div style={override}><div><h2 className="loader-title">AMAZON</h2></div><DotLoader size={70} style={{marginLeft: "150px"}} color={'#FF2970'} /></div>  : 
                <Row>
                    <Col md="5">
                        <img src={this.state.product.img} width="100%" alt=""/>
                    </Col>
                    <Col md="7">
                       <div style={divStyle} className="mb-3 px-3">
                           <p>{this.state.product.title}</p>
                       </div>
                       <div style={divStyle} className="my-3 px-3">
                           <p>{this.state.product.price}</p>
                       </div>
                       <div style={divStyle} className="my-3 px-3">
                           <p>{this.state.product.asin}</p>
                       </div>
                       <div>
                           <Button>Update</Button>
                        </div>
                    </Col>
                    <Col md="12">
                        <Form>
                        <h1> Add Comments</h1>
                        <FormGroup>
                        <Label for="Comments">Comments</Label>
                        <Input type="text" name="comments" id="Comments" placeholder="Enter your comments" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="rating">Rate</Label>
                        <Input type="select" name="select" id="RateSelect">
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                      <Button type="submit">Submit</Button>
                      </Form>
                      </Col>
                    </Row>}
            </Container>
         );
    }
}
 
export default withRouter(SpecificProduct);