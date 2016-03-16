var wr = chrome.webRequest;

// Load prefs about whether http nowhere is on. Structure is:
//  { httpNowhere: true/false }
var httpNowhereOn = false;
chrome.storage.sync.get({httpNowhere: false}, function(item) {
  httpNowhereOn = item.httpNowhere;
  setIconColor();
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'sync') {
    for (var key in changes) {
      if (key === 'httpNowhere') {
        httpNowhereOn = changes[key].newValue;
		setIconColor();
      }
    }
  }
});
/**
 * Set the icon color correctly
 * Depending on http-nowhere it should be red/default
 */
var setIconColor = function() {
  var newIconPath = httpNowhereOn ? './icon38-red.png' : './icon38.png';
  chrome.browserAction.setIcon({
    path: newIconPath
  });
};

function onBeforeRequest(details) {
  var uri = document.createElement('a');
  uri.href = details.url;

  // Should the request be canceled?
  var shouldCancel = (httpNowhereOn && uri.protocol === 'http:');
  console.log("the value of should Cancel is "+shouldCancel);
  if (shouldCancel) {
    return {cancel: true};
  }
  else {
    var rd = "https://" + uri.host + uri.pathname;
	return { redirectUrl: rd };
  }
};



wr.onBeforeRequest.addListener(onBeforeRequest, {urls: ["https://*/*", "http://*/*"]}, ["blocking"]);
