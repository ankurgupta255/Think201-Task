import React, {Component} from 'react';

class Landing extends React.Component{
    constructor(){
        super()
        this.state={
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

    }
    onSubmit = () => {

    }
    render(){
        return(
            <div>
                Hi
            </div>
        )
    }
}

export default Landing;