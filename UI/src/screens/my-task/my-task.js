import React, { Component } from "react";
import { connect } from 'react-redux';
import { sendGetRequest, sendPostRequest } from '../../utils/network';
import { Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { FETCH_MY_TASK_URL, GET_BID_LIST_URL, ERROR_MESSAGES, ACCEPT_BID_URL } from '../../config/configuration';
import { registerStep2, saveImage } from '../../screens/sign-up/actions';
import Modal from 'react-responsive-modal';

/**
 * Content of Browse Task screen.
 */
class MyTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            taskArray: [],
            selectedTaskId: undefined,
            displayTask: true,
            isPopupOpen: false,
            city: {},
            loaderText: 'Loading you task...',
            bidArray: []
        }
    }

    componentDidMount() {
        this.fetchMyTask();
    }

    fetchMyTask = (_withFilter) => {
        this.setState({ isLoading: true })
        sendGetRequest(FETCH_MY_TASK_URL, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status === 200) {
                    this.setState({ taskArray: _res.data })
                }
            })
            .catch(err => {
                this.setState({ isLoading: false })
                showMessage('error', ERROR_MESSAGES.FETCH_TASK_ERROR);
            })
    }

    getTaskDetail = (_taskId) => {
        this.setState({ loaderText: 'Loading you task...', isLoading: true })
        sendGetRequest(FETCH_MY_TASK_URL, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status === 200) {
                    this.setState({ taskArray: _res.data })
                }
            })
            .catch(err => {
                this.setState({ isLoading: false })
                showMessage('error', ERROR_MESSAGES.FETCH_TASK_ERROR);
            })
    }

    onPrevious() {
        if (this.state.isActive > 0) {
            this.setState({ isActive: --this.state.isActive })
        }
    }

    onCloseModal = () => {
        this.setState({ isPopupOpen: false, bidArray:[], displayTask: true });
    };

    onInputChange = (e, name) => {
        this.setState({ [name]: e.target.value })
    }

    onCitySelect(data) {
        console.log(data);
        this.setState({
            city: {
                City: data.formatted_address,
                lat: data.geometry.location.lat(),
                lon: data.geometry.location.lng()
            }
        });
    }

    onBidButtonClick = () => {
        this.setState({ isPopupOpen: true });
    }

    /**
     * Fetch all the bids as per task...........
     */
    fetchAllBidsOnTask = (_taskId) => {
        this.setState({ loaderText: 'Loading Bid for this Task', isLoading: true });
        sendGetRequest(`${GET_BID_LIST_URL}?taskId=${_taskId}`)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status === 200) {
                    if (_res.data.length === 0) {
                        showMessage('info', ERROR_MESSAGES.NO_BID_AVAIALABLE)
                    } else {
                        this.setState({ bidArray: _res.data, displayTask: false, selectedTaskId: _taskId });
                    }
                    console.log(_res.data);
                } else {
                    showMessage('error', ERROR_MESSAGES.BID_API_ERROR)
                }
            })
            .catch(_error => {
                this.setState({ isLoading: false });
                showMessage('error', ERROR_MESSAGES.BID_API_ERROR)
            })
    }

    /**
     * Accept Bid...........
     */
    acceptBid = (_bid) => {
        this.setState({ isLoading: true, loaderText: 'hold on..' });
        let reqData = {
            "bidId": _bid.id,
            "taskId": this.state.selectedTaskId,
            "taskerId": _bid.taskerId
        };
        sendPostRequest(ACCEPT_BID_URL, reqData, true, this.props.user.token)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status == 200) {
                    this.setState({ isPopupOpen: true});
                    //showMessage('success', ERROR_MESSAGES.SUCCESS_ACCEPT_BID)
                } else {
                    showMessage('error', ERROR_MESSAGES.ERROR_ACCEPT_BID)
                }
            })
            .catch(_error => {
                this.setState({ isLoading: false });
                showMessage('error', ERROR_MESSAGES.ERROR_ACCEPT_BID)
            })
    }

    getButtonText() {
        if (this.props.user.bidArray.length) {
            for (let i = 0; i < this.props.user.bidArray.length; i++) {
                if (this.props.user.bidArray[i].id == this.state.selectedTask.id) {
                    return "You posted bid on this project";
                }
            }
        }
        return "bid on this project";
    }

    backToTask = () => {
        this.setState({ displayTask: true, bidArray: [] })
    }

    /**
     * called when login successfull.
     */
    loginSuccessCallback = () => {

    }


    render() {
        return (
            <div className="mytask-task-screen">
                <Loader fullPage text={this.state.loaderText} loading={this.state.isLoading} />
                <Modal ref="modelRef" open={this.state.isPopupOpen} onClose={this.onCloseModal} center closeOnOverlayClick={false}>
                    <div className="accept-bid-popup">
                        <h1 className="bid-success-label">Bid Accepted Successfully!!</h1>
                        <img src="./images/tick.png" className="tick-class" alt="success-image" height="100" widht="100" />
                        <a className="btn btn-success message-btn" href="javascript:void(0)">Message</a>
                    </div>
                </Modal>
                <div class="container bootstrap snippet">
                    {(!this.state.displayTask) ?
                        (<div>
                            <div className="row">
                                <a href="javascript:void(0)" onClick={(e) => { this.backToTask() }}><i class="fa fa-arrow-circle-left fa-2x" aria-hidden="true"></i><span className="back-to-top-label">Back To Task</span></a>
                            </div>
                            <div class="row">
                                <ul>
                                    {(this.state.bidArray && this.state.bidArray.length > 0) ? this.state.bidArray.map(bid => {
                                        return (<li className="bid-row">
                                            <div className="flex-container">
                                                <div className="bidder_img">
                                                    <img className="bidder_img-style" src={bid.profilepicture} alt={'pic not avaolable'} />
                                                </div>
                                                <div className="description-area">
                                                    <p className="bidder-name">{bid.firstname + ' ' + bid.lastname}</p>
                                                    <p className="bidder-email">{bid.email}</p>
                                                </div>
                                                <div className="price-area">
                                                    <p className="offer-label">$ {bid.offer}</p>
                                                </div>
                                                <div className="btn-area">
                                                    <a className="btn btn-success" href="javascript:void(0)" onClick={(e)=>{this.acceptBid(bid)}}>Accept</a>
                                                </div>
                                            </div>
                                            <div className="flex-container">
                                                <div className="offer-area">
                                                    <p className="offer-label">
                                                        {bid.comment}
                                                    </p>
                                                </div>
                                                <div className="location-area">
                                                    <i class="fa fa-map-marker fa-2x" aria-hidden="true"></i>
                                                    <span className="location-label">{this.state.bidArray[0].city}</span>
                                                </div>
                                            </div>
                                        </li>
                                        )
                                    }) : ''}
                                </ul>
                            </div> </div>) : ''
                    }
                    {(this.state.displayTask) ?
                        <div class="row" >
                            <div class="col-lg-12">
                                <div class="main-box no-header clearfix">
                                    <div class="main-box-body clearfix">
                                        <div class="table-responsive">
                                            <table class="table user-list">
                                                <thead>
                                                    <tr>
                                                        <th><span>Description</span></th>
                                                        <th><span>Due Date</span></th>
                                                        <th class="text-center"><span>Status</span></th>
                                                        <th><span>Cost</span></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {(this.state.taskArray && this.state.taskArray.length > 0) ? this.state.taskArray.map((task) => {
                                                        return (
                                                            <tr onClick={(e) => { (this.props.status == 'pending') ? this.fetchAllBidsOnTask(task.id) : '' }}>
                                                                <td style={{ width: '45%' }}>
                                                                    <img src="images/personeimage.jpg" alt="" height="100" width="100" />
                                                                    <a href="#" class="user-link">{task.taskDescription}</a>
                                                                </td>
                                                                <td style={{ width: '20%' }}>{task.dueDate}</td>
                                                                <td class="text-center" style={{ width: '20%' }}>
                                                                    <span class="label label-default">{task.status}</span>
                                                                </td>
                                                                <td>
                                                                    <a href="#">${task.expectedCost}</a>
                                                                </td>
                                                            </tr>
                                                        )
                                                    }) : ''}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyTask);

