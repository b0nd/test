import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/header/header';
import Router from './config/router';
import Footer from './components/footer/footer'
import {withRouter} from 'react-router-dom';  
import 'react-input-range/lib/css/index.css';

// library.add(faStroopwafel)

class App extends Component {
  constructor(props){
    super(props);
  }
  render() {
    return (
      <div>
        <Header />
        <Router />
         {(this.props.location.pathname !== '/dashboard' && this.props.location.pathname !== '/browse-task') ? <Footer /> : ''}
         
      </div>
    );
  }
}

export default withRouter(App);
