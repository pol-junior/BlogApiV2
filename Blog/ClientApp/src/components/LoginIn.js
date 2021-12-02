import { timers } from "jquery";
import jwt_decode from 'jwt-decode';
import { useHistory } from 'react-router'
import React from "react";
class LoginIn extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClick = this.onClick.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }
    async onClick() {
        const response = await fetch('api/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:
                {
                    email: this.state.email
                },
                password: this.state.password
            })
        })

        const token = await response.json()
        if (token.access_token != undefined) {
            sessionStorage.setItem('access_token', token.access_token)
            this.setState({ password: '', email:'' })
            window.location.reload()
        }

    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    render() {

            return (
                <div className='form'>
                    <h1>Sign in</h1>
                    <div class="social-container">
                        <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                        <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                        <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                    </div>
                    <span>or use your account</span>
                    <input type="email" name='email' onChange={this.onChange} placeholder="Email" />
                    <input type="password" name='password' value={this.state.password} onChange={this.onChange} placeholder="Password" />
                    <a href="#">Forgot your password?</a>
                    <button onClick={this.onClick}>Sign In</button>
                </div>
            )
       
    }
}
export default LoginIn