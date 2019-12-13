import React from 'react';
import {Navbar, NavbarBrand, NavItem, NavLink} from 'reactstrap'
import "../index.css"

class NavigationBar extends React.Component {
    state = {  }
    render() { 
        return ( 
        <Navbar color="dark" light expand="md">
                <NavbarBrand style={{fontSize: "30px", color:"white"}} href="/">Amazon</NavbarBrand>
                <NavItem className="ml-5 mt-1" style={{listStyleType: "none",fontSize:"20px"}}>
                    <NavLink style={{color: "white"}} href="/addProduct">Add product</NavLink>
                </NavItem>
                <NavItem className="ml-5 mt-1" style={{listStyleType: "none",fontSize:"20px"}}>
                    <NavLink style={{color: "white"}} href="/addProduct">Reviews</NavLink>
                </NavItem>
        </Navbar>
        );
    }
}
 
export default NavigationBar;