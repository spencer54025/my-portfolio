import React from 'react'
import { Link } from 'react-router-dom'

export default function() {
    return(
        <div className='page-info-wrapper'>
            <h2> couldnt find that page...</h2>
            <Link className='link' to="/">Return to Hompage</Link>
        </div>
    )
}