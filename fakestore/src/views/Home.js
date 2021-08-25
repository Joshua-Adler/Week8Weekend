import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

import ProductCard from '../components/ProductCard'
import Delete from '../components/Delete'
import { limLen, formatPrice } from '../helpers'

import arrow from '../images/arrow.png'

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			page: 1,
			delProduct: null
		}
	}

	getProducts = async (page) => {
		// I don't like doing it this way,
		// but the API doesn't give me any way to get items X through Y or ask how many items there are
		let response = null;
		switch (page) {
			case 1:
				response = await axios.get('https://fakestoreapi.com/products?limit=15');
				break;
			case 2:
				response = await axios.get('https://fakestoreapi.com/products?limit=5&sort=desc');
				break;
			default:
				alert('Don\'t do that');
				return;
		}
		let products = response.data;
		for (let product of products) {
			// I couldn't get the gosh diddly darn CSS lineClamp thing to work
			product.descFull = product.description;
			product.description = limLen(product.description, 200);
			product.price = formatPrice(product.price);
		}
		this.setState({ products });
	}

	setPage(n) {
		if (this.state.page !== n) {
			this.setState({ page: n });
			this.getProducts(n);
		}
	}

	componentDidMount() {
		this.getProducts(1);
	}

	deletePrompt = (product) => {
		this.setState({ delProduct: product });
	}

	closePrompt = () => {
		this.setState({ delProduct: null });
	}

	// Probably works, impossible to know since deleting doesn't do anything
	delete = (product) => {
		this.closePrompt();
		axios.delete(`https://fakestoreapi.com/products/${product.id}`);
	}

	render() {
		const styles = {
			nextArrow: { position: 'fixed', right: '25px', top: '50%', transform: 'translate(0, -50%)' },
			prevArrow: { position: 'fixed', left: '25px', top: '50%', transform: 'translate(0, -50%) scale(-1, 1)' },
			nextArrowGray: { filter: 'grayscale(90%)', position: 'fixed', right: '25px', top: '50%', transform: 'translate(0, -50%)' },
			prevArrowGray: { filter: 'grayscale(90%)', position: 'fixed', left: '25px', top: '50%', transform: 'translate(0, -50%) scale(-1, 1)' }
		}

		return (
			<div>
				<Delete product={this.state.delProduct} delete={this.delete} closePrompt={this.closePrompt} />
				<img onClick={() => this.setPage(2)} style={this.state.page === 2 ? styles.nextArrowGray : styles.nextArrow} src={arrow} alt='next' />
				<img onClick={() => this.setPage(1)} style={this.state.page === 1 ? styles.prevArrowGray : styles.prevArrow} src={arrow} alt='prev' />
				<Row style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
					{this.state.products.map((prod) => <Col key={prod.id} style={{ marginBottom: '55px' }}>
						<ProductCard cart={this.props.cart}
							editProduct={this.props.editProduct} deletePrompt={this.deletePrompt} product={prod} />
					</Col>)}
				</Row>
			</div>
		)
	}
}
