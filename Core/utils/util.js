import nodemailer from 'nodemailer';
var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "kashifaliquazi@gmail.com",
        pass: "Kashif.usia@123"
    }
  });

  var rand,mailOptions,host,link;




exports.sendEmail = (email = 'kashifaliquazi@gmail.com',subject,html) => {
    mailOptions={
        to : email,//'aasimaliquazi@gmail.com',
        subject :subject, //"Please confirm your Email account",
        html :html,// "Hello,test" 
    }
    console.log("mail");
    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error){
                console.log("error"+error);
                return reject(err);
            }
            else{
                console.log("saved");
            return  resolve(response.message);
                }
           });
    });
};

exports.getSuccessObject = (result) => {
    let response = {
        status: 200,
        message: 'success',
        data: result
    }
return response;
};

exports.getErrorObject = (statusCode,message) => {
    let response = {
        status: statusCode,
        message: message,
        data: {}
    }
return response;
};
