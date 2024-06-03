import React, { Component } from 'react'

import { Link } from 'react-router-dom'

import NavMenu from '../NavMenu/NavMenu'
import SearchBar from '../SearchBar/SearchBar'
import logo from '../../../assets/images/logo_2.png'
import GenreDropdown from '../GenreDropdown/GenreDropdown'

import './Header.scss'

export class Header extends Component {
    static displayName = Header.name

    constructor(props) {
        super(props)
        this.state = {
            collapsed: true,
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        })
    }

    render() {
        return (
            <header>
                <div className='header fixed-top navbar navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3'>
                    {/* Logo */}
                    <Link className='header__brand' to='/'>
                        <img src={logo} alt='RaoVat.net' />
                    </Link>

                    {/* Danh mục */}
                    <GenreDropdown />

                    {/* Search bar */}
                    <SearchBar />

                    {/* Navmenu */}
                    <NavMenu />
                </div>
            </header>
        )
    }
}
