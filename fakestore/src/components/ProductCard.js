import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
import { titleCase } from '../helpers.js'

export default class ProductCard extends Component {
	render() {
		return (
			<Card style={{ width: '250px' }}>
				<Card.Img style={{ maxHeight: '200px', objectFit: 'contain' }} variant="top" src={this.props.product.image} />
				<Card.Body>
					<Card.Title style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{this.props.product.title}</Card.Title>
					<div style={{ display: 'flex' }}>
						<Card.Text className='text-secondary'>{titleCase(this.props.product.category)}</Card.Text>
						<Card.Text className='text-success' style={{ marginLeft: 'auto' }}>{this.props.product.price}</Card.Text>
					</div>
					<Card.Text>{this.props.product.description}</Card.Text>
				</Card.Body>
			</Card>
		)
	}
}
