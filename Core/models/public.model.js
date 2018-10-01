// import mongoose from 'mongoose';

// const CarSchema = mongoose.Schema({
//     name: {type: String, required: true, unique: true, index: true}
// }, {collection : 'Car'});
import * as db from '../config/db'
 let userModel = {} //mongoose.model('Car', CarSchema);

userModel.login  = async (user) => {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM user_master where email='${user.email}' and password ='${user.password}'`, function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
          });
    });

}


userModel.createUser =async (user) => {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO user_master (email, password,active) VALUES ('${user.email}', '${user.password}',0)`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}

userModel.registerStep1 =async (userId,user) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_master SET firstname = '${user.firstName}', lastname = '${user.lastName}' where id='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}


userModel.verifyEmail =async (userId) => {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        console.log(`UPDATE user_master SET active = 1 where id=${userId}`);
        connection.query(`UPDATE user_master SET active = 1 where id='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}
userModel.addCar = (carToAdd) => {
    return carToAdd.save();
}

userModel.removeCar = (carName) => {
    return userModel.remove({name: carName});
}

export default userModel;