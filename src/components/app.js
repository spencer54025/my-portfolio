import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NavigationContainer from "./navigation/navigation-container";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Blog from "./pages/blog";
import BlogDetail from "./pages/blog-detail";
import PortfolioManager from "./pages/portfolio-manager";
import PortfolioDetail from "./portfolio/portfolio-detail";
import Auth from "./pages/auth";
import NoMatch from "./pages/no-match";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loggedInStatus: "NOT_LOGGED_IN",
			viewCount: 0
		};
		this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
		this.handleUnSuccessfulLogin = this.handleUnSuccessfulLogin.bind(this);
		this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
		this.updateViews = this.updateViews.bind(this);
		this.getViews = this.getViews.bind(this);
	}

	handleSuccessfulLogin() {
		this.setState({
			loggedInStatus: "LOGGED_IN",
		});
	}

	handleUnSuccessfulLogin() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	handleSuccessfulLogout() {
		this.setState({
			loggedInStatus: "NOT_LOGGED_IN",
		});
	}

	checkLoginStatus() {
		return axios
			.get("https://api.devcamp.space/logged_in", {
				withCredentials: true,
			})
			.then((response) => {
				const loggedIn = response.data.logged_in;
				const loggedInStatus = this.state.loggedInStatus;

				if (loggedIn && loggedInStatus === "LOGGED_IN") {
					return loggedIn;
				} else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
					this.setState({
						loggedInStatus: "LOGGED_IN",
					});
				} else if (!loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
					this.setState({
						loggedInStatus: "NOT_LOGGED_IN",
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}

	componentDidMount() {
		this.checkLoginStatus();
		this.getViews()
	}

	getViews() {
		axios.get('https://svp-website-traffic-api.herokuapp.com/get_traffic/views')
		.then(res => {
			console.log(res.data)
			this.setState({
				viewCount: res.data.count
			})
			this.updateViews()
		})
		.catch(err => {
			console.log(err)
		})
	}

	updateViews() {
		console.log(this.state.viewCount + 1)
		axios.put('https://svp-website-traffic-api.herokuapp.com/update_traffic/views', {
			"count": (this.state.viewCount + 1)
		})
		.then(res => {
			console.log(res)
		})
		.catch(err => {
			console.log(err)
		})
	}

	authorizedPages() {
		return [
			<Route
				key="portfolio-manager"
				path="/portfolio-manager"
				component={PortfolioManager}
			/>,
		];
	}

	render() {
		return (
			<div className="container">
				<Router>
					<div>
						<NavigationContainer
							loggedInStatus={this.state.loggedInStatus}
							handleSuccessfulLogout={this.handleSuccessfulLogout}
						/>

						<Switch>
							<Route exact path="/" component={Home} />

							<Route path="/about" component={About} />

							<Route
								path="/auth"
								render={(props) => (
									<Auth
										{...props}
										handleSuccessfulLogin={this.handleSuccessfulLogin}
										handleUnSuccessfulLogin={this.handleUnSuccessfulLogin}
									/>
								)}
							/>
							<Route path="/contact" component={Contact} />

							<Route
								path="/blog"
								render={(props) => (
									<Blog {...props} loggedInStatus={this.state.loggedInStatus} />
								)}
							/>

							<Route
								path="/b/:slug"
								render={(props) => (
									<BlogDetail
										{...props}
										loggedInStatus={this.state.loggedInStatus}
									/>
								)}
							/>

							{this.state.loggedInStatus === "LOGGED_IN"
								? this.authorizedPages()
								: null}

							<Route exact path="/detail/:slug" component={PortfolioDetail} />

							<Route component={NoMatch} />
						</Switch>
					</div>
				</Router>
			</div>
		);
	}
}
