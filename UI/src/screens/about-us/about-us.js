import React, { Component } from "react";

/**
 * Content of Browse Task screen.
 */
class AboutUs extends Component {
    constructor(props) {
        super(props);
        
    }
    
    render() {
        return (
            <div className="about-us-screen">
                <div className="container-fluid">
                <div className="row heading-row">
                    <div className="col-sm-12">
                        <p className="main-heading">
                            TaskMafia is Proudly Newzeland Owned, Operated 
                        </p>
                        <p className="main-heading">&</p>
                        <p className="main-heading">Build by kiwis, for kiwis</p>
                        <p className="sub-heading">Our objective is to add convenience to normal people's lives by connecting task needs to trusted task services on a single platform.</p>
                    </div>
                </div>
                <div className="row our-plan-row">
                    <div className="col-sm-12">
                        <p className="title-label">~ Our Plan ~</p>
                        <p className="do-fast-label">
                            Finish your todo list Fast.
                        </p>
                        <p className="do-fast-description-label">Task Mafia is an attempt to address real concern of a people- the struggle of finding a dependable person in the vicinity to complete your micro jobs with a high quality and a reasonable price.</p>
                        <hr></hr>
                    </div>
                </div>

                <div className="row our-plan-row">
                    <div className="col-sm-12">
                        <p className="title-label">~ The Execution ~</p>
                        <p className="do-fast-description-label top-margin">Task Mafia is a trusted community plateform which connects those who are looking for task and those who want to get their task done. And when we  say community, we mean everyone. Yes Task Mafia has something for everyone, irrespective of what socioeconomic group a person belong to.</p>
                        <p className="do-fast-description-label top-margin">From a simple one-time assignment fixing your leaking tap to a multistage project such as organising a large corporate event for your enterprise, we have solutions to all your requirements.</p>
                        <p className="do-fast-description-label top-margin"> So if you are looking to hire someone to get a task done, or if you want to provide your services and earn some extra money, sign-up with us today!</p>
                        <hr></hr>
                    </div>
                </div>


                <div className="row our-plan-row">
                    <div className="col-sm-9 col-sm-offset-2">
                        <p className="title-label">~ The Outcome ~</p>
                        <div className="row">
                            <div className="col-sm-3">
                                <a href="#" className="outcome-label">
                                    x number of people are getting their  to-dos done.
                                </a>
                            </div>
                            <div href="#" className="col-sm-3">
                                <a href="#" className="outcome-label">
                                    y number of people are are making extra money.
                                </a>
                            </div>
                            <div  className="col-sm-3">
                                <a href="#" className="outcome-label">
                                    'X'M worth of jobs generated till date
                                </a>
                            </div>
                            <div className="col-sm-3">
                                <a href="#" className="outcome-label">
                                    'X'M $$ given back to community via "Hearts for Humanity"
                                </a>
                            </div>
                        </div>
                        <hr></hr>
                    </div>
                </div>
                <section id="how-it-works-demo" className="relblk">
                            <iframe width="800" height="455"
                                src="https://www.youtube.com/embed/tgbNymZ7vqY">
                            </iframe>
                        </section>


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
                    <div className="block-div"></div>
                </div>
            </div>

        );
    }
}
export default AboutUs;

