import React from 'react'
import { NavLink, Switch, Link, Route, BrowserRouter as Router } from 'react-router-dom'
import Blog from './Blog'
import Paragraph from './Paragraph'


class Preview extends React.Component {
    constructor(props) {
        super(props)
        const { id, title, imageUrl, paragraphs, date, categoryName,views } = props.info
        this.state = {
            id: id,
            title: title,
            imageUrl: imageUrl,
            text: paragraphs,
            categoryName: categoryName,
            date: new Date(date).toDateString(),
            views: views
        }
    }

    getReadTime() {

        var res = ''
        for (var i = 0; i < this.state.text.length; i++) {
            res += this.state.text[i].text
        }
        return Math.round(res.length / 1000)
        
        
    }

    render() {

        return (
            <>
                <div className='text-white prewiew-card-div'>
                    <div className='prewiew-card-innerdiv'>
                        <NavLink tag={Link} className='text-white-50' to={`/Blog/${this.state.id}`}><h2 className='text-center'>{this.state.title}</h2></NavLink>

                        <pre className='w-75 ml-auto mr-auto mt-4 previe-pre'  style={{ whiteSpace:'pre-wrap'}}>
                            {this.state.text[0].text.slice(0, 150) + '...'}
                        </pre>

                            <div className='ml-auto mr-auto mt-4'>
                            <span className='m-3 h6 text-dark rounded bg-light p-2'>{ this.getReadTime()} min to read</span>
                            <span className='m-3 h6 text-white rounded bg-info p-2'>{this.state.categoryName}   </span>
                            <span className='m-3 h6 text-white rounded bg-success p-2'>{this.state.date}</span>
                            <span className='m-3 h6 text-dark rounded bg-light p-2'>{this.state.views} &#128065;</span>
                            </div>
                    </div>  

                    <img   src={ this.state.imageUrl}/>
                </div>

            </>
        )
    }
}

export default Preview