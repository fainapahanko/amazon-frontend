import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./NavigationBar";
import ShoppingCart from "./ShoppingCart";
import AddProduct from "./AddProduct";
import Main from "./Main";
import SpecificProduct from "./SpecificProduct";
import "../index.css";

class App extends React.Component {
  state = {
    shoppingCart: [],
    total: 0,
    items: 0
  };
  addToCart = async(product, price) => {
    //   let shoppingCart = this.state.shoppingCart
    //   let arr = shoppingCart.push(product)
      this.setState(prevState => ({
        shoppingCart: [...prevState.shoppingCart, product],
        items: this.state.items + 1,
        total: this.state.total + price
      }))
  }
  render() {
    return (
      <Router>
        <NavigationBar items={this.state.items} total={this.state.total}/>
        <Switch>
        <Route path="/" exact component={() => <Main addToCart={this.addToCart} />} />
        <Route path="/addProduct" component={AddProduct} />
        <Route path="/shoppingCart" component={() => <ShoppingCart total={this.state.total} shoppingCart={this.state.shoppingCart} />}/>
        <Route path="/details/:id" component={() => <SpecificProduct total={this.state.total} shoppingCart={this.state.shoppingCart}/>}  />
        </Switch>
      </Router>
    );
  }
}

export default App;
