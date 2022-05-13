import React, { Component } from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
            return(
                <BlogItem key={blogItem.id} blogItem={blogItem} />
            ) 
        })
        
        return(
        <div className='blog-container'>
            <BlogModal handleModalClose={this.handleModalClose} modalIsOpen={this.state.modalIsOpen}/>
            <div className='new-blog-link'>
                <a onClick={this.handleNewBlogClick}>open modal</a> 
            </div>
            <div className="content-container">
                    {blogRecords}
            </div>


            {this.state.isLoading === true ?   (        
                <div className='content-loader'>
                    <FontAwesomeIcon icon='spinner' spin />
                </div> )
            : null
            }
        </div>
        )
    }
}