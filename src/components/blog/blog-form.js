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
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title)
        formData.append("portfolio_blog[blog_status]", this.state.blog_status)

        return formData
    }

    handleSubmit(event) {
        axios.post("https://spencervp.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), { withCredentials: true })
        .then(response => {
            this.props.handleFormSubmit(response.data.portfolio_blog)
            this.setState({
                title: "",
                blog_status: ""
            })
        })
        .catch(error => {
            console.log('handle submit error', error)
        })

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
            <form onSubmit={this.handleSubmit} className='blog-form-wrapper' >
                <input value={this.state.title} placeholder='Blog title' name='title' onChange={this.handleChange} type="text" />
                <input value={this.state.blog_status} placeholder='Blog status' name='blog_status' onChange={this.handleChange} type="text" />

                <button className='btn'>save</button>
            </form>
        )
    }
}