Https Everywhere
Convert a unencrypted http website to a encrypted https website. Following the rulesets provided by
the XML files in "src" folder.

1. What is https everywhere
https://www.eff.org/https-everywhere
https://www.eff.org/https-everywhere/deploying-https\

Part 1
Task 1
Write a http nowhere extension, that is, do not load the page if the page is http.
Task 2
Write a basic http everywhere extension which change all http website to https.

Part 2  HTTPS with rulesets
Task 1 RuleSets
Part 1
Read about the format of ruleset(XML file)
https://www.eff.org/https-everywhere/rulesets
Understand all the elements in rulesets
(ruleset name,default_of,target host,rule from/to,exclusion pattern,securecookie host)
Good example: Arizona-State-University.xml

Part 2
Following the instructions in rulesets.js and finish all the functions
(//Wildcards(//couple rulesets(XML) without wildcard targets
//Test it))

Task 2 doubly linked list-based Least Recently Used Cache
From rulesets.js we know that in function RuleSets we need cache for ruleCache and cookieHostCache.
This Cache is a doubly linked list-based Least Recently Used Cache. Follow the instructions in 
LRUCache.js and finish all the functions.


Task 3 Put them all together
Now you have all the structs for rulesets and cache. It is time to put them all together.
Follow the instructions provided in background.js and finish all the functions
And write the manifest.json

Task 4 Let the user create their own rules
