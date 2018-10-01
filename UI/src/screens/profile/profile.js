// import React, { Component } from "react";
// import { connect } from 'react-redux';
// import { sendPostRequest } from '../../utils/network';
// import {  Loader } from 'react-overlay-loader';
// import 'react-overlay-loader/styles.css';
// import { Redirect } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import { showMessage } from '../../utils/message';
// import UploadPhoto from '../../components/upload-photo/upload-photo';
// import { REGISTER_STEP_1_URL, HEADER_IMAGE_URL } from '../../config/configuration';
// import { registerStep1, saveHeaderImage } from '../../screens/sign-up/actions';
// import Autocomplete from 'react-google-autocomplete';
// import '../../Styles/dashboardCss.css';
// import Portfolio from '../portfolio/portfolio';
// import ForgotPassword from '../forgot-password/forgot-password';
// /**
//  * Content of Signup screen.
//  */
// class Profile extends Component {
//     constructor(props) {
//         super(props);
//         console.log(props);
//         this.state = {
//             password: this.props.user.password,
//             contact: this.props.user.contact,
//             email: this.props.user.email,
//             firstName: this.props.user.firstName,
//             lastName: this.props.user.lastName,
//             city: this.props.user.city,
//             roleId: this.props.user.roleId,
//             categories: this.props.user.categories,
//             description: this.props.user.description,
//             imgUrl: this.props.user.imageUrl,
//             isLoading: false,
//             activeIndex: 0,
//             headerImage: this.props.user.headerImage
//         }


//     }

//     onInputChange = (e, name) => {
//         this.setState({ [name]: e.target.value })
//     }
//     onCitySelect(data) {
//         console.log(data);
//         this.setState({ city: data.formatted_address });
//     }
//     onImageUploadSuccess = (_imageUrl) => {
//         this.props.saveImage(_imageUrl);
//         this.setState({ imgUrl: _imageUrl })
//     }
//     onHeaderImageUploadSuccess = (_imageUrl) => {
//         this.props.saveHeaderImage(_imageUrl);
//         this.setState({ headerImage: _imageUrl })
//     }


//     onLoaderChange = (_loaderBoolean) => {
//         this.setState({ isLoading: _loaderBoolean });
//     }

//     onSubmit = (event) => {
//         event.preventDefault();
//         let postData = {
//             firstName: this.state.firstName,
//             lastName: this.state.lastName,
//             city: this.state.city,
//             roleId: this.state.roleId,
//             token: this.props.user.token
//         }
//         this.setState({ isLoading: true });
//         sendPostRequest(REGISTER_STEP_1_URL, postData).then((res) => {
//             if (res.status == 200) {
//                 this.props.registerStep1(postData);
//                 showMessage('success', 'Details Updated Successfully');
//             }
//             this.setState({ isLoading: false });
//         })
//             .catch((error) => {
//                 showMessage('error', 'Something went wrong');
//                 this.setState({ isLoading: false });
//             })
//     }

//     setActiveIndex(_index) {
//         this.setState({ activeIndex: _index });
//     }

//     onRadioChange = (index) => {
//         this.setState({ roleId: index })
//     }
//     render() {
//         if (this.state.loginSuccess) {
//             if (this.props.user.active == 1)
//                 return <Redirect to={'/register-step-1'} />;
//             else
//                 return <Redirect to={'/verify?isEmailVerified=' + this.props.user.active} />;
//         }
//         return (

//             <div className="signup-screen">
//                 <Loader loading={this.state.isLoading} />
//                 <ToastContainer autoClose={3000} />
//                 <div class="container-fluid dashboardBg">
//                     <h1>Edit Profile</h1>
//                     <hr />
//                     <div id="wrapper" class="dashboard">
//                         <div id="sidebar-wrapper">
//                             <ul class="sidebar-nav">
//                                 <li class="sidebar-brand">
//                                     <a href="#">
//                                         <UploadPhoto

//                                             imageUrl={this.state.imgUrl}
//                                             onImageUploadSuccess={this.onImageUploadSuccess}
//                                             onLoaderChange={this.onLoaderChange} />
//                                         <span class="userName">{this.props.user.firstName + ' ' + this.props.user.lastName}</span>
//                                     </a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 0) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(0) }}>Profile Settings</a>
//                                 </li>
//                                 <ul class="subMenu">
//                                     <li className={(this.state.activeIndex == 11) ? "active-user-dashboard" : ""}>
//                                         <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(11) }}>Mobile</a>
//                                     </li>
//                                     {/* <li className={(this.state.activeIndex == 12)? "active-user-dashboard": ""}>
//                         <a href="javascript:void(0)" onClick={(e)=>{this.setActiveIndex(12)}}>Change Password</a>
//                         </li> */}
//                                     <li className={(this.state.activeIndex == 13) ? "active-user-dashboard" : ""}>
//                                         <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(13) }}>Badges </a>
//                                     </li>

//                                     <li className={(this.state.activeIndex == 14) ? "active-user-dashboard" : ""}>
//                                         <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(14) }}>Skills </a>
//                                     </li>

//                                     <li className={(this.state.activeIndex == 15) ? "active-user-dashboard" : ""}>
//                                         <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(15) }}>Portfolio </a>
//                                     </li>

//                                 </ul>


//                                 <li className={(this.state.activeIndex == 1) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(1) }}>Payments</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 2) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(2) }}>Add a task Buddy</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 3) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(3) }}>Refer a friend</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 4) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(4) }}>Notifications</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 5) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(5) }}>My Alerts</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 6) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(6) }}>Advertisement Section of Taskmafia</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 7) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(7) }}>Rating and reviews for user</a>
//                                 </li>
//                                 <li className={(this.state.activeIndex == 8) ? "active-user-dashboard" : ""}>
//                                     <a href="javascript:void(0)" onClick={(e) => { this.setActiveIndex(8) }}>All tasks complete till date</a>
//                                 </li>
//                             </ul>
//                         </div>
//                         <div id="page-content-wrapper">
//                             <div class="container-fluid">
//                                 {/* personal information page */}
//                                 {(this.state.activeIndex == 0) ?

//                                     <div class="DashContent">
//                                         <form class="form-horizontal" onSubmit={(e) => { this.onSubmit(e) }}>
//                                             <div className="personalInfo box">
//                                                 <h3 class="subHead">Personal info</h3>
//                                                 <div class="form-group uploadPic">
//                                                     <div class="ImgBlk col-md-2 col-sm-3 col-xs-12">
//                                                         <label class="col-lg-12 padd0">Your Avatar</label>
//                                                         <UploadPhoto

//                                                             imageUrl={this.state.imgUrl}
//                                                             onImageUploadSuccess={this.onImageUploadSuccess}
//                                                             onLoaderChange={this.onLoaderChange} />
//                                                     </div>
//                                                     <div class="ImgBlk col-md-2 col-sm-3 col-xs-12">
//                                                         <label class="col-lg-12 padd0">Header Image</label>
//                                                         <UploadPhoto
//                                                             uploadUrl={HEADER_IMAGE_URL}
//                                                             imageUrl={this.state.headerImage}
//                                                             onImageUploadSuccess={this.onHeaderImageUploadSuccess}
//                                                             onLoaderChange={this.onLoaderChange}
//                                                             customIdName="headerImage" />
//                                                     </div> </div>
//                                                 <div class="form-group row">
//                                                     <div class="col-md-6 col-sm-6 col-xs-6">
//                                                         <label class="">First Name</label>
//                                                         <div class="rel">
//                                                             <input class="input" type="text" value={this.state.firstName} onChange={(e) => { this.onInputChange(e, 'firstName') }} />
//                                                             <span class="border"></span>
//                                                         </div>
//                                                     </div>
//                                                     <div class="col-md-6 col-sm-6 col-xs-6">
//                                                         <label class="">Last Name</label>
//                                                         <div class="rel">
//                                                             <input class="input" type="text" value={this.state.lastName} onChange={(e) => { this.onInputChange(e, 'lastName') }} />
//                                                             <span class="border"></span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div class="form-group row">
//                                                     <div class="col-md-6 col-sm-6 col-xs-6">
//                                                         <label class="">Email</label>
//                                                         <input class="input" disabled type="email" value={this.state.email} onChange={(e) => { this.onInputChange(e, 'email') }} />
//                                                     </div>
//                                                     <div class="col-md-6 col-sm-6 col-xs-6">


//                                                         <label class="">Enter your city</label>
//                                                         <div class="rel">
//                                                             <Autocomplete
//                                                                 class={'input'}
//                                                                 type={'text'}
//                                                                 style={{ width: '100%' }}
//                                                                 onPlaceSelected={(data) => {
//                                                                     this.onCitySelect(data)
//                                                                 }}
//                                                                 types={['(regions)']}
//                                                                 componentRestrictions={{ country: "nz" }}
//                                                             // className={'form-control'}
//                                                             />
//                                                             <span class="border"></span>
//                                                             {/* <input class="input" type="text" value={this.state.city} onChange={(e)=>{this.onInputChange(e, 'city')}}/> */}
//                                                         </div>

//                                                         {/* <div class="group">      
                            
//                             <Autocomplete
//                                     type={'text'}
//                                     style={{ width: '100%' }}
//                                     onPlaceSelected={(data) => {
//                                         this.onCitySelect(data)
//                                     }}
//                                     types={['(regions)']}
//                                     componentRestrictions={{ country: "nz" }}
//                                     // className={'form-control'}
//                                 />
//                                 <span class="highlight"></span>
//                                 <span class="bar"></span>
//                                 <label for="pwd">Enter Your City</label>
//                             </div> */}
//                                                     </div>

//                                                 </div>
//                                                 <div class="form-group row">
//                                                     <div class="col-md-12 col-sm-12 col-xs-12">
//                                                         <label class="">About Me</label>
//                                                         <div class="rel">
//                                                             <textarea class="input"></textarea>
//                                                             <span class="border"></span>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div class="form-group row typeBlk">
//                                                     <div class="col-md-12 col-sm-12 col-xs-12">
//                                                         <label class="col-md-12 padd0">Type</label>

//                                                         <div class="radio">
//                                                             <input class="input" type="radio" name="optradio" value={1} checked={this.state.roleId == 1} ref="role" onChange={(e) => { this.onRadioChange(1) }} />
//                                                             <label>Seeker</label>
//                                                         </div>
//                                                         <div class="radio">
//                                                             <input type="radio" name="optradio" value={2} checked={this.state.roleId == 2} ref="role" onChange={(e) => { this.onRadioChange(2) }} />
//                                                             <label>Tasker</label>
//                                                         </div>
//                                                         <div class="radio">
//                                                             <input type="radio" name="optradio" value={3} checked={this.state.roleId == 3} ref="role" onChange={(e) => { this.onRadioChange(3) }} />
//                                                             <label>Both</label>
//                                                         </div>
//                                                     </div></div>
//                                                 <div class="form-group row ">
//                                                     <div class="col-md-12 col-sm-12 col-xs-12">

//                                                         <div class="btnGroup">

//                                                             <input class="actionBtn lightBlue hvr-grow-shadow" value="Save Changes" contentEditable="false" onClick={(e) => { this.onSubmit(e) }} />

//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             {/* password */}
//                                             {/* { (this.state.activeIndex == 12) ? */}
                                            
//                                             <ForgotPassword />
//                                             {/* :''} */}

//                                             {/* password */}

//                                             <div class="btnGroup MarT">

//                                                 <input class="actionBtn redBtn hvr-grow-shadow deactivate" value="Deactivate Account" contentEditable="false" onClick={(e) => { this.onSubmit(e) }} />
//                                                 <input class="actionBtn redBtn hvr-grow-shadow" value="Delete Account" onClick={(e) => { this.onSubmit(e) }} />
//                                             </div>


//                                         </form>

//                                     </div>

//                                     : ''
//                                 }
//                                 {/* mobile */}
//                                 {(this.state.activeIndex == 11) ?
//                                     <div class="mobile box">
//                                         <h3 class="subHead">Mobile Verification</h3>
//                                         <p>Let's stay in touch. Enter your mobile number below so you can receive SMS updates about your tasks.</p>

//                                         <div class="form-group row verificationBlk">
//                                             <div class="col-md-4 col-sm-4 col-xs-12">
//                                                 <span class="blueTxt semibold">Verified mobile number</span>
//                                                 <div class="rel">
//                                                     <input class="input" disable type="text" />
//                                                     <span class="border"></span>
//                                                 </div>
//                                             </div>
//                                             <div class="col-md-6 col-sm-6 col-xs-6">
//                                                 <button class="redBtn hvr-grow-shadow">Remove</button> <button class="lightBtn hvr-grow-shadow">Edit</button>
//                                             </div>
//                                         </div>

//                                         <p>This will allow you to make or receive calls through Task Mafia when you have a task in progress.</p>
//                                         <p>We'll never display your mobile number. Calls are connected through Task Mafia and will go directly to your mobile.</p>
//                                         <p>Would you like to enable free calls?</p>

//                                         <button class="lightBlue hvr-grow-shadow">Yes</button> <button class="lightBtn hvr-grow-shadow">No</button>



//                                     </div>
//                                     : ''}

//                                 {/* mobile */}


//                                 {/* badges */}
//                                 {(this.state.activeIndex == 13) ?
//                                     <div class="badges box">
//                                         <h3 class="subHead">Badges</h3>
//                                         <p>Badges help members be sure who you are and what you can do! The more you collect, the more Job
//                                   Posters and Taskers will trust in your abilities.</p>
//                                         <p>Badges are issued when specific requirements are met. A green tick shows that the verification is currently active.</p>
//                                         <h4 class="badgesHead">Apply for ID Badges</h4>
//                                         <div class="badgesBlk">
//                                             <div class="form-group row">
//                                                 <div class="col-md-6 col-sm-6 col-xs-12">
//                                                     <h5 class="blueTxt semibold">Phone verification badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>
//                                                 <div class="col-md-6 col-sm-6 col-xs-12">
//                                                     <h5 class="blueTxt semibold">Facebook verification badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>
//                                                 <div class="col-md-6 col-sm-6 col-xs-12 MarT">
//                                                     <h5 class="blueTxt semibold">Police verification badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>
//                                                 <div class="col-md-6 col-sm-6 col-xs-12 MarT">
//                                                     <h5 class="blueTxt semibold">Real Me verification badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <br />
//                                         <hr />
//                                         <br />
//                                         <h4 class="badgesHead">Apply for License Badges</h4>
//                                         <div class="badgesBlk">
//                                             <div class="form-group row">
//                                                 <div class="col-md-6 col-sm-6 col-xs-12">
//                                                     <h5 class="blueTxt semibold">Electrician Badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>
//                                                 <div class="col-md-6 col-sm-6 col-xs-12">
//                                                     <h5 class="blueTxt semibold">Electrician Badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>
//                                                 <div class="col-md-6 col-sm-6 col-xs-12 MarT">
//                                                     <h5 class="blueTxt semibold">Gas fitting badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>
//                                                 <div class="col-md-6 col-sm-6 col-xs-12 MarT">
//                                                     <h5 class="blueTxt semibold">Working with kids badge</h5>
//                                                     <p>Provide peace of mind to other members by successfully
//                                 completing a Police Check</p>
//                                                     <div class="btnGroup MarB">
//                                                         <input class="actionBtn lightBlue hvr-grow-shadow" value="Add" />
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>



//                                     </div>
//                                     : ''}

//                                 {/* badges */}
//                                 {/* skills */}
//                                 {(this.state.activeIndex == 14) ?
//                                     <div class="skills box">
//                                         <h3 class="subHead">Skills</h3>
//                                         <p>These are your skills. Keep them updated with any new skills you learn so other
//                                  members can know what you can offer.</p>

//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">What are you good at?</label>
//                                                 <div class="rel">
//                                                     <input class="input" type="text" />
//                                                     <span class="border"></span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">How do you get around?</label>
//                                                 <div class="col-md-12 col-sm-12 col-xs-12 notification-options">

//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Bicycle </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  Car  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Online</label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Scooter</label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Truck</label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Walk</label>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">What languages can you speak/write?</label>
//                                                 <div class="rel">
//                                                     <input class="input" type="text" />
//                                                     <span class="border"></span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">What qualifications have you got?</label>
//                                                 <div class="rel">
//                                                     <input class="input" type="text" />
//                                                     <span class="border"></span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">What's your work experience?</label>
//                                                 <div class="rel">
//                                                     <input class="input" type="text" />
//                                                     <span class="border"></span>
//                                                 </div>
//                                             </div>
//                                         </div>

//                                         <div class="btnGroup row MarT">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <button class="lightBlue hvr-grow-shadow">Save Skills</button>
//                                             </div>

//                                         </div>
//                                     </div>

//                                     : ''}

//                                 {/* skills */}
//                                 {/* portfolio */}
//                                 {(this.state.activeIndex == 15) ?
//                                     <Portfolio />

//                                     : ''}

//                                 {/* portfolio */}
//                                 {/* personal information page */}
//                                 {/* Notification page */}
//                                 {(this.state.activeIndex == 4) ?
//                                     <div class="notificationPage box">
//                                         <h3 class="subHead">Notification</h3>
//                                         <div class="block">
//                                             <h5>TRANSACTIONAL</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">You will always receive important notifications about any payments,
//                                 cancellations and your account.</div>

//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div class="block">
//                                             <h5>TASK UPDATES</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">Receive updates on any new comments,
//                                 private messages, offers and reviews.</div>
//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div class="block">
//                                             <h5>TASK REMINDERS</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">
//                                                     Friendly reminders if you’ve forgotten to accept an offer, release a payment or leave a review.</div>
//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div class="block">
//                                             <h5>Taskmafia ALERTS</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">
//                                                     Once you’ve set up your Taskmafia Alerts, you’ll be instantly notified when a task is
//                                 posted that matches your requirements.</div>
//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                         <div class="block">
//                                             <h5>TASK RECOMMENDATIONS</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">
//                                                     Receive recommendations and be inspired by tasks close to you.</div>
//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="block">
//                                             <h5>HELPFUL INFORMATION</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">
//                                                     Learn about how to earn more and find the right people for your tasks with helpful tips and advice.</div>
//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="block">
//                                             <h5>UPDATES & NEWSLETTERS</h5>
//                                             <div class="row">
//                                                 <div class="colmd-8 col-sm-7 col-xs-12">
//                                                     Be the first to hear about new features and exciting updates on taskMafia.</div>
//                                                 <div class="col-md-4 col-sm-5 col-xs-12 notification-options">
//                                                     <div class="checkbox-item ">
//                                                         <input type="checkbox" value="on" />
//                                                         <label>Email </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" /><label>  SMS  </label>
//                                                     </div>
//                                                     <div class="checkbox-item">
//                                                         <input type="checkbox" value="on" />
//                                                         <label> Push</label>
//                                                     </div>
//                                                 </div>

//                                             </div>
//                                         </div>
//                                     </div>
//                                     : ''}
//                                 {/* Notification page */}

//                                 {/* Refer a friend */}
//                                 {(this.state.activeIndex == 3) ?
//                                     <div class="referFriend box">
//                                         <h3 class="subHead">Get free Taskmafia Credit</h3>
//                                         <h4>You’ve got $0 Taskmafia Credit right now. Time to refer
//                                             some friends!</h4>
//                                         <h4 class="MarT blueTxt center">How referrals work</h4>
//                                         <div class="row process">
//                                             <div class="col-md-4 col-sm-4 col-xs-12">
//                                                 <div class="block">
//                                                     <span class="numberTxt">01</span>
//                                                     <h4>Invite your friends</h4>
//                                                     <p>Your friend signs up using your referral code.</p>
//                                                 </div>
//                                             </div>
//                                             <div class="col-md-4 col-sm-4 col-xs-12">
//                                                 <div class="block">
//                                                     <span class="numberTxt">02</span>
//                                                     <h4> Their first task is done</h4>
//                                                     <p>After joining Taskmafia, they post a task
//                                                 and get it completed.</p>
//                                                 </div>
//                                             </div>
//                                             <div class="col-md-4 col-sm-4 col-xs-12">
//                                                 <div class="block">
//                                                     <span class="numberTxt">03</span>
//                                                     <h4>You get $10 credit</h4>
//                                                     <p>For every friend you refer, you get $20 Taskmafia
//                                                     Credit.</p>
//                                                 </div></div>
//                                         </div>
//                                         <p class="MarT">*Terms & Conditions apply.</p>
//                                         <p>*Referral Coupons may be used in the purchase of a Task on the Taskmafia Platform.
//                                             Referred Member must become an Task Mafia User and agree to the Taskmafia Terms & Conditions.
//                                              Minimum Task value to receive the benefit conferred by the Referral Coupon is $50.
//                                              Limit of one Referral Coupon per User & valid only for the first Task Contract created
//                                              by the Referred Member. Cannot be used with any other coupon or Taskmafia promotion.
//                                              Referral Coupons are valid for at least 30 days from issue and Taskmafia may change or
//                                              cancel the terms of the Referral Coupon at any time on 30 days' notice.
//                                                     </p>
//                                         <p>
//                                             The Referring Member will receive a $10 Task credit towards the purchase of tasks on
//                                              the Taskmafia Platform, when the Referred Member has completed their first Task Contract.
//                                               The Task credit is valid for 12 months from issue, and is valid for the payment of
//                                               Posted Tasks on the Taskmafia Platform. Posted Tasks must comply with Terms & Conditions.
//                                                Limit of 15 x $10 Task credits issued per Referring Member. Taskmafia may change or
//                                                 cancel the terms of the Task credit at any time on 30 days' notice.
//                                                                                                     </p>


//                                     </div>
//                                     : ''}

//                                 {/* Refer a friend */}
//                                 {/* Payment Section */}
//                                 {(this.state.activeIndex == 1) ?
//                                     <div class="paymentPage box">
//                                         <h3 class="subHead">Payment</h3>
//                                         <div class="">
//                                             <ul class="nav nav-tabs" id="myTab" role="tablist">
//                                                 <li class="nav-item">
//                                                     <a class="nav-link active" id="terms-tab" data-toggle="tab" href="#terms" role="tab" aria-controls="terms" aria-selected="true">Make Payment</a>
//                                                 </li>
//                                                 <li class="nav-item">
//                                                     <a class="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="false">Receive Payment</a>
//                                                 </li>
//                                                 <li class="nav-item">
//                                                     <a class="nav-link" id="safety-tab" data-toggle="tab" href="#safety" role="tab" aria-controls="safety" aria-selected="false">Payment History</a>
//                                                 </li>

//                                             </ul>
//                                             <div class="tab-content" id="myTabContent">
//                                                 <div class="tab-pane fade in active" id="terms" role="tabpanel" aria-labelledby="terms-tab"><p>When you are ready to accept a Tasker's offer, you will be required to pay for the task using Task Mafia Pay.
//    Payment will be held securely until the task is complete and you release payment to the Tasker.</p>
//                                                     <br />
//                                                     <div class="row cardBlk">
//                                                         <div class="col-md-6 col-sm-6 col-xs-6">
//                                                             <div class="blueTxt semibold">Credit Card</div>
//                                                             <div class="credit-card-details-component">
//                                                                 <div class="add-credit-card">
//                                                                     <a data-ui-test="add-credit-card-button">
//                                                                         <i class="glyphicon glyphicon-plus plusBg"></i>
//                                                                         <span>Add your credit card</span>
//                                                                     </a>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                         <div class="col-md-6 col-sm-6 col-xs-6 ">
//                                                             <div class="blueTxt semibold">Taskmafia Card</div>
//                                                             <p>Task Credit balance : <span class="blueTxt semibold"> $0 </span><button class="lightBlue hvr-grow-shadow">Redeem your Taskmafia card</button></p>
//                                                         </div>
//                                                     </div>
//                                                     <p>The Task Credit balance from Taskmafia Cards will be automatically applied when you accept an offer on a task. Each card will expire 12 months from the date of registration.
//         Any unused amount after expiry day will not be refunded or credited.</p>

//                                                 </div>


//                                                 <div class="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
//                                                     <p> Once a task is completed, you will be able to request payment from the
//       Job Poster, who will then release it to your nominated account.</p>
//                                                     <dl>
//                                                         <dt class="bold">   BILLING ADDRESS</dt>
//                                                         <dt>   Address Line 1 xyzxyzcyzc</dt>
//                                                         <dt>   Suburb Xyzxyz</dt>
//                                                         <dt>   State xyz</dt>
//                                                         <dt>   Postcode 1234</dt>
//                                                         <dt>   Country India</dt>

//                                                     </dl>
//                                                     <button class="redBtn hvr-grow-shadow">Remove</button>
//                                                     <br />
//                                                     <p>     For account verification purposes, your address will never be shown publicly.</p>
//                                                     <dl>
//                                                         <dt class="bold">    BANK ACCOUNT DETAILS</dt>
//                                                         <dt>    Account Holder Name Shweta</dt>
//                                                         <dt>    Account Number ****-5698</dt>
//                                                         <dt>    Currently Active</dt>
//                                                     </dl>
//                                                     <button class="redBtn hvr-grow-shadow">Remove</button>
//                                                 </div>
//                                                 <div class="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">Your payment is always secure, taskmafia is built to protect your peace of mind.</div>

//                                             </div>

//                                         </div>

//                                     </div>
//                                     : ''}
//                                 {/* payment Section */}
//                                 {/* my alerts */}

//                                 {(this.state.activeIndex == 5) ?
//                                     <div class="myAlert box">
//                                         <h3 class="subHead">My Alerts</h3>
//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">What kind of tasks are you looking for?</label>
//                                                 <div class="rel">
//                                                     <input class="input" type="text" />
//                                                     <span class="border"></span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                         <div class="form-group row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <label class="">Where would you be looking to do it</label>
//                                                 <div class="col-md-12 col-sm-12 col-xs-12 padd0">
//                                                     <div class="radio">
//                                                         <input type="radio" name="optradio" value={1} checked={this.state.roleId == 1} ref="role" onChange={(e) => { this.onRadioChange(1) }} />
//                                                         <label>Seeker</label>
//                                                     </div>
//                                                     <div class="radio">
//                                                         <input type="radio" name="optradio" value={2} checked={this.state.roleId == 2} ref="role" onChange={(e) => { this.onRadioChange(2) }} />
//                                                         <label>Tasker</label>
//                                                     </div>
//                                                     <div class="rel">
//                                                         <input class="input" type="text" placeholder="Brisbane City QLD, Australia" />
//                                                         <span class="border"></span>
//                                                     </div>
//                                                     <br />
//                                                     <select class="input">
//                                                         <option>+5km</option>
//                                                         <option>+10km</option>
//                                                         <option>+15km</option>
//                                                         <option>+20km</option>
//                                                         <option>+25km</option>
//                                                         <option>+30km</option>
//                                                     </select>

//                                                 </div>

//                                             </div>
//                                         </div>

//                                         <div class="row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <button class="lightBlue hvr-grow-shadow" >Add task alert</button>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     : ''}

//                                 {/* my alerts */}
//                                 {/* Review rating */}
//                                 {(this.state.activeIndex == 7) ?
//                                     <div class="review box">
//                                         <h3 class="subHead">Rating and reviews for user</h3>
//                                         <div class="row">
//                                             <div class="col-md-12 col-sm-12 col-xs-12">
//                                                 <div class="col-md-1 col-sm-2 col-xs-3">

//                                                     <img src="../images/personeimage.jpg" class="personimage " />

//                                                 </div>

//                                                 <div class="col-md-11 col-sm-10 col-xs-9">
//                                                     <p class="bold">James Rozer <span class="right">
//                                                         <span class="fa fa-star checked"></span>
//                                                         <span class="fa fa-star checked"></span>
//                                                         <span class="fa fa-star checked"></span>
//                                                         <span class="fa fa-star"></span>
//                                                         <span class="fa fa-star"></span></span></p>
//                                                     <p>Donec rutrum congue leo eget malesuada. Quisque velit nisi,
//                                 pretium ut lacinia in, elementum id enim vivamus.</p>


//                                                 </div>

//                                             </div>





//                                             <div class="col-md-12 col-sm-12 col-xs-12 grid-margin">
//                                                 <div class="card">
//                                                     <div class="card-body">
//                                                         <h3 class="subHead">Rating and reviews for user</h3>
//                                                         <div class="fluid-container">
//                                                             <div class="row ticket-card mt-3 pb-2 border-bottom pb-3 mb-3">
//                                                                 <div class="col-md-1">
//                                                                     <img class="img-sm rounded-circle mb-4 mb-md-0" src="images/faces/face1.jpg" alt="profile image" />                      </div>
//                                                                 <div class="ticket-details col-md-9">
//                                                                     <div class="d-flex">
//                                                                         <p class="text-dark font-weight-semibold mr-2 mb-0 no-wrap">James :</p>
//                                                                         <p class="text-primary mr-1 mb-0">[#23047]</p>
//                                                                         <p class="mb-0 ellipsis">Donec rutrum congue leo eget malesuada.</p>
//                                                                     </div>
//                                                                     <p class="text-gray ellipsis mb-2">Donec rutrum congue leo eget malesuada. Quisque velit nisi, pretium ut lacinia in, elementum id enim
//                                                                       vivamus.
//                         </p>
//                                                                     <div class="row text-gray d-md-flex d-none">
//                                                                         <div class="col-4 d-flex">
//                                                                             <small class="mb-0 mr-2 text-muted text-muted">Last responded :</small>
//                                                                             <small class="Last-responded mr-2 mb-0 text-muted text-muted">3 hours ago</small>
//                                                                         </div>
//                                                                         <div class="col-4 d-flex">
//                                                                             <small class="mb-0 mr-2 text-muted text-muted">Due in :</small>
//                                                                             <small class="Last-responded mr-2 mb-0 text-muted text-muted">2 Days</small>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                                 <div class="ticket-actions col-md-2">
//                                                                     <div class="btn-group dropdown">
//                                                                         <button type="button" class="btn btn-success dropdown-toggle btn-sm" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                                                                             Manage
//                          </button>

//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     : ''}

//                                 {/* review */}


//                             </div> </div>
//                     </div> </div>  </div>



//         );
//     }
// }


// const mapStateToProps = state => ({
//     user: state.User


// });

// const mapDispatchToProps = dispatch => ({
//     registerStep1: (data) => { dispatch(registerStep1(data)) },
//     saveHeaderImage: (data) => { dispatch(saveHeaderImage(data)) }
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
