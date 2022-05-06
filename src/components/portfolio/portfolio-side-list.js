import React from 'react'

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
                <h1 className='title'>{portfolioItem.name}</h1>
                <h2>{portfolioItem.id}</h2>
                <a onClick={() => props.handleDelete(portfolioItem)}>
                    Delete
                </a>
            </div>
        )
    })

    return(
        <div className='portfolio-sidebar-wrapper'>{portfolioList}</div>
    )
}

export default PortfoliosidebarList