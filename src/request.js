var 
	rules,
	lastRequestId;

if(localStorage['rules']){
	rules = JSON.parse(localStorage['rules']);
}
else{
	rules = [];
}

chrome.webRequest.onBeforeRequest.addListener(function(details) {
	return redirectToMatchingRule(details);
}, 
{urls : ["<all_urls>"]}, ["blocking"]);

function redirectToMatchingRule(details) {
	
	for (var i = 0; i < rules.length; i++) {
		var rule = rules[i];
		var sURL = details.url;

		if (rule.isRegex) {
			if (rule.isActive && details.requestId !== lastRequestId) {
				if (rule.from.substring(0,1) == "/") {
					// qualified regex string like /blah/ig
					var expr = rule.from.substr(rule.from.indexOf("/")+1, rule.from.lastIndexOf("/")-1);
					var switches = rule.from.substr(rule.from.lastIndexOf("/")+1);
					var regx = new RegExp(expr, switches);
				} else {
					// shorthand regex like blah
					var regx = new RegExp(rule.from);
				}
				
				if (sURL.match(regx)) {
					lastRequestId = details.requestId; // save that we already replaced this request.
					sURL = sURL.replace(regx, rule.to);
					details.url = sURL;
					return{
						redirectUrl : details.url
					};
				}
			}
		} else {
			if (rule.isActive && details.url.indexOf(rule.from) > -1 && details.requestId !== lastRequestId ) {
				lastRequestId = details.requestId;
				return{
					redirectUrl : details.url.replace(rule.from, rule.to)
				};
			}
		}
	}
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if ( typeof request.rule !== 'undefined') {
		rules.push(request.rule);
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.removeAllRules !== 'undefined') {
		rules = [];
		updateLocalStorage(rules)
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.getRules !== 'undefined') {
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.toggleIndex !== 'undefined') {
		rules[request.toggleIndex].isActive = !rules[request.toggleIndex].isActive;
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.editIndex !== 'undefined') {
		rules[request.editIndex] = request.updatedRule;
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.removeIndex !== 'undefined') {
		rules.splice(request.removeIndex, 1);
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	} else if ( typeof request.getIndex !== 'undefined') {
		sendResponse({
			rule : rules[request.getIndex]
		});
	} else if ( typeof request.importAllRules !== 'undefined') {
		rules = request.ruleset;
		updateLocalStorage(rules);
		sendResponse({
			rules : this.rules
		});
	}
});

function updateLocalStorage(rules){
	localStorage['rules'] = JSON.stringify(rules);
}
