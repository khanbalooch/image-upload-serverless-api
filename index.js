const serverlessAPI = require('serverless-http');
const express = require('express');
const app = express();
const awsUploader = require('./aws-upload/aws-upload');
var multer  = require('multer')
var upload = multer({ dest: 'images/' })


app.post('/uploadImage', upload.single('image'), async (req, res) => {
    try {
        let result = await awsUploader.uploadFile(req.file);
        res.status(200).json({
            result: 'success',
            message: 'file uploaded at: ' + result.Location
        });
    } catch (error) {
        console.error(error.stack);
        res.status(400).json({
            result: 'error',
            message: "An Error Occured"
        });
    }
});

module.exports.handler = serverlessAPI(app);