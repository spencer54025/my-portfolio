import React, { Component } from 'react'
import picture from '../../../static/assets/images/auth/image.jpg'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhone, faEnvelope, faMapMarked } from '@fortawesome/free-solid-svg-icons'
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons'

                    
export default class Contact extends Component {
    constructor(){
        super()
    }
    render() {
        return(
            <div className='content-page-wrapper'>
                <div className="left-column"
                     style={{
                        background: "url(" + picture + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }} >
                </div>
                <div className="right-column">
                    <div className="contact-bullet-points">
                        <div className="bullet-point-group">
                            <div className="icon">
                                 <FontAwesomeIcon icon={faPhone} />
                            </div>
                            <div className="text">
                               <span>385-232-5070</span>
                            </div>
                        </div>
                        <div className="bullet-point-group">
                            <div className="icon">
                                 <FontAwesomeIcon icon={faEnvelope} />
                            </div>
                            <div className="text">
                               <span>Spencervp54025@gmail.com</span>
                            </div>
                        </div>
                        <div className="bullet-point-group">
                            <div className="icon">
                                 <FontAwesomeIcon icon={faMapMarked} />
                            </div>
                            <div className="text">
                               <span>Springville, UT</span>
                            </div>
                        </div>
                        <div className="bullet-point-group">
                            <div className="icon">
                                 <FontAwesomeIcon icon={faLinkedin} />
                            </div>
                            <div className="text">
                               <a href="https://linkedin.com/in/spencer-van-patten-88b21a23b" target='_blank'>Linkedin</a>
                            </div>
                        </div>
                        <div className="bullet-point-group">
                            <div className="icon">
                                 <FontAwesomeIcon icon={faGithub} />
                            </div>
                            <div className="text">
                               <a href="https://github.com/spencer54025" target='_blank'>github</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}