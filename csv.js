const csv = require('csv-parser');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const multer = require('multer');


var storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        var d = new Date();
        cb(null, file.fieldname + '--' + d);
    }
});
var upload = multer({storage:storage});

router.post('/',upload.single('file'), (req, res) => {
    var file = req.file;
    const results = [];
    console.log(file);
    if(!file){
        res.status(404).send({Error: 'No file found'});
    } else {
        try {
            fs.createReadStream(file.path)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                res.json(results)
            });
        } catch (error) {
            console.log(error);
        }  
    }
});

module.exports = router;