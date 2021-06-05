const fs = require('fs');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
    accessKeyId: 'AKIAYQFQ7XMUKNYDES35',
    secretAccessKey: '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'
});

exports.uploadFile = async (fileName) => {
    try {
        // Read the file
        const file = fs.readFileSync(fileName.path);
        const params = {
            Bucket: 'imagesuploadtask1',
            Key: fileName.originalname,
            Body: file,
        };

        // Upload image to s3
        let result = await s3.upload(params).promise();
        try {
            fs.unlinkSync(fileName.path);
        } catch (error) {
            console.log(error.stack)
        }
        
        return result;

    } catch (error) {
        console.log(error.stack);
        throw error;
    }
};