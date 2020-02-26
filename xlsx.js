var express = require('express');
const router = express.Router();
const multer = require('multer');

var storage  = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads');
    },
    filename: function(req, file, cb){
        var d = new Date();
        cb(null, file.fieldname + '--' + d)
    }
});
var upload = multer({storage:storage});

var xlsxtojson = require('xlsx-to-json');
var xlstojson = require('xls-to-json');

router.post('/',upload.single('file'), (req, res) => {
    var exceltojson;
    const file = req.file;
    if(!file){
        res.status(404).send({msg:'No file found'});
    } 
    if(req.file.originalname.split('.')[1] !== 'xlsx'){
        res.status(500).send({Error: 'Wrong file format'});
    }else {
    if(req.file.originalname.split('.')[1] === 'xlsx'){
        exceltojson = xlsxtojson;
        console.log('xlsx');
    } else {
        exceltojson = xlstojson;
        console.log('xls');
    }
        try {
            xlsxtojson({
                input: req.file.path,
                output: null, 
                lowerCaseHeaders:true
            }, function(err,result){
                if(err) {
                    res.status(500).send({Error: err});
                }
                res.status(200).send({Result: result});
            });
        } catch (error){
            res.status(500).send({Error: error});
        }
    }
});

module.exports = router;