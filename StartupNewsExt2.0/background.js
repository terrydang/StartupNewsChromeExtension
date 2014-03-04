
chrome.runtime.onConnect.addListener(function(port) {
	var tab = port.sender.tab;
	if(port.name == "sendMsg")
	{
  		port.onMessage.addListener(function(info) {
		var msg = {
			"title" : "",
			"url" : ""
		};
		if(info.selection.length>0)
			info.title=info.selection;
		var title_length=80;

    		if (info.title.length > title_length)
      			info.title = info.title.substring(0, title_length);

      		msg.title=info.title;
      		msg.url=info.url;
		chrome.runtime.connect({name: "sendRlt"}).postMessage(msg);
  		});

	}else if(port.name == "requestMsg"){
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			var tab = tabs[0];
		  	if (tab.url.indexOf("http:") != 0 &&
      				tab.url.indexOf("https:") != 0) {
        		chrome.tabs.create(
				{ url: "http://news.dbanotes.net" });
  			} else {
    				chrome.tabs.executeScript(tab.id, {file: "content_script.js"});
  			}	
			
		});	

	}


});
