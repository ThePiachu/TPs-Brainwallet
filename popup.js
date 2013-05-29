
function setNotice(notice)
{
	var noticeParagraph=document.getElementById("notice");
	noticeParagraph.className="visible";
	noticeParagraph.innerHTML=notice;
	window.scrollTo(0, 0);
}

function clearNotice()
{
	var notice=document.getElementById("notice");
	notice.className="hidden";
	notice.value="";
}
function Compute()
{
	clearNotice();
	var passphrase=document.getElementById("passphrase").value;
	var compressed=document.getElementById("compressed").checked;
	var netByte=document.getElementById("netbyte").value;
	
	
	document.getElementById("privateKey").innerHTML="";
	document.getElementById("wif").innerHTML="";
	document.getElementById("publicKey").innerHTML="";
	document.getElementById("hash160").innerHTML="";
	document.getElementById("Address").innerHTML="";
	
	if (netByte.length!=2)
	{
		setNotice("NetByte is incorrect, please fix");
		return;
	}
	console.log(netByte);
	var netValue=parseInt(netByte, 16);
	console.log(netValue);
	if ((netValue<0)||(netValue>255))
	{
		setNotice("NetByte is incorrect, please fix");
		return;
	}
	if (netValue<16)
	{
		netByte="0"+netValue.toString(16);
	} else {
		netByte=netValue.toString(16);
	}
	console.log(netByte);
	
	var privateKey=GeneratePrivateKeyFromPassphrase(passphrase);
	var wif=GenerateWIF(privateKey, compressed);
	var publicKey=GeneratePublicKeyFromPrivateKey(privateKey, compressed);
	var hash160=GenerateHash160FromPublicKey(publicKey);
	var address=GenerateAddressFromHashWithNetByte(hash160, netByte);
	
	
	document.getElementById("passphrase").innerHTML=passphrase;
	document.getElementById("compressed").checked=compressed;
	document.getElementById("netbyte").innerHTML=netByte;
	document.getElementById("privateKey").innerHTML=privateKey;
	document.getElementById("wif").innerHTML=wif;
	document.getElementById("publicKey").innerHTML=publicKey;
	document.getElementById("hash160").innerHTML=hash160;
	document.getElementById("Address").innerHTML=address;
}

function Test()
{
	var passphrase="correct horse battery staple";
	var compressed=true;
	var privateKey=GeneratePrivateKeyFromPassphrase(passphrase);
	var wif=GenerateWIF(privateKey, compressed);
	var publicKey=GeneratePublicKeyFromPrivateKey(privateKey, compressed);
	var hash160=GenerateHash160FromPublicKey(publicKey);
	var address=GenerateAddressFromHash(hash160);
	
	
	document.getElementById("passphrase").innerHTML=passphrase;
	document.getElementById("privateKey").innerHTML=privateKey;
	document.getElementById("wif").innerHTML=wif;
	document.getElementById("publicKey").innerHTML=publicKey;
	document.getElementById("hash160").innerHTML=hash160;
	document.getElementById("Address").innerHTML=address;
}



document.addEventListener('DOMContentLoaded', function ()
{
	document.querySelector('#compute').addEventListener('click', Compute);
});