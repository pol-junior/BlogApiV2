import React from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import Paragraph from './Paragraph'
import BlogHeader from './BlogHeader'
import './Blog.css'

class Blog extends React.Component {
    constructor(props) {
        super(props)
        this.addView = this.addView.bind(this)
        this.state = {
            id: props.match.params.id,
            data: {}
        }
    }

    async componentDidMount() {
        const response = await fetch(`api/article/${this.state.id}`)
        const blog = await response.json();
        this.setState({ data: blog })
    }


    async addView(){
        const token = sessionStorage.getItem('access_token')
        var blog = this.state.data
        if(isNaN(blog.views)){
            blog.views=1
        }
        blog.views+=1

        await fetch('api/article', {
            method:'PUT',
            headers :{
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(blog)
        })

    }

    render() {


        if (this.state.data.paragraphs != null) {
            var res = this.state.data.paragraphs.map(x => <Paragraph key={x.id} info={x}></Paragraph>)
            this.addView()
            return (
                <div className='blog-div' >
                    <BlogHeader key={this.state.data.id} info={this.state.data}></BlogHeader>
                    <div>
                        {res}
                    </div>
                    <div>
                        <NavLink tag={Link} className="text-white-50 btn btn-info" to="/previewList">Back</NavLink>
                    </div>
                </div>
            )
        }

        return(
            <div>Loading...</div>
        )

        
    }
}

export default Blog