import React, { Component } from 'react'
import axios from 'axios'

import { Table } from 'react-bootstrap'

import { limLen, formatPrice } from '../helpers'

export default class Cart extends Component {
	constructor() {
		super();
		this.state = {
			allProducts: null
		}
	}

	componentDidMount() {
		// Getting all 20 products at once seemed like a better idea than sending out
		// an arbitrary amount of requests for singular products, since the API
		// doesn't let me get product info in bulk other than grabbing them all
		if (this.state.allProducts === null) {
			(async () => {
				let response = await axios.get('https://fakestoreapi.com/products');
				let data = response.data;
				let allProducts = {};
				for (let product of data) {
					product.description = limLen(product.description, 1000);
					allProducts[product.id] = product;
				}
				this.setState({ allProducts });
			})();
		}
	}

	render() {
		return (
			<Table style={{ margin: '50px', width: '90vw' }}>
				<thead>
					<tr>
						<th>Title</th>
						<th>Price</th>
						<th>Description</th>
						<th>Category</th>
						<th>Image</th>
						<th>Amount</th>
					</tr>
				</thead>
				{this.state.allProducts ?
					<tbody>
						{this.props.cart.products.map(product =>
							<tr>
								<td>{this.state.allProducts[product.productId].title}</td>
								<td>{formatPrice(this.state.allProducts[product.productId].price)}</td>
								<td>{this.state.allProducts[product.productId].description}</td>
								<td>{this.state.allProducts[product.productId].category}</td>
								<td><img style={{ width: '200px' }} src={this.state.allProducts[product.productId].image} alt='img'></img></td>
								<td>product.quantity</td>
							</tr>
						)
						}
					</tbody>
					: null}
			</Table>

		)
	}
}
