import React from 'react'
import { NavLink, Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Blog from './Blog'
import Paragraph from './Paragraph'


class Preview extends React.Component {
    constructor(props) {
        super(props)
        const { id, title, imageUrl, paragraphs, date } = props.info
        console.log(paragraphs[0].text)
        this.state = {
            id: id,
            title: title,
            imageUrl: imageUrl,
            text: paragraphs,
            date: new Date(date).toDateString()
        }
    }

    getReadTime() {

        var res = ''
        for (var i = 0; i < this.state.text.length; i++) {

            res += this.state.text[i].text
            console.log(this.state.text[i].text)
        }
        console.log(res.length)
        return Math.round(res.length / 1000)
        
        
    }

    render() {

        return (
            <>
                <div className='text-white-50 bg-dark d-flex flex-row m-4 '>
                    <div className='w-75 d-flex flex-column'>
                        <NavLink tag={Link} className='text-white-50' to={`/Blog/${this.state.id}`}><h2 className='text-center'>{this.state.title}</h2></NavLink>

                        <pre className='w-75 ml-auto mr-auto mt-4 d-block text-white-50'  style={{ whiteSpace:'pre-wrap'}}>
                            {this.state.text[0].text.slice(0, 150) + '...'}
                        </pre>

                            <div className='ml-auto mr-auto mt-2'>
                            <span className='m-5 h6 text-dark rounded bg-light p-2'>{ this.getReadTime()} min to read</span>
                            <span className='m-5 h6 text-white rounded bg-info p-2'>Books   </span>
                            <span className='m-5 h6 text-white rounded bg-success p-2'>{this.state.date}</span>
                            </div>
                    </div>  

                    <img  style={{width:'300px'}} src={ this.state.imageUrl}/>
                </div>

            </>
        )
    }
}

export default Preview