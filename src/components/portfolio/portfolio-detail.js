import React, { Component } from "react";
import axios from "axios";

export default class PortfolioDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			portfolioItem: {},
		};
	}

	componentWillMount() {
		this.getPortfolioItem();
	}

	getPortfolioItem() {
		axios
			.get(
				`https://spencervp.devcamp.space/portfolio/portfolio_items/${this.props.match.params.slug}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.setState({
					portfolioItem: response.data.portfolio_item,
				});
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		const {
			banner_image_url,
			category,
			description,
			logo_url,
			name,
			thumb_image_url,
			url,
		} = this.state.portfolioItem;

		const styles = {
			backgroundImage: "url(" + banner_image_url + ")",
			backgroundSize: "cover",
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center center",
		};

		const imageStyles = {
			width: "200px",
		};

		return (
			<div className="portfolio-detail">
				<div className="banner" style={styles}>
					<img src={logo_url} style={imageStyles} />
				</div>
				<div className="portfolio-description">
					<div className="description">{description}</div>
				</div>
				<div className="bottom-content">
					<a href={url} className="site-link" target="_blank">
						Visit {name}
					</a>
				</div>
			</div>
		);
	}
}
