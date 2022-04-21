import React, { Component } from "react";
import PortfolioItem from './portfolio-item'
import InterestItem from './portfolio-item'
import Language from './portfolio-item'

export default class PortfolioContainer extends Component {
    constructor() {
        super();

        this.state = {
            pageTitle: "Welcome to my portfolio",
            data: [ 
                {title: "Quip"},
                {title:"Eventbrite"},
                {title: "ministry Safe"},
                {title: "SwingAwauy"}
            ]
        };
    }

    portfolioItems() {
        return this.state.data.map(item => {
            return <PortfolioItem title={item.title} url={"google.com"} />;
        })
    }

    render() {
        return (
            <div>
                <h2>{this.state.pageTitle}</h2>

                {this.portfolioItems()}
            </div>
        )
    }
}