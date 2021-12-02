import React from "react";
import UserProfileCard from './UserProfileCard'
import jwt_decode from 'jwt-decode';
import UserProfileHeader from "./UserProfileHeader";
import AuthorizeComponent from './AuthorizeComponent'
class UserProfile extends React.Component {
    constructor(props) {
        super(props)

        if (props.match != undefined) {
            var userId = props.match.params.id
        }
        else {
            userId = null
        }

        this.state = {
            user: {},
            loading: true,
            userId: userId
        }
    }

    async componentDidMount() {
        if (this.state.userId != null) {
            const response = await fetch(`api/user/${this.state.userId}`)
            const user = await response.json()
            console.log(user)
            this.setState({ user: user, loading: false })
        }
        else {
            const token = sessionStorage.getItem('access_token')
            if (token) {
                var decoded = jwt_decode(token)
                const response = await fetch(`api/user/${decoded.userIdClaim}`)
                const user = await response.json()
                console.log(user)
                this.setState({ user: user, loading: false })
            }
        }

    }

   

    render() {

        if (sessionStorage.getItem('access_token') || this.state.userId!=null) {

            if (!this.state.loading) {
                const res = this.state.user.userArticles.map(x => <UserProfileCard info={x}></UserProfileCard>);
                return (
                    <div style={{ backgroundColor: 'black' }}>
                        <UserProfileHeader key={this.state.user.id} info={this.state.user}></UserProfileHeader>
                        <div className='d-flex flex-row' style={{ flexWrap: "wrap" }}>
                            {res}
                        </div>
                    </div>
                )
            }

            return (
                <div className='text-white-50'>
                    <h2>Loading...</h2>
                </div>
            )
        }

        else {
            return (<AuthorizeComponent></AuthorizeComponent>)
        }
    }
}

export default UserProfile