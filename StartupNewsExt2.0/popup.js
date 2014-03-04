var network=false;
var xmlhttp = new XMLHttpRequest();
function clickHandler(e) {
     if(network)
    {
  	xmlhttp.open("POST","http://news.dbanotes.net/x",true);
	var postData ="fnid=" + document.getElementById("fnid_log").value + "&"+"u="+document.getElementById("username").value+"&"+"p="+document.getElementById("password").value;
        xmlhttp.send(postData);
     }else 
	document.getElementById("tip_log").innerText="Bad Network!";
}

function main() {

	xmlhttp.onreadystatechange=function()
  	{
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    		{
		    network = true;
		   // console.log(xmlhttp.responseText);
		    //console.log($(":submit:first",xmlhttp.responseText).val())
		    var fnvalue= $(":input:first",xmlhttp.responseText).val();
		    if($(":submit:first",xmlhttp.responseText).val()=="submit"){
			//console.log("submit");
    		        document.getElementById("fnid").value= fnvalue;
			document.getElementById("loginForm").style.display="none";
			document.getElementById("submitForm").style.display="";
  		    }else if($(":submit:first",xmlhttp.responseText).val()=="login"){
			//console.log("login");
			//console.log($(":input:first",xmlhttp.responseText).val());
			document.getElementById("submitForm").style.display="none";
			document.getElementById("loginForm").style.display="";
			document.getElementById("fnid_log").value= fnvalue;
			var tip=xmlhttp.responseText.match("Bad login.")
			if(tip!=null)
			{
				document.getElementById("tip_log").innerText=tip;
				document.getElementById("register").style.display="none";
				document.getElementById("forgotpw").style.display="";
				
			}
		    }
    		}
  	}

	
	xmlhttp.open("GET","http://news.dbanotes.net/submit",true);
	xmlhttp.send(null);

	var port = chrome.runtime.connect({name: "requestMsg"});
	
}


chrome.runtime.onConnect.addListener(function(port) {

	if(port.name == "sendRlt")
	{
  		port.onMessage.addListener(function(msg) {
		//console.log("Title:"+msg.title+"\nURL:"+msg.url+"\nText:"+msg.selection);
		document.getElementById("title").value= msg.title;
		document.getElementById("url").value= msg.url;
  		});
	}

});

document.addEventListener('DOMContentLoaded', function () {
  	document.getElementById('login').addEventListener('click', clickHandler);
  	main();
});
