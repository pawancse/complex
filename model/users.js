const connection = require('../db/connection');
/*
To create user we need query format as below schema object: 
{
    UserId int,
    LastName varchar(255),
    FirstName varchar(255),
    email varchar(255),
    complex varchar(255),
    blockId varchar(255),
    flatId varchar(255),
    area varchar(255),
    username varchar(255),
    pass varchar(255),
    userRole varchar(255),
    PRIMARY KEY (UserId)
}
*/
exports.createUsers = function (userId, lastName, firstName, email, complex, block, flat, area, username, password, role) {
    let query = 'INSERT INTO ' + process.env.dbName + '.Users VALUES (\'' + userId + '\', \'' + lastName + '\', \'' + firstName + '\',\'' + email + '\', \'' + complex + '\', \'' + block + '\', \'' + flat + '\', \'' + area + '\', \'' + username + '\', \'' + password + '\', \'' + role + '\')';
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};

exports.getUserById = function (userId) {
    let query = 'SELCT * FROM ' + process.env.dbName + '.USERS WHERE USERID =' + userId;
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};

exports.updateUserById = function (userId, lastName, firstName, email, complex, block, flat, area, username, password, role) {
    let query = 'UPDATE ' + process.env.dbName + '.USERS SET (lastName=\'' + lastName + '\', firstName=\'' + firstName + '\', email=\'' + email + '\', complex=\'' + complex + '\', block=\'' + block + '\', flat=\'' + flat + '\', area=\'' + area + '\', username=\'' + username + '\', password=\'' + password + '\', role=\'' + role + '\' WHERE userId = \'' + userId + '\'';
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};

exports.removeUserById = function (userId) {
    let query = 'DELETE FROM ' + process.env.dbName + '.USERS WHERE userId = ' + userId;
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};