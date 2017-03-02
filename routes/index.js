var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var multer = require('multer');
//var upload = multer({dest:'public/uploads/'});
var fs = require('fs');
var upload = multer({
    limits: {
        fileSize: 1000 * 1024 * 1024
    }
});


var Schema = mongoose.Schema;
var Itemimage = new Schema(
    {
        img: {data: String, contentType: String}
    }
);
var Item = mongoose.model('Clothes', Itemimage);

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

/*router.get('/getImage',function(req,res){

 Item.findOne(function (err, contact) {
 if (err)
 res.send(err);
 res.json(contact);
 });
 });*/
router.post('/api/photo', upload.single('file'), function (req, res) {

    var file = req.file.filename;
    fs.writeFile('public/images/' + req.file.originalname, req.file.buffer, function (err, doc) {
        if (err)
            return console.log(err);

        // res.send({
        //   message: 'File uploaded successfully',
        // var imageData = new Buffer(req.file.buffer).toString('base64');
        //});
        var a = new Item;
        a.img.contentType = req.file.mimetype;
        a.img.data = 'http://localhost:3000/images/' + req.file.originalname;
        a.save(function (err, img) {
            if (err) throw err;

            Item.find(function (err, data) {
                if (err) throw err;
                console.log('find---------', data);
                res.send({
                    message: 'File uploaded successfully',
                    success: true,
                    data: data
                });
            })

        })

    });


    /* fs.rename(req.file.path, file, function(err) {
     if (err) {
     console.log(err);
     res.send(500);
     } else {
     res.json({
     message: 'File uploaded successfully',
     filename: req.file.filename
     });
     }
     });
     */

    //res.send(req.files);
    /*fs.writeFile('test.jpg', req.file.buffer, function (err) {
     if (err)
     return console.log(err);
     });*/
});

module.exports = router;
