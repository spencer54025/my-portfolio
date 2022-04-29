import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class Blog extends Component {
    constructor(){
        super()
    }
    render(){
        return(
        <div className='page-info-wrapper'>
            <div>
                <h2>Blog</h2>
            </div>

            <div>
                <Link to='/about'>Read more about me</Link>
            </div>
        </div>
        )
    }
}