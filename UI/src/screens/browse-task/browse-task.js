import React, { Component } from "react";
import { connect } from 'react-redux';
import { sendGetRequest } from '../../utils/network';
import { REGISTER_STEP_2_URL } from '../../config/configuration';
import { Loader, LoadingOverlay } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { GET_TASK_URL, ERROR_MESSAGES } from '../../config/configuration';
import { registerStep2, saveImage } from '../../screens/sign-up/actions';
import Modal from 'react-responsive-modal';
import Signup from '../../screens/sign-up/sign-up';
import PlaceBid from '../../screens/place-bid/place-bid';
import InputRange from 'react-input-range';
import Autocomplete from 'react-google-autocomplete';
import InfiniteScroll from 'react-infinite-scroller';
import { geolocated } from 'react-geolocated';

/**
 * Content of Browse Task screen.
 */
class BrowseTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            taskArray: [],
            selectedTask: undefined,
            filterTaskCost: 0,
            filterStatus: 'open',
            filterDueDate: '02/09/2018',
            visibleCostFilter: false,
            radius: 10,
            isPopupOpen: false,
            value: { min: 0, max: 500 },
            city: {
                lat: 36.8485,
                lon: 174.7633
            },
            hasMore: true,
            showNoResultFound: false
        }
        if (this.props.user.isLoggedIn && this.props.user.city.hasOwnProperty('lat') && this.props.user.city.hasOwnProperty('lon')) {
            this.state.city.lat = this.props.user.city.lat
            this.state.city.lon = this.props.user.city.lon
        }

    }

    componentDidMount() {
        //this.fetchAllTasks();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.user.isLoggedIn && !this.props.user.city.hasOwnProperty('lat') && !this.props.user.city.hasOwnProperty('lon')) {
            if (nextProps.coords && nextProps.coords.latitude && nextProps.coords.longitude) {
                this.state.city.lat = nextProps.coords.latitude;
                this.state.city.lon = nextProps.coords.longitude;
                this.fetchAllTasks(1);
            }

        }
    }



    fetchAllTasks = (pageIndex, _withFilter) => {
        this.setState({ isLoading: true })
        let url = '';
        if (_withFilter) {
            this.setState({ selectedTask: undefined, taskArray: [] });
            url = `${GET_TASK_URL}?pageIndex=${pageIndex}&pageSize=5&status=${this.state.filterStatus}&lat=${this.state.city.lat}&lon=${this.state.city.lon}&radius=${this.state.radius}&minPrice=${this.state.value.min}&maxPrice=${this.state.value.max}`;
        } else {
            url = `${GET_TASK_URL}?pageIndex=${pageIndex}&pageSize=5&status=${this.state.filterStatus}&lat=${this.state.city.lat}&lon=${this.state.city.lon}&radius=${this.state.radius}&minPrice=${this.state.value.min}&maxPrice=${this.state.value.max}`;
        }

        sendGetRequest(url)
            .then(_res => {
                this.setState({ isLoading: false })
                if (_res.status === 200) {
                    if (_res.data.length) {
                        this.setState({ showNoResultFound: false,taskArray: this.state.taskArray.concat(_res.data), hasMore: true })
                    } else {
                        this.setState({ hasMore: false, showNoResultFound: true })
                    }

                }
            })
            .catch(err => {
                this.setState({ isLoading: false, hasMore: false })
                showMessage('error', ERROR_MESSAGES.FETCH_TASK_ERROR);
            })
    }

    onPrevious() {
        if (this.state.isActive > 0) {
            this.setState({ isActive: --this.state.isActive })
        }
    }

    onCloseModal = () => {
        this.setState({ isPopupOpen: false });
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

    getButtonText() {
        if (this.props.user.bidArray.length) {
            for (let i = 0; i < this.props.user.bidArray.length; i++) {
                if (this.props.user.bidArray[i].id === this.state.selectedTask.id) {
                    return "You posted bid on this project";
                }
            }
        }
        return "bid on this project";
    }

    /**
     * called when login successfull.
     */
    loginSuccessCallback = () => {

    }


    render() {
        return (
            <div className="browse-task-screen">

                <Modal ref="modelRef" open={this.state.isPopupOpen} onClose={this.onCloseModal} closeOnOverlayClick={false} center>
                    {(!this.props.user.isLoggedIn) ?
                        <Signup isForSignup={false} onClose={this.onCloseModal} successCallback={this.loginSuccessCallback} />
                        :
                        <PlaceBid task={this.state.selectedTask} onClose={this.onCloseModal} />
                    }
                </Modal>
                <div className="container-fluid filter-container">
                    <form class="navbar-form search-filter-box-wrapper">
                        <div class="form-group">
                            <label for="sel1"> Search Location:</label>
                            <div>
                                <Autocomplete
                                    class={'input'}
                                    type={'text'}
                                    style={{ width: '100%' }}
                                    onPlaceSelected={(data) => {
                                        this.onCitySelect(data)
                                    }}
                                    types={['(regions)']}
                                    componentRestrictions={{ country: "nz" }}
                                    className={'form-control'}
                                />
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="sel1">Task Status:</label>
                            <div>
                                <select class="form-control" value={this.state.filterStatus} onChange={(e) => { this.onInputChange(e, 'filterStatus') }}>
                                    <option value="open">Open</option>
                                    <option value="close">Close</option>
                                    <option value="close">Pending</option>
                                </select>
                            </div>
                        </div>

                        <span id="filter-date">
                            <div className="form-group">
                                <label for="sel1"> Search Range(in KM):</label>
                                <div>
                                    <input type="number" class="form-control" name="start_date" placeholder="Radious" style={{ width: '150px' }} value={this.state.radius} onChange={(e) => this.onInputChange(e, 'radius')} />
                                </div>
                            </div>

                            <div class="form-group">
                                <button type="button" id="btn-filter-pending" class="btn btn-default cost-btn" onClick={(e) => { this.setState({ visibleCostFilter: !this.state.visibleCostFilter }) }}>Task Cost</button>
                                <div className={(this.state.visibleCostFilter) ? "tooltiptext show" : "tooltiptext hide"}>
                                    <InputRange
                                        maxValue={500}
                                        minValue={1}
                                        value={this.state.value}
                                        onChange={value => this.setState({ value })} />
                                </div>
                            </div>
                        </span>
                        <button type="button" onClick={(e) => { this.fetchAllTasks(1, true) }} class="btn  filter-btn">Filter Task</button>
                    </form>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4 ">

                            <InfiniteScroll
                                pageStart={0}
                                initialLoad={false}
                                loadMore={(e) => { this.setState({ hasMore: false }); this.fetchAllTasks(e) }}
                                hasMore={this.state.hasMore}
                                loader={<div class=""></div>}
                            >
                                <ul class="task-list-wraper">
                                    {(this.state.taskArray && this.state.taskArray.length > 0) ? this.state.taskArray.map((task) => {
                                        return (
                                            <li onClick={(e) => { e.preventDefault(); this.setState({ selectedTask: task }) }}>
                                                <div className="row">
                                                    <div className="col-sm-3 text-center">
                                                        <img className=" personimage  " src="images/personeimage.jpg" alt="card image" />
                                                        
                                                    </div>
                                                    <div className="col-sm-9">
                                                        <h4 className="task-heading side">{task.taskDescription}</h4>
                                                        <h5 className="cityname">Auckland</h5>
                                                        <div className="due-date">Due Date: <span> {task.dueDate} </span></div>
                                                    </div>

                                                </div>
                                                <div className="row bottom-border">

                                                </div>



                                                <div className="row">
                                                    <span className="status">Status: {task.status}</span>
                                                    <span className="task-heading price-value pull-right">${task.expectedCost}</span>
                                                </div>
                                            </li>
                                        )
                                    })

                                        : ''}
                                </ul>
                                <div style={{ height: '250px', width: '100%' }}>
                                    <LoadingOverlay style={{ width: '100%', height: 200 }}>
                                        <Loader text="Loading Task For you.." loading={this.state.isLoading} />
                                    </LoadingOverlay>
                                </div>

                            </InfiniteScroll>



                        </div>


                        <div className="col-sm-8">
                            {

                                (this.state.showNoResultFound && !this.state.taskArray.length) ?
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="error-template">
                                                <h1>
                                                    Oops!</h1>
                                                <h2>
                                                    404 Not Found</h2>
                                                <div class="error-details">
                                                        Try searching with different value again.
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div> : ''

                            }

                            {(this.state.selectedTask) ?
                                <div className="row">
                                    <div class="jumbotron task-detail-wraper">
                                        <div class="">
                                            <div className="row">
                                                <div className="col-sm-3 text-center">
                                                    <img className="detail-image" src="images/personeimage.jpg" alt="card image" />
                                                    <div class="postedby">
                                                      <label>Posted By</label>
                                                       <h5>Michael Josef</h5>
                                                       <p className="posted-date">
                                                         2 days ago
                                                       </p>
                                                    </div>
                                                    <div className="project-budget-box">
                                                     <h4>Task Budget</h4>
                                                     <p>$1500</p>
                                                    </div>
                                                    <div className="shareon">
                                                    <h6>Share on</h6>
                                                     <ul>
                                                      <li><a href="#"><img src="images/fab.png"/></a></li>
                                                      <li><a href="#"><img src="images/gplus.png"/></a></li>
                                                      <li><a href="#"><img src="images/twitter2.png"/></a></li>
                                                      <li><a href="#"><img src="images/linkedin.png"/></a></li>
                                                     </ul>
                                                    </div>
                                                </div>
                                                <div className="col-sm-9">
                                                    <h1 class="display-3 task-name-head left-align">{this.state.selectedTask.taskDescription}</h1>
                                                       <div class="task-status-box">
                                                        <p> Current Status</p>
                                                       <span className="task-status open">{this.state.selectedTask.status}</span>
                                                       <span className="task-status">Close</span>
                                                       <span className="task-status">Pending</span>
                                                       </div>

                                                       <div class="location-box">
                                                        <label>Location : </label>
                                                        <span className="status-description">{this.state.selectedTask.location}</span>
                                                       </div>

                                                       <div class="location-box">
                                                        <label>Expected Budget : </label>
                                                        <span className="status-description">${this.state.selectedTask.expectedCost}</span>
                                                       </div>

                                                       <div class="location-box">
                                                        <label>Due Date : </label>
                                                        <span className="status-description">{this.state.selectedTask.dueDate}</span>
                                                       </div>

                                                       <div class="location-box">
                                                        <label>Discription </label>
                                                        <p className="status-description">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                                       </div>

                                                       <div class="button-box">
                                                            <a class="btn btn-success btn-lg" href="javascript:void(0)" onClick={(e) => this.onBidButtonClick()} role="button">Make an Offer</a>
                                                        </div>

                                                        <hr/>




                                               
                                                </div>

                                                <div className="comment-wrap">
                                                <h3>Offers</h3>
                                                 <ul>
                                                  <li>
                                                    <div className="row">
                                                       <div className="col-sm-2 text-center">
                                                         <img className="comment-user-img" src="images/personeimage.jpg"/>                                                       </div>

                                                       <div className="col-sm-9">
                                                         <h4>John <span className="pull-right date-time-comment">2 days ago</span></h4>
                                                         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                       </div>
                                                    </div>
                                                  </li>

                                                  <li>
                                                    <div className="row">
                                                       <div className="col-sm-2 text-center">
                                                         <img className="comment-user-img" src="images/personeimage.jpg"/>
                                                       </div>

                                                       <div className="col-sm-9">
                                                         <h4>John <span className="pull-right date-time-comment">2 days ago</span></h4>
                                                         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                       </div>
                                                    </div>
                                                  </li>

                                                  <li>
                                                    <div className="row">
                                                       <div className="col-sm-3"><img className="comment-user-img" src="images/personeimage.jpg"/></div>
                                                       <div className="col-sm-9">
                                                         <h4>John <span className="pull-right date-time-comment">2 days ago</span></h4>
                                                         <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                                       </div>
                                                    </div>
                                                  </li>
                                                  
                                                 </ul>
                                                </div>
                                            </div>
             
                                             
                                            
                                        </div>
                                    </div>
                                </div> : ''}
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

export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(connect(mapStateToProps, mapDispatchToProps)(BrowseTask));

