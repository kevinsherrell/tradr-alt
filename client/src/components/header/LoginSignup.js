import React from 'react'
import {connect} from 'react-redux'
import ReactDOM from 'react-dom'
import {userLogin, userSignup} from "../../actions/authActions";

class LoginSignup extends React.Component {
    state = {
        signup: false,
        login: true,
        firstName: "",
        lastName: "",
        email: "",
        location: "",
        password: "",
        confirmPassword: "",
        zipCode: "",
        image: []
        // added -  file to state
        // file: null
    };
    form = React.createRef();
    onSubmitSignup = (e) => {
        e.preventDefault();
        this.fileUpload()
    }

    fileUpload = (closeMenu) => {
        closeMenu = this.props.toggleLoginSignup;
        const formData = new FormData(ReactDOM.findDOMNode(this.form.current))
        this.props.userSignup(formData, closeMenu)
        console.log("formData", formData)
    }

    onFileChange = (e) => {
        this.setState({
            image: [...this.state.image, e.target.files[0]]
        })
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    };
    onSubmitLogin = (e, closeMenu) => {
        e.preventDefault();


        let loginData = {
            email: this.state.email,
            password: this.state.password
        }
        closeMenu = this.props.toggleLoginSignup;
        this.props.userLogin(loginData, closeMenu)
    }



    render() {
        return (
            <>
                <div className="login-signup__overlay" onClick={this.props.toggleLoginSignup}></div>
                <div className="login-signup">
                    <i className="material-icons login-signup__close-icon"
                       onClick={this.props.toggleLoginSignup}>close</i>
                    <div className="container">

                        <h3 className="login-signup__logo">trad'r</h3>
                        <h4 className="login-signup__sub-header">The #1 online bartering platform</h4>

                        {this.props.signup && (
                            <form className="login-signup__signup-form" ref={this.form}>
                                <div className="signup-form__row-1">
                                    <div className="signup-form__first-name">
                                        <input type="text" name={'firstName'} className="signup-form__first-name-input"
                                               value={this.state.firstName} onChange={this.onChange}
                                               placeholder={"First Name"} disable={!this.props.signup && "disable"}/>
                                    </div>
                                    <div className="signup-form__last-name">
                                        <input type="text" name={'lastName'} className="signup-form__last-name-input"
                                               value={this.state.lastName} onChange={this.onChange}
                                               placeholder={"Last Name"}/>
                                    </div>
                                </div>
                                <div className="signup-form__row-2">
                                    <div className="signup-form__email">
                                        <input type="text" name={'email'} className="signup-form__email-input"
                                               value={this.state.email} onChange={this.onChange} placeholder={"Email"}/>
                                    </div>
                                    <div className="signup-form__password">
                                        <input type="password" name={'password'} className="signup-form__password-input"
                                               value={this.state.password} onChange={this.onChange}
                                               placeholder={"Password"}/>

                                    </div>
                                    <div className="signup-form__password-confirmation">
                                        <input type="password" name={'confirmPassword'}
                                               className="signup-form__password-confirmation-input"
                                               value={this.state.confirmPassword} onChange={this.onChange}
                                               placeholder={"Confirm Password"}/>
                                    </div>
                                </div>
                                <div className="signup-form__row-3">
                                    <div className="signup-form__location">
                                        <input type="text" name={'zipCode'} maxLength={"5"}
                                               className="signup-form__location-input" value={this.state.zipCode}
                                               onChange={this.onChange} placeholder={"Location (Zip Code)"}/>
                                    </div>
                                </div>
                                {/*FILE UPLOAD*/}
                                <div className="signup-form__row-4">
                                    <div className="signup-form__location">
                                        <input
                                            type="file"
                                            name={'userImage'}
                                            className="signup-form__location-input"
                                            onChange={this.onFileChange}
                                        />
                                    </div>
                                </div>
                                {/*=====================================================================================*/}

                                <p className={"signup-form__submit"} onClick={(e) => this.onSubmitSignup(e)}>Sign up</p>
                                <p className="signup-form__login-option" onClick={this.props.authMenuToggle}>Already a
                                    member? <span className={"signup-form__login-option-link"}>Log in here!</span></p>
                            </form>
                        )}


                        {/*LOGIN FORM*/}
                        {this.props.login && (
                            <div className="login-signup__login-form">
                                <div className="login-form">
                                    <div className="login-form__email">
                                        <input type="text" name={'email'} className="signup-form__email-input"
                                               value={this.state.email} disabled={this.props.signup && "disabled"}
                                               onChange={this.onChange} placeholder={"Email"}/>
                                    </div>
                                    <div className="login-form__password">
                                        <input type="password" name={'password'} className="login-form__password-input"
                                               value={this.state.password} disabled={this.props.signup && "disabled"}
                                               onChange={this.onChange} placeholder={"Password"}/>
                                    </div>
                                </div>

                                <p className={"login-form__submit"} onClick={(e) => this.onSubmitLogin(e)}> Log In</p>
                                <p className="login-form__signup-option" onClick={this.props.authMenuToggle}>Not a
                                    member? <span className={"login-form__signup-option-link"}>Sign up here!</span></p>
                            </div>
                        )}

                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    listingData: state.listingData
})
export default connect(mapStateToProps, {userLogin, userSignup})(LoginSignup);