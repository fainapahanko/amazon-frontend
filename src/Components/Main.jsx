import React from "react";
import { DotLoader } from "react-spinners";
import { Container, Label, Input } from "reactstrap";
import SingleProduct from "./SingleProduct";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import "../index.css";
const override = {
  position: "absolute",
  top: "30%",
  left: "40%"
};

class Main extends React.Component {
  state = {
    isLoading: true,
    loadingPr: false,
    products: [],
    items: 0,
    total: 0,
    backgroundColor: "#D7E1E9",
    filtered: undefined
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.fetchProducts();
    }, 1500);
  };
  handleChange = async e => {
    e.preventDefault();
    console.log("i'm here!");
    if (e.target.value === "all") {
      console.log("i'm here!");
      let response = await fetch("http://localhost:4400/products", {
        method: "GET"
      });
      const products = await response.json();
      this.setState({
        products: products.products
      });
    } else {
      console.log("i'm here!");
      let response = await fetch(
        "http://localhost:4400/products?category=" + e.target.value,
        {
          method: "GET"
        }
      );
      const products = await response.json();
      this.setState({
        products: products.products
      });
    }
  };
  fetchProducts = async () => {
    this.setState({
      backgroundColor: "white"
    });
    let response = await fetch("http://localhost:4400/products", {
      method: "GET"
    });
    let products = await response.json();
    //console.log(products)
    this.setState({
      products: products.products,
      isLoading: false,
      backgroundColor: "#D7E1E9"
    });
  };
  addToCart = price => {
    this.setState({
      items: this.state.items + 1,
      total: this.state.total + price
    });
  };
  render() {
    return (
      <Container fluid style={{ backgroundColor: this.state.backgroundColor }}>
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "30px",
            zIndex: "1030",
            fontSize: "25px",
            color: "white"
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> {this.state.items} items for
          {this.state.total} $
        </div>
        {this.state.isLoading ? (
          <div style={override}>
            <div>
              <h2 className="loader-title">AMAZON</h2>
            </div>
            <DotLoader
              size={70}
              style={{ marginLeft: "150px" }}
              color={"#FF2970"}
            />
          </div>
        ) : (
          <>
            <>
              <div
                style={{ display: "block", padding: "50px 200px" }}
                className="px-4"
              >
                {" "}
                <Label for="exampleSelect">Select category</Label>
                <Input
                  onChange={this.handleChange}
                  type="select"
                  name="select"
                  id="exampleSelect"
                >
                  <option>all</option>
                  <option>kids</option>
                  <option>smartphones</option>
                  <option>books</option>
                  <option>clothes</option>
                </Input>
              </div>
            </>
            {this.state.loadingPr && (
              <div>
                <DotLoader
                  size={70}
                  style={{ marginLeft: "500px" }}
                  color={"#FF2970"}
                />
              </div>
            )}
            {this.state.filtered ? (
              <div className="main-container">
                {" "}
                {this.state.filtered.map((pr, i) => (
                  <SingleProduct book={pr} key={i} />
                ))}{" "}
              </div>
            ) : (
              <div className="main-container">
                {" "}
                {this.state.products.map((pr, i) => (
                  <SingleProduct
                    addToCart={this.addToCart}
                    product={pr}
                    key={i}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </Container>
    );
  }
}

export default withRouter(Main);
