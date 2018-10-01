import React, { Component } from "react";
import { connect } from 'react-redux';
import {
    sendGetRequest, sendPostRequest
} from '../../utils/network';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FETCH_MY_SKILLS_URL, UPLOAD_MY_SKILLS_URL, ERROR_MESSAGES } from '../../config/configuration';
import { registerStep2, saveImage } from '../../screens/sign-up/actions';

/**
 * Content of Skills Add and Edit .
 */
class Skils extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            skillsArray: [],
            selectedTask: undefined,
            isPopupOpen: false,
            showAddSkill: false,
            language: '',
            qualification: null,
            experience: null
        }
    }

    componentDidMount() {
        this.fetchSkills();
    }

    fetchSkills = () => {
        this.setState({ isLoading: true })
        sendGetRequest(FETCH_MY_SKILLS_URL, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status == 200) {
                    if(Array.isArray(_res.data) && _res.data.length) {
                        this.setState({
                            language:_res.data[0].language,
                            qualification: _res.data[0].qualifications,
                            experience: _res.data[0].experience
                        })
                    } else {
                        this.setState({
                            language:_res.data.language,
                            qualification: _res.data.qualifications,
                            experience: _res.data.experience
                        })
                    }
                    this.setState({ skillsArray: _res.data })

                }
            })
            .catch(err => {
                this.setState({ isLoading: false })
                showMessage('error', ERROR_MESSAGES.FETCH_TASK_ERROR);
            })
    }

    addSkills = () => {
        this.setState({ isLoading: true })
        let reqData = {
            "language": this.state.language,
            "qualification": this.state.quanlification,
            "experience": this.state.experience
        }
        sendPostRequest(UPLOAD_MY_SKILLS_URL, reqData, true, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status == 200) {
                    let tempSkillArray = this.state.skillsArray;
                    tempSkillArray.push(reqData)
                    this.setState({
                        skillsArray: _res.data,
                        showAddSkill: false, skillsArray: tempSkillArray
                    })

                    showMessage('success', 'Skils Added Successfully');
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
    /**
     * called when login successfull.
     */
    loginSuccessCallback = () => {

    }


    render() {
        return (
            <div className="browse-task-screen">
                <Loader fullPage loading={this.state.isLoading} />
                {/* <div className="container">
                    <div className="row center-align">
                        <div className="col-sm-2">
                            <button class="btn btn-primary" onClick={(e)=>this.setState({showAddSkill: !this.state.showAddSkill})}><i class="fa fa-plus" aria-hidden="true"></i>{(!this.state.showAddSkill)? 'Add New Skill': 'Cancel'}</button>
                        </div>
                    </div>
                    {(this.state.showAddSkill)? 
                    <div className="row">
                    <div className="col-md-4">
                        <form>
                            <div class="form-group">
                                <label for="email">Language:</label>
                                <input type="text" value={this.state.language} onChange={(e)=>{this.onInputChange(e, 'language')}} class="form-control input" id="email" placeholder="language" />
                            </div>
                            <div class="form-group">
                                <label for="pwd">Qualification:</label>
                                <input type="text" value={this.state.quanlification} onChange={(e)=>{this.onInputChange(e, 'quanlification')}} class="form-control input" id="pwd" placeholder="qualification" />
                            </div>
                            <div class="form-group">
                                <label for="pwd">Experience:</label>
                                <input type="number" value={this.state.experience} onChange={(e)=>{this.onInputChange(e, 'experience')}} class="form-control input" placeholder="experience" />
                            </div>
                            <button type="button" class="btn btn-primary" onClick={(e)=>{this.addSkills()}}><i class="fa fa-plus" aria-hidden="true"></i>Add Skill</button>
                        </form>
                        </div>
                    </div>
                    :''}
                    <div className="row">
                        <div className="col-sm-10">
                            <ul>
                                {(this.state.skillsArray && this.state.skillsArray.length) ? this.state.skillsArray.map((skill) => {
                                    return (
                                        <li>
                                            <div className="row">
                                                <span className="status">language: {skill.language}</span>
                                            </div>
                                            <div className="row">
                                                <span className="status">qualifications: {skill.qualifications}</span>
                                            </div>
                                            <div className="row">
                                                <span className="status">experience: {skill.experience}</span>
                                            </div>
                                        </li>
                                    )
                                })

                                    :
                                    <div class="jumbotron">
                                        <h1>No result Available</h1>
                                        <p>Please Try Again</p>
                                    </div>
                                }
                            </ul>
                        </div>
                    </div>
                </div> */}
                <div className="skills box">
                    <div className="form-group row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <label className="">What languages can you speak/write?</label>
                            <div className="rel">
                                <input className="input" type="text" value={this.state.language} onChange={(e)=>{this.onInputChange(e, 'language')}}  />
                                <span className="border"></span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <label className="">What qualifications have you got?</label>
                            <div className="rel">
                                <input className="input" type="text" value={this.state.qualification} onChange={(e)=>{this.onInputChange(e, 'qualification')}} />
                                <span className="border"></span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <label className="">What's your work experience?</label>
                            <div className="rel">
                                <input className="input" type="text" value={this.state.experience} onChange={(e)=>{this.onInputChange(e, 'experience')}} />
                                <span className="border"></span>
                            </div>
                        </div>
                    </div>

                    <div className="btnGroup row MarT">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <button className="lightBlue hvr-grow-shadow" onClick={(e)=>{this.addSkills()}}>Save Skills</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Skils);


