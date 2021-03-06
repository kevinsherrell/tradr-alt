import React from 'react'

import HeaderNav from "./HeaderNav";
import SearchMenu from '../header/SearchMenu'
import NavMenu from '../header/NavMenu';
import LoginSignup from "./LoginSignup";


class Header extends React.Component {
    state = {
        browserWidth: window.innerWidth,
        searchToggle: false,
        authenticated: false,
        searchMenuFilter: false,
        navMenuToggle: false,
        loginSignup: false,
        login: false,
        signup: false
    }

    componentDidMount() {
        /*reports width of the browser every time it is resized, then sets it to state "browserWidth*/
        window.addEventListener('resize', () => {
            this.setState({
                browserWidth: window.innerWidth
            })
            // console.log(this.state.browserWidth)
        })
    }


    toggleSearchMenu = () => {
        this.setState({
            searchToggle: !this.state.searchToggle,
            searchMenuFilter: false
        })
    }
    toggleSearchMenuFilter = () => {
        this.setState({
            searchMenuFilter: !this.state.searchMenuFilter
        })
    }
    toggleNavMenu = () => {
        this.setState({
            navMenuToggle: !this.state.navMenuToggle
        })
    }
    toggleLoginSignup = () => {
        this.setState({
            loginSignup: !this.state.loginSignup,
            login: false,
            signup: false
        })
        // console.log("working")
    }
    toggleLogin = () => {
        this.setState({
            loginSignup: !this.state.loginSignup && !this.state.loginSignup,
            login: !this.state.login
        })
        // console.log("working")
    }
    toggleSignup = () => {
        this.setState({
            loginSignup: !this.state.loginSignup && !this.state.loginSignup,
            signup: !this.state.signup
        })

    }
    authMenuToggle = () => {
        this.setState({
            login: !this.state.login,
            signup: !this.state.signup
        })
        console.log(this.state.login, this.state.signup)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.authenticated != this.props.authenticated) {
            this.setState({authenticated: this.props.authenticated})
        }
    }

    render() {
        // console.log("Browser Width: " + this.state.browserWidth)

        return (
            <header className={"header"}>
                <HeaderNav
                    toggleSearchMenu={this.toggleSearchMenu}
                    toggleSearchMenuFilter={this.toggleSearchMenuFilter}
                    toggleNavMenu={this.toggleNavMenu}
                    toggleLogin={this.toggleLogin}
                    toggleSignup={this.toggleSignup}
                    toggleLoginSignup={this.toggleLoginSignup}
                    {...this.state}
                />
                <SearchMenu
                    toggleSearchMenu={this.toggleSearchMenu}
                    toggleSearchMenuFilter={this.toggleSearchMenuFilter}
                    toggleNavMenu={this.toggleNavMenu}
                    {...this.state}
                />
                <NavMenu
                    toggleSearchMenu={this.toggleSearchMenu}
                    toggleSearchMenuFilter={this.toggleSearchMenuFilter}
                    toggleNavMenu={this.toggleNavMenu}
                    toggleSignup={this.toggleLogin}
                    {...this.state}
                />
                {this.state.loginSignup && (
                    <LoginSignup
                        authMenuToggle={this.authMenuToggle}
                        toggleLogin={this.toggleLogin}
                        toggleSignup={this.toggleSignup}
                        toggleLoginSignup={this.toggleLoginSignup}
                        {...this.state}
                        {...this.props}
                    />
                )}

            </header>
        )
    }
}

export default Header;

