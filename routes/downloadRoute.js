const express = require('express');
const downloadRouter = express.Router();
const path = require('path');

downloadRouter.get('/', function (req, res, next) {
    let absPath = path.join(__dirname, '../download/','Runmall.apk');
    res.download(absPath);
});

module.exports =downloadRouter;
