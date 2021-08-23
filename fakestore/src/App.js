import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css'

import Login from './views/Login'
import Logout from './views/Logout'
import Home from './views/Home'

import Navibar from './components/Navibar'
import ProtectedRoute from './components/ProtectedRoute'

export default class App extends Component {
	constructor() {
		super();
		this.state = {
			name: null
		}
	}

	update = () => {
		this.forceUpdate();
	}

	render() {
		return (
			<div>
				<Navibar />
				<Switch>
					<Route exact path='/login' render={() => <Login update={this.update}/>} />
					<ProtectedRoute exact path='/logout' render={() => <Logout update={this.update}/>} />
					<ProtectedRoute exact path='/' render={() => <Home />} />
					<Route path='/' render={() => 404} />
				</Switch>
			</div>
		)
	}
}