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
							{this.props.name ?
								<>
									<Navbar.Brand>{titleCase(this.props.name)}</Navbar.Brand>
									<Nav.Link as={Link} to='/create'>Create Product</Nav.Link>
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
