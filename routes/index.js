var express = require('express');
const {json, Router} = require("express");
var router = express.Router();
//Mongodb
//cách kết nối, thao tác với mongodb
const mongodb = 'mongodb+srv://admin:Sang2003@cluster0.a1c5t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const mongoose = require('mongoose');
mongoose.connect(mongodb, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MongoDB Connected!");
}).catch(err => {
    console.log(err);
})
//query dữ liệu hiển th trên ejs
//QuẻQuery dữ lệu và trả về json từ mongodb
//Định nghĩa 1 collection trước
//Schema là khái niệm để định nghĩa 1 collection
//collection tên là student

const studentSCHEMA = new mongoose.Schema(
    {
        name: String,
        address: String,
        phone: String,
    }
)
//model: là khái niệm để thao tác với collection tên là student
const STUDENT = mongoose.model('Student', studentSCHEMA);

router.get('/getDatabase', (req, res) => {
    STUDENT.find({}).then(result => {
        res.send(result)
    })
})
router.get('/createUser', (req, res) => {
    const random = Math.floor(Math.random() * 1000);
    const student = new STUDENT({
        name: 'Văn Sáng Nguễn' + random,
        address: random + 'Hà Nội',
        phone: '' + random
    })
    student.save().then(result => {
        res.send(result)
    })
})

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express', message: 'Xin chào'});
});

router.get('/deleteUser', (req, res) => {
    const id = req.query.id
    STUDENT.deleteOne({_id: id}).then(result => {
        res.redirect('/displayUsers')
    })
})

router.get('/updateUser', (req, res) => {
    const id = req.query.id
    STUDENT.findOne({_id: id}).then(result => {
        res.render('updateForm', {data: result});
    })
})
router.post('/updateUser', (req, res) => {
    const id = req.body.id
    const name = req.body.name
    const address = req.body.address
    const phone = req.body.phone

    STUDENT.updateOne({_id: id}, {name: name, address: address, phone: phone}).then(result => {
        res.redirect('/displayUsers')
    })
})

// Định nghĩa các chức năng
router.get('/getAllUsers', (req, res) => {
    var jsondata = [{
        id: 1, name: "Nguyễn Văn A", age: 20
    }, {
        id: 2, name: "Nguyễn Văn B", age: 21
    }]
    res.send(jsondata)
})

router.get('/displayUsers', (req, res) => {
    // var jsondata = [{
    //     id: 1, name: "Nguyễn Văn A", age: 20
    // }, {
    //     id: 2, name: "Nguyễn Văn B", age: 21
    // }, {
    //     id: 3, name: "Nguyễn Văn C", age: 22
    // }]
    STUDENT.find({}).then((jsonData) => {
        res.render('users', {name: 'Sáng', data: jsonData})
    })

})

router.post('/createUser', (req, res) => {
    const name = req.body.name;
    const phone = req.body.phone;
    const random = Math.floor(Math.random() * 1000);
    const student = new STUDENT({
        name: name,
        address: random + 'Hà Nội',
        phone: phone
    })
    student.save().then(result => {
        // res.render('index', {title: 'Create User', message: 'Create user successfully'});
        res.redirect('/displayUsers')
    })
})

module.exports = router;
