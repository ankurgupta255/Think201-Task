import React, {Component} from 'react';

class UniqueStudent extends React.Component{
    constructor(){
        super()
        this.state={
            name: '',
            email: '',
            phone: '',
            photo: '',
            degree: ''
        }
    }
    componentDidMount(){

    }
    render(){
        return(
            <div>
                Holaaaa
            </div>
        )
    }
}

export default UniqueStudent;