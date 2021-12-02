import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import Header from './Header';

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);
    this.renderLogOut = this.renderLogOut.bind(this)
    this.state = {
      access_token: ''
    }

  }


  onClik() {
    sessionStorage.removeItem('access_token')
    window.location.reload()
  }


  renderLogOut() {

    if (sessionStorage.getItem('access_token')) {
      return (
        <NavItem>
          <button className='text-dark m-2 p-3 bg-light rounded ' onClick={this.onClik}>Logout   <img src='https://cdn-icons-png.flaticon.com/128/1828/1828479.png' /> </button>
        </NavItem>
      )
    }
  }


  renderLogin() {

    if(!sessionStorage.getItem('access_token'))
    return (
      <NavItem>
        <NavLink tag={Link} className='text-dark m-2 p-3 bg-light rounded' to="/Login">login <img src='https://alliluya.com/img/user.png' /></NavLink>
      </NavItem>
    )
  }
  render() {
    return (
      <header style={{ backgroundColor: 'black' }}>
        <Header></Header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm mb-3 text-white-50" light>
          <ul className="navbar-nav flex-grow d-flex flex-row h6 justify-content-around w-100">
            <NavItem>
              <NavLink tag={Link} className='text-dark m-2 p-3 bg-light rounded ' to="/">Home <img src='https://img.icons8.com/cotton/2x/000000/home.png' /> </NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className='text-dark m-2 p-3 bg-light rounded' to="/previewList">blogs <img src='http://yokohamakohoku.gmj-dealer.jp/wp-content/themes/odh1/images/h_blog.png' /></NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} className='text-dark m-2 p-3 bg-light rounded' to="/articleInput">write articles <img src='https://www.freeiconspng.com/uploads/writing-png-6.png' /></NavLink>
            </NavItem>
            
            {this.renderLogin()}
            {this.renderLogOut()}

          </ul>
        </Navbar>
      </header>
    );
  }
}