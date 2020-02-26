const bodyParser = require('body-parser');
const csv = require('./csv');
var express = require('express');
var app = express();
const xlsx = require('./xlsx');
const pdf = require('./pdf');


// const xlsx = require('xlsx');
// const file = xlsx.readFile('Financial_Sample.xlsx');
// const sheet = file.SheetNames;
// const result = (xlsx.utils.sheet_to_json(file.Sheets[sheet[0]]));
// console.log(result);


app.listen(4000);
app.use(bodyParser.urlencoded({extended: true}));
app.use('/csv', csv);
app.use('/xlsx', xlsx);
app.use('/pdf', pdf);