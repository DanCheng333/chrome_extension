//128 icon == web store
//48 icon === chrome://extensions page
//16 icon === favicon for an extension's pages
//browser default icon === menu bar

//how to create a new tab
function UpdateOrCreateTab(url) {
// get all windows
  chrome.windows.getAll({"populate":true}, function(windows) {
    var cookie_tab = null;
	
	//////////////////////////////////////////////////////
	////check if one of the tab is the cookie page ///////
	//////////////////////////////////////////////////////
	//all windows
    for (var i in windows) {
      var tabs = windows[i].tabs;
	  //all tabs
      for (var j in tabs) {
        var tab = tabs[j];
		//if one of the tab === cookie page
        if (tab.url == url) {
          cookie_tab = tab;
          break;
        }
      }
    }
	
	//if cookie page already exists
    if (cookie_tab) {
      chrome.tabs.update(existing_tab.id, {"selected":true});
	  //create a new tab for cookie page
    } else {
      chrome.tabs.create({"url":url, "selected":true});
    }
  });
}

//when click on the browser action icon
chrome.browserAction.onClicked.addListener(function(tab) {
//Converts a relative path within an extension install directory to a fully-qualified URL.
  var manager_url = chrome.extension.getURL("index.html");
  UpdateOrCreateTab(manager_url);
});
