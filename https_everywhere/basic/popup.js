function getOption_(opt, defaultOpt, callback) {
  var details = {};
  details[opt] = defaultOpt;
  return chrome.storage.sync.get(details, callback);
}

function setOption_(opt, value) {
  var details = {};
  details[opt] = value;
  return chrome.storage.sync.set(details);
}

document.addEventListener("DOMContentLoaded", function () {
  // Set up toggle checkbox for HTTP nowhere mode
  getOption_('httpNowhere', false, function(item) {
    var httpNowhereCheckbox = document.getElementById('http-nowhere-checkbox');
    httpNowhereCheckbox.addEventListener('click', saveHttpNowhere, false);
    var httpNowhereEnabled = item.httpNowhere;
    if (httpNowhereEnabled) {
      httpNowhereCheckbox.setAttribute('checked', '');
    }
  });

});

function saveHttpNowhere() {
  getOption_('httpNowhere', false, function(item) {
    setOption_('httpNowhere', !item.httpNowhere);
  });
}