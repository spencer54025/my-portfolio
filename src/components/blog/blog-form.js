import React, { Component } from 'react'
import axios from 'axios'
import RichTextEditor from '../forms/rich-text-editor'
import DropzoneComponent from 'react-dropzone-component'

export default class BLogForm extends Component{
    constructor(props) {
        super(props)

        this.state = {
            id: '',
            title: "",
            blog_status: "",
            content: '',
            featured_image: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleTextEditorChange = this.handleTextEditorChange.bind(this)
        this.componentConfig = this.componentConfig.bind(this)
        this.djsConfig = this.djsConfig.bind(this)
        this.handleImageDrop = this.handleImageDrop.bind(this)
        this.imageRef = React.createRef()
    }

    componentWillMount() {
        if(this.props.editMode) {
            this.setState({
                id: this.props.blog.id,
                title: this.props.blog.title,
                status: this.props.blog.status
            })
        }
    }


    componentConfig() {
        return {
            iconFiletypes: ['.jpg', '.png'],
            showFiletypeIcon: true,
            postUrl: "https://httpbin.org/post"
        }
    }

    djsConfig() {
        return {
            addRemoveLinks: true,
            maxFiles: 1
        }
    }

    handleImageDrop() {
        return{
            addedfile: file => this.setState({ featured_image: file })
        }
    }

    handleTextEditorChange(content) {
        this.setState({ content })
    }

    buildForm() {
        let formData = new FormData();

        formData.append("portfolio_blog[title]", this.state.title)
        formData.append("portfolio_blog[blog_status]", this.state.blog_status)
        formData.append("portfolio_blog[content]", this.state.content)
    
        if (this.state.featured_image) {
            formData.append('portfolio_blog[featured_image]', this.state.featured_image)
        }

        return formData
    }
    
    handleSubmit(event) {
        axios.post("https://spencervp.devcamp.space/portfolio/portfolio_blogs", this.buildForm(), { withCredentials: true })
        .then(response => {
            if (this.state.featured_image) {
                this.imageRef.current.dropzone.removeAllFiles()
            }
            this.setState({
              title: "",
              blog_status: "",
              content: "",
              featured_image: ''
            });
            this.props.handleFormSubmit(response.data.portfolio_blog)
        })
        .catch(error => {
            console.log('handle submit error', error)
        })

        event.preventDefault()
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return(
            <div className='one-column'>
                <form onSubmit={this.handleSubmit} className='blog-form-wrapper' >
                    <input value={this.state.title} placeholder='Blog title' name='title' onChange={this.handleChange} type="text" />
                    <input value={this.state.blog_status} placeholder='Blog status' name='blog_status' onChange={this.handleChange} type="text" />
                    <RichTextEditor editMode={this.props.editMode}
                     handleTextEditorChange={this.handleTextEditorChange}
                    contentToEdit={this.props.editMode && this.props.blog.content ? this.props.blog.content : null}
                      />

                    <div className="image-uploaders">
                        <DropzoneComponent 
                        config={this.componentConfig()}
                        djsConfig={this.djsConfig()}
                        eventHandlers={this.handleImageDrop()}
                        ref={this.imageRef}
                        >
                            <div className="dz-message">Featured Image</div>
                        </DropzoneComponent>
                    </div>

                    <button className='btn'>save</button>
                </form>
            </div>
        )
    }
}