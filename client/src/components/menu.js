import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import '../App.css';
import {Nav, NavItem, Navbar, Badge} from 'react-bootstrap';

class Menu extends React.Component {
    render(){
        return(
            <Navbar bg="primary" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                    <Nav className="mr-auto">
                    <Nav.Link href="/profile">Profile</Nav.Link>
                    
                </Nav>
                <Nav>
                    <Nav.Link href="/profile">Login</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    <Nav.Link href="/logout">Logout</Nav.Link>
                </Nav>
            </Navbar>
        );
    }
}
export default Menu