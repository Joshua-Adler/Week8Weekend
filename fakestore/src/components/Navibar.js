import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { titleCase } from '../helpers.js'

export default class Navibar extends Component {

	render() {
		let user = this.props.user;
		let cart = this.props.cart;
		return (
			<div>
				<Navbar bg='dark' variant='dark'>
					<Container>
						<Nav className='me-auto'>
							{user ?
								<>
									<Navbar.Brand>{titleCase(`${user.name.firstname} ${user.name.lastname}`)}</Navbar.Brand>
									<Nav.Link as={Link} to='/'>Home</Nav.Link>
									<Nav.Link as={Link} to='/create'>Create Product</Nav.Link>
									<Nav.Link as={Link} to='/cart'>Cart{cart ? `(${cart.productSum()})` : ''}</Nav.Link>
									<Nav.Link as={Link} to='/logout'>Log Out</Nav.Link>
									
								</>
								:
								<>
									<Nav.Link as={Link} to='/login'>Log In</Nav.Link>
								</>
							}
						</Nav>
					</Container>
				</Navbar>
			</div>
		)
	}
}
