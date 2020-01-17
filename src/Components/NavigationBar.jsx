import React from "react";
import { Navbar, NavbarBrand, NavItem, NavLink } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom'
import "../index.css";

class NavigationBar extends React.Component {
  state = {};
  render() {
    return (
      <Navbar
        style={{ paddingLeft: "100px" }}
        color="dark"
        className="sticky-top"
        light
        expand="md"
      >
        <NavbarBrand style={{ fontSize: "30px", color: "white" }} href="/">
          Amazon
        </NavbarBrand>
        <NavItem
          className="ml-5 mt-1"
          style={{ listStyleType: "none", fontSize: "20px" }}
        >
          <NavLink style={{ color: "white" }} href="/addProduct">
            Add product
          </NavLink>
        </NavItem>
        {/* <NavItem className="ml-5 mt-1" style={{listStyleType: "none",fontSize:"20px"}}>
                    <NavLink style={{color: "white"}} href="/addProduct">Reviews</NavLink>
                </NavItem> */}
        <NavItem           className="ml-5 mt-1"
          style={{ listStyleType: "none", fontSize: "20px" }}>
          <Link
            to="/shoppingCart"
            style={{ textDecoration: "none", color: "white", fontSize: "25px" }}
          >

              <FontAwesomeIcon icon={faShoppingCart} /> {this.props.items} items
              for {this.props.total}$
          </Link>
        </NavItem>
        {/* <NavItem
          className="ml-5 mt-1"
          style={{ listStyleType: "none", fontSize: "20px" }}
        >
          <NavLink style={{ color: "white" }} href={"/shoppingCart"}>
            <FontAwesomeIcon icon={faShoppingCart} />{" "}
          </NavLink>{" "}
          {this.props.items} items for {this.props.total} $
        </NavItem> */}
      </Navbar>
    );
  }
}

export default NavigationBar;
