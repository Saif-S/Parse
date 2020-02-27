const express = require('express');
const router = express.Router();
const fs = require('fs');
const PDF = require('pdfkit');
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
    try{    
        const doc = new PDF();
        const name = req.body.name;
        fs.readFile(req.file.path, function(err, result){
            if(err) throw err
            res.send(result);
            doc.pipe(fs.createWriteStream(name + '.pdf'));
            doc.text(result);
            doc.addPage().fontSize(25).text('Here is some vector graphics...', 100, 100);
            doc.end();
        });
    } catch(error){
        res.status(500).send({Error: error});
    }
});

module.exports = router;