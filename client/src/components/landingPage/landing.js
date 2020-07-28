import React from 'react';
import { Card, Form, Button } from 'react-bootstrap';
const axios = require('axios');

class Landing extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            photo: '',
            degree: '',
            file: null
        }
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
        fetch('/api/student/add', {
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
            data.error ? alert(data.msg) : alert('The Student Has been Added');
        })
    }
    render() {
        return (
            <Card sm={8} style={{ "margin": "20px" }}>
                <Card.Body>
                    <h1 className="text-center">Add Student</h1>
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
                        <Button variant="primary" onClick={this.onSubmit} type="submit">
                            Submit
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        )
    }
}

export default Landing;