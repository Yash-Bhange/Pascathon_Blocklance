var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var Web3 = require('web3');
var ipfsClient=require('ipfs-http-client');
var jsonbuild=require('./smartcontract/build/contracts/IdentityManagement.json');

var app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'web/views'));
app.use('/public', express.static(__dirname + '/web/public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); 


app.get('/', function (req, res) {
	
	var ca=jsonbuild.networks['5777'].address;
	var ab=jsonbuild.abi;
   var data = {ContractAddress:ca,abi:ab};
   res.render("index",data);
})

app.get('/AddUser', function (req, res) {
	 var ca=jsonbuild.networks['5777'].address;
	 var ab=jsonbuild.abi;
	var data = {ContractAddress:ca,abi:ab};
	res.render("AddUser",data);
})

app.get('/AddUserDL', function (req, res) {
    var ca=jsonbuild.networks['5777'].address;
	 var ab=jsonbuild.abi;
	var data = {ContractAddress:ca,abi:ab};
	res.render("AddUserDL",data);
})
app.get('/Admin', function (req, res) {
    var ca=jsonbuild.networks['5777'].address;
	 var ab=jsonbuild.abi;
	var data = {ContractAddress:ca,abi:ab};
	res.render("Admin",data);
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
