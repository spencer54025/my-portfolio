import React, { Component } from 'react'
import PortfolioContainer from '../portfolio/portfolio-container'

export default class Home extends Component {
    render() {
    return (
            <div>
                <h2>Home</h2>
                <PortfolioContainer />
            </div>
        )
    }
}