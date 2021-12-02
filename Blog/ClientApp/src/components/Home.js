import React, { Component } from 'react';
import PreviewList from './PreviewList'
import AuthorizeComponent from './AuthorizeComponent'
import UserProfile from './UserProfile'

export class Home extends Component {
  static displayName = Home.name;

  render () {
      return (
          <>
              <UserProfile></UserProfile>
        </>
    );
  }
}
