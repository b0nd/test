import React, { Component } from "react";
import { connect } from 'react-redux';
/**
 * Content of Signup screen.
 */
class NoMatch extends Component {
    constructor(props) {
        super(props);

    }




    render() {
        return (
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="error-template">
                            <h1>
                                Oops!</h1>
                            <h2>
                                404 Not Found</h2>
                            <div class="error-details">
                                Sorry, this page no more exists in our system!
                </div>
                            <div class="error-actions">
                                <a href="http://www.jquery2dotnet.com" class="btn btn-primary"><span class="glyphicon glyphicon-home"></span>
                                    Take Me Home </a><a href="http://www.jquery2dotnet.com" class="btn btn-default"><span class="glyphicon glyphicon-envelope"></span> Contact Support </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}




export default NoMatch;

