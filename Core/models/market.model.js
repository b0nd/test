
import * as db from '../config/db'
 let marketModel = {} //mongoose.model('Car', CarSchema);


 marketModel.postTask =async (userId,task) => {
    console.log("new "+JSON.stringify(task));
    let query = `insert into tasks (userId,subCategoryId,taskDescription,taskTypeId,location,dueDate,expectedCost,status,lat,lon) VALUES (${userId},${task.subCategoryId},'${task.taskDescription}',${task.taskTypeId},'${task.location}','${task.dueDate}',${task.expectedCost},'${task.status}',${task.lat},${task.lon})`;
    console.log("quesry"+query);
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}

marketModel.acceptBid =async (task) => {
  console.log("new "+JSON.stringify(task));
  let query = `update tasks set status = 'close', taskerId = ${task.taskerId}, bidId = ${task.bidId} where id = ${task.taskId}`;
  console.log("quesry"+query);
  const connection = await db.getConnection();
  return new Promise((resolve, reject) => {
      connection.query(query, function (err, result) {
          if (err) return reject(err);
          resolve(result);
        });
  });
}

marketModel.bidATask =async (userId,bid) => {
  console.log("new "+JSON.stringify(bid));
  const connection = await db.getConnection();
  return new Promise((resolve, reject) => {
      connection.query(`insert into bids (taskId,taskerId,comment,offer) VALUES (${bid.taskId},${userId},'${bid.comment}','${bid.offer}')`, function (err, result) {
          if (err) return reject(err);
          resolve(result);
        });
  });
}



marketModel.getTasksAsAUser =async (userId) => {

  const connection = await db.getConnection();
  return new Promise((resolve, reject) => {
      connection.query(`select * from tasks where userId = ${userId}`, function (err, result) {
          if (err) return reject(err);
          resolve(result);
        });
  });
}

marketModel.getTasksAsATasker =async (userId) => {
  const connection = await db.getConnection();
  return new Promise((resolve, reject) => {
    connection.query(`select * from tasks where taskerId = ${userId}`, function (err, result) {
      if (err) return reject(err);
          resolve(result);
        });
  });
}


marketModel.getBids =async (taskId) => {
  const connection = await db.getConnection();
  return new Promise((resolve, reject) => {
    connection.query(`select bids.id,bids.taskerId,bids.comment,bids.offer,user_master.lastname,user_master.firstname,user_master.contact,user_master.email,user_master.profilepicture,user_master.city,user_master.description from bids INNER JOIN user_master on user_master.id = bids.taskerId where bids.taskId='${taskId}'`, function (err, result) {
      if (err) return reject(err);
          resolve(result);
        });
  });
}
marketModel.getTaks =async (req) => {

   let taskTypeId =  (req.query.taskTypeId == undefined || req.query.taskTypeId == null ||req.query.taskTypeId == '') ? 1 : req.query.taskTypeId;
   let status = (req.query.status == undefined || req.query.status == null ||req.query.status == '') ? "open" : req.query.status;
    let radius= ''
    let distance ='';
    let limit ='';
    console.log("query "+query);
    if(req.query.lat != undefined && req.query.lat !='' && req.query.lon != undefined && req.query.lon !='' && req.query.radius != undefined && req.query.radius !='')
    {
     distance = `, (
        3959 * acos (
          cos ( radians(${req.query.lat}) )
          * cos( radians( lat ) )
          * cos( radians( lon ) - radians(${req.query.lon}) )
          + sin ( radians(${req.query.lat}) )
          * sin( radians( lat ) )
        )
      ) AS distance`;

    radius = `HAVING distance < ${req.query.radius}`;
    }
    let priceRange = ''
    if(req.query.maxPrice != undefined && req.query.maxPrice !='' && req.query.minPrice != undefined && req.query.minPrice !='')
     priceRange = `And expectedCost < ${req.query.maxPrice} And expectedCost > ${req.query.minPrice}`;
    if(req.query.pageIndex != undefined && req.query.pageIndex !='' && req.query.pageSize != undefined && req.query.pageSize !='')
    {
      let index = (req.query.pageIndex-1) * req.query.pageSize;
      limit = `limit ${index},${req.query.pageSize}`
    }
   
     let query = `select id,userId,taskDescription,subCategoryId,location,dueDate,expectedCost,status ${distance} from tasks where taskTypeId = ${taskTypeId} AND status = '${status}' ${priceRange} ${radius} ${limit}`;
    
    console.log("query "+query);
    const connection = await db.getConnection();
    return new Promise((resolve, reject) => {
        connection.query(query, function (err, result) {
            if (err) return reject(err);
            resolve(result);
          });
    });
}
export default marketModel;