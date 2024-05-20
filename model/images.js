const connection = require('../db/connection');
/*
To create user we need query format as below schema object: 
{
    UserId int,
    asset_id varchar(255),
    public_id varchar(255),
    version varchar(255),
    version_id varchar(255),
    signature varchar(255),
    width varchar(255),
    height varchar(255),
    imageFormat varchar(255),
    resource_type varchar(255),
    created_at varchar(255),
    tags varchar(255),
    bytes varchar(255),
    imageType varchar(255),
    placeholder varchar(255),
    url varchar(255),
    secure_url varchar(255),
    folder varchar(255),
    original_filename varchar(255),
    api_key varchar(255),
    PRIMARY KEY (UserId)
}
*/
exports.createImageInDb = function (userId, asset_id, public_id, version, version_id, signature, width, height, imageFormat, resource_type, created_at, tags, bytes, imageType, placeholder, url, secure_url, optimizeUrl, folder, original_filename, api_key) {
    let query = 'INSERT INTO ' + process.env.dbName + '.images VALUES (\'' + userId + '\', \'' + asset_id + '\', \'' + public_id + '\',\'' + version + '\', \'' + version_id + '\', \'' + signature + '\', \'' + width + '\', \'' + height + '\', \'' + imageFormat + '\', \'' + resource_type + '\', \'' + created_at + '\', \'' + tags + '\',\'' + bytes + '\', \'' + imageType + '\', \'' + placeholder + '\', \'' + url + '\', \'' + secure_url + '\', \'' + optimizeUrl + '\', \'' + folder + '\', \'' + original_filename + '\', \'' + api_key + '\')';
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};

exports.getImageUrlByUserId = function (userId) {
    let query = 'SELCT * FROM ' + process.env.dbName + '.IMAGES WHERE USERID =' + userId;
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};

exports.removeImageById = function (userId) {
    let query = 'DELETE FROM ' + process.env.dbName + '.IMAGES WHERE userId = ' + userId;
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};

exports.removeImageByPublicId = function (publicId) {
    let query = 'DELETE FROM ' + process.env.dbName + '.IMAGES WHERE publicId = ' + publicId;
    connection.createConnection();
    let data = connection.runQuery(query);
    connection.endConnection();
    return data;
};