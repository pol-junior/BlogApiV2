import React from "react"
import LoginUp from './LoginUp'
import LoginIn from './LoginIn'
import UserProfile from './UserProfile'
import './LoginStyle.css'
class LoginComponetn extends React.Component {
    constructor(props) {
        super(props)
    }

    SingUp() {
        document.getElementById('container').classList.add("right-panel-active");
    }

    SingIn() {
        document.getElementById('container').classList.remove("right-panel-active")
    }

    render() {
        const token = sessionStorage.getItem('access_token')
        if (!token) {
            return (
                <div className='LoginComponent m-5'>
                    <div class="container" id="container">

                        <div class="form-container sign-up-container">
                            <LoginUp></LoginUp>
                        </div>

                        <div class="form-container sign-in-container">
                            <LoginIn></LoginIn>
                        </div>

                        <div class="overlay-container">
                            <div class="overlay">
                                <div class="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button class="ghost" onClick={this.SingIn} id="signIn">Sign In</button>
                                </div>
                                <div class="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <button class="ghost" onClick={this.SingUp} id="signUp">Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )
        }
        else{
            return(<UserProfile></UserProfile>)
        }
    }
}

export default LoginComponetn