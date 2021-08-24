import React, { Component } from 'react'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import axios from 'axios'

const formSchema = Yup.object().shape({
	title: Yup.string().required('Required'),
	// Thanks for the regex
	price: Yup.string().matches(/^\d+(\.\d{1,2})?$/, 'Must Be a Valid Price').required('Required'),
	description: Yup.string().required('Required'),
	image: Yup.string().required('Required'),
	// API doesn't return an error if you give it a category that doesn't exist, no need to make sure it exists
	category: Yup.string().required('Required')
})

const initVals = {
	title: '',
	price: '',
	description: '',
	image: '',
	category: ''
}

export default class Create extends Component {
	constructor() {
		super();
		this.state = {
			redir: false
		}
	}

	handleSubmit = async (values) => {
		let res = await axios.post('https://fakestoreapi.com/products', values);
		if (res.status === 200) {
			this.setState({ redir: true });
		} else {
			alert('There was an error.');
		}
	}

	render() {
		return (
			<div style={{ padding: '50px' }}>
				{this.state.redir ? <Redirect to={{ pathname: '/', props: { token: localStorage.getItem('token') } }} /> : null}
				<Formik initialValues={initVals} validationSchema={formSchema} onSubmit={(values) => this.handleSubmit(values)}>
					{({ errors, touched }) => (
						<Form>
							<label htmlFor='title' className='form-label'>Product Title</label>
							<Field name='title' className='form-control' />
							{errors.title && touched.title ? (<div style={{ color: 'red' }}>{errors.title}</div>) : null}

							<label htmlFor='price' className='form-label'>Product Price</label>
							<Field name='price' className='form-control' />
							{errors.price && touched.price ? (<div style={{ color: 'red' }}>{errors.price}</div>) : null}

							<label htmlFor='description' className='form-label'>Product Description</label>
							<Field name='description' className='form-control' />
							{errors.description && touched.description ? (<div style={{ color: 'red' }}>{errors.description}</div>) : null}

							<label htmlFor='image' className='form-label'>Product Title</label>
							<Field name='image' className='form-control' />
							{errors.image && touched.image ? (<div style={{ color: 'red' }}>{errors.image}</div>) : null}

							<label htmlFor='category' className='form-label'>Product Category</label>
							<Field name='category' className='form-control' />
							{errors.category && touched.category ? (<div style={{ color: 'red' }}>{errors.category}</div>) : null}
							<br />
							<Button className='btn-primary form-control' type='submit'>Submit</Button>
						</Form>
					)}
				</Formik>
			</div>
		)
	}
}
