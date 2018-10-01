import React, { Component } from "react";

/**
 * Content of Browse Task screen.
 */
class BecomeATasker extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="become-tasker-screen">
                <div className="container-fluid">
                    <div className="row heading-row">
                        <div className="col-sm-12">
                            <p className="main-heading">
                                Become A Tasker
                        </p>
                        </div>
                    </div>
                    <div className="row become-independent-row">
                        <div className="col-sm-4 col-sm-offset-2">
                            <hr></hr>
                            <p className="become-independent-heading">Become Independent</p>
                            <hr></hr>

                        </div>
                        <div className="col-sm-5">
                            <p className="become-independent-description">Being a Task Mafian you have no obligation to take up the task. You get to only pick up the jobs that you are intrested in and choose customer you want to offer your services.</p>
                        </div>
                    </div>


                    <div className="row become-independent-row">
                        <div className="col-sm-5 col-sm-offset-2">
                            <p className="become-independent-description">Our customers are looking for services throughout the day. Therefore, you can choose the time and schedule of your preference and enjoy the flexibility to focus on your maintain a right work-life fit.</p>
                        </div>
                        <div className="col-sm-4 ">
                            <hr></hr>
                            <p className="become-independent-heading">Enjoy Flexibility</p>
                            <hr></hr>
                        </div>

                    </div>

                    <div className="row become-independent-row">
                        <div className="col-sm-4 col-sm-offset-2">
                            <hr></hr>
                            <p className="become-independent-heading">Your payments are secured</p>
                            <hr></hr>

                        </div>
                        <div className="col-sm-5">
                            <p className="become-independent-description">You can be assured you won’t have to follow up with customers for the payment as it’s secured with taskMafia and you get direct deposits. So you can get started on the task with a peace of mind.</p>
                        </div>
                    </div>
                    <div className="row center-align">
                        <a href="#" className="title-label">Join Task Mafia</a>
                    </div>

                    <div className="start-earning-div">
                        <div className="row center-align">
                            <a href="#" className="title-label">Start Earning Now</a>
                        </div>

                        <div className="row become-independent-row">
                            <div className="col-sm-4 col-sm-offset-2">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSykHKE8uDfgmPAgiiUVIwxFtt8L5O-PLpHsNU1V8UqJVm4zww87Q" class="img-desc" alt="no image available"></img>
                                <p className="become-independent-heading">Find tasks you love </p>
                            </div>
                            <div className="col-sm-5">
                                <p className="become-independent-description">Using search keywords and browse tasks that fit your parameters such as location, commute time, the scope of the task etc. Once you’ve found the task you’re interested in, go ahead and make the offer.</p>
                            </div>
                        </div>


                        <div className="row become-independent-row">
                            <div className="col-sm-5 col-sm-offset-2">
                                <p className="become-independent-description">Depending on time and resources required to complete the task, make a fair offer to the task poster. Your offer doesn’t have to match the quoted price. However, ensure to justify the difference in price to them.</p>
                            </div>
                            <div className="col-sm-4">
                                <img src="data:image/jpeg;base64,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" class="img-desc" alt="no image available"></img>
                                <p className="become-independent-heading">Make a fair offer </p>
                            </div>
                        </div>

                        <div className="row become-independent-row">
                            <div className="col-sm-4 col-sm-offset-2">
                                <img src="data:image/jpeg;base64,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" class="img-desc" alt="no image available"></img>
                                <p className="become-independent-heading">Start tasking and get paid</p>
                            </div>
                            <div className="col-sm-5">
                                <p className="become-independent-description">Stay connected with the task poster to keep him/her on top of the progress. Upon completion, send the payment request. And yes, please make sure to leave a genuine review for the poster. It will be helpful for your fellow taskMafians.</p>
                            </div>
                        </div>


                        <div className="row become-independent-row">
                            <div className="col-sm-5 col-sm-offset-2">
                                <p className="become-independent-description">A good profile can mean more business. In addition to earning good reviews with excellent work, make your profile complete with a photo, nice description and your areas of specialisation. A complete and attractive profile catches attention instantly and gives your offers better chances of acceptance.</p>
                            </div>
                            <div className="col-sm-4">
                                <img src="https://www.eharmony.co.uk/dating-advice/wp-content/uploads/2014/05/ThinkstockPhotos-529402738.jpg" class="img-desc" alt="no image available"></img>
                                <p className="become-independent-heading">Make profile attractive</p>
                            </div>
                        </div>

                    </div>
                    <div className="faq-section">
                        <div className="row center-align">
                            <a href="#" className="title-label">FAQ's</a>
                        </div>
                        <div className="row">
                            <div className="col-sm-9 col-sm-offset-2">
                                <ul>
                                    <li>
                                        <p className="question">
                                            What is required to become a tasker?
                                        </p>
                                        <p className="answer">
                                            Well, nothing specific if you’re skilled in a particular task category. You only need to make sure that you have:
                                               <br></br> - The permit to work in New Zealand,
                                               <br></br>- A bank account to accept direct deposits, and
                                               <br></br>- A contact number and a smartphone to interact with the task-lister once you’re assigned the task.
                                               <br></br> So start working today with taskMafia to further hone your skills and gather positive reviews from your customers so that you can multiply your work opportunities and earn more money, all the while serving your community.
    
                                        </p>
                                    </li>

                                    <li>
                                        <p className="question">
                                        How long does it take to become a tasker?
                                        </p>
                                        <p className="answer">
                                        - As fast as you can sign-up with us. Just create your account on taskMafia and you're a taskMafian already.
                                        </p>
                                    </li>

                                    <li>
                                        <p className="question">
                                        What information do I have to provide to sign up?
                                        </p>
                                        <p className="answer">
                                        - Certainly! You’re free to choose what and what all you want to do. If you’re equipped with the required skills, you could be organising a party one day and writing someone’s résumé the other day.
                                        </p>
                                    </li>

                                    <li>
                                        <p className="question">
                                        What kind of tasks are there on taskMafia?
                                        </p>
                                        <p className="answer">
                                        - People approach taskMafia with a wide variety of requirements for residential as well as commercial purposes. This variety may range from domestic tasks such as fencing, fitness, home theatre, to commercial projects web designing, office interiors, organising corporate events etc. 
The posted tasks will also comprise details of whether you are needed at the site or the job can be performed online.
                                        </p>
                                    </li>

                                    <li>
                                        <p className="question">
                                        Who sets the price for a task?
                                        </p>
                                        <p className="answer">
                                        - The task price is quoted by the task-lister. However, it’s totally okay for your offer price to be different from the quoted price. Just ensure you justify the difference to them.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        How much will I get paid?
                                        </p>
                                        <p className="answer">
                                        - We deduct only 10% of the agreed task price as our platform fee. Rest all would be yours.                                        </p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        What is the TaskMafia service fee?
                                        </p>
                                        <p className="answer">
                                        - 10% - that’s the bare minimum required to run the servers, pay payment gateway service fees and earn bread n’ butter for the dedicated team managing the platform.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        What is the payment process?
                                        </p>
                                        <p className="answer">
                                        - Once the task poster hires you for the job, you can get started on it, with an assurance that your payment is secured with taskMafia. Once you complete the task, you can go ahead and request the payment and a notification will be sent to the poster to release it. After that the payment is deposited in the bank account you have nominated.
taskMafia deducts a services fee on the released payment which includes transactional charge, and maintenance costs to consistently provide an excellent platform experience. A well-maintained platform helps the task-listers hire better services and enable the taskers to multiply their earnings.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        What is the payment process?
                                        </p>
                                        <p className="answer">
                                        - Once the task poster hires you for the job, you can get started on it, with an assurance that your payment is secured with taskMafia. Once you complete the task, you can go ahead and request the payment and a notification will be sent to the poster to release it. After that the payment is deposited in the bank account you have nominated.
taskMafia deducts a services fee on the released payment which includes transactional charge, and maintenance costs to consistently provide an excellent platform experience. A well-maintained platform helps the task-listers hire better services and enable the taskers to multiply their earnings.
                                        </p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        When do I get paid?
                                        </p>
                                        <p className="answer">
                                        - Our payment process is quite straightforward. Once the task-lister releases the payment, which is generally minutes after you finish the job, taskMafia releases it into your account. After that, it’s only how long the bank usually takes to credit the amount into the account.</p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        Who will I work with?
                                        </p>
                                        <p className="answer">
                                        You have all the freedom to decide that for yourself! You can look at the task-lister’s profile and all the reviews and choose whether you want to offer your services to him/her.</p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        How is a task assigned to me?
                                        </p>
                                        <p className="answer">
                                        You can follow a few quick tips to boost the likelihood of your offers getting accepted. First and foremost, complete your profile and improve it by collecting more badge verifications. This adds weight to your credentials and makes your profile look dependable. Besides this, whenever you make an offer, let the task lister know why you’re the right fit for the job and give a valid reason for the price you have quoted.
Getting more tasks is anything but difficult. You can trust us on that!
</p>
                                    </li>
                                    <li>
                                        <p className="question">
                                        Will I get task alerts? (written by CW)
                                        </p>
                                        <p className="answer">
                                        Yes, you will. Just go to your account settings and set the task alerts. You will be notified as soon as a task is posted matching your specialisation and preference. </p>
                                    </li>
                                    

                                </ul>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <div className="block-div"></div>
            </div>

        );
    }
}
export default BecomeATasker;

