import React, { Component } from "react";
import PropTypes from "prop-types";
import Modal from 'react-responsive-modal';
import Signup from '../../screens/sign-up/sign-up';
// import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { connect } from 'react-redux';
import {logout} from '../../screens/sign-up/actions';
import PostATask from '../../screens/post-a-task/post-a-task'
import {withRouter} from 'react-router-dom';  

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isPopupOpen: false,
      isForSignup: true,
      isOpenPostTask: false
    }
    this.isForPostATask =  false;
  }

  showMessage() {
    toast.info("Comming Soon !!", {
      position: toast.POSITION.TOP_RIGHT
      });
  }

  browseTask = () => {
    this.props.history.push("/browse-task");
  }

    onLogout = () => {
    this.props.logout();
    window.localStorage.clear();

  }

  postaTask = () => {
    this.isForPostATask = true;
    this.setState({ isPopupOpen: true });
  }

  onCloseModal = () => {
    this.setState({ isPopupOpen: false });
    this.isForPostATask = false;
  };

  postTaskSuccessCallback = ()=>{
    this.setState({ isPopupOpen: false });
    this.isForPostATask = false;
    this.props.history.push({
      pathname: '/dashboard',
      state: { activeIndex: 2 }
    });
  }

  onPostTaskCloseModal = (_isOpenLogin) => {
    this.setState({ isPopupOpen: false });
    this.isForPostATask = false;
  };

  
  render() {
    return (
      <div className="headerbg">
        <Modal ref="modelRef" closeOnOverlayClick={false} open={this.state.isPopupOpen} onClose={this.onCloseModal} center>
        {(!this.isForPostATask) ? 
          <Signup isForSignup={this.state.isForSignup} onClose={this.onCloseModal} isOpenPostTask={this.state.isOpenPostTask}/>
          :
          <PostATask onPostTaskCloseModal={this.onPostTaskCloseModal} successCallback={this.postTaskSuccessCallback} />
        }
          
        </Modal>

        <ToastContainer autoClose={3000} />
      <nav className="navbar navbar-default header">
      <div className="container">
        <div className="navbar-header">
          <a className="navbar-brand" href="javascript:void(0)" onClick={(e)=>{this.props.history.push("/")}}>
            {/* <img alt="Brand" className="main-logo" src="https://www.taskmafia.com/wp-content/uploads/2018/06/cropped-TM_Logo_Transparent-1.png"/> */}
            <img alt="Brand" className="main-logo" src="images/logo.png"/>
          </a>
        </div>
        <ul className="nav navbar-nav navbar-center topBotomBordersOut">
            <li className="active"><a href="javascript:void(0)" className="post-a-task" onClick={(e)=>this.postaTask()}>Post a Task</a></li>
            <li><a href="javascript:void(0)" onClick={(e)=>this.browseTask()}>Browse Task</a></li>
            <li><a href="javascript:void(0)" onClick={(e)=>this.showMessage()}>How it works</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right topBotomBordersOut">
          <li><a href="javascript:void(0)">Help</a></li>
           {(this.props.user.isLoggedIn)? '':<li><a href="javascript:void(0)" onClick={(e)=>{this.setState({isPopupOpen: true, isForSignup: true})}}>Join</a></li>}
             {(this.props.user.isLoggedIn)?
            <li><Link to={`/`} onClick={(e)=>{this.onLogout()}}><a href="javascript:void(0)">Logout</a></Link></li>:
              <li><a href="javascript:void(0)" onClick={(e)=>{this.setState({isPopupOpen: true, isForSignup: false})}}>Sign in</a></li>
            }
          </ul>
      </div>
    </nav>
    
    </div>
    );
  }
}

const mapStateToProps = state => ({
	user: state.User
 });

const mapDispatchToProps = dispatch => ({
	logout: () => {dispatch(logout())}
    
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
