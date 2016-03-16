// A simple Timer class. for reload cookie table.
function Timer() {
}

// Compares cookies for "key" (name, domain, httpOnly,storeId) equality, but not "value"
// equality. use for removing cookie
function cookieMatch(c1, c2) {
}

// Returns an array of sorted(alphabetic order) keys from an associative array.
function sortedKeys(array) {
}

// An object used for caching data about the browser's cookies, which we update
// as notifications come in.This struct should contain reset,add,remove,get domains and cookies!
function CookieCache() {
}


//set the time to reload cookie table
function timeCookieTable() {
}

//remove a single cookie, has to consturct the url by adding strings together
function removeCookie(cookie) {
}

//remove all the cookies in chrome and cookieCache
function removeAll() {

}
//Contruct, reload and update cookie table
//Use DOM to create delete button in each row
function reloadCookieTable() {
}

function listener(info) {
  cache.remove(info.cookie);
  if (!info.removed) {
    cache.add(info.cookie);
  }
  scheduleReloadCookieTable();
}

//anything change in cookie, reload the table
function listener() {
}

//Main function that get all the cookies and call reloadCookieTable to construct cookie table
function onload() {
}


document.addEventListener('DOMContentLoaded', function() {
  //load the table
  onload();
  //listener for all the buttons
});
