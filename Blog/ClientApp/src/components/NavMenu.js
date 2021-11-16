import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm  mb-3 bg-dark text-white-50" light>
          <Container>
                    <NavbarBrand tag={Link} className='text-white-50' to="/">Blog</NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                                <NavLink tag={Link} className='text-white-50' to="/">Home</NavLink>
                </NavItem>
                <NavItem>
                                <NavLink tag={Link} className='text-white-50' to="/previewList">PreviewList</NavLink>
                </NavItem>
                <NavItem>
                                <NavLink tag={Link} className='text-white-50'  to="/articleInput">ArticleInput</NavLink>
                </NavItem>
              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}
