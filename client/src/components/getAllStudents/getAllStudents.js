import React from 'react';
import { Table, Form, Row, Col, Dropdown, DropdownButton, Card } from 'react-bootstrap';

class AllStudents extends React.Component {
    constructor() {
        super()
        this.state = {
            list: [],
            searchText: '',
            searchCategory: 'Name'
        }
    }
    componentDidMount() {
        fetch('/api/student/all', {
            method: 'GET'
        }).then(response => response.json()).then(data => {
            console.log(data);
            this.setState({ list: data.students })
        })
    }
    onChange = (event) => {
        this.setState({ searchText: event.target.value })

    }
    changeCategory = (name) => {
        this.setState({ searchCategory: name })
    }
    render() {
        return (
            <Card sm={8} style={{ "margin": "20px" }}>
                <Card.Body>
                    <h1 className="text-center">All Students</h1>
                    <Row style={{ "padding-top": "10px" }}>
                        <Col sm={10}>
                            <Form>
                                <Form.Group controlId="name">
                                    <Form.Control onChange={this.onChange} type="text" placeholder="search Text (It is case sensitive)" value={this.state.searchText} />
                                </Form.Group>
                            </Form>
                        </Col>
                        <Col sm={2}>
                            <DropdownButton id="dropdown-basic-button" title={this.state.searchCategory}>
                                <Dropdown.Item onClick={() => this.changeCategory('Name')}>Name</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.changeCategory('Email')}>Email</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.changeCategory('Phone')}>Phone</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.changeCategory('Degree')}>Degree</Dropdown.Item>
                            </DropdownButton>
                        </Col>
                    </Row>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Photo</th>
                                <th>Degree</th>
                                <th>View Profile</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.list.map((item) => {
                                if ((this.state.searchCategory === 'Name' && item.name.includes(this.state.searchText)) || (this.state.searchCategory === 'Email' && item.email.includes(this.state.searchText)) || (this.state.searchCategory === 'Phone' && item.phone.includes(this.state.searchText)) || (this.state.searchCategory === 'Degree' && item.degree.includes(this.state.searchText)))
                                    return (
                                        <tr>
                                            <td>1</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td><img src={item.photo} alt={item.photo} height="30px" /></td>
                                            <td>{item.degree}</td>
                                            <td><a href={`/unique/${item._id}`}>Click Here</a></td>
                                        </tr>
                                    )
                            })}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        )
    }
}

export default AllStudents;