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
        book: {},
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
        let commentId = e.target.id
        let input = e.target.value
        this.state.comment[commentId] = input
    }
    handleSubmit = async(e) => {
        e.preventDefault()
        let id = this.props.match.params.asin
        console.log(id.toString())
        try{
            let response = await fetch("https://amazon-be.herokuapp.com/comments/" + id.toString(),{
                method: "POST",
                body: JSON.stringify(this.state.comment),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            return response.json()
        } catch(err){
            console.log(err)
        } 
    }
    fetchProduct = async()=>{
        let response = await fetch("https://amazon-be.herokuapp.com/books/" + this.props.match.params.asin, {
            method: "GET"
        })
        let product = await response.json()
        this.setState({
            book: product,
            isLoading: false,
        })
        console.log(this.state)
    }
    fetchComments = async() => {
        let id = this.props.match.params.asin
        let response = await fetch("https://amazon-be.herokuapp.com/comments/" + id.toString(),{
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
                        <img src={this.state.book.img} width="100%" alt=""/>
                    </Col>
                    <Col md="7">
                       <div style={divStyle} className="mb-3 px-3">
                           <p>Book title: {this.state.book.title}</p>
                       </div>
                       <div style={divStyle} className="my-3 px-3">
                           <p>Price: {this.state.book.price} $</p>
                       </div>
                       <div style={divStyle} className="my-3 px-3">
                           <p>Book asin: {this.state.book.asin}</p>
                       </div>
                       <div>
                           <Button>Update</Button>
                        </div>
                    </Col>
                    <Col md="12">
                        <Form onSubmit={this.handleSubmit}>
                        <h1> Add Comments</h1>
                        <FormGroup>
                        <Label for="Comments">User name</Label>
                        <Input onChange={this.handleChange} type="text" name="comments" id="userName" placeholder="Enter your comments" />
                      </FormGroup>
                      <FormGroup>
                        <Label for="rating">Comment</Label>
                        <Input onChange={this.handleChange} type="text" name="select" id="text" />
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