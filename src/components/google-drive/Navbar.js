import React from "react"
import { Navbar, Nav } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function NavbarComponent() {
  return (
    <Navbar bg="dark" expand="sm">
      <Navbar.Brand as={Link} to="/" className="text-white">
        GOOGLE DRIVE
      </Navbar.Brand>
      <Nav>
        <Nav.Link as={Link} to="/user" className="text-white">
          User Profile
        </Nav.Link>
      </Nav>
    </Navbar>
  )
}
