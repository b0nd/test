import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as urls from '../../config/configuration';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import Modal from 'react-responsive-modal';
import 'react-overlay-loader/styles.css';
import { Redirect } from 'react-router-dom';
import { REGISTER_STEP_1_URL } from '../../config/configuration';
import { sendPostRequest } from '../../utils/network';
import { ToastContainer } from 'react-toastify';
import { registerStep1 } from '../sign-up/actions';
import { showMessage } from '../../utils/message';
import Autocomplete from 'react-google-autocomplete';

/**
 * Content of Signup screen.
 */
class RegisterStep1 extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isPopupOpen: true,
            firstName: this.props.user.firstName,
            lastName: this.props.user.lastName,
            isLoading: false,
            city: this.props.user.city,
            role: this.props.user.roleId,
            success: false,
            errorMessage: '',
            showError: false

        }
    }

    componentDidMount() {
        console.log('ref  ', this.refs.autocomplete);
        this.refs.autocomplete.refs.input.innerText = "ashish";
    }

    onOpenModal = () => {
        this.setState({ isPopupOpen: true });
    };

    onCloseModal = () => {
        this.setState({ isPopupOpen: false });
    };

    onInputChange = (e, name) => {
        this.setState({ [name]: e.target.value })
    }

    onRadioChange = (index) => {
        this.setState({ 'role': index })
    }

    showMessage() {
        showMessage('success', 'Details Saved Successfully !!');
    }

    validateErrors = () => {

        if (!this.state.firstName || this.state.firstName.length == 0) {
            this.state.errorMessage = 'Invalid First Name';
            this.setState({ showError: true })
            return true;
        }
        if (!this.state.lastName || this.state.lastName.length == 0) {
            this.state.errorMessage = 'Invalid Last Name';
            this.setState({ showError: true })
            return true;
        }
        if (!this.state.city.hasOwnProperty('city')) {
            this.state.errorMessage = 'Please select city';
            this.setState({ showError: true })
            return true;
        }
        this.setState({ showError: false })
        return false;

    }



    onSubmit = (event) => {
        event.preventDefault();
        if(this.validateErrors()) return;
        let postData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            location: this.state.city,
            roleId: this.state.role,
            token: this.props.user.token
        }
        this.setState({ isLoading: true });
        sendPostRequest(REGISTER_STEP_1_URL, postData).then((res) => {
            if (res.status == 200) {
                postData.city = this.state.city;
                this.props.registerStep1(postData);
                this.showMessage();
                this.setState({ success: true });
                this.onCloseModal();
            }
            this.setState({ isLoading: false });
        })
            .catch((error) => {
                console.log(error)
                this.setState({ isLoading: false });
                showMessage('error', 'Request timed out!! Please try again');
            })
    }

    onCitySelect(data) {
        console.log(data);
        this.setState({
            city: {
                city: data.formatted_address,
                lat: data.geometry.location.lat(),
                lon: data.geometry.location.lng()
            }
        });
    }


    render() {
        console.log(this.state.success, this.state.roleId)
        if (this.state.success && this.state.role > 1) {
            return <Redirect to='/register-step-2' />;
        }

        return (
            <div className="register-step-1">

                <Modal ref="modelRef" open={this.state.isPopupOpen} closeOnOverlayClick={false} onClose={this.onCloseModal} center>
                    <Loader loading={this.state.isLoading} />
                    <div className="register-step-1-popup-size">
                        <div className="row welcome center-align">
                            <h3 class="">Welcome to Task Mafia</h3>

                            <h4>Let us know more about you</h4>
                        </div>
                        {(this.state.showError)? 
                                    <span className="error-msg">* {this.state.errorMessage} </span>
                                    : ''
                        }
                        <form class="popupform" onSubmit={this.onSubmit}>

                            <div class="form-group">
                                <label class="">First Name</label>
                                <div class="rel">
                                    <input class="input" type="text" value={this.state.firstName} ref="firstName" onChange={(e) => { this.onInputChange(e, 'firstName') }} />
                                    <span class="border"></span>
                                </div>
                                
                            </div>
                            <div class="form-group">
                                <label class="">Last Name</label>
                                <div class="rel">
                                    <input class="input" type="text" value={this.state.lastName} ref="lastName" onChange={(e) => { this.onInputChange(e, 'lastName') }} />
                                    <span class="border"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="">Enter Your City</label>
                                <div class="rel">

                                    <Autocomplete
                                        class={'input'}
                                        type={'text'}
                                        style={{ width: '100%' }}
                                        onPlaceSelected={(data) => {
                                            this.onCitySelect(data)
                                        }}
                                        ref="autocomplete"
                                        types={['(regions)']}
                                        componentRestrictions={{ country: "nz" }}
                                    />
                                    <span class="border"></span>
                                    
                                </div>
                            </div>

                            <div class="radioGroup">
                                <div class="radio">
                                    <input type="radio" name="optradio" checked={this.state.role == 1} value={1} ref="role" onChange={(e) => { this.onRadioChange(1) }} />
                                    <label>Seeker</label>
                                </div>
                                <div class="radio">
                                    <input type="radio" name="optradio" checked={this.state.role == 2} value={2} ref="role" onChange={(e) => { this.onRadioChange(2) }} />
                                    <label>Tasker</label>
                                </div>
                                <div class="radio">
                                    <input type="radio" name="optradio" value={this.state.role} ref="role" onChange={(e) => { this.onRadioChange(3) }} />
                                    <label>Both</label>
                                </div>
                            </div>
                            <span class="btn">
                                <button type="submit" class="lightBlue hvr-grow-shadow">Submit</button>
                            </span>

                        </form>


                    </div>
                </Modal>
                <ToastContainer autoClose={3000} />
            </div>

        );
    }
}


const mapStateToProps = state => ({
    user: state.User
});

const mapDispatchToProps = dispatch => ({
    registerStep1: (data) => { dispatch(registerStep1(data)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterStep1);
