import React from 'react';
import { Table } from 'react-bootstrap';

class AllStudents extends React.Component {
    constructor() {
        super()
        this.state = {
            list: []
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
    handleChange = (email) =>{
        return 
    }
    render() {
        return (
            <div>
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
                            return (
                                <tr>
                                    <td>1</td>
                                    <td>{item.name}</td>
                                    <td>{item.email}</td>
                                    <td>{item.phone}</td>
                                    <td><img src={item.photo} alt={item.photo} /></td>
                                    <td>{item.degree}</td>
                                    <td><a href ={`/unique/${item.email}`}>Click Here</a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

export default AllStudents;