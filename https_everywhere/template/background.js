
/**
 * Fetch and parse XML to be loaded as RuleSets.
 *
 * @param url: a relative URL to local XML
 */
function getRuleXml(url) {

}

// Rules are loaded here
var all_rules = new RuleSets(navigator.userAgent, LRUCache, localStorage);
//All all rules to all_rules


///////////////////////////////////////////////////////////////////////////////////////////////
//If you add the feature to let the user add their own rules. Finish the following functions///
///////////////////////////////////////////////////////////////////////////////////////////////
/**
* Load stored user rules
 **/
var getStoredUserRules = function() {
};


/**
 * Load all stored user rules
 */
var loadStoredUserRules = function() {

};

loadStoredUserRules();

/**
 * Adds a listener for removed tabs
 * */
function AppliedRulesets() {

}
/**
 * Adds a new user rule
 * @param params: params defining the rule
 * @param cb: Callback to call after success/fail
 * */
var addNewRule = function(params, cb) {

    // If we successfully added the user rule, save it in local 
    // storage so it's automatically applied when the extension is 
    // reloaded.

    // TODO: there's a race condition here, if this code is ever executed from multiple 
    // client windows in different event loops.

    // TODO: can we exceed the max size for storage?

};

AppliedRulesets.prototype = {
  addRulesetToTab: function(tabId, ruleset) {
 
  },

  getRulesets: function(tabId) {

  },

  removeTab: function(tabId) {

};

var activeRulesets = new AppliedRulesets();
/////////////////END OF USER RULES////////////////////////


var urlBlacklist = {};
var domainBlacklist = {};

// redirect counter workaround
// TODO: Remove this code if they ever give us a real counter
var redirectCounter = {};

/**
 * Called before a HTTP(s) request. Does the heavy lifting
 * Cancels the request/redirects it to HTTPS. URL modification happens in here.
 * @param details of the handler, see Chrome doc
 * */
function onBeforeRequest(details) {
  var uri = document.createElement('a');
  uri.href = details.url;

  // Normalise hosts such as "www.example.com."

  // If there is a username / password, put them aside during the ruleset
  // analysis process
  var using_credentials_in_url = false;
  if (uri.password || uri.username) {
      using_credentials_in_url = true;
      var tmp_user = uri.username;
      var tmp_pass = uri.password;
      uri.username = null;
      uri.password = null;
  }

  //if in blacklist, cancel the request


  // If no rulesets could apply, let's get out of here!


  if (newuristr && using_credentials_in_url) {
    // re-insert userpass info which was stripped temporarily
    var uri_with_credentials = document.createElement('a');
    uri_with_credentials.href = newuristr;
    uri_with_credentials.username = tmp_user;
    uri_with_credentials.password = tmp_pass;
    newuristr = uri_with_credentials.href;
  }


}


/**
 * monitor cookie changes. Automatically convert them to secure cookies
 * @param changeInfo Cookie changed info, see Chrome doc
 * */
function onCookieChanged(changeInfo) {

      // Host-only cookies don't set the domain field.

      // The cookie API is magical -- we must recreate the URL from the domain and path.(remember what we did in cookie editor?)

      // We get repeated events for some cookies because sites change their
      // value repeatedly and remove the "secure" flag.
}

/**
 * handling redirects, breaking loops
 * @param details details for the redirect (see chrome doc)
 * */
function onBeforeRedirect(details) {
    // Catch redirect loops (ignoring about:blank, etc. caused by other extensions)

}


/**
 Listeners 
 **/

// Listener to check and change the url before webrequest


// Listener to try to catch redirect loops on URLs we've redirected to HTTPS.


// Listen for cookies set/updated and secure them if applicable. This function is async/nonblocking.




