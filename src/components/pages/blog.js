import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import BlogItem from '../blog/blog-item'
import BlogModal from "../modals/blog-modal"

export default class Blog extends Component {
    constructor(){
        super()

        this.state = {
            blogItems: [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            modalIsOpen: false
        }

        this.getBlogItems = this.getBlogItems.bind(this)
        this.onScroll = this.onScroll.bind(this)
        window.addEventListener("scroll", this.onScroll, false)
        this.handleNewBlogClick = this.handleNewBlogClick.bind(this)
        this.handleModalClose = this.handleModalClose.bind(this)
        this.handleNewBlogSubmit = this.handleNewBlogSubmit.bind(this)
        this.deleteBlog = this.deleteBlog.bind(this)
    }

    deleteBlog(blog) {
        axios.delete(`https://api.devcamp.space/portfolio/portfolio_blogs/${blog.id}`, { withCredentials: true })
        .then(response => {
            console.log(response)
            this.setState({
                blogItems: this.state.blogItems.filter(blogItem => {
                    return blog.id != blogItem.id
                })
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    handleNewBlogSubmit(blog) {
        this.setState({
            modalIsOpen: false,
            blogItems: [blog].concat(this.state.blogItems)
        })
    }

    handleModalClose() {
        this.setState({
            modalIsOpen: false
        })
    }

    handleNewBlogClick() {
        this.setState({
            modalIsOpen: true
        })
    }

   onScroll() {
            if (this.state.isLoading || this.state.blogItems.length === this.state.totalCount) {
                return
            }
            if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
                this.getBlogItems()
            }
    }


    getBlogItems() {
        this.setState ({
            currentPage: this.state.currentPage + 1
        })
        axios
        .get(`https://spencervp.devcamp.space/portfolio/portfolio_blogs?page=${this.state.currentPage}`,
         { withCredentials: true
        }).then(response => {
            this.setState({
                blogItems: this.state.blogItems.concat(response.data.portfolio_blogs),
                totalCount: response.data.meta.total_records,
                isLoading: false
            })
            console.log(response)
        }).catch(error => {
            console.log("getBlogItems", error)
        })
    }

    componentWillMount() {
        this.getBlogItems()
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll, false)
    }


    render(){
        const blogRecords = this.state.blogItems.map(blogItem => {
            if(this.props.loggedInStatus === "LOGGED_IN") {
                return (
                    <div key={blogItem.id} className="admin-blog">
                        <BlogItem key={blogItem.id} blogItem={blogItem} />
                        <a onClick={() => this.deleteBlog(blogItem)}><FontAwesomeIcon icon={faTrash} /></a>
                    </div>
                )
            } else {
            return(
                <BlogItem key={blogItem.id} blogItem={blogItem} />
            ) 
            }
        })
        
        return(
        <div className='blog-container'>
        
            <BlogModal handleNewBlogSubmit={this.handleNewBlogSubmit} handleModalClose={this.handleModalClose} modalIsOpen={this.state.modalIsOpen}/>

            {this.props.loggedInStatus === "LOGGED_IN" ?
                <div className='new-blog-link'>
                    <a className='blog-icon' onClick={this.handleNewBlogClick}> <FontAwesomeIcon icon={faPlusCircle}  /> </a> 
                </div>
            : null}

            <div className="content-container">
                    {blogRecords}
            </div>


            {this.state.isLoading === true ?   (        
                <div className='content-loader'>
                    <FontAwesomeIcon icon={faSpinner} spin />
                </div> )
            : null
            }

        </div>
        )
    }
}