'use strict';

/**
 * add a new student data to the database
 *
 * body StudentRec 
 * returns createResult
 **/
exports.create = function(body) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {
      let sql = 'INSERT INTO STUDENTRSC.STUDENTDB VALUES (?,?,?,?)',
        params = [body.studentID, body.firstName, body.lastName, body.gender],
        data = await pool.prepareExecute(sql, params);

      if (data !== null){
        var resulta = data.outputParams;
        console.log(resulta);
        resulta = resulta[0];
//        console.log(resulta);
        var exama = {"Student with following studentID was successfuly added" : resulta };
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
 * list all students in the database
 *
 * returns getAllResult
 **/
exports.getAll = function() {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    try {
       let stmt = await pool.attach().getStatement();
       let result = await stmt.exec('SELECT studentID, firstName, lastName, gender FROM STUDENTRSC.STUDENTDB');
       
       var examples = JSON.parse(JSON.stringify({"students" : result}).replace(/"\s+|\s+"/g,'"'));
       examples = JSON.parse(JSON.stringify(examples).split('"STUDENTID":').join('"studentID":'));
       examples = JSON.parse(JSON.stringify(examples).split('"FIRSTNAME":').join('"firstName":'));
       examples = JSON.parse(JSON.stringify(examples).split('"LASTNAME":').join('"lastName":'));
       examples = JSON.parse(JSON.stringify(examples).split('"GENDER":').join('"gender":'));
       
       console.log(`Select results: \n ${JSON.stringify(examples)}`);

       resolve(examples)
     } catch(error) {
        console.error(`Error was: \n${error.stack}`);
        var errorobj = {"Chyba" : error.stack };
        reject(errorobj);
     }
  });
}


/**
 * list student data in the database on base studentID
 *
 * id String 
 * returns getByIDResult
 **/
exports.getByID = function(id) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {
      let sql = 'SELECT studentID, firstName, lastName, gender FROM STUDENTRSC.STUDENTDB WHERE studentID = ?',
        params = [id],
        data = await pool.prepareExecute(sql, params);


      if (data !== null){
//       console.log(data);
       var resu = data.resultSet;
//       console.log(resu);
       if (resu !== undefined) {
        resu = JSON.parse(JSON.stringify(resu).split('"STUDENTID":').join('"studentID":'));
        resu = JSON.parse(JSON.stringify(resu).split('"FIRSTNAME":').join('"firstName":'));
        resu = JSON.parse(JSON.stringify(resu).split('"LASTNAME":').join('"lastName":'));
        resu = JSON.parse(JSON.stringify(resu).split('"GENDER":').join('"gender":'));
        resu = resu[0];
//       console.log(resu);
        var exam = {"student" : resu };
//       console.log(exam);       
        var examples = JSON.parse(JSON.stringify(exam).replace(/"\s+|\s+"/g,'"'));
       } else {
        resu = data.outputParams;
//        console.log(resu);
        resu = resu[0];
//        console.log(resu);
        var examples = {"Student with following studentID was not found" : resu };
        }
       console.log(`\n\nResults: \n${JSON.stringify(examples)}`);
       resolve(examples);
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
 * delete student data from the database on base studentID
 *
 * id String 
 * no response value expected for this operation
 **/
exports.remove = function(id) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {

      let sql = 'DELETE FROM STUDENTRSC.STUDENTDB WHERE studentID = ?',
        params = [id],
        data = await pool.prepareExecute(sql, params);

      if (data !== null){
        var resultd = data.outputParams;
        resultd = resultd[0];
//        console.log(resultd);
        var exam = {"Student with following studentID was successfuly deleted" : resultd };
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
 * update student data in the database
 *
 * body StudentRec 
 * returns updateResult
 **/
exports.update = function(body) {
  return new Promise(async function(resolve, reject) {
    const {DBPool} = require('idb-pconnector');
    const pool = new DBPool();
    let connection = pool.attach(),
      statement = connection.getStatement(),
      result = null;

    try {
      let sql = 'UPDATE STUDENTRSC.STUDENTDB SET firstName = ?, lastName = ?, gender = ? WHERE studentID = ?',
        params = [body.firstName, body.lastName, body.gender, body.studentID],
        data = await pool.prepareExecute(sql, params);

      if (data !== null){
        var resultu = data.outputParams;
        resultu = resultu[3];
//        console.log(resultd);
        var examu = {"Student with following studentID was successfuly updated" : resultu };
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

