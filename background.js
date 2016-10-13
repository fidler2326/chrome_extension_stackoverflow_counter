chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {  

  // Get chrome history
  chrome.history.search({text: '', maxResults: 1}, function(data) {
    data.forEach(function(page) {
      var dateObj = new Date(page.lastVisitTime);
      var dateString = dateStringForDate(dateObj);

      // Display last page visit
      var pageUrl = page.url;

      // Set value to 0 on first load
      if (localStorage.getItem("dayCount-" + dateString) === null) {
        localStorage.setItem("dayCount-" + dateString, JSON.stringify([]));
      }

      // Check if last page contains stackoverflow.com
      if (pageUrl.indexOf("stackoverflow.com") > -1) {
        appendUrlForDay(pageUrl, dateString);        
      }
      chrome.browserAction.setBadgeText({ text: countForToday().toString() });
    });
	});

});