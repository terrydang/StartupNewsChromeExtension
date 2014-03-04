var port = chrome.runtime.connect({name: "requestMsg"});

port.onMessage.addListener(function(msg) {
	console.log("Title:"+msg.title+"\nURL:"+msg.url+"\nText:"+msg.selection);
	document.getElementsByName("t")[0].value= msg.title;
	document.getElementsByName("u")[0].value= msg.url;
	document.getElementsByName("x")[0].value= msg.selection;
	 console.log(document.getElementsByName("t").value);
	
});