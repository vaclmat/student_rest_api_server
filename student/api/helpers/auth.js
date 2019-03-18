'use strict';

const jwt = require('jsonwebtoken');
const fs = require('fs');
var i = "VM_Auth";
var s = 'vaclmat@email.cz';
var secret = 'mamamamisumysemame';

exports.issueToken = function (uname, urole) {
    var token = jwt.sign({
        username: uname,
        iss: i,
        role: urole
     }, secret, { expiresIn: 60 * 60 });
     return token;
};

