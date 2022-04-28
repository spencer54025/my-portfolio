import React, {Component} from 'react'
import { NavLink } from 'react-router-dom'
import moment from 'moment'

export default class NavigationContainer extends Component {
    constructor() {
        super()
    }


    render() {
        return(
            <div className='nav-wrapper'>
                <div className='left-side'>
                    <div className="nav-link">
                        <NavLink exact to='/' activeClassName='nav-link-active'>Home</NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink to='/about' activeClassName='nav-link-active'>About</NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink to='/contact' activeClassName='nav-link-active'>Contact</NavLink>
                    </div>
                    <div className='nav-link'>
                        <NavLink to='/blog' activeClassName='nav-link-active'>Blog</NavLink>
                    </div>
                </div>
                <div className='middle'>
                    <div>{moment().format('MMMM Do YYYY')}</div>
                </div>
                <div className='right-side'>
                    Spencer Van Patten
                </div>
            </div>
        )
    }
}