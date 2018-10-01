import React, { Component } from "react";
import { connect } from 'react-redux';
import { sendPostRequest } from '../../utils/network';
import {  Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import UploadPhoto from '../../components/upload-photo/upload-photo';
import { REGISTER_STEP_1_URL, HEADER_IMAGE_URL } from '../../config/configuration';
import { registerStep1, saveHeaderImage } from '../../screens/sign-up/actions';
import Autocomplete from 'react-google-autocomplete';
import '../../Styles/dashboardCss.css';
import Portfolio from '../portfolio/portfolio';
import ForgotPassword from '../forgot-password/forgot-password';
import MyTask from '../my-task/my-task';
import Skils from '../skills/skills';
import Alert from '../alert/alert'
/**
 * Content of Signup screen.
 */
class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: this.props.user.password,
            contact: this.props.user.contact,
            email: this.props.user.email,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            city: this.props.user.city,
            roleId: this.props.user.roleId,
            categories: this.props.user.categories,
            description: this.props.user.description,
            imgUrl: this.props.user.imageUrl,
            isLoading: false,
            activeIndex: (this.props.location.state && this.props.location.state.activeIndex) ? this.props.location.state.activeIndex : 0,
            headerImage: this.props.user.headerImage,
            showTaskMenu: false
        }


    }

    onInputChange = (e, name) => {
        this.setState({ [name]: e.target.value })
    }
    onCitySelect(data) {
        console.log(data);
        this.setState({ city: {
            City: data.formatted_address,
            lat: data.geometry.location.lat(),
            lon: data.geometry.location.lng()
        }});
    }
    onImageUploadSuccess = (_imageUrl) => {
        this.props.saveImage(_imageUrl);
        this.setState({ imgUrl: _imageUrl })
    }
    onHeaderImageUploadSuccess = (_imageUrl) => {
        this.props.saveHeaderImage(_imageUrl);
        this.setState({ headerImage: _imageUrl })
    }


    onLoaderChange = (_loaderBoolean) => {
        this.setState({ isLoading: _loaderBoolean });
    }

    onSubmit = (event) => {
        event.preventDefault();
        let postData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            roleId: this.state.roleId,
            token: this.props.user.token
        }
        this.setState({ isLoading: true });
        sendPostRequest(REGISTER_STEP_1_URL, postData).then((res) => {
            if (res.status === 200) {
                this.props.registerStep1(postData);
                showMessage('success', 'Details Updated Successfully');
            }
            this.setState({ isLoading: false });
        })
            .catch((error) => {
                showMessage('error', 'Something went wrong');
                this.setState({ isLoading: false });
            })
    }

    setActiveIndex(_index) {
        this.setState({ activeIndex: _index });
    }

    onRadioChange = (index) => {
        this.setState({ roleId: index })
    }
    render() {
        if (this.state.loginSuccess) {
            if (this.props.user.active === 1)
                return <Redirect to={'/register-step-1'} />;
            else
                return <Redirect to={'/verify?isEmailVerified=' + this.props.user.active} />;
        }
        return (

            <div className="signup-screen">
                <Loader loading={this.state.isLoading} />
                <ToastContainer autoClose={3000} />
                <div className="container-fluid dashboardBg">
                    <h1>Edit Profile</h1>
                    <hr />
                    <div id="wrapper" className="dashboard">
                        <div id="sidebar-wrapper">
                            <ul className="sidebar-nav">
                                <li className="sidebar-brand">
                                    <a href="#">
                                        <UploadPhoto

                                            imageUrl={this.state.imgUrl}
                                            onImageUploadSuccess={this.onImageUploadSuccess}
                                            onLoaderChange={this.onLoaderChange} />
                                        <span className="userName">{this.props.user.firstName + ' ' + this.props.user.lastName}</span>
                                    </a>
                                </li>
                                <li className={(this.state.activeIndex === 0) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(0) }}>Profile Settings</a>
                                </li>
                                <ul className="subMenu">
                                    <li className={(this.state.activeIndex === 11) ? "active-user-dashboard" : ""}>
                                        <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(11) }}>Mobile</a>
                                    </li>
                                    {/* <li className={(this.state.activeIndex === 12)? "active-user-dashboard": ""}>
                        <a href="javascript:void(0)" onClick={(e)=>{this.setActiveIndex(12)}}>Change Password</a>
                        </li> */}
                                    <li className={(this.state.activeIndex === 13) ? "active-user-dashboard" : ""}>
                                        <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(13) }}>Badges </a>
                                    </li>

                                    <li className={(this.state.activeIndex === 14) ? "active-user-dashboard" : ""}>
                                        <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(14) }}>Skills </a>
                                    </li>

                                    <li className={(this.state.activeIndex === 15) ? "active-user-dashboard" : ""}>
                                        <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(15) }}>Portfolio </a>
                                    </li>

                                </ul>


                                <li className={(this.state.activeIndex === 1) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(1) }}>Payments</a>
                                </li>
                                <li className={(this.state.activeIndex === 2) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setState({showTaskMenu: !this.state.showTaskMenu}) }}>My Task</a>
                                   {(this.state.showTaskMenu)?
                                     <ul>
                                        <li><a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(2) }}>Pending Task</a></li>
                                        <li><a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(2.1) }}>Approved Task</a></li>
                                    </ul>
                                    :''
                                   }
                                </li>
                                <li className={(this.state.activeIndex === 3) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(3) }}>Refer a friend</a>
                                </li>
                                <li className={(this.state.activeIndex === 4) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(4) }}>Notifications</a>
                                </li>
                                <li className={(this.state.activeIndex === 5) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(5) }}>My Alerts</a>
                                </li>
                                <li className={(this.state.activeIndex === 6) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(6) }}>Advertisement Section of Taskmafia</a>
                                </li>
                                <li className={(this.state.activeIndex === 7) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(7) }}>Rating and reviews for user</a>
                                </li>
                                <li className={(this.state.activeIndex === 8) ? "active-user-dashboard" : ""}>
                                    <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(8) }}>All tasks complete till date</a>
                                </li>
                            </ul>
                        </div>
                        <div id="page-content-wrapper">
                            <div className="container-fluid">
                                {/* personal information page */}
                                {(this.state.activeIndex === 0) ?

                                    <div className="DashContent">
                                        <form className="form-horizontal" onSubmit={(e) => { this.onSubmit(e) }}>
                                            <div className="personalInfo box">
                                                <h3 className="subHead">Personal info</h3>
                                                <div className="form-group uploadPic">
                                                    <div className="ImgBlk col-md-2 col-sm-3 col-xs-12">
                                                        <label className="col-lg-12 padd0">Your Avatar</label>
                                                        <UploadPhoto

                                                            imageUrl={this.state.imgUrl}
                                                            onImageUploadSuccess={this.onImageUploadSuccess}
                                                            onLoaderChange={this.onLoaderChange} />
                                                    </div>
                                                    <div className="ImgBlk col-md-2 col-sm-3 col-xs-12">
                                                        <label className="col-lg-12 padd0">Header Image</label>
                                                        <UploadPhoto
                                                            uploadUrl={HEADER_IMAGE_URL}
                                                            imageUrl={this.state.headerImage}
                                                            onImageUploadSuccess={this.onHeaderImageUploadSuccess}
                                                            onLoaderChange={this.onLoaderChange}
                                                            customIdName="headerImage" />
                                                    </div> </div>
                                                <div className="form-group row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                        <label className="">First Name</label>
                                                        <div className="rel">
                                                            <input className="input" type="text" value={this.state.firstName} onChange={(e) => { this.onInputChange(e, 'firstName') }} />
                                                            <span className="border"></span>
                                                        </div>
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                        <label className="">Last Name</label>
                                                        <div className="rel">
                                                            <input className="input" type="text" value={this.state.lastName} onChange={(e) => { this.onInputChange(e, 'lastName') }} />
                                                            <span className="border"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-6 col-sm-6 col-xs-6">
                                                        <label className="">Email</label>
                                                        <input className="input" disabled type="email" value={this.state.email} onChange={(e) => { this.onInputChange(e, 'email') }} />
                                                    </div>
                                                    <div className="col-md-6 col-sm-6 col-xs-6">


                                                        <label className="">Enter your city</label>
                                                        <div className="rel">
                                                            <Autocomplete
                                                                className={'input'}
                                                                type={'text'}
                                                                style={{ width: '100%' }}
                                                                onPlaceSelected={(data) => {
                                                                    this.onCitySelect(data)
                                                                }}
                                                                types={['(regions)']}
                                                                componentRestrictions={{ country: "nz" }}
                                                            // className={'form-control'}
                                                            />
                                                            <span className="border"></span>
                                                            {/* <input className="input" type="text" value={this.state.city} onChange={(e)=>{this.onInputChange(e, 'city')}}/> */}
                                                        </div>

                                                        {/* <div className="group">      
                            
                            <Autocomplete
                                    type={'text'}
                                    style={{ width: '100%' }}
                                    onPlaceSelected={(data) => {
                                        this.onCitySelect(data)
                                    }}
                                    types={['(regions)']}
                                    componentRestrictions={{ country: "nz" }}
                                    // className={'form-control'}
                                />
                                <span className="highlight"></span>
                                <span className="bar"></span>
                                <label for="pwd">Enter Your City</label>
                            </div> */}
                                                    </div>

                                                </div>
                                                <div className="form-group row">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <label className="">About Me</label>
                                                        <div className="rel">
                                                            <textarea className="input"></textarea>
                                                            <span className="border"></span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="form-group row typeBlk">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">
                                                        <label className="col-md-12 padd0">Type</label>

                                                        <div className="radio">
                                                            <input className="input" type="radio" name="optradio" value={1} checked={this.state.roleId === 1} ref="role" onChange={(e) => { this.onRadioChange(1) }} />
                                                            <label>Seeker</label>
                                                        </div>
                                                        <div className="radio">
                                                            <input type="radio" name="optradio" value={2} checked={this.state.roleId === 2} ref="role" onChange={(e) => { this.onRadioChange(2) }} />
                                                            <label>Tasker</label>
                                                        </div>
                                                        <div className="radio">
                                                            <input type="radio" name="optradio" value={3} checked={this.state.roleId === 3} ref="role" onChange={(e) => { this.onRadioChange(3) }} />
                                                            <label>Both</label>
                                                        </div>
                                                    </div></div>
                                                <div className="form-group row ">
                                                    <div className="col-md-12 col-sm-12 col-xs-12">

                                                        <div className="btnGroup">

                                                            <input className="actionBtn lightBlue hvr-grow-shadow" value="Save Changes" contentEditable="false" onClick={(e) => { this.onSubmit(e) }} />

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {/* password */}
                                            {/* { (this.state.activeIndex === 12) ? */}
                                            
                                            <ForgotPassword />
                                            {/* :''} */}

                                            {/* password */}

                                            <div className="btnGroup MarT">

                                                <input className="actionBtn redBtn hvr-grow-shadow deactivate" value="Deactivate Account" contentEditable="false" onClick={(e) => { this.onSubmit(e) }} />
                                                <input className="actionBtn redBtn hvr-grow-shadow" value="Delete Account" onClick={(e) => { this.onSubmit(e) }} />
                                            </div>


                                        </form>

                                    </div>

                                    : ''
                                }
                                {/* mobile */}
                                {(this.state.activeIndex === 11) ?
                                    <div className="mobile box">
                                        <h3 className="subHead">Mobile Verification</h3>
                                        <p>Let's stay in touch. Enter your mobile number below so you can receive SMS updates about your tasks.</p>

                                        <div className="form-group row verificationBlk">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <span className="blueTxt semibold">Verified mobile number</span>
                                                <div className="rel">
                                                    <input className="input" disable type="text" />
                                                    <span className="border"></span>
                                                </div>
                                            </div>
                                            <div className="col-md-6 col-sm-6 col-xs-6">
                                                <button className="redBtn hvr-grow-shadow">Remove</button> <button className="lightBtn hvr-grow-shadow">Edit</button>
                                            </div>
                                        </div>

                                        <p>This will allow you to make or receive calls through Task Mafia when you have a task in progress.</p>
                                        <p>We'll never display your mobile number. Calls are connected through Task Mafia and will go directly to your mobile.</p>
                                        <p>Would you like to enable free calls?</p>

                                        <button className="lightBlue hvr-grow-shadow">Yes</button> <button className="lightBtn hvr-grow-shadow">No</button>



                                    </div>
                                    : ''}

                                {/* mobile */}


                                {/* badges */}
                                {(this.state.activeIndex === 13) ?
                                    <div className="badges box">
                                        <h3 className="subHead">Badges</h3>
                                        <p>Badges help members be sure who you are and what you can do! The more you collect, the more Job
                                  Posters and Taskers will trust in your abilities.</p>
                                        <p>Badges are issued when specific requirements are met. A green tick shows that the verification is currently active.</p>
                                        <h4 className="badgesHead">Apply for ID Badges</h4>
                                        <div className="badgesBlk">
                                            <div className="form-group row">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <h5 className="blueTxt semibold">Phone verification badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <h5 className="blueTxt semibold">Facebook verification badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12 MarT">
                                                    <h5 className="blueTxt semibold">Police verification badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12 MarT">
                                                    <h5 className="blueTxt semibold">Real Me verification badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <br />
                                        <hr />
                                        <br />
                                        <h4 className="badgesHead">Apply for License Badges</h4>
                                        <div className="badgesBlk">
                                            <div className="form-group row">
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <h5 className="blueTxt semibold">Electrician Badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12">
                                                    <h5 className="blueTxt semibold">Electrician Badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12 MarT">
                                                    <h5 className="blueTxt semibold">Gas fitting badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 col-sm-6 col-xs-12 MarT">
                                                    <h5 className="blueTxt semibold">Working with kids badge</h5>
                                                    <p>Provide peace of mind to other members by successfully
                                completing a Police Check</p>
                                                    <div className="btnGroup MarB">
                                                        <input className="actionBtn lightBlue hvr-grow-shadow" value="Add" />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>



                                    </div>
                                    : ''}

                                {/* badges */}
                                {/* skills */}
                                {(this.state.activeIndex === 14) ?
                                    <Skils />

                                    : ''}

                                {/* skills */}
                                {/* portfolio */}
                                {(this.state.activeIndex === 15) ?
                                    <Portfolio />

                                    : ''}

                                {/* portfolio */}
                                {/* personal information page */}
                                {/* Notification page */}
                                {(this.state.activeIndex === 4) ?
                                    <div className="notificationPage box">
                                        <h3 className="subHead">Notification</h3>
                                        <div className="block">
                                            <h5>TRANSACTIONAL</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">You will always receive important notifications about any payments,
                                cancellations and your account.</div>

                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="block">
                                            <h5>TASK UPDATES</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">Receive updates on any new comments,
                                private messages, offers and reviews.</div>
                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="block">
                                            <h5>TASK REMINDERS</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">
                                                    Friendly reminders if you’ve forgotten to accept an offer, release a payment or leave a review.</div>
                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="block">
                                            <h5>Taskmafia ALERTS</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">
                                                    Once you’ve set up your Taskmafia Alerts, you’ll be instantly notified when a task is
                                posted that matches your requirements.</div>
                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <div className="block">
                                            <h5>TASK RECOMMENDATIONS</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">
                                                    Receive recommendations and be inspired by tasks close to you.</div>
                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block">
                                            <h5>HELPFUL INFORMATION</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">
                                                    Learn about how to earn more and find the right people for your tasks with helpful tips and advice.</div>
                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="block">
                                            <h5>UPDATES & NEWSLETTERS</h5>
                                            <div className="row">
                                                <div className="colmd-8 col-sm-7 col-xs-12">
                                                    Be the first to hear about new features and exciting updates on taskMafia.</div>
                                                <div className="col-md-4 col-sm-5 col-xs-12 notification-options">
                                                    <div className="checkbox-item ">
                                                        <input type="checkbox" value="on" />
                                                        <label>Email </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" /><label>  SMS  </label>
                                                    </div>
                                                    <div className="checkbox-item">
                                                        <input type="checkbox" value="on" />
                                                        <label> Push</label>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    : ''}
                                {/* Notification page */}

                                {/* Refer a friend */}
                                {(this.state.activeIndex === 3) ?
                                    <div className="referFriend box">
                                        <h3 className="subHead">Get free Taskmafia Credit</h3>
                                        <h4>You’ve got $0 Taskmafia Credit right now. Time to refer
                                            some friends!</h4>
                                        <h4 className="MarT blueTxt center">How referrals work</h4>
                                        <div className="row process">
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="block">
                                                    <span className="numberTxt">01</span>
                                                    <h4>Invite your friends</h4>
                                                    <p>Your friend signs up using your referral code.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="block">
                                                    <span className="numberTxt">02</span>
                                                    <h4> Their first task is done</h4>
                                                    <p>After joining Taskmafia, they post a task
                                                and get it completed.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-4 col-sm-4 col-xs-12">
                                                <div className="block">
                                                    <span className="numberTxt">03</span>
                                                    <h4>You get $10 credit</h4>
                                                    <p>For every friend you refer, you get $20 Taskmafia
                                                    Credit.</p>
                                                </div></div>
                                        </div>
                                        <p className="MarT">*Terms & Conditions apply.</p>
                                        <p>*Referral Coupons may be used in the purchase of a Task on the Taskmafia Platform.
                                            Referred Member must become an Task Mafia User and agree to the Taskmafia Terms & Conditions.
                                             Minimum Task value to receive the benefit conferred by the Referral Coupon is $50.
                                             Limit of one Referral Coupon per User & valid only for the first Task Contract created
                                             by the Referred Member. Cannot be used with any other coupon or Taskmafia promotion.
                                             Referral Coupons are valid for at least 30 days from issue and Taskmafia may change or
                                             cancel the terms of the Referral Coupon at any time on 30 days' notice.
                                                    </p>
                                        <p>
                                            The Referring Member will receive a $10 Task credit towards the purchase of tasks on
                                             the Taskmafia Platform, when the Referred Member has completed their first Task Contract.
                                              The Task credit is valid for 12 months from issue, and is valid for the payment of
                                              Posted Tasks on the Taskmafia Platform. Posted Tasks must comply with Terms & Conditions.
                                               Limit of 15 x $10 Task credits issued per Referring Member. Taskmafia may change or
                                                cancel the terms of the Task credit at any time on 30 days' notice.
                                                                                                    </p>


                                    </div>
                                    : ''}

                                {/* Refer a friend */}
                                {/* Payment Section */}
                                {(this.state.activeIndex === 1) ?
                                    <div className="paymentPage box">
                                        <h3 className="subHead">Payment</h3>
                                        <div className="">
                                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="terms-tab" data-toggle="tab" href="#terms" role="tab" aria-controls="terms" aria-selected="true">Make Payment</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="false">Receive Payment</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a className="nav-link" id="safety-tab" data-toggle="tab" href="#safety" role="tab" aria-controls="safety" aria-selected="false">Payment History</a>
                                                </li>

                                            </ul>
                                            <div className="tab-content" id="myTabContent">
                                                <div className="tab-pane fade in active" id="terms" role="tabpanel" aria-labelledby="terms-tab"><p>When you are ready to accept a Tasker's offer, you will be required to pay for the task using Task Mafia Pay.
   Payment will be held securely until the task is complete and you release payment to the Tasker.</p>
                                                    <br />
                                                    <div className="row cardBlk">
                                                        <div className="col-md-6 col-sm-6 col-xs-6">
                                                            <div className="blueTxt semibold">Credit Card</div>
                                                            <div className="credit-card-details-component">
                                                                <div className="add-credit-card">
                                                                    <a data-ui-test="add-credit-card-button">
                                                                        <i className="glyphicon glyphicon-plus plusBg"></i>
                                                                        <span>Add your credit card</span>
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6 col-sm-6 col-xs-6 ">
                                                            <div className="blueTxt semibold">Taskmafia Card</div>
                                                            <p>Task Credit balance : <span className="blueTxt semibold"> $0 </span><button className="lightBlue hvr-grow-shadow">Redeem your Taskmafia card</button></p>
                                                        </div>
                                                    </div>
                                                    <p>The Task Credit balance from Taskmafia Cards will be automatically applied when you accept an offer on a task. Each card will expire 12 months from the date of registration.
        Any unused amount after expiry day will not be refunded or credited.</p>

                                                </div>


                                                <div className="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
                                                    <p> Once a task is completed, you will be able to request payment from the
      Job Poster, who will then release it to your nominated account.</p>
                                                    <dl>
                                                        <dt className="bold">   BILLING ADDRESS</dt>
                                                        <dt>   Address Line 1 xyzxyzcyzc</dt>
                                                        <dt>   Suburb Xyzxyz</dt>
                                                        <dt>   State xyz</dt>
                                                        <dt>   Postcode 1234</dt>
                                                        <dt>   Country India</dt>

                                                    </dl>
                                                    <button className="redBtn hvr-grow-shadow">Remove</button>
                                                    <br />
                                                    <p>     For account verification purposes, your address will never be shown publicly.</p>
                                                    <dl>
                                                        <dt className="bold">    BANK ACCOUNT DETAILS</dt>
                                                        <dt>    Account Holder Name Shweta</dt>
                                                        <dt>    Account Number ****-5698</dt>
                                                        <dt>    Currently Active</dt>
                                                    </dl>
                                                    <button className="redBtn hvr-grow-shadow">Remove</button>
                                                </div>
                                                <div className="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">Your payment is always secure, taskmafia is built to protect your peace of mind.</div>

                                            </div>

                                        </div>

                                    </div>
                                    : ''}
                                {/* payment Section */}
                                {/* my alerts */}

                                {(this.state.activeIndex === 5) ?
                                    <Alert />
                                    : ''}

                                {/* my alerts */}
                                {/* Review rating */}
                                {(this.state.activeIndex === 7) ?
                                    <div className="review box">
                                        <h3 className="subHead">Rating and reviews for user</h3>
                                        <div className="row">
                                            <div className="col-md-12 col-sm-12 col-xs-12">
                                                <div className="col-md-1 col-sm-2 col-xs-3">

                                                    <img src="../images/personeimage.jpg" className="personimage " />

                                                </div>

                                                <div className="col-md-11 col-sm-10 col-xs-9">
                                                    <p className="bold">James Rozer <span className="right">
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star checked"></span>
                                                        <span className="fa fa-star"></span>
                                                        <span className="fa fa-star"></span></span></p>
                                                    <p>Donec rutrum congue leo eget malesuada. Quisque velit nisi,
                                pretium ut lacinia in, elementum id enim vivamus.</p>


                                                </div>

                                            </div>





                                            <div className="col-md-12 col-sm-12 col-xs-12 grid-margin">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h3 className="subHead">Rating and reviews for user</h3>
                                                        <div className="fluid-container">
                                                            <div className="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
                                                                <div className="col-md-1">
                                                                    <img className="img-sm rounded-circle mb-4 mb-md-0" src="images/faces/face1.jpg" alt="profile image" />                      </div>
                                                                <div className="ticket-details col-md-9">
                                                                    <div className="d-flex">
                                                                        <p className="text-dark font-weight-semibold mr-2 mb-0 no-wrap">James :</p>
                                                                        <p className="text-primary mr-1 mb-0">[#23047]</p>
                                                                        <p className="mb-0 ellipsis">Donec rutrum congue leo eget malesuada.</p>
                                                                    </div>
                                                                    <p className="text-gray ellipsis mb-2">Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim
                                                                      vivamus.
                        </p>
                                                                    <div className="row text-gray d-md-flex d-none">
                                                                        <div className="col-4 d-flex">
                                                                            <small className="mb-0 mr-2 text-muted text-muted">Last responded :</small>
                                                                            <small className="Last-responded mr-2 mb-0 text-muted text-muted">3 hours ago</small>
                                                                        </div>
                                                                        <div className="col-4 d-flex">
                                                                            <small className="mb-0 mr-2 text-muted text-muted">Due in :</small>
                                                                            <small className="Last-responded mr-2 mb-0 text-muted text-muted">2 Days</small>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="ticket-actions col-md-2">
                                                                    <div className="btn-group dropdown">
                                                                        <button type="button" className="btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                            Manage
                         </button>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    : ''}
                                    {
                                        (this.state.activeIndex === 2) ? 
                                             (
                                                <MyTask status="pending"/>
                                            )
                                            : ''
                                    }
                                    {
                                        (this.state.activeIndex === 2.1) ? 
                                             (
                                                <MyTask status="approved"/>
                                            )
                                            : ''
                                    }

                                {/* review */}


                            </div> </div>
                    </div> </div>  </div>



        );
    }
}


const mapStateToProps = state => ({
    user: state.User


});

const mapDispatchToProps = dispatch => ({
    registerStep1: (data) => { dispatch(registerStep1(data)) },
    saveHeaderImage: (data) => { dispatch(saveHeaderImage(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
