import React, { Component } from 'react'
import axios from 'axios'
import ReactHtmlParser from 'react-html-parser'
import BlogFeaturedImage from '../blog/blog-featured-image'
import BlogForm from '../blog/blog-form'

export default class BlogDetail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            currentId: this.props.match.params.slug,
            blogItem: {},
            editMode: false
        }

        this.handleEdit = this.handleEdit.bind(this)
    }

    handleEdit() {
        this.setState({ editMode: true })
    }

    getBlogItem() {
        axios
        .get(`https://spencervp.devcamp.space/portfolio/portfolio_blogs/${this.state.currentId}`)
        .then(response => {
            this.setState({
                blogItem: response.data.portfolio_blog
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    componentDidMount() {
        this.getBlogItem()
    }

    render() {
        const {
            title,
            content,
            featured_image_url,
            blog_status
        } = this.state.blogItem

        const contentManager = () => {
            if (this.state.editMode) {
                return <BlogForm editMode={this.state.editMode} blog={this.state.blogItem} />
            }
            else {
                return(
                <div className="content-container">
                    <h1 onClick={this.handleEdit}>{title}</h1>
                    
                    <BlogFeaturedImage img={featured_image_url} />

                    <div className='content'>{ReactHtmlParser(content)}</div>
                </div>
                )
            }
        }

        return(
            <div className='blog-container'>
                {contentManager()}
            </div>
        )
    }
}