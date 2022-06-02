import React, { Component } from "react";
import axios from "axios";
import RichTextEditor from "../forms/rich-text-editor";
import DropzoneComponent from "react-dropzone-component";

export default class BLogForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: "",
			title: "",
			blog_status: "",
			content: "",
			featured_image: "",
			apiUrl: "https://spencervp.devcamp.space/portfolio/portfolio_blogs",
			apiAction: "post",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleTextEditorChange = this.handleTextEditorChange.bind(this);
		this.componentConfig = this.componentConfig.bind(this);
		this.djsConfig = this.djsConfig.bind(this);
		this.handleImageDrop = this.handleImageDrop.bind(this);
		this.imageRef = React.createRef();
		this.deleteImage = this.deleteImage.bind(this);
	}

	deleteImage(imageType) {
		axios
			.delete(
				`https://api.devcamp.space/portfolio/delete-portfolio-blog-image/${this.props.blog.id}?image_type=${imageType}`,
				{ withCredentials: true }
			)
			.then((response) => {
				this.props.handleImageDelete();
			})
			.catch((error) => {
				console.log("error: ", error);
			});
	}

	componentWillMount() {
		if (this.props.editMode) {
			this.setState({
				id: this.props.blog.id,
				title: this.props.blog.title,
				blog_status: this.props.blog.blog_status,
				content: this.props.blog.content,
				apiUrl: `https://spencervp.devcamp.space/portfolio/portfolio_blogs/${this.props.blog.id}`,
				apiAction: "patch",
			});
		}
	}

	componentConfig() {
		return {
			iconFiletypes: [".jpg", ".png"],
			showFiletypeIcon: true,
			postUrl: "https://httpbin.org/post",
		};
	}

	djsConfig() {
		return {
			addRemoveLinks: true,
			maxFiles: 1,
		};
	}

	handleImageDrop() {
		return {
			addedfile: (file) => this.setState({ featured_image: file }),
		};
	}

	handleTextEditorChange(content) {
		this.setState({ content });
	}

	buildForm() {
		let formData = new FormData();

		formData.append("portfolio_blog[title]", this.state.title);
		formData.append("portfolio_blog[blog_status]", this.state.blog_status);
		formData.append("portfolio_blog[content]", this.state.content);

		if (this.state.featured_image) {
			formData.append(
				"portfolio_blog[featured_image]",
				this.state.featured_image
			);
		}

		return formData;
	}

	handleSubmit(event) {
		axios({
			method: this.state.apiAction,
			url: this.state.apiUrl,
			data: this.buildForm(),
			withCredentials: true,
		})
			.then((response) => {
				if (this.state.featured_image) {
					this.imageRef.current.dropzone.removeAllFiles();
				}
				this.setState({
					title: "",
					blog_status: "",
					content: "",
					featured_image: "",
				});
				if (this.props.editMode) {
					this.props.handleUpdateSubmit(response.data.portfolio_blog);
				} else {
					this.props.handleFormSubmit(response.data.portfolio_blog);
				}
			})
			.catch((error) => {
				console.log("handle submit error", error);
			});

		event.preventDefault();
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit} className="blog-form-wrapper">
				<div className="two-column">
					<input
						value={this.state.title}
						placeholder="Blog title"
						name="title"
						onChange={this.handleChange}
						type="text"
					/>
					<input
						value={this.state.blog_status}
						placeholder="Blog status"
						name="blog_status"
						onChange={this.handleChange}
						type="text"
					/>
				</div>
				<div className="one-column">
					<RichTextEditor
						editMode={this.props.editMode}
						handleTextEditorChange={this.handleTextEditorChange}
						contentToEdit={
							this.props.editMode && this.props.blog.content
								? this.props.blog.content
								: null
						}
					/>
				</div>

				<div className="image-uploaders">
					{this.props.editMode && this.props.blog.featured_image_url ? (
						<div className="portfolio-manager-image-wrapper">
							<img src={this.props.blog.featured_image_url} />

							<div className="image-removal-link">
								<a onClick={() => this.deleteImage("featured_image")}>
									remove file
								</a>
							</div>
						</div>
					) : (
						<DropzoneComponent
							config={this.componentConfig()}
							djsConfig={this.djsConfig()}
							eventHandlers={this.handleImageDrop()}
							ref={this.imageRef}
						>
							<div className="dz-message">Featured Image</div>
						</DropzoneComponent>
					)}
				</div>

				<button className="btn">save</button>
			</form>
		);
	}
}
