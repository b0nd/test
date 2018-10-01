import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { sendPostRequest } from '../../utils/network';
import * as urls from '../../config/configuration';
import { LoadingOverlay, Loader } from 'react-overlay-loader';
import 'react-overlay-loader/styles.css';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { showMessage } from '../../utils/message';
import UploadPhoto from '../../components/upload-photo/upload-photo';
import * as URL from '../../config/configuration';
import { savePortfolioImage } from '../../screens/sign-up/actions';
import '../../Styles/dashboardCss.css';
/**
 * Content of Signup screen.
 */
class Portfolio extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            isLoading: false,
            portfoliopicture1: this.props.user.portfoliopicture1,
            portfoliopicture2: this.props.user.portfoliopicture2,
            portfoliopicture3: this.props.user.portfoliopicture3,
            portfoliopicture4: this.props.user.portfoliopicture4
        }


    }

    onImageUploadSuccess = (_imageUrl) => {
        this.props.saveImage(_imageUrl);
        this.setState({ imgUrl: _imageUrl })
    }

    onPortfolio1ImageUploadSuccess = (_imageUrl) => {
        this.props.savePortfolioImage({
            imgNumber : 1,
            imgUrl: _imageUrl
        });
        this.setState({ portfoliopicture1: _imageUrl })
    }

    onPortfolio2ImageUploadSuccess = (_imageUrl) => {
        this.props.savePortfolioImage({
            imgNumber : 2,
            imgUrl: _imageUrl
        });
        this.setState({ portfoliopicture2: _imageUrl })
    }

    onPortfolio3ImageUploadSuccess = (_imageUrl) => {
        this.props.savePortfolioImage({
            imgNumber : 3,
            imgUrl: _imageUrl
        });
        this.setState({ portfoliopicture3: _imageUrl })
    }

    onPortfolio4ImageUploadSuccess = (_imageUrl) => {
        this.props.savePortfolioImage({
            imgNumber : 4,
            imgUrl: _imageUrl
        });
        this.setState({ portfoliopicture4: _imageUrl })
    }


    onLoaderChange = (_loaderBoolean) => {
        this.setState({ isLoading: _loaderBoolean });
    }

        render() {
        return (

            <div className="port-folio-screen">
                <Loader fullPage   loading={this.state.isLoading} />
                <ToastContainer autoClose={3000} />
                <div class="portfolio box">
                    <h3 class="subHead">Portfolio</h3>
                    <h4>Upload your resume</h4>
                    <p>Adding your resume can definitely help members understand your skills and qualifications.</p>
                    <p>File formats can be PDF/DOC/TXT/RTF and no larger than 5MB.</p>

                    <div class="btnGroup MarT">
                        <input class="actionBtn lightBlue hvr-grow-shadow" value="Select Resume" />
                    </div>
                    <h4 class="MarT">Upload portfolio items</h4>
                    <p>Showcase your talents by adding items to your portfolio (visible on your profile). This is particularly great for photographers, designers and illustrators,
                        but also great for a gallery to advertise you completing tasks.</p>
                    <p>You may upload a maximum of 30 items. File formats can be JPG/PNG/PDF/TXT and must be no
                        larger than 5MB. For your own security and privacy, please make sure you don't upload any personal details in your attachments.</p>
                    {/* <div class="btnGroup MarB">
                        <input class="actionBtn lightBlue hvr-grow-shadow" value="Select Files" />
                    </div> */}
                    <div class="form-group row uploadPic MarT">
                        <div class="ImgBlk col-md-3 col-sm-3 col-xs-12">
                            <label class="col-lg-12 padd0">Your Avatar</label>
                            <UploadPhoto
                                uploadUrl={URL.UPLOAD_PORTFOLIO_IMAGE_1_URL}
                                imageUrl={this.state.portfoliopicture1}
                                onImageUploadSuccess={this.onPortfolio1ImageUploadSuccess}
                                onLoaderChange={this.onLoaderChange}
                                customIdName="portfolio1" />
                        </div>
                        <div class="ImgBlk col-md-3 col-sm-3 col-xs-12">
                            <label class="col-lg-12 padd0">Header Image</label>
                            <UploadPhoto
                                uploadUrl={URL.UPLOAD_PORTFOLIO_IMAGE_2_URL}
                                imageUrl={this.state.portfoliopicture2}
                                onImageUploadSuccess={this.onPortfolio2ImageUploadSuccess}
                                onLoaderChange={this.onLoaderChange}
                                customIdName="portfolio2" />
                        </div>
                        <div class="ImgBlk col-md-3 col-sm-3 col-xs-12">
                            <label class="col-lg-12 padd0">Header Image</label>
                            <UploadPhoto
                                uploadUrl={URL.UPLOAD_PORTFOLIO_IMAGE_3_URL}
                                imageUrl={this.state.portfoliopicture3}
                                onImageUploadSuccess={this.onPortfolio3ImageUploadSuccess}
                                onLoaderChange={this.onLoaderChange} 
                                customIdName="portfolio3"  />
                        </div>
                        <div class="ImgBlk col-md-3 col-sm-3 col-xs-12">
                            <label class="col-lg-12 padd0">Header Image</label>
                            <UploadPhoto
                                uploadUrl={URL.UPLOAD_PORTFOLIO_IMAGE_4_URL}
                                imageUrl={this.state.portfoliopicture4}
                                onImageUploadSuccess={this.onPortfolio4ImageUploadSuccess}
                                onLoaderChange={this.onLoaderChange}
                                customIdName="portfolio4" />
                        </div>
                    </div>
                </div>
            </div>


        );
    }
}


const mapStateToProps = state => ({
    user: state.User


});

const mapDispatchToProps = dispatch => ({
    savePortfolioImage: (data) => {dispatch(savePortfolioImage(data))}

});

export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);
