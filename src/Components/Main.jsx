import React from "react";
import { DotLoader } from "react-spinners";
// import { Link } from "react-router-dom";
import {
  Container,
  Label,
  Input,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";
import SingleProduct from "./SingleProduct";
import { withRouter } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
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
    productsTotal: [],
    items: 0,
    total: 0,
    backgroundColor: "#D7E1E9",
    filtered: undefined
  };
  handlePageChange = async pageNumber => {
    // let skip = pageNumber
    // if(pageNumber == 1){
    //     skip = 0
    // } else {
    //     skip = pageNumber -1
    // }
    //limit = 2 soooooo first skip 0, second =2, third
    // 1,2,3 1 => 0, 2 => 2, 3 => 4,4 = 6, 5 = 8, 6 = 9, 7 = 11
    //if(this.state.filterOptions.limit) limit = this.state.filterOptions.limit
    let offset = (pageNumber - 1) * 4;
    let response = await fetch(
      `http://localhost:4400/products?limit=${4}&offset=${offset}`,
      {
        method: "GET"
      }
    );
    if (response.ok) {
      const products = await response.json();
      this.setState({
        currentProduct: products.products
      });
    }
    // console.log(response.json())
    // const products = await response.json();
    // this.setState({
    //   currentProduct: products.products
    // });
  };
  componentDidMount = () => {
    setTimeout(() => {
      this.fetchProducts();
    }, 1000);
  };
  handleChange = async e => {
    e.preventDefault();
    if (e.target.value === "all") {
      let response = await fetch("http://localhost:4400/products", {
        method: "GET"
      });
      const products = await response.json();
      this.setState({
        products: products.products
      });
    } else {
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
    this.setState({
      products: products.products,
      isLoading: false,
      productsTotal: products.total,
      backgroundColor: "#D7E1E9"
    });
    const numPages = Math.ceil(this.state.productsTotal / 4);
    var arr = [];
    for (var i = 1; i <= numPages; i++) {
      arr.push(i);
    }
    this.setState({
      numberOfPages: arr
    });
  };
//incrementCart = price => {
//     this.setState({
//       items: this.state.items + 1,
//       total: this.state.total + price
//     });
//   };
  render() {
    return (
      <Container fluid style={{ backgroundColor: this.state.backgroundColor }}>
        {/* <Link
          to={`/shoppingCart/${this.state.total}`}
          style={{ textDecoration: "none", color: "black" }}
        >
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
            <FontAwesomeIcon icon={faShoppingCart} /> {this.state.items} items
            for {this.state.total}$
          </div>
        </Link> */}
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
                style={{
                  display: "block",
                  padding: "50px 200px",
                  marginLeft: "30px"
                }}
              >
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
            {this.state.products.length > 0 && (
              <div style={{ marginLeft: "45%" }}>
                <Pagination className="ml-3">
                  {this.state.numberOfPages &&
                    this.state.numberOfPages.map((st, k) => (
                      <PaginationItem className="page-item" key={k}>
                        <PaginationLink
                          style={{
                            color: "black",
                            textDecoration: "none",
                            fontSize: "14px"
                          }}
                          onClick={() => this.handlePageChange(st)}
                        >
                          {st}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                </Pagination>
              </div>
            )}
            {this.state.filtered ? (
              <div className="main-container">
                {this.state.filtered.map((pr, i) => (
                  <SingleProduct
                    addToCart={this.props.addToCart}
                    book={pr}
                    key={i}
                  />
                ))}
              </div>
            ) : this.state.currentProduct ? (
              <div className="main-container">
                {this.state.currentProduct.map((pr, i) => (
                  <SingleProduct
                    addToCart={this.props.addToCart}
                    product={pr}
                    key={i}
                  />
                ))}
              </div>
            ) : (
              <div className="main-container">
                {this.state.products.map((pr, i) => (
                  <SingleProduct
                    addToCart={this.props.addToCart}
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
