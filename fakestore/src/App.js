import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './views/Login'
import Logout from './views/Logout'
import Home from './views/Home'
import Create from './views/Create'
import Edit from './views/Edit'
import Cart from './views/Cart'

import Navibar from './components/Navibar'
import ProtectedRoute from './components/ProtectedRoute'
import { findCart } from './helpers'

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			token: null,
			user: null,
			editProd: null,
			cart: null
		}
		// I tried. I can't do it without forceUpdate. The navbar needs to update when the cart changes.
		window.update = this.update;
	}

	login = (token, user) => {
		findCart(user.id, (cart) => this.setState({ cart }));
		this.setState({ token, user });
	}

	logout = () => {
		localStorage.removeItem('username');
		this.setState({ token: null, user: null, cart: null });
	}

	editProduct = (product) => {
		this.setState({ editProd: product });
	}

	doneEditing = () => {
		this.setState({ editProd: null });
	}

	update = () => this.forceUpdate();

	render() {
		return (
			<div>
				{this.state.editProd ? <Redirect to={{ pathname: '/edit' }} /> : null}
				<Navibar user={this.state.user} cart={this.state.cart} />
				<Switch>
					<Route exact path='/login' render={() => <Login login={this.login} />} />
					<ProtectedRoute token={this.state.token}
						exact path='/logout' render={() => <Logout logout={this.logout} />} />
					<ProtectedRoute token={this.state.token}
						exact path='/' render={() => <Home editProduct={this.editProduct} cart={this.state.cart} />} />
					<ProtectedRoute token={this.state.token}
						exact path='/create' render={() => <Create />} />
					<ProtectedRoute token={this.state.token}
						exact path='/cart' render={() => <Cart cart={this.state.cart} />} />
					<ProtectedRoute token={this.state.token}
						exact path='/edit' render={() => <Edit doneEditing={this.doneEditing} product={this.state.editProd} />} />
					<Route path='/' render={() => 404} />
				</Switch>
			</div>
		)
	}
}