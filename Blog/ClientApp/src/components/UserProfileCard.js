import React from "react";
import { NavLink, Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom'
import './ProfileCard.css'


class UserProfileCard extends React.Component {

    constructor(props) {
        super(props)
        const { id } = props.info
        this.state = {
            id: id,
            blog: {},
            loading: true
        }
    }

    async componentDidMount() {
        const response = await fetch(`api/article/${this.state.id}`)
        const blog = await response.json();
        console.log(blog)
        this.setState({ blog: blog, loading: false })

    }

    render() {
        if (!this.state.loading) {
            const res = (
                <div className='card-div'>
                    <img className='card-img' src={this.state.blog.imageUrl} />
                    <div className='card-text-div'>
                      
                        <NavLink tag={Link} className='text-white-50' to={`/Blog/${this.state.id}`}>   <h2 className='text-white-50'>{this.state.blog.title}</h2>  </NavLink>

                        <pre className='text-white-50'>
                            {this.state.blog.paragraphs[0].text.slice(0, 150) + '...'}
                        </pre>
                    </div>
                    <div className='d-flex flex- row'>
                    <span className='m-2 h6 text-dark rounded bg-light p-2'>{this.state.blog.views} &#128065;</span>
                    <span className='m-2 h6 text-white rounded bg-info p-2'>{this.state.blog.categoryName}</span>
                    <span className='m-2 h6 text-white rounded bg-success p-2'>{ new Date(this.state.blog.date).toDateString() }</span>
                    
                    </div>

                </div>
            )

            return res
        }
        return(<h2>Loading</h2>)
    }


}

export default UserProfileCard