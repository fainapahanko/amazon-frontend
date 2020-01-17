import React from 'react';
import {Container, Row, Col, Button, Input, Form, FormGroup, Label} from 'reactstrap'
import { DotLoader } from 'react-spinners';
import { withRouter} from 'react-router-dom'
import Comment from './Comment'
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
        comment: {},
        comments: [],
        isLoading: true,
        obj: {},
     }
    componentDidMount = () => {
        setTimeout(() => {
            this.fetchProduct()
            this.fetchComments()
        }, 1500);
    }
    handleChange = (e) => {
        e.preventDefault()
        if(e.target.id ===  "rate") {
            this.setState({
                comment: Object.assign(this.state.comment, {[e.target.id]:parseInt(e.target.value)} )
            })
        } else {
            this.setState({
                comment: Object.assign(this.state.comment, {[e.target.id]:e.target.value} )
            })
        }
    }
    handleSubmit = async(e) => {
        e.preventDefault()
        console.log(this.state.comment)
        try{
            let response = await fetch(`http://localhost:4400/reviews/${this.props.match.params.id}`,{
                method: "POST",
                body: JSON.stringify(this.state.comment),
                headers: {
                    "content-type": "application/json"
                }
            })
            this.fetchComments()
            return response.json()
        } catch(err){
            console.log(err)
        } 
    }
    fetchProduct = async()=>{
        let response = await fetch("http://localhost:4400/products/" + this.props.match.params.id, {
            method: "GET"
        })
        let product = await response.json()
        this.setState({
            product: product,
            isLoading: false,
        })
        console.log(this.state)
    }
    deleteProduct = async() => {
        try{
            let response = await fetch(`http://localhost:4400/products/${this.props.match.params.id}`, {
                method: "DELETE"
            })
            return response
        } catch(err){
            console.log(err)
        }
    }
    fetchComments = async() => {
        let response = await fetch(`http://localhost:4400/products/${this.props.match.params.id}/reviews`,{
            method: "GET"
        })
        let comment = await response.json()
        this.setState({
            comments: comment
        })
        console.log(this.state.comments)
    }
    render() { 
        return ( 
            <Container fluid style={{backgroundColor: "#D7E1E9", minHeight: "100vh", padding: "50px 100px"}} >
                {this.state.isLoading ? <div style={override}><div><h2 className="loader-title">AMAZON</h2></div><DotLoader size={70} style={{marginLeft: "150px"}} color={'#FF2970'} /></div>  : 
                <Row>
                    <Col md="5">
                        <img src={this.state.product.imageurl} width="100%" alt=""/>
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
                    <Col md="12">
                        <h1 className="mt-4" style={{fontSize: "24px"}}> Add Comment</h1>
                        <Form onSubmit={this.handleSubmit}>
                        <FormGroup>
                        <Label for="Comments">Rate</Label>
                        <Input onChange={this.handleChange} type="select" id="rate" placeholder="Enter your comments">
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        </Input>
                      </FormGroup>
                      <FormGroup>
                        <Label for="rating">Comment</Label>
                        <Input onChange={this.handleChange} type="text" id="comment" />
                      </FormGroup>
                      <Button type="submit">Submit</Button>
                      </Form>
                      </Col>
                      <Col md="12">
                        {this.state.comments && this.state.comments.map((c,i) =>  <Comment key={i} comment={c} />)}
                      </Col>
                    </Row>}
            </Container>
         );
    }
}
 
export default withRouter(SpecificProduct);