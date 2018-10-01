
import * as db from '../config/db'
 let marketModel = {} //mongoose.model('Car', CarSchema);


 marketModel.getUserIdForAlert =async (categoryId) => {
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(`select user_alerts.userId,user_master.email from user_alerts INNER JOIN user_master on user_master.id = user_alerts.userId where user_alerts.categoryId='${categoryId}'`, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          }); 
    });
}


// marketModel.bidATask =async (userId,bid) => {
//   console.log("new "+JSON.stringify(bid));
//   const connection = await db.getConnection();
//   return new Promise((resolve, reject) => {
//       connection.query(`insert into bids (taskId,taskerId,comment,offer) VALUES (${bid.taskId},${userId},'${bid.comment}','${bid.offer}')`, function (err, result) {
//           if (err) return reject(err);
//           resolve(result);
//         });
//   });
// }

// marketModel.getTaks =async (req) => {

//    let taskTypeId =  (req.query.taskTypeId == undefined || req.query.taskTypeId == null ||req.query.taskTypeId == '') ? 1 : req.query.taskTypeId;
//    let status = (req.query.status == undefined || req.query.status == null ||req.query.status == '') ? "'open'" : req.query.status;
//     let radius= ''
//     let distance ='';
//     console.log("query "+query);
//     if(req.query.lat != undefined && req.query.lat !='' && req.query.lon != undefined && req.query.lon !='' && req.query.radius != undefined && req.query.radius !='')
//     {
//      distance = `, (
//         3959 * acos (
//           cos ( radians(${req.query.lat}) )
//           * cos( radians( lat ) )
//           * cos( radians( lon ) - radians(${req.query.lon}) )
//           + sin ( radians(${req.query.lat}) )
//           * sin( radians( lat ) )
//         )
//       ) AS distance`;

//     radius = `HAVING distance < ${req.query.radius}`;
//     }
//     let priceRange = ''
//     if(req.query.maxPrice != undefined && req.query.maxPrice !='' && req.query.minPrice != undefined && req.query.minPrice !='')
//      priceRange = `And expectedCost < ${req.query.maxPrice} And expectedCost > ${req.query.minPrice}`;
   
//      let query = `select id,userId,taskDescription,subCategoryId,location,dueDate,expectedCost,status ${distance} from tasks where taskTypeId = ${taskTypeId} AND status = ${status} ${priceRange} ${radius}`;
    
//     console.log("query "+query);
//     const connection = await db.getConnection();
//     return new Promise((resolve, reject) => {
//         connection.query(query, function (err, result) {
//             if (err) return reject(err);
//             resolve(result);
//           });
//     });
// }
export default marketModel;