var suggestions = [];

chrome.omnibox.onInputChanged.addListener(
	function(text, suggest)
	{
		text = text.replace(" ", "");
		
		suggestions = [];

		suggestions.push({ content: "http://reddit.com/r/" + text, description: "reddit.com/r/" + text });
		suggestions.push({ content: "http://imgur.com/r/" + text, description: "imgur.com/r/" + text });

		suggest(suggestions);
	}
);

chrome.omnibox.onInputEntered.addListener(
	function(text)
	{
		if (text.indexOf("://") == -1)
		{
			text = suggestions[0].content;
		}

		chrome.tabs.getSelected(null, function(tab)
		{
			chrome.tabs.update(tab.id, {url: text});
		});
	}
);

chrome.omnibox.setDefaultSuggestion({ description: "visit /r/%s" });