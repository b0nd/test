import React, { Component } from "react";
import { connect } from 'react-redux';
import { sendPostRequest } from '../../utils/network';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import {  UPDATE_PASSWROD_URL } from '../../config/configuration';

/**
 * Forget Password Screen
 */
class ForgotPassword extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoading: false,
            oldPassword: '',
            newPassword: '',
            showError: '',
            errorMessage: '',
            confirmPassword: ''
        }
    }








    validateErrors = () => {

        if (this.state.oldPassword === '') {
            // this.state.errorMessage = 'Invalid old Password';
            // this.setState({ showError: true })
            showMessage('error', 'Invalid Password');
            return true;
        }
        if (this.state.newPassword === '') {
            // this.state.errorMessage = 'Enter Valid Description';
            // this.setState({ showError: true })
            showMessage('error', 'Invalid New Password');
            return true;
        }
        if (this.state.newPassword.length<6) {
            // this.state.errorMessage = 'Enter Valid Description';
            // this.setState({ showError: true })
            showMessage('error', 'Password should be minimum 6 digits long');
            return true;
        }
        if (this.state.confirmPassword !== this.state.newPassword) {
            // this.state.errorMessage = 'Enter Valid Description';
            // this.setState({ showError: true })
            showMessage('error', 'Both Password does not match');
            return true;
        }
        this.setState({ showError: false })
        return false;

    }

    onSubmit = () => {
        if (this.validateErrors()) return;
        this.setState({ isLoading: true });
        let reqData = {
            "password": this.state.oldPassword,
            "newPassword": this.state.newPassword
        };

        sendPostRequest(UPDATE_PASSWROD_URL, reqData, true, this.props.user.token).then(res => {
            this.setState({ isLoading: false });
            if (res.status === 200) {
                showMessage('success', 'Password has been changed successfully !!');
            } else if (res.status === 201) {
                showMessage('error', 'Please enter correct current Password !!');
            }
             else {
                showMessage('error', 'Something went wrong !!');
            }

        }).catch(err => {
            this.setState({ isLoading: false });
            showMessage('error', 'Something went wrong !!');
        })

    }






onInputChange = (e, name) => {
    this.setState({ [name]: e.target.value })
}


render() {
    return (
        <div className="register-step-2">
            <Loader fullPage loading={this.state.isLoading} />
            <div className="password box">
            
                <h3 className="subHead">Change Password</h3>
                <div className="form-group row">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <label className="">Current Password</label>
                        <div className="rel">
                            <input className="input" type="text" value={this.state.oldPassword} onChange={(e)=>{this.onInputChange(e, 'oldPassword')}}/>
                            <span className="border"></span>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <label className="">New Password</label>
                        <div className="rel">
                            <input className="input" type="text" value={this.state.newPassword} onChange={(e)=>{this.onInputChange(e, 'newPassword')}}/>
                            <span className="border"></span>
                        </div>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-md-6 col-sm-6 col-xs-6">
                        <label className="">Repeat Password</label>
                        <div className="rel">
                            <input className="input" type="text" value={this.state.confirmPassword} onChange={(e)=>{this.onInputChange(e, 'confirmPassword')}}/>
                            <span className="border"></span>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-6 col-xs-6">

                        <div className="btnGroup MarT">

                            <input className="actionBtn lightBlue hvr-grow-shadow" contentEditable="false" value="Save Changes" contentEditable="false" onClick={(e) => { this.onSubmit(e) }} />

                        </div>
                    </div>
                </div>

            </div>
            
            <ToastContainer autoClose={3000} />
        </div>
    );
}
}



const mapStateToProps = state => ({
    user: state.User
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);


