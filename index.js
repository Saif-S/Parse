//excel file parser

const bodyParser = require('body-parser');
const multer = require('multer');
var express = require('express');
var app = express();

const xlsx = require('xlsx');
const file = xlsx.readFile('Financial_Sample.xlsx');
const sheet = file.SheetNames;
const result = (xlsx.utils.sheet_to_json(file.Sheets[sheet[0]]));
// console.log(result);


var xlsxtojson = require('xlsx-to-json');
var xlstojson = require('xls-to-json');


app.listen(4000);
app.use(bodyParser.urlencoded({extended: true}));

// app.use(function(req, res, next) { //allow cross origin requests
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
//     res.header("Access-Control-Max-Age", "3600");
//     res.header("Access-Control-Allow-Headers", "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
//     next();
// });

// multer storage config
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

app.post('/xlsx',upload.single('file'), (req, res) => {
    var exceltojson;
    const file = req.file;
    if(!file){
        res.status(404).send({msg:'No file found'});
    } 
    if(req.file.originalname.split('.')[1] !== 'xlsx'){
        res.status(500).send({Error: 'Wrong file format'});
    }else {
        console.log(file);
    // if(req.file.originalname.split('.')[1] === 'xlsx'){
    //     exceltojson = xlsxtojson;
    //     console.log('xlsx');
    // } else {
    //     exceltojson = xlstojson;
    //     console.log('xls');
    // }
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