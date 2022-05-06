import React, { Component } from 'react'
import axios from 'axios'

import PortfolioSidebarList from '../portfolio/portfolio-side-list'
import PortfolioForm from '../portfolio/portfolio-form'

export default class PortfolioManager extends Component {
    constructor(){
        super()

        this.state = {
            portfolioItems: []
        }

        this.handleFormSubmitError = this.handleFormSubmitError.bind(this)
        this.handleSuccessfulFormSubmit = this.handleSuccessfulFormSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    handleDelete(portfolioItem) {
        axios
        .delete(`https://api.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true })
        .then(response => {
            this.setState( {
                portfolioItems: this.state.portfolioItems.filter(item => {
                    return item.id !== portfolioItem.id
                })
            })

            return response.data
        })
        .catch(error => {
            console.log('delete error', error)
        })
    }

    handleSuccessfulFormSubmit(portfolioItem) {
        this.setState({
            portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
        })
    }

    handleFormSubmitError(error) {
        console.log("an error occured submitting form", form)
    }

    getPortfolioItems() {
    axios.get("https://spencervp.devcamp.space/portfolio/portfolio_items?", { withCredentials: true })
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
                    <PortfolioForm
                        handleSuccessfulFormSubmit={this.handleSuccessfulFormSubmit}
                        handleFormSubmitError={this.handleFormSubmitError}
                    />
                </div>
                <div className="right-side">
                    <PortfolioSidebarList data={this.state.portfolioItems} handleDelete={this.handleDelete} />
                </div>
            </div>
        )
    }
}