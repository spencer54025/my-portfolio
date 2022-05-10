import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


const PortfoliosidebarList = (props) => {
    const portfolioList = props.data.map(portfolioItem => {
        return (
            <div
             className='portfolio-item'
             key={portfolioItem.id}
             >
            <div className='portfolio-img'>
                <img src={portfolioItem.thumb_image_url} />
            </div>
            <div className="text-content">
                <div className='title'>{portfolioItem.name}</div>
                <div className="action-icon">
                    <a onClick={() => props.handleEdit(portfolioItem)}><FontAwesomeIcon icon="edit" /></a>
                </div>
                <div className="action-icon">
                    <a onClick={() => props.handleDelete(portfolioItem)}>
                        <FontAwesomeIcon icon="trash" />
                    </a>
                </div>
            </div>
            </div>
        )
    })

    return(
        <div className='portfolio-sidebar-wrapper'>{portfolioList}</div>
    )
}

export default PortfoliosidebarList