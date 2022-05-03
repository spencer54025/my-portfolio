import React, { Component } from 'react'
import axios from 'axios'

import PortfolioSidebarList from '../portfolio/portfolio-side-list'

export default class PortfolioManager extends Component {
    constructor(){
        super()

        this.state = {
            portfolioItems: []
        }
    }

    getPortfolioItems() {
    axios.get("https://spencervp.devcamp.space/portfolio/portfolio_items", { withCredentials: true })
        .then(response => {
            this.setState({
                portfolioItems: [...response.data.portfolio_items]
            })
        })
        .catch(error => {
            console.log(error)
        });
    }

    componentDidMount() {
        this.getPortfolioItems()
    }

    render() {
        return(
            <div className='manager-container'>
                <div className="left-side">

                </div>
                <div className="right-side">
                    <PortfolioSidebarList data={this.state.portfolioItems}/>
                </div>
            </div>
        )
    }
}