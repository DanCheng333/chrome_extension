

//###############  TIME FILTER  #####################//

//Set up elements for time_filter struct
var time_filter = function () {
  this.time_delete = document.getElementById('time_delete');
  this.timeframe_ = document.getElementById('timeframe');
  this.addListeners_();
};

//Functions for time_filter struct
time_filter.prototype = {
  // A cached reference to the button & frame element.
  time_delete: null,
  timeframe_: null,

  //Adds event listeners to the button for user's click
  addListeners_: function () {
    this.time_delete.addEventListener('click', this.handleClick_.bind(this));
  },

  //Give a string return milliseconds based on Unix epoch. If the string isn't valid, returns undefined.
  parseMilliseconds_: function (timeframe) {
    var now = new Date().getTime();
    var milliseconds = {
      'hour': 60 * 60 * 1000,
      'day': 24 * 60 * 60 * 1000,
      'week': 7 * 24 * 60 * 60 * 1000,
      '4weeks': 4 * 7 * 24 * 60 * 60 * 1000
    };

    if (milliseconds[timeframe])
      return now - milliseconds[timeframe];

    if (timeframe === 'forever')
      return 0;

    return null;
  },

  //Call back function to inform the user cookie
  handleCallback_: function () {
    setTimeout(function() {
      time_delete.removeAttribute("disabled");
      this.time_delete.innerText = 'Delete';
    }, 1000);
  },

  //call back function when user click on delete button for time filter
  //This function reads the user input and deletes the corresponding cookies
  handleClick_: function () {
    var removal_start = this.parseMilliseconds_(this.timeframe_.value);
    if (removal_start !== undefined) {
      this.time_delete.setAttribute('disabled', 'disabled');
      this.time_delete.innerText = 'Clearing...';
	  console.log(this.timeframe_.value);
      chrome.browsingData.removeCookies({ "since" : removal_start }, this.handleCallback_.bind(this));
    }
  }
};

//################ End of time filter ####################//

if (!chrome.cookies) {
  chrome.cookies = chrome.experimental.cookies;
}

// A simple Timer class. for reload cookie table.
function Timer() {
  this.start_ = new Date();

  this.elapsed = function() {
    return (new Date()) - this.start_;
  }

  this.reset = function() {
    this.start_ = new Date();
  }
}

// Compares cookies for "key" (name, domain, etc.) equality, but not "value"
// equality. for removal
function cookieMatch(c1, c2) {
  return (c1.name == c2.name) && (c1.domain == c2.domain) &&
         (c1.hostOnly == c2.hostOnly) && (c1.path == c2.path) &&
         (c1.secure == c2.secure) && (c1.httpOnly == c2.httpOnly) &&
         (c1.session == c2.session) && (c1.storeId == c2.storeId);
}

// Returns an array of sorted keys from an associative array.
// make cookie sorted(alphabetic order)
function sortedKeys(array) {
  var keys = [];
  for (var i in array) {
    keys.push(i);
  }
  keys.sort();
  return keys;
}

// Shorthand for document.querySelector.
function select(selector) {
//Get the first element in the document with class="example":
  return document.querySelector(selector);
}

// An object used for caching data about the browser's cookies, which we update
// as notifications come in.
function CookieCache() {
  this.cookies_ = {};

  this.reset = function() {
    this.cookies_ = {};
  }

  this.add = function(cookie) {
    var domain = cookie.domain;
    if (!this.cookies_[domain]) {
      this.cookies_[domain] = [];
    }
    this.cookies_[domain].push(cookie);
  };

  this.remove = function(cookie) {
    var domain = cookie.domain;
    if (this.cookies_[domain]) {
      var i = 0;
      while (i < this.cookies_[domain].length) {
        if (cookieMatch(this.cookies_[domain][i], cookie)) {
          this.cookies_[domain].splice(i, 1);
        } else {
          i++;
        }
      }
      if (this.cookies_[domain].length == 0) {
        delete this.cookies_[domain];
      }
    }
  };

  // Returns a sorted list of cookie domains that match |filter|. If |filter| is
  //  null, returns all domains.
  this.getDomains = function(filter) {
    var result = [];
    sortedKeys(this.cookies_).forEach(function(domain) {
      if (!filter || domain.indexOf(filter) != -1) {
        result.push(domain);
      }
    });
    return result;
  }

  this.getCookies = function(domain) {
    return this.cookies_[domain];
  };
}


var cache = new CookieCache();

function resetTable() {
  var table = select("#cookies");
  while (table.rows.length > 1) {
    table.deleteRow(table.rows.length - 1);
  }
}

var reload_scheduled = false;

function scheduleReloadCookieTable() {
  if (!reload_scheduled) {
    reload_scheduled = true;
    setTimeout(reloadCookieTable, 250);
  }
} 
function removeCookiesForDomain(domain) {
  var timer = new Timer();
  cache.getCookies(domain).forEach(function(cookie) {
    removeCookie(cookie);
  });
}

function removeAllForFilter() {
  var filter = select("#filter").value;
  var timer = new Timer();
  cache.getDomains(filter).forEach(function(domain) {
    removeCookiesForDomain(domain);
  });
  resetFilter()
}

function resetFilter() {
  var filter = select("#filter");
  filter.focus();
  if (filter.value.length > 0) {
    filter.value = "";
    reloadCookieTable();
  }
}
//remove a single cookie, has to consturct the url by ourselve
function removeCookie(cookie) {
  var url = "http" + (cookie.secure ? "s" : "") + "://" + cookie.domain +
            cookie.path;
			
  //remove cookies in the chrome system!!!!!!!!
  chrome.cookies.remove({"url": url, "name": cookie.name});
}

function reloadCookieTable() {
  reload_scheduled = false;
  var filter = select("#filter").value;
  var domains = cache.getDomains(filter);
  
  //text for counters of cookies and domains
  select("#filter_count").innerText = domains.length;
  select("#total_count").innerText = cache.getDomains().length;

  resetTable();
  var table = select("#cookies");

  domains.forEach(function(domain) {
  
    var cookies = cache.getCookies(domain);
    var row = table.insertRow(-1);
    row.insertCell(-1).innerText = domain;
	
    var cell = row.insertCell(-1);
    cell.innerText = cookies.length;
    cell.setAttribute("class", "cookie_count");

	//create delete button in each row of the table
	//listen to onclick button event and remove the cookie
    var button = document.createElement("button");
    button.innerText = "delete";
    button.onclick = (function(dom){
      return function() {
	  //remove cookie for this domain
		var timer = new Timer();
		cache.getCookies(dom).forEach(function(cookie) {
		removeCookie(cookie);
		//to see console log F12(console.log)
		console.log("remove cookies!!!");
  });
  
      };
    }(domain));
	
    //create "Go to website" button in each row of the table
	//listen to onclick button event and opened a webpage of that domain in a new tab
	//(reuse the function UpdateOrCreateTab in background.js) 
    var button2 = document.createElement("button");
    button2.innerText = "Go to website";
    button2.onclick = (function(dom){
      return function() {
	    console.log(dom);
	    var url = "http"  + "://" + "www" + dom;
		var bgPage = chrome.extension.getBackgroundPage();
        bgPage.UpdateOrCreateTab(url);
		console.log("Go to website!!!");
      };
    }(domain));
	
    var cell = row.insertCell(-1);
    cell.appendChild(button);
    cell.setAttribute("class", "button");
	cell.appendChild(button2);
    cell.setAttribute("class", "button2");
  });
}

function listener(info) {
  cache.remove(info.cookie);
  if (!info.removed) {
    cache.add(info.cookie);
  }
  scheduleReloadCookieTable();
}

//anything change in cookie, reload the table
function startListening() {
  chrome.cookies.onChanged.addListener(listener);
}

/////////////////////////////////////////////////
/////////////////Filter/////////////////////////
///////////////////////////////////////////////
function focusFilter() {
  select("#filter").focus();
}

function onload() {
  //filter part
  focusFilter();

  var timer = new Timer();
  //Retrieves all cookies from a single cookie store that match the given information. 
  //The cookies returned will be sorted, with those with the longest path first. 
  //If multiple cookies have the same path length, those with the earliest creation time will be first.
  chrome.cookies.getAll({}, function(cookies) {
    startListening();
    start = new Date();
	//add all the cookies to cache
    for (var i in cookies) {
      cache.add(cookies[i]);
    }
    timer.reset();
    reloadCookieTable();
  });
}

/////////////////////////////////////////////////////
/////////////////DELETE ALL/////////////////////////
///////////////////////////////////////////////////
function removeAll() {
  console.log("removeALL!!!");
  //get all the cookies and store it in list
  cache.getDomains().forEach(function(domain) {
    cache.getCookies(domain).forEach(function(cookie) {
      all_cookies.push(cookie);
    });
  });
  //empty CookieCache
  cache.reset();
  
  var count = all_cookies.length;
  var timer = new Timer();
  for (var i = 0; i < count; i++) {
  //remove all cookies from chrome system
    removeCookie(all_cookies[i]);
  }
  timer.reset();
  
  //????????????should be empty cookie???///////
  chrome.cookies.getAll({}, function(cookies) {
    for (var i in cookies) {
      cache.add(cookies[i]);
      removeCookie(cookies[i]);
    }
  });
}

document.addEventListener('DOMContentLoaded', function() {
  //load the table
  onload();
  //delete all button
  document.querySelector('#remove_button').addEventListener('click', removeAll);
  //listener for click on filter event
  //document.body.addEventListener('click', focusFilter);
  //Listener for cookie and domain counter
  document.querySelector('#filter_div input').addEventListener(
      'input', reloadCookieTable);
  // Listener for domain filter 
  document.querySelector('#filter_div button').addEventListener(
      'click', removeAllForFilter);
  //listener for time filter
  window.PC = new time_filter();
});
