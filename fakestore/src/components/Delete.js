import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class Delete extends Component {

	render() {
		return (
			<Modal show={this.props.product !== null} onHide={this.props.closePrompt}>
				{this.props.product ?
					<>
						<Modal.Header>
							<Modal.Title>Are you sure you want to delete {this.props.product.title}?</Modal.Title>
						</Modal.Header>
						<Modal.Footer style={{ display: 'flex' }}>
							<Button onClick={() => this.props.delete(this.props.product)} className='btn-danger' style={{ marginRight: 'auto' }}>Delete</Button>
							<Button onClick={this.props.closePrompt} className='btn-secondary'>Cancel</Button>
						</Modal.Footer>
					</>
					: null}
			</Modal>
		)
	}
}
