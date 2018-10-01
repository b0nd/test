import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import SubHeader from '../../components/sub-header/sub-header'
import { withRouter } from 'react-router-dom';
import { sendGetRequest } from '../../utils/network';
import { STATIC_PAGE_URL, ERROR_MESSAGES } from '../../config/configuration';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { showMessage } from "../../utils/message";
/**
 * Static Screen Component to display Static Screen Content.
 * Will be customized on basis of url
 */
class StaticScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            datasource: undefined,
            isLoading: true,
            selectValue: null
        }
        sendGetRequest(`${STATIC_PAGE_URL}?id=${this.props.location.pathname.substring(1)}`).then(_res => {
            this.setState({ datasource: _res,
            isLoading: false });
        })
            .catch(err => {
                this.setState({ isLoading: false });
                showMessage('error', ERROR_MESSAGES.FETCH_CATEGORY_ERROR);
            })
    }
    render() {
        return (
            <div className="static-screen">


                <SubHeader linkName="abc"></SubHeader>
                {(this.state.datasource) ?
                    <div className="wrapper">
                        {/* banner block */}
                        <div className="main-container">
                            <img src="images/autoBanner.jpg" />
                            <div className="center-align near-service-row">
                                <h1 className="near-service-label white">{this.state.datasource.mainTitle}</h1>
                                <div className=" recieve-row">
                                    <h2 className="recieve-label white">{this.state.datasource.subtitle}</h2>
                                </div>
                            </div>
                        </div>
                        {/* banner block */}
                        <div class="row steps mar0">
                            <div className="col-md-6 col-md-offset-3 selection-row">
                                <div class="row">
                                    <div className="col-sm-2 right-align">
                                        <span className="i-need-label">I need </span>
                                    </div>
                                    <div className="col-md-6 col-sm-6 col-xs-6 padd0">
                                        <select class="form-control" id="sel1" onChange={(e)=>this.setState({selectValue: e.target.value})}>
                                        {(this.state.datasource.subCategories && this.state.datasource.subCategories.length) ? this.state.datasource.subCategories.map((_item)=>{
                                                return (<option value={_item}>{_item}</option>)
                                        }) : ''
                                    
                                    }
                                            
                                            
                                        </select>
                                    </div>
                                    <div className="col-sm-4 left-align padd0">
                                        <a href="javascript:void(0)" className="get-free-quotes">Get Free quotes</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* banner block */}
                        {/* What is air Tasker Section */}

                        <section ><div className="jumbotron transparent container videoblk">
                            <h2>How does Taskmafia work?</h2>

                            <ul class="col-md-offset-1 col-md-10">
                                <li className=" col-md-4 col-md-sm-4 col-xs-4">

                                    <img className=" icon " src="images/postTask.png" alt="card image" />
                                    <span className=""><span className="task-heading">Post your task
</span><span className="task-detail">Tell us what you need. It's FREE to post.</span></span>
                                </li>
                                <li className=" col-md-4 col-md-sm-4 col-xs-4">
                                    <img className=" icon " src="images/reviewOff.png" alt="card image" />
                                    <span className=""><span className="task-heading">Review offers
</span><span className="task-detail">Get offers from trusted Taskers and view profiles.</span></span>
                                </li>
                                <li className=" col-md-4 col-md-sm-4 col-xs-4">
                                    <img className=" icon " src="images/taskDone.png" alt="card image" />
                                    <span className=""><span className="task-heading">Get it done</span>
                                        <span className="task-detail">Choose the right person for your task and get it done.</span></span></li>
                            </ul>

                        </div></section>
                        <section className="tabBlockGrey center">
                            <div className="container jumbotron transparent">
                                <div class="leftContent col-md-9 col-sm-7 col-xs-12">
                                    <h4>{this.state.datasource.hireTextTitle}</h4>
                                    <p>Taxes are inevitable and filing them can only be fun to a few. The good news is–you can avoid the pain involved in filing them and get the most out of your accounting.</p>
                                    <p>When it comes to accounting, painstaking details are a must. While a single mistake can cost you
                                        significantly and hurt your credit score, you can witness your tax debts
                shrinking and savings growing in size if your finances are managed well. </p>
                                    <p>An efficient accountant can help you detect areas that can impact negatively your bank balance and at the same time can suggest you options that can bring home more and more cash. Besides, hiring an accountant can save you an ample amount of time to focus on more important things.</p>
                                    <p>And you know what! There is a large pool of expert accountants in your vicinity at your convenience. You only have to describe the finance services you are looking for and suggest a price. Rest, sit relaxed and take your pick from the out pour of offers.</p>
                                    <p>Managing personal finances efficiently has never been easier before. Get the perfect accounting services in your budget today and see your liabilities turning into assets.</p>
                                </div>
                                <div class="rightContent col-md-3 col-sm-5 col-xs-12">
                                    <h4>{this.state.datasource.subCategoriesTitle}</h4>
                                    <ul class="subCat">
                                        {
                                            this.state.datasource.subCategories.map((item) => {
                                                return (<li><a href="">{item}</a></li>)
                                            })
                                        }
                                        <li class="containerMoreLess">
                                            <input type="checkbox" id="check_id" />
                                            <label for="check_id"></label>
                                            <ul>

                                            </ul>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </section>


                        {/* What is air Tasker Section */}
                        {/* Recent Task near you */}
                        <section className="tabBlockGrey center">
                            <div className="jumbotron transparent container completeTaskBlk">
                                <div class="leftContent col-md-9 col-sm-7 col-xs-12">
                            {/* <div className="jumbotron transparent container completeTaskBlk">
                                <div className="row">
                                <div class="col-md-offset-1 col-md-10"> */}
                                    <span className="recent-task-label">Accounting tasks in your area</span>
                               
                                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="item active">
                                            <div className="row ">
                                                {this.state.datasource.recentTask.map((_item, index) => {
                                                    if (index > 3) return ''
                                                    else {
                                                        return (
                                                            <div className="col-md-4 col-md-sm-4 col-xs-6 ">
                                                                <div className="block">
                                                                    <p>
                                                                        {/* <img className=" personimage  " src={_item.imageUrl} alt="card image" /> */}
                                                                        <span className="name">{_item.jobTitle}<p class="city">{_item.location}</p></span></p>
                                                                    <p className="task-detail">{_item.detailDescription}</p>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                })
                                                }
                                        </div>
                                    </div>
                                    


                                            <div className="item">
                                                <div className="row ">
                                                {this.state.datasource.recentTask.map((_item, index) => {
                                                    if (index <= 3) return ''
                                                    else {
                                                        return (
                                                            <div className="col-md-4 col-md-sm-4 col-xs-6 ">
                                                            <div className="block">
                                                                <p>
                                                                    {/* <img className=" personimage  " src={_item.imageUrl} alt="card image" /> */}
                                                                    <span className="name">{_item.jobTitle}<p class="city">{_item.location}</p></span></p>
                                                                <p className="task-detail">{_item.detailDescription}</p>
                                                            </div>
                                                        </div>
                                                        )
                                                    }
                                                })
                                                }
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>

    </div>    
                                </div>
                    </section>






                </div>

                        : <Loader loading={this.state.isLoading} />
                        }
            </div>
        );
            }
        }
        
{/* <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-4 parent-row">
                            <RecentTask />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 parent-row">
                            <RecentTask />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 parent-row">
                            <RecentTask />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 parent-row">
                            <RecentTask />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 parent-row">
                            <RecentTask />
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-4 parent-row">
                            <RecentTask />
                        </div>
</div> */}
                export default withRouter(StaticScreen);
