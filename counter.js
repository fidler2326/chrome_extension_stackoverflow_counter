$(document).ready(function(){

  // Display day count
  $('.day-count').text(countForToday());

  // Display yesterday count
  var yesterdayToday = new Date();
  var yesterday = new Date(yesterdayToday.setDate(yesterdayToday.getDate() - 1));
  var yesterdayString = dateStringForDate(yesterday);
  var yesterdayCount = countForDay(yesterdayString);
  $('.yesterday-count').text(yesterdayCount);

  // Display last 7 days
  var weeklyTotal = countForDaysFromToday(7);
  $('.week-count').text(weeklyTotal);  

  // Display last 28 days
  var monthlyTotal = countForDaysFromToday(28);
  $('.month-count').text(monthlyTotal);

  // Total
  var total = 0;
  for (var i = 0; i < localStorage.length; i++){
    var key = localStorage.key(i);
    if (key.indexOf("dayCount") > -1) {
      var entry = JSON.parse(localStorage.getItem(key));
      total += entry.length;
    }
  }
  $('.all-count').text(total);

  chrome.browserAction.setBadgeBackgroundColor({ color: '#3BAFDA' });  

}); 

function countForToday() {
  // Display day count
  var today = new Date();  
  var todayString = dateStringForDate(today);
  var todayCount = countForDay(todayString);
  return todayCount;
}

function appendUrlForDay(pageUrl, dateString) {
  // get
  var currentUrls = urlsForDay(dateString);
  // append
  var found = false;
  for(var i = 0; i < currentUrls.length; i++) {
    if (currentUrls[i] == pageUrl) {
      found = true;
      break;
    }
  }
  if (!found) {
    currentUrls.push(pageUrl);
  }
  // set
  localStorage.setItem("dayCount-" + dateString, JSON.stringify(currentUrls));
}

function dateStringForDate(dateObj) {
  var month = dateObj.getUTCMonth() + 1;
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var dateString = year + "/" + month + "/" + day;
  return dateString;
}

function countForDaysFromToday(number_of_days) {
  console.log(number_of_days);
  var total = 0;
  for (var i = 0; i < number_of_days; i++) {
    var today = new Date();  
    var dayToLookup = new Date(today.setDate(today.getDate() - i));
    var dayString = dateStringForDate(dayToLookup);
    var dayCount = countForDay(dayString);
    total += dayCount;
  }
  return total;
}

function urlsForDay(dateString) {
  var item = localStorage.getItem("dayCount-" + dateString);  
  return JSON.parse(item);
}

function countForDay(dateString) {
  var currentUrls = urlsForDay(dateString);
  if (currentUrls != null) {
    return currentUrls.length;
  } else {
    return 0;
  }  
}
