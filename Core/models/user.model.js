
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



userModel.facebookAPI =async (user) => {
    console.log("test")
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO user_master (email, password,active,firstname,lastname,facebooktoken,profilepicture) VALUES ('${user.email}', 'N.A.',0, '${user.firstName}', '${user.lastName}', '${user.facebookToken}', '${user.profilePicture}')`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}

userModel.createUser =async (user) => {
    const connection = await db.getConnection();
    console.log('new transaction!');
    return new Promise((resolve, reject) => {
        // connection.query(`INSERT INTO user_master (email, password, active) VALUES ('${user.email}', '${user.password}',0)`, function (err, result) {
        //     if (err) return reject(err);
        //     resolve(result);
        //   });
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query(`INSERT INTO user_master (email, password,active) VALUES ('${user.email}', '${user.password}',0)`, function (error, results1, fields) {
              if (err) {
                return connection.rollback(function() {
                    reject(err);
                });
              }
          
              var userId = results1.insertId;
              
              connection.query(`insert into user_skills (userId) values (${userId})`, function (error, results2, fields) {
                if (err) {
                  return connection.rollback(function() {
                    reject(err);
                  });
                }
                connection.commit(function(err) {
                  if (err) {
                    return connection.rollback(function() {
                        reject(err);
                    });
                  }
                  console.log('success!');
                  resolve(results1);
                });
              });
            
            });
          });
    });
}


userModel.updateUserProfile =async (userId,user) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_master SET firstname = '${user.firstName}', lastname = '${user.lastName}',roleid = '${user.roleId}',city = '${user.city}' where id='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}

userModel.registerStep1 =async (userId,user) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_master SET firstname = '${user.firstName}', lastname = '${user.lastName}',roleid = '${user.roleId}',city = '${user.city}',lat = ${user.lat},lon = ${user.lon} where id='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}


userModel.uploadSkills =async (userId,user) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_skills SET language = '${user.language}', qualifications = '${user.qualification}',experience = '${user.experience}' where userId='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}



userModel.getUserSkills =async (userId) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`select * from user_skills where userId='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}


userModel.getUserAlerts =async (userId) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`select * from user_alerts where userId='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}
userModel.registerStep2 =async (userId,user) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_master SET description = '${user.description}', categories = '${user.categories}' where id='${userId}'`, function (err, result) {
            if (err) return reject(err);

            let values = '';
            if(user.categories.length){
            for(let i = 0;i<user.categories.length; i++)
            {
             values+=`('${userId}','${user.categories[i].id}')`;
             if(i != user.categories.length-1)
             values += ',';
            }
            let query = `INSERT INTO user_alerts(userId,categoryId) VALUES${values}`
        console.log("changesd "+query);
                connection.query(query, function (err, result) {
            if (err) return reject(err);
            console.log("saved "+query);
            resolve(result);
          });
        }
        else
             resolve(result);
   
       
        //    connection.query(`UPDATE user_master SET description = '${user.description}', categories = '${user.categories}' where id='${userId}'`, function (err, result) {
        //     if (err) return reject(err);
        //     resolve(result);
        //   });
          });
    });
}



userModel.setAlerts =async (userId,user) => {

    const connection = await db.getConnection();
    let values = '';
    return new Promise((resolve, reject) => {
        if(user.categories.length){
            for(let i = 0;i<user.categories.length; i++)
            {
             values+=`('${userId}','${user.categories[i].id}')`;
             if(i != user.categories.length-1)
             values += ',';
            }
            let query = `INSERT INTO user_alerts(userId,categoryId) VALUES${values}`
        console.log("changesd "+query);
        //         connection.query(query, function (err, result) {
        //     if (err) return reject(err);
        //     console.log("saved "+query);
        //     resolve(result);
        //   });

          connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query(`Delete from user_alerts where userId = '${userId}'`, function (error, results1, fields) {
              if (err) {
                return connection.rollback(function() {
                    reject(err);
                });
              }
          
             // var userId = results.insertId;
          
              connection.query(query, function (error, results2, fields) {
                if (err) {
                  return connection.rollback(function() {
                    reject(err);
                  });
                }
                connection.commit(function(err) {
                  if (err) {
                    return connection.rollback(function() {
                        reject(err);
                    });
                  }
                  console.log('success!');
                  resolve(results2);
                });
              });
            //  resolve(result);
            });
          });

        }else
        reject("no categories");
    });
}
userModel.updatePassword =async (userId,user) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`Select password from user_master where id='${userId}'`, function (err, result) {
            if (err) return reject(err);

            let values = '';
           
            if(result[0].password == user.password){
           connection.query(`UPDATE user_master SET password = '${user.newPassword}' where id='${userId}'`, function (err, result1) {
            if (err) return reject(err);
            console.log("passss models  "+JSON.stringify(result1));
            resolve(result1);
          });
        }
        else
        resolve(null);
          });
    });
}


userModel.uploadProfilePicture =async (userId,fileName) => {

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE user_master SET profilepicture = '${fileName}' where id='${userId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}

userModel.uploadPortfolioPicture =async (userId,fileName,image) => {
    let query = `UPDATE user_master SET portfoliopicture1 = '${fileName}' where id='${userId}'`;
    if(image == "portfolio-picture-1"){
        query = `UPDATE user_master SET portfoliopicture1 = '${fileName}' where id='${userId}'`;
    } else if(image == "portfolio-picture-2"){
        query = `UPDATE user_master SET portfoliopicture2 = '${fileName}' where id='${userId}'`;

    } else if(image == "portfolio-picture-3"){
        query = `UPDATE user_master SET portfoliopicture3 = '${fileName}' where id='${userId}'`;

    }  else if(image == "portfolio-picture-4"){
        query = `UPDATE user_master SET portfoliopicture4 = '${fileName}' where id='${userId}'`;

    }  

    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}


userModel.uploadHeaderImage =async (userId,fileName) => {
    let query = `UPDATE user_master SET headerImage = '${fileName}' where id='${userId}'`;
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, result) {
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

userModel.getCategories  = async () => {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM sub_category`, function (err, result, fields) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}

userModel.getAlerts  = async () => {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM category_base`, function (err, result, fields) {
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