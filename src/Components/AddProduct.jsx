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
            this.state.file = file
            console.log(this.state)
        }else {
            this.state.obj[e.target.id] = e.target.value
        }
    }

    componentDidMount = () => {
        setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 1000);
    }

    addProduct = async() => {
        console.log(this.state)
        let formData = new FormData()
        const file = this.state.file
        formData.append("image", file)
        this.setState({
            isLoading: true
        })
        console.log(this.state.obj)
        let response = await fetch("http://localhost:4000/books",{
            method: "POST",
            body: JSON.stringify(this.state.obj),
            headers: {
                'Content-Type': 'application/json',
            },
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
        console.log(this.state)
        return response.json()
    }
    render() { 
        return ( 
            <Container fluid style={{backgroundColor: "#D7E1E9", minHeight: "100vh", padding: "50px 300px"}} >
                {this.state.isLoading ? <div style={override}><div><h2 className="loader-title">AMAZON</h2></div><DotLoader size={70} style={{marginLeft: "150px"}} color={'#FF2970'} /></div> :<div style={{fontSize: "24px"}}>
            <Form onSubmit={this.addProduct}>
            <FormGroup>
                <Label for="exampleEmail">Name of product</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="text" id="name" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Brand</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="text" id="brand" />
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">Description</Label>
                <Input onChange={this.handleChange} required style={{height: "250px"}} type="text" id="description" />
            </FormGroup>
            <FormGroup>
                <Label for="exampleSelect">Choose category</Label>
                <Input onChange={this.handleChange} required type="select" id="category">
                    <option>scifi</option>
                    <option>romance</option>
                    <option>horror</option>
                    <option>history</option>
                    <option>fantasy</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label for="examplePassword">ImageURL</Label>
                <Input onChange={this.handleChange} required style={{height: "50px"}} type="file" id="imageUrl" />
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