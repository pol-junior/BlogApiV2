import React from 'react';
import { NavLink, Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import InputParagraph from './InputParagraph'


class ArticleInput extends React.Component {
    constructor(props) {
        super(props)
        this.onChange = this.onChange.bind(this)
        this.onClic = this.onClic.bind(this)
        this.state = {
            title: '',
            imageUrl: '',
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
        if (this.state.formErrors!='' && this.state.title!='') {
            const response = await fetch('api/Article', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title: this.state.title, imageUrl: this.state.imageUrl })
            })
            const data = await response.json();
            this.setState({ article: data })
        }

    }

    render() {
        const id =  this.state.article.id
        console.log(id)
        if (id != undefined) {
            return (<div className = 'bg-dark'>
                        <InputParagraph id={id} keu={id} />
                   </div>
            )

        }

        return (
            <>
                <form className='bg-dark w-50 m-auto p-4'>
                    <div>
                        <label className='form-label text-white'>Title</label>
                        <input type='text' className='form-control has-validation' name='title' onChange={this.onChange} required ></input>
                        <div className='valid-feedback'>
                            Nice as
                        </div>
                    </div>

                    <div>
                        <label className='form-label text-white'>Image url</label>
                        <input type='url' className='form-control has-validation' name='imageUrl' onChange={this.onChange} required ></input>
                    </div>

                    <button type='submit' className='btn btn-primary mt-4 w-25' onClick={this.onClic}>Add</button>

                </form>


                <Router>
                    <Switch>
                        <Route path='/InputParagraph/:id' component={InputParagraph}></Route>
                    </Switch>
                </Router>
            </>
        )
       
    }

}

export default ArticleInput