import React from 'react';
import { Card, Col, Row, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

class UniqueStudent extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            photo: '',
            degree: '',
            file: null,
            show: false
        }
    }
    componentDidMount() {
        var data = window.location.href.substring(29);
        fetch(`/api/student/one/${data}`, {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            const { name, phone, photo, degree, email } = data.student;
            this.setState({ name, phone, photo, degree, email });
        })
    }
    fetchUser = () => {
        var data = window.location.href.substring(29);
        fetch(`/api/student/one/${data}`, {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            const { name, phone, photo, degree, email } = data.student;
            this.setState({ name, phone, photo, degree, email });
        })
    }
    handleClose = () => {
        this.setState({ show: false })
        this.fetchUser()
    }

    handleShow = () => {
        this.setState({ show: true })
    }
    onChange = (name) => (event) => {
        this.setState({ [name]: event.target.value })
    }
    onFileChange = (event) => {
        this.setState({ file: event.target.files[0] })
    }
    onUpload = () => {
        const formData = new FormData();
        formData.append('upload', this.state.file);
        const config = {
            headers: { 'Content-Type': 'multipart/form-data' }
        };
        axios.post('/api/student/upload', formData, config)
            .then((response) => {
                console.log(response)
                alert("The file is successfully uploaded.");
                this.setState({ photo: response.data.filename })
            }).catch((error) => {
                alert("The file was not successfully uploaded. Please Ensure that the size of the Image is less than 1 Mb and is a valid Image File...");
            });
    }
    onSubmit = () => {
        fetch(`/api/student/edit/${this.state.email}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                photo: this.state.photo,
                degree: this.state.degree
            })
        }).then(response => response.json()).then((data) => {
            data.error ? alert(data.msg) : alert('The Details have been updated');
            this.handleClose();
        })
    }
    render() {
        return (
            <div>
                <Card sm={8} style={{ "margin": "20px" }}>
                    <Card.Body>
                        <h1 className="text-center">Student Details</h1>
                        <Row style={{ "padding-top": "10px" }}>
                            <Col sm={4}>
                                <img src={this.state.photo} width="400px" />
                            </Col>
                            <Col sm={8}>
                                <h4>Name: {this.state.name}</h4>
                                <h4>Email: {this.state.email}</h4>
                                <h4>Phone Number: {this.state.phone}</h4>
                                <h4>Degree: {this.state.degree}</h4>
                                <Button variant="primary" onClick={this.handleShow}>Edit Data</Button>
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <b>Edit Data</b>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control onChange={this.onChange('email')} type="email" placeholder="Enter email" value={this.state.email} required />
                            </Form.Group>

                            <Form.Group controlId="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control onChange={this.onChange('name')} type="text" placeholder="name" value={this.state.name} required />
                            </Form.Group>

                            <Form.Group controlId="phone">
                                <Form.Label>Phone Number</Form.Label>
                                <Form.Control onChange={this.onChange('phone')} type="text" placeholder="enter phone number" value={this.state.phone} required />
                            </Form.Group>

                            <Form.Group controlId="photo">
                                <Form.Label>Photo Upload</Form.Label>
                                <Form.Control onChange={this.onFileChange} type="file" required />
                                <Button variant="primary" onClick={this.onUpload}>Upload File</Button>
                            </Form.Group>

                            <Form.Group controlId="degree">
                                <Form.Label>Degree</Form.Label>
                                <Form.Control onChange={this.onChange('degree')} type="text" value={this.state.degree} required />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                    </Button>
                        <Button variant="primary" onClick={this.onSubmit}>
                            Submit
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default UniqueStudent;