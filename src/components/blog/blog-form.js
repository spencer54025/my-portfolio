import React, { Component } from 'react'
import axios from 'axios'

export default class BLogForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            title: "",
            blog_status: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.hanldeSubmit = this.hanldeSubmit.bind(this)
    }

    buildForm() {
        let formData = new fromData();

        formData.append("portfolio_blog[title]", this.state.title)
    }

    hanldeSubmit(event) {
        event.preventDefault()
        this.props.handleFormSubmit(this.state)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <form onSubmit={this.hanldeSubmit} >
                <input value={this.state.title} placeholder='Blog title' name='title' onChange={this.handleChange} type="text" />
                <input value={this.state.blog_status} placeholder='Blog status' name='blog_status' onChange={this.handleChange} type="text" />

                <button>save</button>
            </form>
        )
    }
}