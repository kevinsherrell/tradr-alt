import React, {useContext, useRef, useState} from 'react'
import ReactDOM from 'react-dom'
import {AuthContext} from "../../context/AuthContext";

const LoginSignup = (props) => {
    const auth = useContext(AuthContext);

    const [signup, setSignup] = useState(false);
    const [login, setLogin] = useState(true);
    const [input, setInput] = useState({
        firstName: '',
        lastName: '',
        email: "",
        zipCode: '',
        password: '',
        confirmPassword: '',
    });
    const [image, setImage] = useState([]);


    const lsForm = useRef()
    const onSubmitSignup = (e) => {
        e.preventDefault();
        fileUpload()
    }

    const fileUpload = (closeMenu) => {

        closeMenu = props.toggleLoginSignup;
        const formData = new FormData(ReactDOM.findDOMNode(lsForm.current))
        auth.userSignup(formData, closeMenu)
        console.log("formData", formData)
    }

    const onFileChange = (e) => {
        setImage([...image, e.target.files[0]])
    }


    const onChange = (e) => {
        e.persist()
        setInput({
            ...input, [e.target.name]: e.target.value
        })
        console.log(input)
    };
    const onSubmitLogin = (e, closeMenu) => {
        e.preventDefault();


        let loginData = {
            email: input.email,
            password: input.password
        }
        closeMenu = props.toggleLoginSignup;
        auth.userLogin(loginData, closeMenu)
    }
    return (
        <>
            <div className="login-signup__overlay" onClick={props.toggleLoginSignup}></div>
            <div className="login-signup">
                <i className="material-icons login-signup__close-icon"
                   onClick={props.toggleLoginSignup}>close</i>
                <div className="container">

                    <h3 className="login-signup__logo">trad'r</h3>
                    <h4 className="login-signup__sub-header">The #1 online bartering platform</h4>

                    {props.signup && (
                        <form className="login-signup__signup-form" ref={lsForm}>
                            <div className="signup-form__row-1">
                                <div className="signup-form__first-name">
                                    <input type="text" name={'firstName'} className="signup-form__first-name-input"
                                           value={input.firstName} onChange={onChange}
                                           placeholder={"First Name"} disable={!props.signup && "disable"}/>
                                </div>
                                <div className="signup-form__last-name">
                                    <input type="text" name={'lastName'} className="signup-form__last-name-input"
                                           value={input.lastName} onChange={onChange}
                                           placeholder={"Last Name"}/>
                                </div>
                            </div>
                            <div className="signup-form__row-2">
                                <div className="signup-form__email">
                                    <input type="text" name={'email'} className="signup-form__email-input"
                                           value={input.email} onChange={onChange} placeholder={"Email"}/>
                                </div>
                                <div className="signup-form__password">
                                    <input type="password" name={'password'} className="signup-form__password-input"
                                           value={input.password} onChange={onChange}
                                           placeholder={"Password"}/>

                                </div>
                                <div className="signup-form__password-confirmation">
                                    <input type="password" name={'confirmPassword'}
                                           className="signup-form__password-confirmation-input"
                                           value={input.confirmPassword} onChange={onChange}
                                           placeholder={"Confirm Password"}/>
                                </div>
                            </div>
                            <div className="signup-form__row-3">
                                <div className="signup-form__location">
                                    <input type="text" name={'zipCode'} maxLength={"5"}
                                           className="signup-form__location-input" value={input.zipCode}
                                           onChange={onChange} placeholder={"Location (Zip Code)"}/>
                                </div>
                            </div>
                            {/*FILE UPLOAD*/}
                            <div className="signup-form__row-4">
                                <div className="signup-form__location">
                                    <input
                                        type="file"
                                        name={'userImage'}
                                        className="signup-form__location-input"
                                        onChange={onFileChange}
                                    />
                                </div>
                            </div>
                            {/*=====================================================================================*/}

                            <p className={"signup-form__submit"} onClick={(e) => onSubmitSignup(e)}>Sign up</p>
                            <p className="signup-form__login-option" onClick={props.authMenuToggle}>Already a
                                member? <span className={"signup-form__login-option-link"}>Log in here!</span></p>
                        </form>
                    )}


                    {/*LOGIN FORM*/}
                    {props.login && (
                        <div className="login-signup__login-form">
                            <div className="login-form">
                                <div className="login-form__email">
                                    <input type="text" name={'email'} className="signup-form__email-input"
                                           value={input.email} disabled={props.signup && "disabled"}
                                           onChange={onChange} placeholder={"Email"}/>
                                </div>
                                <div className="login-form__password">
                                    <input type="password" name={'password'} className="login-form__password-input"
                                           value={input.password} disabled={props.signup && "disabled"}
                                           onChange={onChange} placeholder={"Password"}/>
                                </div>
                            </div>

                            <p className={"login-form__submit"} onClick={(e) => onSubmitLogin(e)}> Log In</p>
                            <p className="login-form__signup-option" onClick={props.authMenuToggle}>Not a
                                member? <span className={"login-form__signup-option-link"}>Sign up here!</span></p>
                        </div>
                    )}

                </div>
            </div>
        </>
    )
}
export default LoginSignup