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

export default class Edit extends Component {
	constructor() {
		super();
		this.state = {
			redir: false,
			initVals: {
				title: '',
				price: '',
				description: '',
				image: '',
				category: ''
			}
		}
	}

	componentDidMount() {
		// I tried to do it the other way, but it wasn't working
		// Not sure how to solve this w/o forceUpdate, making a new initVals
		// variable and using setState didn't even update the variable for some reason

		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.initVals.title = this.props.product.title;
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.initVals.price = this.props.product.price.substring(1);
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.initVals.description = this.props.product.descFull;
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.initVals.image = this.props.product.image;
		// eslint-disable-next-line react/no-direct-mutation-state
		this.state.initVals.category = this.props.product.category;
		
		this.forceUpdate();
	}

	handleSubmit = async (values) => {
		let res = await axios.patch(`https://fakestoreapi.com/products/${this.props.product.id}`, values);
		if (res.status === 200) {
			this.setState({ redir: true });
		} else {
			alert('There was an error.');
		}
		this.props.doneEditing();
	}

	render() {
		return (
			<div style={{ padding: '50px' }}>
				{this.state.redir ? <Redirect to={{ pathname: '/', props: { token: localStorage.getItem('token') } }} /> : null}
				<Formik initialValues={this.state.initVals} validationSchema={formSchema} onSubmit={(values) => this.handleSubmit(values)}>
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
