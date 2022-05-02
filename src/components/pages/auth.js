import React, { Component } from 'react'
import Image from '../../../static/assets/images/auth/saber-image.jpg'
import Login from '../auth/login'

export default class Auth extends Component {
    constructor(props){
        super(props)

        this.handleSuccessfulAuth=this.handleSuccessfulAuth.bind(this)
        this.handleUnSuccessfulAuth=this.handleUnSuccessfulAuth.bind(this)
    }

    handleSuccessfulAuth() {
        this.props.handleSuccessfulLogin()
        this.props.history.push("/")
    }

    handleUnSuccessfulAuth() {
        this.props.handleUnSuccessfulLogin()
    }

    render() {
        return( 
        <div className='auth-page-wrapper'>
            <div className="left-column"
                    style={{
                    backgroundImage: `url(${Image})`
                }}
            />
            <div className="right-column">
            <Login 
                handleSuccessfulAuth={this.handleSuccessfulAuth}
                handleUnSuccessfulAuth={this.handleUnSuccessfulAuth}
            />
            </div>
        </div>
        )
    }
}