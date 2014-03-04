// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
var msg = {
	"title" : "",
	"url" : "",
	"selection": ""
};


function sendToStartup() {
  
    chrome.tabs.create(
	{ url: "http://news.dbanotes.net/submit" },
	function(tab) {
		chrome.tabs.executeScript(tab.id, {file: "inject_script.js"});

	});
}

chrome.runtime.onConnect.addListener(function(port) {
	var tab = port.sender.tab;
	if(port.name == "sendMsg")
	{
  		port.onMessage.addListener(function(info) {
    		var max_length = 1024;
    		if (info.selection.length > max_length)
      		info.selection = info.selection.substring(0, max_length);
      		msg.title=info.title;
      		msg.url=tab.url;
      		msg.selection=info.selection;
      		sendToStartup();
  		});
	}else if(port.name == "requestMsg"){
		port.postMessage(msg);

	}


});


chrome.browserAction.onClicked.addListener(function(tab) {
 
  	if (tab.url.indexOf("http:") != 0 &&
      		tab.url.indexOf("https:") != 0) {
        chrome.tabs.create(
		{ url: "http://news.dbanotes.net/submit" },
		function(tab) {
			chrome.tabs.executeScript(tab.id, {file: "inject_script.js"});
	});
  	} else {
    		chrome.tabs.executeScript(null, {file: "content_script.js"});
  	}
});