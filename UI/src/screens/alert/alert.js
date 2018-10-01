import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    sendGetRequest, sendPostRequest
} from '../../utils/network';
import { GET_USERS_SELECTED_SKILLS_URL, FETCH_CATEGORY_URL, SET_UPDATE_USER_ALERT_URL, ERROR_MESSAGES } from '../../config/configuration';
import { Loader } from 'react-overlay-loader';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import { registerStep2, saveImage } from '../../screens/sign-up/actions';

/**
 * Content of Browse Task screen.
 */
class Alert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            userSkills: [],
            selectedTask: undefined,
            isPopupOpen: false,
            showAddSkill: false,
            language: '',
            quanlification: null,
            experience: null,
            suggestions: [],
        }
        this.selectedCategory = [];
    }

    componentDidMount() {
        this.fetchCategory();
    }

    fetchCategory = () => {
        sendGetRequest(FETCH_CATEGORY_URL)
        .then(_res=>{
            if(_res.status === 200) {
                this.setState({suggestions: _res.data})
                this.fetchUserSelectedCategory();
            }
        })
        .catch(err=>{

        })
    }

    handleCategoryInputChange = (e) => {
        this.selectedCategory = e;
        this.setState({userSkills: e})
    }

    fetchUserSelectedCategory = () => {
        this.setState({ isLoading: true })
        sendGetRequest(GET_USERS_SELECTED_SKILLS_URL, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status === 200) {
                    if(this.state.suggestions.length && _res.data.length) {
                        let tempUserKillArray = []
                        for(let i=0; i< _res.data.length; i++) {
                            let _userSkill = this.state.suggestions.find((item)=>{
                                return (_res.data[i].categoryId === item.id);
                            })
                            tempUserKillArray.push(_userSkill);
                            
                        }
                        this.setState({userSkills: tempUserKillArray});
                        
                    }
                    this.setState({ skillsArray: _res.data })

                }
            })
            .catch(err => {
                this.setState({ isLoading: false })
                showMessage('error', ERROR_MESSAGES.FETCH_TASK_ERROR);
            })
    }

    onInputChange = (e, name) => {
        this.setState({ [name]: e.target.value })
    }

    updateAlert = () => {
        this.setState({ isLoading: true })
        let reqObj = {
            categories:this.selectedCategory
        }
        debugger;
        sendPostRequest(SET_UPDATE_USER_ALERT_URL, reqObj , true, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status === 200) {
                   showMessage('success', 'Alert has been saved successfully');

                }
            })
            .catch(err => {
                this.setState({ isLoading: false })
                showMessage('error', 'Error while saving your alert');
            })
    }

    


    render() {
        return (
            <div className="register-step-2">
                <Loader fullPage loading={this.state.isLoading} />
                <div className="myAlert box">
                    <h3 className="subHead">My Alerts</h3>
                    <div className="form-group row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div class="form-group stepTop">
                                <label for="comment">What kind of tasks are you looking for?</label>
                                <div class="rel">   
                                <Typeahead
                                class={'input'}
                                    labelKey="category"
                                    multiple={true}
                                    options={this.state.suggestions}
                                    placeholder="Choose Task Category..."
                                    selected={this.state.userSkills}
                                    className="myclass"
                                    onChange={(e) => { this.handleCategoryInputChange(e) }}
                                />
                                 <span class="border"></span>
                                </div>
                              </div>
                        </div>
                    </div>
                    {/* <div className="form-group row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <label className="">Where would you be looking to do it</label>
                            <div className="col-md-12 col-sm-12 col-xs-12 padd0">
                                <div className="radio">
                                    <input type="radio" name="optradio" value={1} checked={this.state.roleId === 1} ref="role" onChange={(e) => { this.onRadioChange(1) }} />
                                    <label>Seeker</label>
                                </div>
                                <div className="radio">
                                    <input type="radio" name="optradio" value={2} checked={this.state.roleId === 2} ref="role" onChange={(e) => { this.onRadioChange(2) }} />
                                    <label>Tasker</label>
                                </div>
                                <div className="rel">
                                    <input className="input" type="text" placeholder="Brisbane City QLD, Australia" />
                                    <span className="border"></span>
                                </div>
                                <br />
                                <select className="input">
                                    <option>+5km</option>
                                    <option>+10km</option>
                                    <option>+15km</option>
                                    <option>+20km</option>
                                    <option>+25km</option>
                                    <option>+30km</option>
                                </select>

                            </div>

                        </div>
                    </div> */}

                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <button className="lightBlue hvr-grow-shadow" onClick={(e)=>{this.updateAlert()}}>Add task alert</button>
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
    registerStep2: (data) => { dispatch(registerStep2(data)) },
    saveImage: (imgUrl) => { dispatch(saveImage(imgUrl)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alert);


