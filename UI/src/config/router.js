import { Switch, Route } from 'react-router-dom';
import React, { Component } from "react";
import StaticScreen from '../screens/static-screens/static-screen';
import EmailVarificationScreen from '../screens/email-varification/email-varification';
import Home from '../screens/home/home';
import {staticScreenName} from './configuration'
import Home2 from '../screens/home2/home2';
// import Profile from '../screens/profile/profile';
import Dashboard from '../screens/dashboard/dashboard';
import ProtectedRoute from './protected-route';
import BrowseTask from '../screens/browse-task/browse-task';
import NoMatch from '../screens/no-match/no-match';
import AboutUs from '../screens/about-us/about-us';
import BecomeATasker from '../screens/become-a-tasker/become-a-tasker';
import HowItWorks from '../screens/how-it-works/how-it-works.js';

const getName = (_name)=>{
      let tempName = _name.replace(/ /g, '').replace(/-/,'');
      tempName = tempName.substr(0,1).toLowerCase()+tempName.substr(1);
      return tempName;
}

const Router = () => (
    
        <Switch>
             <Route exact path='/' component={Home} />} 
            
            {(staticScreenName.map(item=>{
                return ( <Route path={`/${getName(item.category)}`} component={StaticScreen} />)   
            }))}
            <Route path='/verify' component={EmailVarificationScreen} />  
            <ProtectedRoute path='/register-step-1' component={Home} />
            <Route path='/register-step-2' component={Home} />  
            <Route path='/home-2' component={Home2} /> 
            <Route path='/about-us' component={AboutUs} /> 
            <Route path='/become-a-tasker' component={BecomeATasker} /> 
            <Route path='/how-it-works' component={HowItWorks} /> 
            <ProtectedRoute path='/dashboard' component={Dashboard} />    
            <Route path='/browse-task' component={BrowseTask} />    
            <Route component={NoMatch} />
        </Switch>
)



export default Router;