import { timers } from "jquery";
import React from "react";
import './UserHeader.css'
import jwt_decode from 'jwt-decode';
class UserProfileHeader extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.onChange = this.onChange.bind(this)
        this.saveClick = this.saveClick.bind(this)
        this.closeFormClick = this.closeFormClick.bind(this)
        this.renderChangeButton = this.renderChangeButton.bind(this)
        this.renderSubscribeButton = this.renderSubscribeButton.bind(this)
        this.onClickSubscribe = this.onClickSubscribe.bind(this)
        this.state = {
            user: props.info,
            showForm: false,
            imageUrl: ''
        }
    }



    onClick() {
        this.setState({ showForm: true })
    }

    async saveClick() {
        var user = this.state.user;
        user.imageUrl = this.state.imageUrl
        const response = await fetch('api/user', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const userFinal = await response.json()
        this.setState({ user: userFinal, showForm: false })

    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({ [name]: value })
    }

    closeFormClick() {
        this.setState({ showForm: false })

    }

    renderForm() {
        return (
            <div>
                <input type='text' className='input-img' name='imageUrl' placeholder='new profile photo' onChange={this.onChange}></input>
                <div>
                    <button onClick={this.saveClick} >Save</button>
                    <button className='bg-danger border-0' onClick={this.closeFormClick} >CLose</button>
                </div>
            </div>
        )
    }

    renderChangeButton() {
        const token = sessionStorage.getItem('access_token')
        if (token) {
            var decoded = jwt_decode(token)
            if (decoded.userIdClaim == this.state.user.id) {
                return (
                    <button className='add-img-button' onClick={this.onClick} ></button>
                )
            }
        }
    }

    async onClickSubscribe() {
        const token = sessionStorage.getItem('access_token')
        if (token) {
            var decoded = jwt_decode(token)
            const userResponse = await fetch(`api/user/${decoded.userIdClaim}`)
            if (userResponse.ok == true) {
                const user = await userResponse.json()

                if (user.FollowedUsers == null) {
                    user.FollowedUsers = []
                }
                user.FollowedUsers.push(this.state.user)
                const response = await fetch('api/user', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })


            }
        }


    }
    renderSubscribeButton() {
        const token = sessionStorage.getItem('access_token')
        if (token) {
            var decoded = jwt_decode(token)
            if (decoded.userIdClaim != this.state.user.id) {
                return (
                    <button className='mt-4' onClick={this.onClickSubscribe}>Subscribe</button>
                )
            }
        }

    }

    render() {
        return (
            <div className='user-header-div'>
                <div className='d-flex flex-column'>
                    <img className='user-profile-img' src={this.state.user.imageUrl} />
                    {this.renderSubscribeButton()}
                    {this.renderChangeButton()}
                    {this.state.showForm && this.renderForm()}
                </div>

                <div className='user-info-div'>
                    <h1>{this.state.user.userName}</h1>
                    <div className='user-info-innerdiv'>
                        <div>
                            <h5> {this.state.user.userArticles.length} Blogs</h5>
                        </div>

                        <div>
                            <h5> 3 suscribers</h5>
                        </div>

                        <div>
                            <h5> 10 suscribe</h5>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfileHeader