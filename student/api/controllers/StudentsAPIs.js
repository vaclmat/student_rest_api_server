/*eslint-env node */
'use strict';

var utils = require('../utils/writer.js');
var StudentsAPIs = require('../service/StudentsAPIsService');

module.exports.create = function create (req, res, next) {
//  var body = req.swagger.params['body'].value;
  var body = req.body;
  StudentsAPIs.create(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getAll = function getAll (req, res, next) {
  StudentsAPIs.getAll()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getByID = function getByID (req, res, next) {
  var id = req.swagger.params['id'].value;
  StudentsAPIs.getByID(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.remove = function remove (req, res, next) {
  var id = req.swagger.params['id'].value;
  StudentsAPIs.remove(id)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.update = function update (req, res, next) {
//  var body = req.swagger.params['body'].value;
  var body = req.body;
  StudentsAPIs.update(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
