import React from "react"
import { NavLink, Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom'
import './BlogHeader.css'


class BlogHeader extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            blog: props.info,
            user: {}
        }
        console.log(this.state)
    }

    async componentDidMount() {
        const response = await fetch(`api/user/${this.state.blog.userId}`)
        const user = await response.json()
        this.setState({ user: user })
        console.log(user)
    }

    render() {
        return (
            <div className='blog-header-div'>

                <div className='blog-header-innerdiv'>
                    <h2>{this.state.blog.title}</h2>
                    <div className='d-flex flex-row'>

                        <div>
                            <img className='user-img raunded' src={this.state.user.imageUrl} />
                           
                        <NavLink tag={Link} className='text-white-50' to={`/UserProfile/${this.state.user.id}`}> <h2 className='user-name'>{this.state.user.userName}</h2></NavLink>

                        </div>

                        <div className='d-flex flex-column text-center'>
                            <span className='m-3 h6 text-white rounded bg-info p-2'>{this.state.blog.categoryName}   </span>
                            <span className='m-3 h6 text-white rounded bg-success p-2'>{  new Date(this.state.blog.date).toDateString()}</span>
                            <span className='m-3 h6 text-dark rounded bg-light p-2'>{this.state.blog.views} &#128065;</span>
                        </div>
                    </div>

                </div>


                <img className='blog-img' src={this.state.blog.imageUrl} />
            </div>
        )
    }
}

export default BlogHeader
