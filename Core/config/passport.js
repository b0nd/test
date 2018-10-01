'use strict';

var passport = require('passport'),
  FacebookTokenStrategy = require('passport-facebook-token');


module.exports = function () {

  passport.use(new FacebookTokenStrategy({
      clientID: '261011391379986',
      clientSecret: 'e2116ff02b3adbd9a7bb2a551dd8e995'
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("inside call back"+JSON.stringify(profile));
      // User.upsertFbUser(accessToken, refreshToken, profile, function(err, user) {
      //  
      // });
      let user ={"accessToken":accessToken}
       return done(null,profile);
    },function(err){
      console.log("in error");
    }));

};