import React from 'react'
import { Navbar, Nav, Container, Image } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

function Header() {

    const username = "User"; // Placeholder for dynamic username
    const profile_pic = "../assets/default_user.png"; // Placeholder for dynamic profile picture URL

  return (
    <div>
      <Navbar expand="lg" bg="warning" variant="dark" collapseOnSelect>
      <Container>

        <LinkContainer to='/'>
            <Navbar.Brand>
            <img
                alt=""
                src="/spotlight_logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
            />{' '}
            Spotlight
            </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
                <Nav.Link>Dashboard</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/schedule">
                <Nav.Link>Schedule</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/subscription">
                <Nav.Link>Subscription</Nav.Link>
            </LinkContainer>
            <LinkContainer to="/settings">
                <Nav.Link>Settings</Nav.Link>
            </LinkContainer>
          </Nav>

          <Nav className="ms-auto align-items-center">
            <LinkContainer to="/notifications">
                <Nav.Link>
                    <i className="fas fa-bell fa-lg"></i>
                </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/user">
            <Nav.Link className="d-flex align-items-center p-0">
              <Image 
                  src={profile_pic} 
                  roundedCircle 
                  width="35" 
                  height="35" 
                  className="border border-2 border-light"
                  alt="User Profile"
                />
                <span className="ms-2 text-light">{username}</span>
            </Nav.Link>
            </LinkContainer>
          </Nav>

        </Navbar.Collapse>

      </Container>

    </Navbar>
    </div>
  )
}

export default Header
