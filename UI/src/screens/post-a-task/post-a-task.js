import React, { Component } from "react";
import { connect } from 'react-redux';
import { sendPostRequest, sendGetRequest } from '../../utils/network';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import Modal from 'react-responsive-modal';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { POST_A_TASK_URL, FETCH_SUB_CATEGORY_URL, INFO_MESSAGES } from '../../config/configuration';
import {registerStep2, saveImage} from '../../screens/sign-up/actions';
import {savePostTaskData} from '../../screens/post-a-task/actions';
import Autocomplete from 'react-google-autocomplete';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import Signup from '../sign-up/sign-up';

/**
 * Content of Signup screen.
 */
class PostATask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: true,
            isActive: 0,
            suggestions: [],
            multiple: false,
            selectedTask: null,
            taskDescription: '',
            location: {},
            taskType: 1,
            isLoading: false,
            imgUrl: this.props.user.imageUrl,
            expectedCost: '',
            dueDate: moment(),
            errorMessage: '',
            showError: false,
            showLogin: false
        }
        this.selectedCategory = [];
        this.fetchCategory();
    }

    fetchCategory = () => {
        sendGetRequest(FETCH_SUB_CATEGORY_URL)
        .then(_res=>{
            if(_res.status === 200) {
                this.setState({suggestions: _res.data})
            }
        })
        .catch(err=>{
            showMessage('error', 'Error while fetching categories. Try Posting the Task Later!!');
        })
    }

    
    handleCategoryInputChange = (e) => {
        this.setState({selectedTask : e});
    }

    onOpenModal = () => {
        this.setState({ isPopupOpen: true });
    };

    onCloseModal = () => {
        this.setState({ showLogin: false });
    };

    onCitySelect(data) {
        this.setState({location: {
            City: data.formatted_address,
            lat: data.geometry.location.lat(),
            lon: data.geometry.location.lng()
        }});
    }

    loginSuccessCallback = () =>{

    }

    validateErrors = () => {
        if(this.state.isActive === 0) {
            if(!this.state.selectedTask || this.state.selectedTask.length === 0) {
                this.state.errorMessage = 'Invalid Task Type';
                this.setState({showError: true})
                return true;
            }
            if(this.state.taskDescription === '') {
                this.state.errorMessage = 'Enter Valid Description';
                this.setState({showError: true})
                return true;
            }
            if(this.state.taskDescription.length < 20) {
                this.state.errorMessage = 'Please enter minimum 20 character';
                this.setState({showError: true})
                return true;
            }
            this.setState({showError: false})
            return false;
        } else if(false) {
            if(!this.state.taskType) {
                this.state.errorMessage = 'Invalid Task Type';
                this.setState({showError: true})
                return true;
            }
            if(!this.state.location || this.state.location === '') {
                this.state.errorMessage = 'Enter Valid Location';
                this.setState({showError: true})
                return true;
            }
            this.setState({showError: false})
            return false;
        } else if(this.state.isActive === 2) {
            if(this.state.expectedCost === "") {
                this.state.errorMessage = 'Invalid Expected Cost';
                this.setState({showError: true})
                return true;
            }
            if(isNaN(this.state.expectedCost)) {
                this.state.errorMessage = 'Cost Should be a Number';
                this.setState({showError: true})
                return true;
            }
            this.setState({showError: false})
            return false;
        }
    }

    onNext() {
        if(this.validateErrors()) return;
        
        if (this.state.isActive < 2) {
            this.setState({ isActive: ++this.state.isActive })
        } else {
            console.log('selected category  ', this.selectedCategory)
            this.setState({isLoading: true});
            let reqData = {
                "token": this.props.user.token,
                "taskDescription": this.state.taskDescription,
                "subCategory": this.state.selectedTask[0],
                "taskTypeId":this.state.taskType,
                "location": this.state.location,
                "dueDate":moment(this.state.dueDate).format('MM/DD/YYYY'),
                "expectedCost":this.state.expectedCost
                };
            if(!this.props.user.isLoggedIn) {
                this.props.savePostTaskData(reqData);
                showMessage('info', INFO_MESSAGES.LOGIN_REQUEST);
                this.setState({isLoading: false, showLogin: true});
            } else {
                sendPostRequest(POST_A_TASK_URL, reqData).then(res =>{
                    this.setState({isLoading: false});
                    if(res.status == 200) {
                        this.props.registerStep2({
                            'categories': this.selectedCategory,
                            'description': this.state.taskDescription
                        })
                        showMessage('success', 'Task has been posted sucessfully');
                        this.props.successCallback();
                    } else {
                        this.setState({isLoading: false});
                        showMessage('error', 'Something went wrong');
                        throw new Error();
                    }
    
                }).catch(err=>{
                    showMessage('error', 'Something went wrong while posting your task !!');
                })
            }
            }
            
            
    }

    onRadioChange = (index) => {
        this.setState({ 'taskType': index })
    }

    onPrevious() {
        if (this.state.isActive > 0) {
            this.setState({ isActive: --this.state.isActive })
        }
    }

    onInputChange = (e, name) => {
        this.setState({ [name]: e.target.value })
    }

    handleChange = (date) => {
        this.setState({
          dueDate: date
        });
      }


    render() {
        const { tags, suggestions } = this.state;
        return (
            <div className="register-step-2">
                <Loader loading={this.state.isLoading} />
                {(this.state.showLogin) ? 
                <Signup isForSignup={false} onClose={this.onCloseModal} successCallback={this.loginSuccessCallback} /> 
            :
                    <div className="register2-width post-a-task-width">
                        <form id="regForm">
                        <div className={(this.state.isActive == 0) ? 'display' : 'hide'}>
                            <div className="row welcome center-align">
                                    <h3 class="">Post Task - I</h3>
                                </div>
                                {(this.state.showError)? 
                                    <span className="error-msg">* {this.state.errorMessage} </span>
                                    : ''
                                }
                                
                                <div className="task-form-group form-group taskCate">
                                <label for="comment">Task Category</label>
                                <div class="rel">
                                <Typeahead
                                        labelKey="subCategory"
                                        multiple={this.state.multiple}
                                        options={this.state.suggestions}
                                        placeholder="Choose Task Category..."
                                        selected={this.state.selectedTask}
                                        className="myclass input"
                                        onChange={(e) => { this.handleCategoryInputChange(e) }}
                                    />
                                    <span class="border"></span>
                                    </div>
                                    </div>
                                    <div class="form-group task-description-group">
                                    <label for="comment">Task Description</label>
                                    <div  class="rel">
                                    <textarea class="input" rows="3" value={this.state.taskDescription} onChange={(e)=>{this.onInputChange(e, 'taskDescription')}}></textarea>
                                   <div class="border"></div>
                                   
                                    </div>
                                      </div>
                            </div>
                            <div className={(this.state.isActive == 1) ? 'display' : 'hide'}>
                            <div className="row welcome center-align">
                                <h3 class="">Post Task-II</h3>
                            </div>
                            {(this.state.showError)? 
                                    <span className="error-msg">* {this.state.errorMessage} </span>
                                    : ''
                                }
                            <div class="task-form-group">
                            <label for="comment">Task Mode</label>
                            <div class="task-radioGroup">
                            <div class="radio radioBlkbg">
                                <input type="radio" name="optradio" value={1} checked={this.state.taskType == 1} ref="role" onChange={(e) => { this.onRadioChange(1) }} />
                                <label>In Person</label>
                                <p>Please select this if you need the Tasker physically there.</p> </div>
                            <div class="radio radioBlkbg">
                                <input type="radio" name="optradio" value={2} ref="role" checked={this.state.taskType == 2} onChange={(e) => { this.onRadioChange(2) }} />
                                <label>Online</label>
                                <p>Please select this if the Tasker can do it from home.</p> 
                            </div>
                            
                            </div>
                                </div>
                              
                                <p><div class="form-group task-description-group">
                                <div class="rel">
                                <Autocomplete
                                type={'text'}
                                style={{ width: '100%' }}
                                disabled={(this.state.taskType == 2) ? true: false}
                                onPlaceSelected={(data) => {
                                    this.onCitySelect(data)
                                }}
                                types={['(regions)']}
                                componentRestrictions={{ country: "nz" }}
                                class={'input'}
                                // className={'form-control'}
                            />
                            <span class="border"></span>
                                </div>
                                </div>
                                </p>
                            </div>
                            <div className={(this.state.isActive == 2) ? 'display' : 'hide'}>
                            <div className="row welcome center-align">
                                <h3 class="">Post Task-III</h3>
                            </div>
                            {(this.state.showError)? 
                                    <span className="error-msg">* {this.state.errorMessage} </span>
                                    : ''
                                }
                            <div className="task-form-group">
                            <label for="comment">Expected Cost</label>
                            <div class="rel">
                                <input class="input" placeholder="Expected Cost" value={this.state.expectedCost} onChange={(e)=>{this.onInputChange(e, 'expectedCost')}}/>
                                <span class="border"></span>
                               </div> 
                               </div>
                               <div className="task-description-group form-group">
                                <label for="comment">Due Date</label>

                                <div class="rel">
                                <DatePicker
                                    selected={this.state.dueDate}
                                    onChange={this.handleChange}
                                    className="custom-date-picker input"
                                />
                                <span class="border"></span>
                                </div>
                                </div>
                            </div>
                            <div className={(this.state.isActive == 3) ? 'display' : 'hide'}>Login Info
                            <p><input placeholder="Username..." oninput="this.className = ''" name="uname" /></p>
                                <p><input placeholder="Password..." oninput="this.className = ''" name="pword" type="password" /></p>
                            </div>
                            
                                <div class="btnGroup">
                                
                                    <button className={(this.state.isActive == 0) ? "yellow hvr-grow-shadow-yellow hide-btn": "yellow hvr-grow-shadow-yellow"}   type="button" id="prevBtn" onClick={(e) => { this.onPrevious() }}>Previous</button>
                                    <button class="lightBlue hvr-grow-shadow" type="button" id="nextBtn" onClick={(e) => { this.onNext() }}>{(this.state.isActive == 2) ? 'Post Task' : 'Next'}</button>
                                </div>
                           
                            <div className="register-step-2-margin">
                                <span className={(this.state.isActive == 0) ? 'step active' : 'step'}></span>
                                <span className={(this.state.isActive == 1) ? 'step active' : 'step'}></span>
                                <span className={(this.state.isActive == 2) ? 'step active' : 'step'}></span>

                                {/*<span className={(this.state.isActive == 3) ? 'step active' : 'step'}></span> */}
                                </div>
                                
                        </form>
                    </div>
                }
                <ToastContainer autoClose={3000} />
            </div>
        );
    }
}


const mapStateToProps = state => ({
    user: state.User,
    postTask: state.PostedTask
});

const mapDispatchToProps = dispatch => ({
    registerStep2: (data) => {dispatch(registerStep2(data))},
    saveImage: (imgUrl) => {dispatch(saveImage(imgUrl))},
    savePostTaskData: (payload) => {dispatch(savePostTaskData(payload))}
});

export default connect(mapStateToProps, mapDispatchToProps)(PostATask);


