import React, { Component } from 'react'
import axios from 'axios'
import { Row, Col } from 'react-bootstrap'

import ProductCard from '../components/ProductCard'
import { limLen, formatPrice } from '../helpers'

import arrow from '../images/arrow.png'

export default class Home extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
			page: 1
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
			product.description = limLen(product.description, 100);
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

	render() {
		const styles = {
			nextArrow: { position: 'fixed', right: '25px', top: '50%', transform: 'translate(0, -50%)' },
			prevArrow: { position: 'fixed', left: '25px', top: '50%', transform: 'translate(0, -50%) scale(-1, 1)' },
			nextArrowGray: { filter: 'grayscale(90%)', position: 'fixed', right: '25px', top: '50%', transform: 'translate(0, -50%)' },
			prevArrowGray: { filter: 'grayscale(90%)', position: 'fixed', left: '25px', top: '50%', transform: 'translate(0, -50%) scale(-1, 1)' }
		}

		return (
			<div>
				<img onClick={() => this.setPage(2)} style={this.state.page === 2 ? styles.nextArrowGray : styles.nextArrow} src={arrow} alt='next' />
				<img onClick={() => this.setPage(1)} style={this.state.page === 1 ? styles.prevArrowGray : styles.prevArrow} src={arrow} alt='prev' />
				<Row style={{ width: '85%', marginLeft: 'auto', marginRight: 'auto', marginTop: '50px' }}>
					{this.state.products.map((prod) => <Col key={prod.id} style={{ marginBottom: '55px' }}><ProductCard product={prod} /></Col>)}
				</Row>
			</div>
		)
	}
}
