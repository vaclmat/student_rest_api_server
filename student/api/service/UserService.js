'use strict';




/**
 * Create user
 * This can only be done by the logged in user.
 *
 * body User 
 * no response value expected for this operation
 **/
exports.createUser = function(body) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

//    console.log(body.firstName, body.lastName, body.password, body.userStatus, body.phone, body.userID, body.email, body.username);

    try {
      let sql = 'INSERT INTO STUDENTRSC.APIUSERSDB VALUES (?,?,?,?,?,?,?,?)',
        params = [body.userID, body.username, body.firstName, body.lastName, body.email, body.password, body.phone, body.userStatus],
        data = await pool.prepareExecute(sql, params);

      if (data !== null){
        var resulta = data.outputParams;
//        console.log(resulta);
        resulta = resulta[1];
//        console.log(resulta);
        var exama = {"API user with following username was successfuly added" : resulta };
        console.log(`\n\nResults: \n${JSON.stringify(exama)}`);
        resolve(exama);
      }
       pool.detach(connection);

     } catch(error) {
        console.error(`Error was: \n${error.stack}`);
        var errorobj = {"Chyba" : error.stack };
        reject(errorobj);
        pool.retire(connection);
     }
  });
}


/**
 * Delete user
 * This can only be done by the logged in user.
 *
 * username String The name that needs to be deleted
 * no response value expected for this operation
 **/
exports.deleteUser = function(username) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {

      let sql = 'DELETE FROM STUDENTRSC.APIUSERSDB WHERE username = ?',
        params = [username],
        data = await pool.prepareExecute(sql, params);

      if (data !== null){
        var resultd = data.outputParams;
        resultd = resultd[0];
        console.log(resultd);
        var exam = {"API user with following username was successfuly deleted" : resultd };
//        console.log(exam);        
        console.log(`\n\nResult: ${JSON.stringify(exam)}`);
        resolve(exam);
      }
      pool.detach(connection);
 
     } catch(error) {
        console.error(`Error was: \n${error.stack}`);
        var errorobj = {"Chyba" : error.stack };
        reject(errorobj);
        pool.retire(connection);
     }
  });
}


/**
 * Get user by user name
 *
 * username String The name that needs to be fetched. Use user1 for testing. 
 * returns User
 **/
exports.getUserByName = function(username) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {
      let sql = 'SELECT firstName, lastName, userStatus, phone, userID, email, username FROM STUDENTRSC.APIUSERSDB WHERE username = ?',
        params = [username],
        data = await pool.prepareExecute(sql, params);


      if (data !== null){
//       console.log(data);
       var resu = data.resultSet;
//       console.log(resu);
       if (resu !== undefined) {
        resu = JSON.parse(JSON.stringify(resu).split('"FIRSTNAME":').join('"firstName":'));
        resu = JSON.parse(JSON.stringify(resu).split('"LASTNAME":').join('"lastName":'));
        resu = JSON.parse(JSON.stringify(resu).split('"USERSTATUS":').join('"userStatus":'));
        resu = JSON.parse(JSON.stringify(resu).split('"PHONE":').join('"phone":'));
        resu = JSON.parse(JSON.stringify(resu).split('"USERID":').join('"userID":'));
        resu = JSON.parse(JSON.stringify(resu).split('"EMAIL":').join('"email":'));
        resu = JSON.parse(JSON.stringify(resu).split('"USERNAME":').join('"username":'));
        resu = resu[0];
//       console.log(resu);
        var exam = {"API user" : resu };
//       console.log(exam);       
        var examples = JSON.parse(JSON.stringify(exam).replace(/"\s+|\s+"/g,'"'));
       } else {
        var resu = data.outputParams;
//        console.log(resu);
        resu = resu[0];
//        console.log(resu);
        var examples = {"API user with following username was not found" : resu };
        }
       console.log(`\n\nResults: \n${JSON.stringify(examples)}`);
       resolve(examples);
      }
      await pool.detach(connection);
 
     } catch(error) {
        console.log('Status: ' + error.status);
        console.error(`Error was: \n${error.stack}`);
        var errorobj = {"Chyba" : error.stack };
        reject(errorobj);
        pool.retire(connection);
     }
  });
}


/**
 * Logs user into the system
 *
 * body Authentication 
 * returns Token
 **/
exports.loginUser = function(username, password) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    var auth = require('./../helpers/auth');
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {
      let sql = 'SELECT userStatus, userID FROM STUDENTRSC.APIUSERSDB WHERE username = ? AND password = ?',
        params = [username, password],
        data = await pool.prepareExecute(sql, params);


      if (data !== null){
//       console.log(data);
       var resu = data.resultSet;
//       console.log(resu[0]);
       if (resu !== undefined) {
//        console.log("userStatus: " + resu[0].USERSTATUS);
//        console.log("userID: " + resu[0].USERID);
        var userID = resu[0].USERID;  
        console.log("User was succesfuly checked in database.");
        if (resu[0].USERSTATUS === '1') {
         var role = "admin";
//         console.log("admin");
        } else {
         var role = "user";
//         console.log("user");
        }

        var tokenString = auth.issueToken(username, role);
        var response = {"token" : tokenString };
      
        resolve(response);

       } else {
        var resu = data.outputParams;
//        console.log(resu);
        resu = resu[0];
//        console.log(resu);
        var examples = {"API user with following username was not authenticated" : resu };
        
        console.log(`\n\nResults: \n${JSON.stringify(examples)}`);
        resolve(examples);
       }
      }
      await pool.detach(connection);
 
     } catch(error) {
        console.error(`Error was: \n${error.stack}`);
        var errorobj = {"Chyba" : error.stack };
        reject(errorobj);
        pool.retire(connection);
     }
  });
}


/**
 * Logs out current logged in user session
 *
 * no response value expected for this operation
 **/
exports.logoutUser = function() {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Updated user
 * This can only be done by the logged in user.
 *
 * body User 
 * username String name that need to be updated
 * no response value expected for this operation
 **/
exports.updateUser = function(body, username) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {
      let sql = 'UPDATE STUDENTRSC.APIUSERSDB SET firstName = ?, lastName = ?, email = ?, password = ?, phone = ?, userStatus = ? WHERE username = ?',
        params = [body.firstName, body.lastName, body.email, body.password, body.phone, body.userStatus, body.username],
        data = await pool.prepareExecute(sql, params);

      if (data !== null){
        var resultu = data.outputParams;
        resultu = resultu[6];
//        console.log(resultd);
        var examu = {"API user with following username was successfuly updated" : resultu };
//        console.log(exam);
        console.log(`\n\nResults: \n${JSON.stringify(examu)}`);
        resolve(examu);
      }
      pool.detach(connection);
 
     } catch(error) {
        console.error(`Error was: \n${error.stack}`);
        var errorobj = {"Chyba" : error.stack };
        reject(errorobj);
        pool.retire(connection);
     }
  });
}

