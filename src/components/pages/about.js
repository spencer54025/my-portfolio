import React, { Component } from 'react'
import picture from '../../../static/assets/images/auth/image.jpg'

export default class About extends Component {
    render() {
    return (
            <div className='content-page-wrapper'>
                <div className="left-column"
                     style={{
                        background: "url(" + picture + ") no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }} >
                </div>
                <div className="right-column">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempora, at? Blanditiis cupiditate voluptatum hic eum deserunt. Hic, eligendi officiis fugit non eum, est eaque distinctio similique numquam voluptates quo laboriosam.
                    Fuga culpa cum corrupti natus! Quasi, sunt accusamus? Inventore, iure! Numquam tempore aperiam, quaerat aliquid rem quo optio totam libero odio blanditiis temporibus similique veritatis eligendi. Similique minus quaerat nisi.
                    Magnam cumque, iste quibusdam repudiandae esse expedita repellendus voluptate commodi quo est, perferendis dolorum. Nam omnis explicabo odio laboriosam nostrum voluptatum natus odit cum commodi. Tempore perferendis iure cupiditate totam!
                    Incidunt saepe dolorum facere iusto fugiat dolores quisquam placeat ab voluptatibus sunt non ex sequi possimus rerum quae dicta, at sint nesciunt fuga corporis porro quo exercitationem soluta. Delectus, incidunt!
                </div>
            </div>
        )
    }
}