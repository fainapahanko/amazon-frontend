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
        books: [],
        backgroundColor: "#D7E1E9",
        filtered: undefined
    }
    componentDidMount = () => {
        setTimeout(() => {
            this.fetchProducts()
        }, 1500);
    }
    handleChange = (e) => {
        e.preventDefault()
        this.setState({
            isLoading: true,
            backgroundColor: "#D7E1E9",
        })
        const booksFiltered = this.state.books.filter(book => book.category === e.target.value)
        setTimeout(() => {
            this.setState({
            isLoading: false,
            filtered: booksFiltered,
            backgroundColor: "#D7E1E9",
            })
        }, 1000)
    }
    fetchProducts = async() => {
        this.setState({
            backgroundColor: "white",
        })
        let response = await fetch("https://amazon-be.herokuapp.com/books",{
            method: "GET"
        })
        let books = await response.json()
        this.setState({
            books: books,
            isLoading: false,
            backgroundColor: "#D7E1E9",
        }) 
    }
    render() { 
        return (
            <Container fluid style={{backgroundColor: this.state.backgroundColor}}>
            { this.state.isLoading ? 
                    <div style={override}><div><h2 className="loader-title">AMAZON</h2></div><DotLoader size={70} style={{marginLeft: "150px"}} color={'#FF2970'} /></div> 
                                    : 
                    this.state.filtered ? 
                    <><div style={{display: "block",  padding: "50px 200px"}} className="px-4"> <Label for="exampleSelect">Select category</Label>
                     <Input onChange={this.handleChange} type="select" name="select" id="exampleSelect">
                     <option>scifi</option>
                    <option>romance</option>
                    <option>horror</option>
                    <option>history</option>
                    <option>fantasy</option>
                    </Input> 
                    </div> <div className="main-container"> {this.state.filtered.map((pr, i) => <SingleProduct book={pr} key={i} /> )} </div></>
                                    : 
                    <><div style={{display: "block", padding: "50px 200px"}}> <Label for="exampleSelect">Select category</Label>
                     <Input onChange={this.handleChange} type="select" name="select" id="exampleSelect">
                    <option>scifi</option>
                    <option>romance</option>
                    <option>horror</option>
                    <option>history</option>
                    <option>fantasy</option>
                    </Input> 
                    </div> <div className="main-container"> {this.state.books.map((pr, i) => <SingleProduct book={pr} key={i} />)}</div>
        </>}
            </Container> 
        );
    }
}
 
export default Main;