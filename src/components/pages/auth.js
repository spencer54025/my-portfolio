import React, { Component } from 'react'
import Image from '../../../static/assets/images/auth/saber-image.jpg'
import Login from '../auth/login'

export default class Auth extends Component {
    render() {
        return( 
        <div className='auth-page-wrapper'>
            <div className="left-column"
                    style={{
                    backgroundImage: `url(${Image})`
                }}
            />
            <div className="right-column">
            <Login />
            </div>
        </div>
        )
    }
}