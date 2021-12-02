import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import PreviewList from './components/PreviewList'
import ArticleInput from './components/ArticleInput'
import Blog from './components/Blog'
import AuthorizeComponent from './components/AuthorizeComponent'
import UserProfile from './components/UserProfile';
import './custom.css'


export default class App extends Component {
    static displayName = App.name;

  render () {
    return (
      <Layout>
            <Route exact path='/' component={Home} />
            <Route path='/previewList' component={PreviewList} />
            <Route path='/articleInput' component={ArticleInput} />
            <Route path='/Blog/:id' component={Blog} />
            <Route path='/Login' component={AuthorizeComponent} />
            <Route path='/UserProfile/:id' component={UserProfile} />
      </Layout>
    );
  }
}
