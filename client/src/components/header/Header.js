import React, {useContext, useEffect, useState} from 'react'
import {AuthContext} from "../../context/AuthContext";

import HeaderNav from "./HeaderNav";
import SearchMenu from '../header/SearchMenu'
import LoginSignup from "./LoginSignup";


const Header = (props) => {
    const {authenticated, currentUser} = useContext(AuthContext)
    console.log(currentUser)
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth)
    const [searchToggle, setSearchToggle] = useState(false)
    const [searchMenuFilter, setSearchMenuFilter] = useState(false)
    const [navMenuToggle, setNavMenuToggle] = useState(false)
    const [loginSignup, setLoginSignup] = useState(false)
    const [login, setLogin] = useState(false)
    const [signup, setSignup] = useState(false)

    useEffect(() => {
        /*reports width of the browser every time it is resized, then sets it to state "browserWidth*/
        window.addEventListener('resize', () => {
            setBrowserWidth(window.innerWidth)
        })
    })


    const toggleSearchMenu = () => {
        setSearchToggle(!searchToggle)
        setSearchMenuFilter(false)
    }
    const toggleSearchMenuFilter = () => {
        setSearchMenuFilter(!searchMenuFilter)
    }
    const toggleNavMenu = () => {
        setNavMenuToggle(!navMenuToggle)
    }
    const toggleLoginSignup = () => {
        setLoginSignup(!loginSignup)
        setLogin(false)
        setSignup(false)
    }
    const toggleLogin = () => {
        setLoginSignup(!loginSignup && !loginSignup)
        setLogin(!login)
    }
    const toggleSignup = () => {
        setLoginSignup(!loginSignup && !loginSignup)
        setSignup(!signup)

    }
    const authMenuToggle = () => {
        setLogin(!login)
        setSignup(!signup)
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps.authenticated != this.props.authenticated) {
    //         this.setState({authenticated: this.props.authenticated})
    //     }
    // }


    return (
        <header className={"header"}>
            <HeaderNav
                toggleSearchMenu={toggleSearchMenu}
                toggleSearchMenuFilter={toggleSearchMenuFilter}
                toggleNavMenu={toggleNavMenu}
                toggleLogin={toggleLogin}
                toggleSignup={toggleSignup}
                toggleLoginSignup={toggleLoginSignup}
                authenticated={authenticated}
                browserWidth={browserWidth}
                searchToggle={searchToggle}
                searchMenuFilter={searchMenuFilter}
                navMenuToggle={navMenuToggle}
                loginSignup={loginSignup}
                login={login}
                signup={signup}
            />
            <SearchMenu
                toggleSearchMenu={toggleSearchMenu}
                toggleSearchMenuFilter={toggleSearchMenuFilter}
                toggleNavMenu={toggleNavMenu}
                authenticated={authenticated}
                browserWidth={browserWidth}
                searchToggle={searchToggle}
                searchMenuFilter={searchMenuFilter}
                navMenuToggle={navMenuToggle}
                loginSignup={loginSignup}
                login={login}
                signup={signup}
            />

            {loginSignup && (
                <LoginSignup
                    authMenuToggle={authMenuToggle}
                    toggleLogin={toggleLogin}
                    toggleSignup={toggleSignup}
                    toggleLoginSignup={toggleLoginSignup}
                    authenticated={authenticated}
                    browserWidth={browserWidth}
                    searchToggle={searchToggle}
                    searchMenuFilter={searchMenuFilter}
                    navMenuToggle={navMenuToggle}
                    loginSignup={loginSignup}
                    login={login}
                    signup={signup}
                    {...props}
                />
            )}

        </header>
    )

}

export default Header;

