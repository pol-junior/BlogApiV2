import React from 'react';
import { NavLink, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import jwt_decode from 'jwt-decode';
import InputParagraph from './InputParagraph'
import AuthorizeComponent from './AuthorizeComponent'
import './InputArticle.css'


class ArticleInput extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClic = this.onClic.bind(this)
        this.state = {
            title: '',
            imageUrl: '',
            categoryName: '',
            article: {}
        }

    }

    onChange(e) {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }
    async onClic() {
        const token = sessionStorage.getItem('access_token')
        var decoded = jwt_decode(sessionStorage.getItem('access_token'))
        const response = await fetch('api/Article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + token
            },
            body: JSON.stringify(
                {
                    title: this.state.title,
                    imageUrl: this.state.imageUrl,
                    categoryName: this.state.categoryName,
                    userId: decoded.userIdClaim 
                })
        })

        if(response.ok==true){
            const data = await response.json();
            this.setState({ article: data })
        }
    }

    render() {
       
        const token = sessionStorage.getItem('access_token')
        if (token) {

            const id = this.state.article.id
            if (id != undefined) {
                return (<div className=''>
                    <InputParagraph id={id} key={id} />
                </div>
                )
            }
            
            return (
                <>
                    <div className='bg-white rounded m-auto d-flex flex-row'>
                        <div className='w-50 p-4'>

                            <div >
                                <input type='text' className='mt-4' name='title' onChange={this.onChange}  placeholder='title' ></input>
                            </div>

                            <div  >
                                <input type='text' className='mt-4' name='categoryName' onChange={this.onChange} placeholder='category' ></input>
                            </div>

                            <div >
                                <input type='text' className='mt-4 mb-4' name='imageUrl' onChange={this.onChange} required placeholder='image url' ></input>
                            </div>

                            <button className='m-auto' onClick={this.onClic}>Add</button>
                        </div>
                        <div className='w-50'>
                            <img className='w-100 h-100' src='https://oborot.ru/wp-content/uploads/2021/07/blogs-2.jpg'/>
                        </div>
                    </div>
                    <Router>
                        <Switch>
                            <Route path='/InputParagraph/:id' component={InputParagraph}></Route>
                        </Switch>
                    </Router>
                </>
            )
        }
        else {
            return (
                <AuthorizeComponent></AuthorizeComponent>
            )
        }
    }

}

export default ArticleInput