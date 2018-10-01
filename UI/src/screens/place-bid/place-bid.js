import React, { Component } from "react";
import { connect } from 'react-redux';
import { sendPostRequest, sendGetRequest } from '../../utils/network';
import { BID_TASK_URL } from '../../config/configuration';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import Modal from 'react-responsive-modal';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { UPLOAD_IMAGE_URL, FETCH_CATEGORY_URL } from '../../config/configuration';
import { registerStep2, saveImage, saveBidDetail} from '../../screens/sign-up/actions';
import UploadPhoto from '../../components/upload-photo/upload-photo';
import Autocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * Content of Signup screen.
 */
class PlaceBid extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isPopupOpen: true,
            isActive: 0,
            addressLine1: '',
            subrub: this.props.user.city,
            state: '',
            country: 'Newzeland',
            pictures: [],
            proposal: this.props.user.description,
            isLoading: false,
            imgUrl: this.props.user.imageUrl,
            dob: moment(),
            mobileNo: '',
            budget: '',
            errorMessage: '',
            showError: false
        }
        this.selectedCategory = [];
        this.fetchCategory();
    }

    fetchCategory = () => {
        sendGetRequest(FETCH_CATEGORY_URL)
            .then(_res => {
                if (_res.status === 200) {
                    this.setState({ suggestions: _res.data })
                }
            })
            .catch(err => {

            })
    }

    handleCategoryInputChange = (e) => {
        this.selectedCategory = e;
    }

    onOpenModal = () => {
        this.setState({ isPopupOpen: true });
    };

    onCloseModal = () => {
        this.setState({ isPopupOpen: false });
    };

    showMessage(_isError) {
        if (_isError) {
            showMessage('error', 'something went wrong');
        } else {
            showMessage('success', 'Successfully Updated Details !!');
        }

    }

    onImageUploadSuccess = (_imageUrl) => {
        this.props.saveImage(_imageUrl);
        this.setState({ imgUrl: _imageUrl })
    }


    onLoaderChange = (_loaderBoolean) => {
        this.setState({ isLoading: _loaderBoolean });
    }

    handleDobChange = (date) => {
        this.setState({
            dob: date
        });
    }



    onSubmit = (event) => {
        event.preventDefault();

    }

    onNext() {

        if (this.state.isActive < 3) {
            this.setState({ isActive: ++this.state.isActive })
        } else {
            if (this.validateErrors()) return;
            this.setState({ isLoading: true });
            let reqData = {
                'taskId': this.props.task.id,
                'offer': this.state.budget,
                'comment': this.state.proposal,
                'addressLine1': this.state.addressLine1,
                'subrub': this.state.subrub,
                'state': this.state.state,
                'country': this.state.country,
                'dob': this.state.dob,
                'moblieNo': this.state.mobileNo
            };
            sendPostRequest(BID_TASK_URL, reqData, true, this.props.user.token).then(res => {
                this.setState({ isLoading: false });
                if (res.status === 200) {
                    this.props.saveBidDetail(this.props.task);
                    showMessage('success', 'Bid has been successfully Placed');
                    this.props.onClose();
                } else {
                    showMessage('error', 'Something wend wrong!! ')
                    throw new Error();
                }

            }).catch(err => {
                showMessage('error', 'Something wend wrong!! ')
            })
        }
    }

    onPrevious() {
        if (this.state.isActive > 0) {
            this.setState({ isActive: --this.state.isActive })
        }
    }

    onCitySelect(data) {
        this.setState({
            subrub: {
                city: data.formatted_address,
                lat: data.geometry.location.lat(),
                lon: data.geometry.location.lng()
            }
        });
    }

    onInputChange = (e, name) => {
        this.setState({ [name]: e.target.value })
    }

    validateErrors = () => {
        if (this.state.isActive === 3) {
            if (this.state.budget <= 0) {
                this.state.errorMessage = 'Bid Amount Should be heigher than 0';
                this.setState({ showError: true })
                return true;
            }
            this.setState({ showError: false })
            return false;
        }
    }


    render() {
        const { tags, suggestions } = this.state;
        return (
            <div className="register-step-2">

                <Loader text="please wait..." loading={this.state.isLoading} />
                <div className="register2-width">
                    <form id="regForm">
                        <div className={(this.state.isActive === 0) ? 'display' : 'hide'}>
                            <div class="profilePic">
                                <h3>Your Profile Picure</h3>
                            </div>
                            <UploadPhoto
                                imageUrl={this.state.imgUrl}
                                onImageUploadSuccess={this.onImageUploadSuccess}
                                onLoaderChange={this.onLoaderChange} />
                        </div>

                        <div className={(this.state.isActive === 1) ? 'display' : 'hide'}>
                            <div className="row welcome center-align">
                                <h3 class="">Provide Billing Address</h3>
                            </div>
                            {(this.state.showError) ?
                                <span className="error-msg">* {this.state.errorMessage} </span>
                                : ''
                            }
                            <div class="popupform">
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <input type="text" class="input" placeholder="Address Line 1" value={this.state.addressLine1} onChange={(e) => { this.onInputChange(e, 'addressLine1') }} />
                                        <span class="border"></span>
                                    </div>
                                </div>
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <Autocomplete
                                            class={'input'}
                                            type={'text'}
                                            style={{ width: '100%' }}
                                            onPlaceSelected={(data) => {
                                                this.onCitySelect(data)
                                            }}
                                            types={['(regions)']}
                                            componentRestrictions={{ country: "nz" }}
                                            placeholder="Enter Subrub"
                                        />
                                        <span class="border"></span>
                                    </div>
                                </div>
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <input type="text" class="input" placeholder="State" value={this.state.state} onChange={(e) => { this.onInputChange(e, 'state') }} />
                                        <span class="border"></span>
                                    </div>
                                </div>
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <input type="text" disabled={true} class="input" placeholder="Country" value={this.state.country} onChange={(e) => { this.onInputChange(e, 'country') }} />
                                        <span class="border"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={(this.state.isActive === 2) ? 'display' : 'hide'}>
                            <div className="row welcome center-align">
                                <h3 class="">Provide DOB and Phone Information</h3>
                            </div>
                            {(this.state.showError) ?
                                <span className="error-msg">* {this.state.errorMessage} </span>
                                : ''
                            }
                            <div class="popupform">
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <DatePicker
                                            selected={this.state.dob}
                                            onChange={this.handleDobChange}
                                            className="custom-date-picker input"
                                        />
                                        <span class="border"></span>
                                    </div>
                                </div>
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <input type="text" class="input" placeholder="Mobile No" value={this.state.mobileNo} onChange={(e) => { this.onInputChange(e, 'mobileNo') }} />
                                        <span class="border"></span>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className={(this.state.isActive === 3) ? 'display' : 'hide'}>
                            <div className="row welcome center-align">
                                <h3 class="">Your Offer</h3>
                            </div>
                            {(this.state.showError) ?
                                <span className="error-msg">* {this.state.errorMessage} </span>
                                : ''
                            }
                            <div class="popupform">
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <input type="number" class="input" placeholder="Your Budget" value={this.state.budget} onChange={(e) => { this.onInputChange(e, 'budget') }} />
                                        <span class="border"></span>
                                    </div>
                                </div>
                                <div class="form-group stepTop">
                                    <div class="rel">
                                        <textarea class="input" rows="3" value={this.state.proposal} placeholder="write a proposal" onChange={(e) => { this.onInputChange(e, 'proposal') }}></textarea>
                                        <span class="border"></span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div class="btnGroup">

                            <button className={(this.state.isActive === 0) ? "yellow hvr-grow-shadow-yellow hide-btn" : "yellow hvr-grow-shadow-yellow"} type="button" id="prevBtn" onClick={(e) => { this.onPrevious() }}>Previous</button>
                            <button class="lightBlue hvr-grow-shadow" type="button" id="nextBtn" onClick={(e) => { this.onNext() }}>{(this.state.isActive === 3) ? 'Save' : 'Next'}</button>
                        </div>

                        <div className="register-step-2-margin">
                            <span className={(this.state.isActive === 0) ? 'step active' : 'step'}></span>
                            <span className={(this.state.isActive === 1) ? 'step active' : 'step'}></span>
                            <span className={(this.state.isActive === 2) ? 'step active' : 'step'}></span>
                            <span className={(this.state.isActive === 3) ? 'step active' : 'step'}></span>

                            {/*<span className={(this.state.isActive === 3) ? 'step active' : 'step'}></span> */}
                        </div>
                    </form>
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
    registerStep2: (data) => { dispatch(registerStep2(data)) },
    saveImage: (imgUrl) => { dispatch(saveImage(imgUrl)) },
    saveBidDetail: (bidObject) => { dispatch(saveBidDetail(bidObject)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(PlaceBid);


