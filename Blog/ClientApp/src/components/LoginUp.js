import React from "react";
import { JsxEmit } from "typescript";
class LoginUp extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClik = this.onClik.bind(this)
        this.state = {
            userName: '',
            email: '',
            password: ''
        }
    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    async onClik() {
        const response = await fetch('api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user:
                {
                    userName: this.state.userName,
                    email: this.state.email
                },
                password: this.state.password
            })
        })

        const user = await response.json()
    }
    render() {
        return (
            <div className='form'>
                <h1>Create Account</h1>
                <div class="social-container">
                    <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
                    <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
                </div>
                <span>or use your email for registration</span>
                <input type="text" name='userName' placeholder="Name" onChange={this.onChange} />
                <input type="email" name='email' email placeholder="Email" onChange={this.onChange} />
                <input type="password" name = 'password' placeholder="Password" onChange={this.onChange} />
                <button onClick = {this.onClik}>Sign Up</button>
            </div>
        )
    }
}

export default LoginUp