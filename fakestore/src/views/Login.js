import React, { Component } from 'react'
import * as Yup from 'yup'
import { Formik, Form, Field } from 'formik'
import { Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

const schema = Yup.object().shape({
	username: Yup.string().required('Required'),
	password: Yup.string()
})

const initVals = {
	username: '',
	password: ''
}

export default class Login extends Component {

	constructor() {
		super();
		this.state = {
			status: 'PENDING'
		}
	}

	// There's no way to get the user from the username :/
	async findName(username) {
		let response = await axios.get('https://fakestoreapi.com/users');
		let data = response.data;
		let name = '?????';
		for (let user of data) {
			if (user.username === username) {
				name = `${user.name.firstname} ${user.name.lastname}`;
				break;
			}
		}
		localStorage.setItem('name', name);
		this.props.update();
	}

	handleSubmit = async ({ username, password }) => {
		// This has to happen because, um, reasons
		if (password === '') password = ' ';
		// Get the data
		let response = await axios.post('https://fakestoreapi.com/auth/login', {
			username, password
		});
		let data = response.data;
		// A token only exists if the user logged in successfully
		if (data.token) {
			localStorage.setItem('token', data.token);
			this.setState({ status: 'SUCCESS' });
			this.findName(username);
		} else {
			this.setState({ status: 'FAILURE' });
		}

	}

	render() {

		const styles = {
			spaced: { marginTop: '25px' },
			error: { color: 'red' }
		}

		return (
			<div style={{ padding: '25vh 25vw' }}>
				{this.state.status === 'SUCCESS' ? <Redirect to={{ pathname: '/', props: { token: localStorage.getItem('token') } }} /> : null}
				<Formik initialValues={initVals} validationSchema={schema} onSubmit={(values) => this.handleSubmit(values)}>
					{({ errors, touched }) => (
						<Form>
							<label htmlFor='username' className='form-label'>Username</label>
							<Field name='username' className='form-control' />
							{errors.username && touched.username ? <div style={styles.error}>{errors.username}</div> : null}

							<label htmlFor='password' className='form-label' style={styles.spaced}>Password <small className='text-secondary'>(Optional)</small></label>
							<Field name='password' className='form-control' />
							{errors.password && touched.password ? <div style={styles.error}>{errors.password}</div> : null}

							<Button type='submit' style={styles.spaced}>Log In</Button>
							{this.state.status === 'FAILURE' ? <div style={styles.error}>Incorrect username or password</div> : null}
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}
