import React, { Component } from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'


export default class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: "",
            password: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {
        axios.post("https://api.devcamp.space/sessions", 
        {
            client: {
                email: this.state.email,
                password: this.state.password
            }
        },
        { withCredentials: true }
        ).then(response => {
            if (response.data.status === 'created') {
                this.props.handleSuccessfulAuth()
                this.setState({
                    errorText: "login success"
                })
            } else {
                this.setState({
                    errorText: "wrong email or password",
                    email: "",
                    password: ""
                })
                this.props.handleUnSuccessfulAuth()
            }

        }).catch(error => {
            this.setState({
                errorText: "an error occurred"
            })
            this.props.handleUnSuccessfulAuth()
        })
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        })
    }

    render() {
        return(
                <form className='auth-form' onSubmit={this.handleSubmit}>
                <div>{this.state.errorText}</div>
                <div className="form-input">
                    <FontAwesomeIcon icon={faEnvelope} />
                    <input
                    type='emial'
                    name="email"
                    placeholder='your email'
                    value={this.state.email}
                    onChange={this.handleChange}
                     />
                </div>
                <div className="form-input">
                <FontAwesomeIcon icon={faLock} />
        
                    <input
                    type='password'
                    name= 'password'
                    placeholder='your password'
                    value={this.state.password}
                    onChange={this.handleChange}
                     />
                     </div>

                    <div>
                        <button className='btn' type='submit'>Login</button>
                    </div>    
                </form>
        )
    }
}