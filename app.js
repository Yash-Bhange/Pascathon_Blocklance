var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Web3 = require('web3');
var ipfsClient=require('ipfs-http-client');
var jsonbuild=require('./smartcontract/build/contracts/IdentityManagement.json');
var fileupload = require("express-fileupload");
var multer = require('multer');
var formidable = require('formidable');
var fs = require('fs');


var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web/views'));
app.use(express.static(path.join(__dirname, 'web')));


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,multipart/form-data");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies




var Storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'web/public/images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
    }
});

var upload = multer({
    storage: Storage

}).single('invoicefile');







app.get('/', function (req, res,next) {
	
	var ca=jsonbuild.networks['5777'].address;
	var ab=jsonbuild.abi;
   var data = {ContractAddress:ca,abi:ab};
   res.render("index",data);
})

app.get('/AddUser', function (req, res,next) {
	 var ca=jsonbuild.networks['5777'].address;
	 var ab=jsonbuild.abi;
	var data = {ContractAddress:ca,abi:ab};
	res.render("AddUser",data);
})

app.get('/AddUserDL', function (req, res,next) {
    var ca=jsonbuild.networks['5777'].address;
	 var ab=jsonbuild.abi;
	var data = {ContractAddress:ca,abi:ab};
	res.render("AddUserDL",data);
})
app.get('/Admin', function (req, res,next) {
    var ca=jsonbuild.networks['5777'].address;
	 var ab=jsonbuild.abi;
	var data = {ContractAddress:ca,abi:ab};
	res.render("Admin",data);
})

app.post('/Admindetail',upload,function(req,res,next){

	var ca=jsonbuild.networks['5777'].address;
	var ab=jsonbuild.abi;
	
	if (typeof web3 !== 'undefined') {
        app.web3Provider = web3.currentProvider;
        web3 = new Web3(web3.currentProvider);
        console.log("y1");


    } else {

        app.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        web3 = new Web3(app.web3Provider);
        console.log("y2");

    }
	const KYC=new web3.eth.Contract(ab,ca);
	

	var DL_No =req.body.txtLicenceNo;
	console.log(DL_No,typeof DL_No);
	var DL_Name=req.body.txtFullName;
	var DL_DOB=req.body.txtDOB;
	var DL_Address=req.body.txtAddress;
	var addc=req.body.coinacc;



	console.log(addc,typeof addc);

	var imageurl1;

	try {
		imageurl1 = req.file.filename;
		


	} catch (e) {
		console.log("error in bookimage",e);

	}
	
	
	
	KYC.methods.AddUserDL(addc,DL_No,DL_Name,DL_DOB,imageurl1,DL_Address).send({from:addc},function(err, transactionHash) {
		if(!err)
		{
			console.log(transactionHash);
		}
		else
		{
			console.log(err)
		}
	});



})




app.get('/Message', function (req, res) {
	var TransHash = req.query.TransHash;
	res.render("Message",{TransHash:TransHash})
})


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
