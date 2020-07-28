import React from 'react';

class UniqueStudent extends React.Component {
    constructor() {
        super()
        this.state = {
            name: '',
            email: '',
            phone: '',
            photo: '',
            degree: ''
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
    render() {
        return (
            <div>
                {this.state.email}
                {this.state.name}
                {this.state.phone}
                {this.state.photo}
                {this.state.degree}
            </div>
        )
    }
}

export default UniqueStudent;