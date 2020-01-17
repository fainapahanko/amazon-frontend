import React from 'react';
import "../index.css"
import Succes from './Alerts/Succes'
import Error from './Alerts/Error'
import {Container} from 'reactstrap'
import { DotLoader } from 'react-spinners';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
const override = {
    position: "absolute",
    top: "30%",
    left: "40%"
}

class AddProduct extends React.Component {
    state = { 
        obj: {},
        succes: undefined,
        isLoading: true
    }
    handleChange = (e)  => {
        e.preventDefault()
        if(e.target.id === "imageUrl"){
            let file = e.target.files[0]
            this.setState({
                file: file
            })
        }else {
            this.setState({
                obj: Object.assign(this.state.obj, {[e.target.id]:e.target.value})
            })
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }

    addProduct = async(e) => {
        e.preventDefault()
        console.log(this.state)
        let formData = new FormData()
        const file = this.state.file
        formData.append("imageUrl", file)
        formData.append("name", this.state.obj.name)
        formData.append("description", this.state.obj.description)
        formData.append("brand", this.state.obj.brand)
        formData.append("price", this.state.obj.price)
        formData.append("category", this.state.obj.category)
        let response = await fetch("http://localhost:4400/products",{
            method: "POST",
            body: formData
        })
        if(response.ok) {
            setTimeout(() => {
                this.setState({
                    succes: true,
                    isLoading: false
                })
            }, 1000);
        } else {
            setTimeout(() => {
                this.setState({
                    succes: false,
                    isLoading: false
                })
            }, 1000);
        }
        return response.json()
    }
    render() { 
        return ( 
            <Container fluid style={{backgroundColor: "#D7E1E9", minHeight: "100vh", padding: "50px 300px"}} >
                {this.state.isLoading ? <div style={override}><div><h2 className="loader-title">AMAZON</h2></div><DotLoader size={70} style={{marginLeft: "150px"}} color={'#FF2970'} /></div> :<div style={{fontSize: "24px"}}>
            <Form onSubmit={this.addProduct}>
            <FormGroup>
                <Label for="exampleEmail">Product name</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="text" id="name" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Product description</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="text" id="description" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleEmail">Product brand</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="text" id="brand" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Price</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="text" id="price" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Image</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="file" id="imageUrl" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Choose category</Label>
                <Input onChange={this.handleChange} required type="select" id="category">
                    <option>kids</option>
                    <option>smartphones</option>
                    <option>books</option>
                    <option>clothes</option>
                </Input>
            </FormGroup>
            <Button type="submit">Submit</Button>
            </Form>
            {this.state.succes === undefined ? <></> : this.state.succes === true ? <Succes /> : <Error />}
            </div>}
            </Container>
        );
    }
}
 
export default AddProduct;