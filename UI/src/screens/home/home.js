import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { sendPostRequest } from '../../utils/network';
import * as urls from '../../config/configuration';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { withRouter } from 'react-router-dom';
import RegisterStep1 from '../register-step-1/register-step-1';
import RegisterStep2 from '../register-step-2/register-step-2';
import ScrollAnimation from 'react-animate-on-scroll';
import "animate.css/animate.min.css";


class Home extends Component {
    constructor(props) {

        super(props);
        this.state = {
            isModalOpen: false,
        }
    }

    getComponent() {
        if (this.props.location.pathname === '/register-step-1') {
            return (<RegisterStep1 />);
        } else if (this.props.location.pathname === '/register-step-2') {
            return (<RegisterStep2 />);
        }

    }


    onOpenModal = () => {
        this.setState({ isModalOpen: true });
    };

    onCloseModal = () => {
        this.setState({ isModalOpen: false });
    };



    render() {
        return (
            <div>
                <div className="wrapper">
                    <section className="home-container jumbotron paddB0">
                        <div class="headtext">
                            <h1 className="welcome-text">
                                <span class="h1">Taskmafia<sup>Beta</sup></span>
                                <span>An online market place</span>
                                <span>where kiwis get everything done!</span></h1>
                            <div class="btnGroup">
                                <button class="yellow hvr-bounce-in">Get started now</button>
                                <button class="lightBlue hvr-bounce-in">See how it's done</button>
                            </div>
                            <a href="#how-it-works-demo"><i class="fa fa-play-circle-o custom-fa-2x" aria-hidden="true"></i><span className="video-label">Watch Video</span></a>
                        </div>
                        <img src="../images/banner.png" className="center" />
                        {/* <img src="./images/professionalImage.jpg" className="center"/> */}
                    </section>
                    <section className="">
                        <div className="jumbotron transparent container no-top-padding">

                            <h2>Get your to-dos done!</h2>
                            <ul className="todoMenu">
                                <li className="col-md-2 col-sm-3 col-md-4">
                                    <a href="http://18.191.35.127:3000/cookingServices" target="_blank">
                                        <span className="rounded-0 iconBlock">
                                            {/* <img src="../images/cooking.png" /> */}
                                            <img src="../images/baking.svg" />

                                        </span>
                                        <span className="txt">Baking & Cooking</span>
                                    </a>
                                </li>
                                <li className="col-md-2 col-sm-3 col-md-4">
                                    <a href="http://18.191.35.127:3000/administrativeServices" target="_blank">
                                        <span className="rounded-0 iconBlock">
                                            <img src="./images/business.png" />
                                            {/* <FontAwesomeIcon className ='font-awesome' icon={fahands} /> */}
                                        </span>
                                        <span className="txt">Business & Admin</span>
                                    </a>
                                </li>
                                <li className="col-md-2 col-sm-3 col-md-4"><a href="http://18.191.35.127:3000/cleaningServices" target="_blank">
                                    <span className="rounded-0 iconBlock">
                                        <img src="./images/clean.png" />
                                    </span><span className="txt" className="txt">Cleaning</span></a></li>
                                <li className="col-md-2 col-sm-3 col-md-4"><a href="http://18.191.35.127:3000/deliveryServices"><span className="rounded-0 iconBlock">
                                    <img src="./images/delivery.png" />
                                </span><span className="txt">delivery & Removals</span></a></li>
                                <li className="col-md-2 col-sm-3 col-md-4"><a href="http://18.191.35.127:3000/photographyServices" target="_blank"><span className="rounded-0 iconBlock">
                                    <img src="./images/camera.png" />
                                </span><span className="txt">Events & Photography</span></a></li>

                                <li className="col-md-2 col-sm-3 col-md-4"><a href="http://18.191.35.127:3000/carpentryServices" target="_blank"><span className="rounded-0 iconBlock">
                                    <img src="./images/furniture.svg" />
                                </span><span className="txt">Furniture</span></a></li>
                                {/* <li className="col-md-2 col-sm-3 col-md-4"><a href="" target="_blank"><span className="rounded-0 iconBlock">
                                    <img src="./images/home.png" />
                                </span><span className="txt" >Home & Gardening</span></a></li> */}
                                {/* <li className="col-md-2 col-sm-3 col-md-4"><a href="" target="_blank"><span className="rounded-0 iconBlock">
                                    <img src="./images/Handymen.png" />
                                </span><span className="txt">Handymen & Tradies</span>
                                </a></li> */}
                                {/* <li className="col-md-2 col-sm-3 col-md-4"><a href="http://18.191.35.127:3000/entertainmentPartyServices" target="_blank"><span className="rounded-0 iconBlock">
                                    <img src="./images/staff.png" />
                                </span><span className="txt">Party & Staffing</span></a></li> */}

                                {/* <li className="col-md-2 col-sm-3 col-md-4"><a href="" target="_blank"><span className="rounded-0 iconBlock"> 
                                    <img src="./images/service.png" />
                                </span><span className="txt">Anything</span></a></li> */}
                            </ul>

                        </div>
                    </section>

                    <section className="tabBlockGrey center">
                        <div className="container jumbotron transparent">
                            <h2>Why use Taskmafia</h2>
                            <img alt="Brand" className="main-logo-bg" src="images/logo.png" />
                            <h4 className="col-md-offset-3 col-md-7 col-sm-7 col-xs-12 normal steps">With TaskMafia You Will find out that getting your task done is more convenient, economical, efficient and secure than ever before</h4>
                            <div className="row steps">
                                <ScrollAnimation animateIn="bounceInLeft">
                                    <div className="col-md-offset-3 col-md-3 col-sm-4 col-xs-6">
                                        <img src="./images/term.png" width="180px" />
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn='bounceInRight'>
                                    <div className="col-md-3 col-sm-4 col-xs-6">

                                        <p className="head">Your Terms</p>
                                        <p className="subtxt">Get no-obligation offers and pick the one that fits your budget the best.</p>
                                    </div>
                                </ScrollAnimation>
                            </div>
                            <div className="row steps">
                                <ScrollAnimation animateIn="bounceInLeft">
                                    <div className="col-md-offset-3 col-md-3 col-sm-4 col-xs-6">
                                        <p className="head">Your Timeline</p>
                                        <p className="subtxt">Hire the People who respect your deadline while meeting high quality expectations.</p>
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn='bounceInRight'>
                                    <div className="col-md-3 col-sm-4 col-xs-6">
                                        <img src="./images/timeline.png" width="180px" />
                                    </div>
                                </ScrollAnimation>
                            </div>
                            <div className="row steps">
                                <ScrollAnimation animateIn="bounceInLeft">
                                    <div className="col-md-offset-3 col-md-3 col-sm-4 col-xs-6">
                                        <img src="./images/safety.png" width="180px" />
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn='bounceInRight'>
                                    <div className="col-md-3 col-sm-4 col-xs-6">
                                        <p className="head">Your Safety</p>
                                        <p className="subtxt">Your payment is always secure with our PCI-DSS complaint payment gateway. TaskMafia is build to protect your peace of mind.</p>
                                    </div>
                                </ScrollAnimation>
                            </div>
                            <div className="row steps">
                                <ScrollAnimation animateIn="bounceInLeft">
                                    <div className="col-md-offset-3 col-md-3 col-sm-4 col-xs-6">
                                        <p className="head">Your Selection</p>
                                        <p className="subtxt">Relish the freedom to select the one who you find the perfect fit for your task.</p>
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn='bounceInRight'>
                                    <div className="col-md-3 col-sm-4 col-xs-6">
                                        <img src="./images/selection.png" width="180px" />
                                    </div>
                                </ScrollAnimation>
                            </div>
                            <div className="row ">
                                <ScrollAnimation animateIn="bounceInLeft">
                                    <div className="col-md-offset-3 col-md-3 col-sm-4 col-xs-6">
                                        <img src="./images/badges.png" width="180px" />
                                    </div>
                                </ScrollAnimation>
                                <ScrollAnimation animateIn='bounceInRight'>
                                    <div className="col-md-3 col-sm-4 col-xs-6">
                                        <p className="head">Verified Badges</p>
                                        <p className="subtxt">You can refer to our badges while deciding who to hire. The badges require a member to meet certain requirements before they can be added to member's profile. They enable you to make an informed selection.</p>
                                    </div>
                                </ScrollAnimation>
                            </div>
                            {/* <ul class="nav nav-tabs" id="myTab" role="tablist">
  <li class="nav-item">
    <a class="nav-link active" id="terms-tab" data-toggle="tab" href="#terms" role="tab" aria-controls="terms" aria-selected="true">Your Terms</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="timeline-tab" data-toggle="tab" href="#timeline" role="tab" aria-controls="timeline" aria-selected="false">Your Timeline</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="safety-tab" data-toggle="tab" href="#safety" role="tab" aria-controls="safety" aria-selected="false">Your Safety</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="selection-tab" data-toggle="tab" href="#selection" role="tab" aria-controls="selection" aria-selected="false">Your Selection</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" id="badges-tab" data-toggle="tab" href="#badges" role="tab" aria-controls="badges" aria-selected="false">Your Badges</a>
  </li>
</ul>
<div class="tab-content" id="myTabContent">
  <div class="tab-pane fade in active" id="terms" role="tabpanel" aria-labelledby="terms-tab">Whatever you need to simplify your to do list, no matter your budget.
  </div>
  <div class="tab-pane fade" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">Find services based on your goals and deadlines, it’s that simple.
</div>
  <div class="tab-pane fade" id="safety" role="tabpanel" aria-labelledby="safety-tab">Your payment is always secure, taskmafia is built to protect your peace of mind.</div>

<div class="tab-pane fade" id="selection" role="tabpanel" aria-labelledby="selection-tab">Whoever you find is good fit for your task, hire him.</div>

<div class="tab-pane fade" id="badges" role="tabpanel" aria-labelledby="badges-tab">Badges give members a bit more verified info when deciding who to work with on a task. Each badge has certain requirements that must be met and verified before they’re shown on the member's profile
.</div>
</div> */}
                        </div>
                    </section>
                    <section className="">
                        <div className="jumbotron transparent container completeTaskBlk">
                            <h2 className=" mT0">See what other are hiring community members for.</h2>
                            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="item active">
                                        <div className="row ">
                                            <div className="col-md-3 col-md-sm-4 col-xs-6 ">
                                                <div className="block">
                                                    <p><img className=" personimage  " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation<p class="city">New York</p></span></p>
                                                    <p className="task-detail">Need someone to fix my kitchen tiles. Need it to be fixed as soon as possible. The work should be done within one day only. Suggesions for tiles are welcome from his side.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-md-sm-4 col-xs-6">
                                                <div className="block">
                                                    <p> <img className=" personimage " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation
            <p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-md-sm-4 col-xs-6">
                                                <div className="block">
                                                    <p><img className=" personimage " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation
            <p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-md-sm-4 col-xs-6">
                                                <div className="block">
                                                    <p><img className=" personimage " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation
            <p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <div className="row ">
                                            <div className="col-md-3 col-md-sm-4 col-xs-6 ">
                                                <div className="block">
                                                    <p><img className=" personimage  " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation<p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-md-sm-4 col-xs-6">
                                                <div className="block">
                                                    <p> <img className=" personimage " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation
            <p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-md-sm-4 col-xs-6">
                                                <div className="block">
                                                    <p><img className=" personimage " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation
            <p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                            <div className="col-md-3 col-md-sm-4 col-xs-6">
                                                <div className="block">
                                                    <p><img className=" personimage " src="images/personeimage.jpg" alt="card image" />
                                                        <span className="name">Dash cam installation
            <p class="city">New York</p></span></p>
                                                    <p className="task-detail">I have to fix some scratches and polish my car before selling. Scratches are minor and doesn't need painting, just touch up and polish.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </section>
                    <section class="new-back-ng">

                        <div class="container jumbotron transparent contentPos">
                            <h2 class="white">Become a tasker </h2>
                            <h3 class="white">Earn Money while helping others</h3>
                            <ul class="become-tasker">

                                <li><a href="#">Pick the task you love</a></li>
                                <li><a href="#">Enjoy the flexibility to work at anytime and at your place</a></li>
                                <li><a href="#">Rest assured that your payments are secure</a></li>
                            </ul>
                        </div>
                    </section>
                    <section ><div className="jumbotron transparent container videoblk">
                        <h2>How does Taskmafia work?</h2>

                        <ul class="col-md-offset-1 col-md-10">
                            <li className=" col-md-4 col-md-sm-4 col-xs-4">

                                <img className=" icon " src="images/postTask.png" alt="card image" />
                                <span className=""><span className="task-heading">Post your task
</span><span className="task-detail">Share your task requirements with TaskMafia. Its absolutely fee to post.</span></span>
                            </li>
                            <li className=" col-md-4 col-md-sm-4 col-xs-4">
                                <img className=" icon " src="images/reviewOff.png" alt="card image" />
                                <span className=""><span className="task-heading">Review offers
</span><span className="task-detail">Compare offres, check profiles and select the best fit.</span></span>
                            </li>
                            <li className=" col-md-4 col-md-sm-4 col-xs-4">
                                <img className=" icon " src="images/taskDone.png" alt="card image" />
                                <span className=""><span className="task-heading">Relax and get it done</span>
                                    <span className="task-detail">with your task completed you just need to release the payment held security with TaskMafia.</span></span></li>
                        </ul>

                        <section id="how-it-works-demo" className="relblk">
                            <iframe width="800" height="455"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                            </iframe>
                        </section>


                    </div></section>


                    <section className="bluecatBg">
                        <div className="jumbotron transparent container catBlock">
                            <h2 className="white">Some of our top categories</h2>
                            <ul className="white">

                                <li><a href="http://18.191.35.127:3000/accountingServices" target="_blank" className="white">Accounting</a></li>
                                <li><a href="http://18.191.35.127:3000/administrativeServices" target="_blank" className="white">admin</a></li>
                                <li><a href="http://18.191.35.127:3000/alterationServices" target="_blank" className="white">Alteration</a></li>
                                <li><a href="http://18.191.35.127:3000/appliancesServices" target="_blank" className="white">Appliances</a></li>
                                <li><a href="http://18.191.35.127:3000/assemblyServices" target="_blank" className="white">Assembly</a></li>
                                <li><a href="http://18.191.35.127:3000/audioVisualServices" target="_blank" className="white">Audio visual auto</a></li>
                                <li><a href="http://18.191.35.127:3000/beautyServices" target="_blank" className="white">Beauty</a></li>
                                <li><a href="http://18.191.35.127:3000/bricklayingServices" target="_blank" className="white">Bricklaying</a></li>
                                <li><a href="http://18.191.35.127:3000/ConstructionServices" target="_blank" className="white">Building</a></li>
                                <li><a href="http://18.191.35.127:3000/businessServices" target="_blank" className="white">Business</a></li>
                                <li><a href="http://18.191.35.127:3000/carpentryServices" target="_blank" className="white">Carpentry</a></li>
                                <li><a href="http://18.191.35.127:3000/cleaningServices" target="_blank" className="white">Cleaning</a></li>
                                <li><a href="http://18.191.35.127:3000/computers&ITServices" target="_blank" className="white">Computers</a></li>
                                <li><a href="http://18.191.35.127:3000/cookingServices" target="_blank" className="white">Cooking</a></li>
                                <li><a href="http://18.191.35.127:3000/concretingServices" target="_blank" className="white">Concreting</a></li>
                                <li><a href="http://18.191.35.127:3000/deckingServices" target="_blank" className="white">Decking</a></li>
                                <li><a href="http://18.191.35.127:3000/deliveryServices" target="_blank" className="white">Delivery</a></li>
                                <li><a href="http://18.191.35.127:3000/domesticServices" target="_blank" className="white">Domestic</a></li>
                                <li><a href="http://18.191.35.127:3000/drivingServices" target="_blank" className="white">Driving</a></li>
                                <li><a href="http://18.191.35.127:3000/electricalServices" target="_blank" className="white">Electical</a></li>
                                <li><a href="http://18.191.35.127:3000/entertainmentPartyServices" target="_blank" className="white">Entertainment party</a></li>
                                <li><a href="http://18.191.35.127:3000/eventsCateringServices" target="_blank" className="white">Events Catering</a></li>
                                <li><a href="http://18.191.35.127:3000/fencingServices" target="_blank" className="white">Fencing</a></li>
                                <li><a href="http://18.191.35.127:3000/fitnessServices" target="_blank" className="white">Fitness</a></li>

                                {/* <li>Flooring</li><li>Food-Delivery</li><li>Gardening</li>
<li>Handyman</li><li>Home-Theatre</li><li>Immigration</li>
<li>Landscaping</li> */}
                            </ul>
                            <a href="" className="white"><strong>See all categories</strong></a>
                        </div>
                    </section>
                    <section class="greyBg dloadSection">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-6 padd0">
                                <img src="./images/dloadApp.jpg" class="dloadImg" />
                            </div>
                            <div class="col-md-6 col-sm-6 col-xs-6 yellow padd0">
                                <div class="dloadTxt">
                                    <h2>DOWNLOAD THE APP</h2>
                                    <p>There is a cooler way to get the best of TaskMafia experince. Download our Ios/Android app to find a variety of tusted services and manage your task even more easily.</p>
                                    <button class="greyBg hvr-bounce-in">Download</button></div>
                            </div>
                        </div>
                    </section>


                </div>
                {this.getComponent()}
            </div>

        );
    }
}


const mapStateToProps = state => ({ ...state });

const mapDispatchToProps = dispatch => ({

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
