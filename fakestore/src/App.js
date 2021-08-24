import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './views/Login'
import Logout from './views/Logout'
import Home from './views/Home'
import Create from './views/Create'
import Edit from './views/Edit'

import Navibar from './components/Navibar'
import ProtectedRoute from './components/ProtectedRoute'

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			token: null,
			name: null,
			editProd: null
		}
	}

	login = (token, name) => {
		this.setState({ token, name });
	}

	logout = () => {
		localStorage.removeItem('username');
		this.setState({ token: null, name: null });
	}

	editProduct = (product) => {
		this.setState({ editProd: product });
	}

	doneEditing = () => {
		this.setState({ editProd: null });
	}

	render() {
		return (
			<div>
				{this.state.editProd ? <Redirect to={{ pathname: '/edit' }} /> : null}
				<Navibar name={this.state.name} />
				<Switch>
					<Route exact path='/login' render={() => <Login login={this.login} />} />
					<ProtectedRoute token={this.state.token} exact path='/logout' render={() => <Logout logout={this.logout} />} />
					<ProtectedRoute token={this.state.token} exact path='/' render={() => <Home editProduct={this.editProduct} />} />
					<ProtectedRoute token={this.state.token} exact path='/create' render={() => <Create />} />
					<ProtectedRoute token={this.state.token} exact path='/edit' render={() => <Edit doneEditing={this.doneEditing} product={this.state.editProd} />} />
					<Route path='/' render={() => 404} />
				</Switch>
			</div>
		)
	}
}