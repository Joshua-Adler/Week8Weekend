import React, { Component } from 'react'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { titleCase } from '../helpers.js'

export default class Navibar extends Component {

	render() {

		return (
			<div>
				<Navbar bg='dark' variant='dark'>
					<Container>
						<Nav className='me-auto'>
							{localStorage.getItem('token') ?
								<>
									<Navbar.Brand>{titleCase(localStorage.getItem('name'))}</Navbar.Brand>
									<Nav.Link as={Link} to='/'>Home</Nav.Link>
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
