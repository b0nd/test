import mysql from 'mysql'


let pool = mysql.createPool({
        connectionLimit: 100, //important
        host: "localhost",
        user: "root",
        password: "taskMafia",//"taskMafia",
        database: "taskmafia",
        port:'3306'
      });

    //   let pool = mysql.createPool({
    //     connectionLimit: 100, //important
    //     host: "localhost",
    //     user: "root",
    //     password: "root",//"taskMafia",
    //     database: 'taskmafia',
    //     port: '3307'
    //   });

      exports.getConnection = () => {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    return reject(err);
                }
                resolve(connection);
            });
        });
    };
    //   var pool = mysql.createPool({
    //     connectionLimit: 100, //important
    //     host: '127.0.0.1',
    //     user: '***',
    //     password: '***',
    //     database: 'user',
    //     debug: false
    // });

//   export function connectToDb(){

//     connection = mysql.createConnection({
//         host: "localhost",
//         user: "root",
//         password: "root",
//         database: 'taskmafia',
//         port: '3307'
//       });
      
// }
//console.log('calling');
//export default connection;