import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export default class Logout extends Component {

	componentDidMount() {
		this.props.logout();
	}

	render() {
		return (
			<div>
				<Redirect to={{pathname: '/login'}} />
			</div>
		)
	}
}
