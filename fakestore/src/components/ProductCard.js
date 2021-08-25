import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { titleCase } from '../helpers.js'

export default class ProductCard extends Component {

	addToCart = (product) => {
		this.props.cart.add(product);
		this.props.cart.update(window.update);
		
	}

	render() {
		return (
			<Card style={{ width: '450px' }}>
				<Card.Img style={{ maxHeight: '200px', objectFit: 'contain' }} variant="top" src={this.props.product.image} />
				<Card.Body>
					<Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{this.props.product.title}</Card.Title>
					<div style={{ display: 'flex' }}>
						<Card.Text className='text-secondary'>{titleCase(this.props.product.category)}</Card.Text>
						<Card.Text className='text-success' style={{ marginLeft: 'auto' }}>{this.props.product.price}</Card.Text>
					</div>
					<Card.Text>{this.props.product.description}</Card.Text>
					<div style={{ display: 'flex' }}>
						<Button onClick={() => this.props.editProduct(this.props.product)} className='btn-primary'>Edit</Button>
						<Button onClick={() => this.addToCart(this.props.product)} className='btn-success' style={{marginLeft: 'auto'}}>Add to Cart</Button>
						<Button onClick={() => this.props.deletePrompt(this.props.product)} className='btn-danger' style={{ marginLeft: 'auto' }}>Delete</Button>
					</div>
				</Card.Body>
			</Card>
		)
	}
}
