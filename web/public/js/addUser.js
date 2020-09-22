const ipfsClient = require('ipfs-http-client');

window.addEventListener('load', async () => {
    if (window.ethereum) {
        window.web3 = new Web3(ethereum);
        try {
            await ethereum.enable();
			
        } catch (error) {
            window.alert("User denied account access...");
        }
    }
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
		
    }
    else {
        window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}
	
	
});


async function AddUserDL(dlHash)
{
	ABIJSON = JSON.parse('<%-JSON.stringify(abi)%>');
	MyContract = new web3.eth.Contract(ABIJSON,"<%=ContractAddress%>");

	var DL_No = document.getElementById("txtLicenceNo").value;
	var DL_Name = document.getElementById("txtFullName").value;
	var DL_DOB = document.getElementById("txtDOB").value;
	var DL_Address = document.getElementById("txtAddress").value;
	console.log("hey there");
	UserAddress=await web3.eth.getCoinbase();
	
	MyContract.methods.AddUserDL(UserAddress,DL_No,DL_Name,DL_DOB,DL_Hash,DL_Address).send({from:UserAddress},function(err, transactionHash) {
		if(!err)
		{
			location.href="/Message?TransHash="+transactionHash;
		}
		else
		{
			console.log(err)
		}
	});

}

function hex2a(hexx) {
	var hex = hexx.substring(2,hexx.length)
    hex = hex.toString();//force conversion
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}

async function getDLHash()
{    
    var fr,file;
	const reader = new FileReader();
	const invoicefile = document.getElementById("invoicefile");
	file=invoicefile.files[0]; // Read Provided File
	fr = new FileReader();
   fr.onloadend = receivedText();
    async function receivedText() {
		   fr = new FileReader();
		   fr.readAsBinaryString(file);
		   
		   const buf = buffer.Buffer(fr.result)

		   console.log("file",buf)
			
			

		  // const node = await window.Ipfs.create({ repo: 'ipfs-' + Math.random() })
		  //const node= window.IpfsApi('localhost', 5001)
		  const ipfs = ipfsClient({ host:'ipfs.infura.io', port: '5001', protocol: 'http' })
			window.node =ipfs

			

		const inputFile=await  node.files.add({ path: 'randompath.png', content: buf });

		console.log(inputFile);
		//var t=hex2a(inputFile.cid.string);

		//const re=await node.cat(inputFile.cid.string);
		//console.log(re);

		
		/*,(err,result)=>{

		 if(err)
		 {
			 console.log(err);
		 }
		 else{
			 console
			result.on('data', (file) => {
				var invoiceURL = "https://ipfs.io/ipfs/"+file.path;
				console.log("inv",invoiceURL);
			  })
		 }
			*/
			
  
    }
};