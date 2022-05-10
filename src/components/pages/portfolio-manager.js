import React, { Component } from 'react'
import axios from 'axios'

import PortfolioSidebarList from '../portfolio/portfolio-side-list'
import PortfolioForm from '../portfolio/portfolio-form'

export default class PortfolioManager extends Component {
    constructor(){
        super()

        this.state = {
            portfolioItems: [],
            portfolioToEdit: {}
        }

        this.handleFormSubmitError = this.handleFormSubmitError.bind(this)
        this.handleNewFormSubmit = this.handleNewFormSubmit.bind(this)
        this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this)
    }

    clearPortfolioToEdit() {
        this.setState({
            portfolioToEdit: {}
        })
    }

    handleEdit(portfolioItem) {
        this.setState({
            portfolioToEdit: portfolioItem
        })
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

    handleEditFormSubmit() {
        this.getPortfolioItems()
    }

    handleNewFormSubmit(portfolioItem) {
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
                        handleNewFormSubmit={this.handleNewFormSubmit}
                        handleFormSubmitError={this.handleFormSubmitError}
                        clearPortfolioToEdit={this.clearPortfolioToEdit}
                        portfolioToEdit={this.state.portfolioToEdit}
                        handleEditFormSubmit={this.handleEditFormSubmit}
                    />
                </div>
                <div className="right-side">
                    <PortfolioSidebarList data={this.state.portfolioItems} handleDelete={this.handleDelete} handleEdit={this.handleEdit} />
                </div>
            </div>
        )
    }
}