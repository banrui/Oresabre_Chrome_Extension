// Base part written by The Chromium Authors. Oresabre team implemented.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getRandomItem(json) {
  var obj = $.parseJSON(json);
  var items = obj["Items"];
  var rand = Math.floor(Math.random() * items.length);
  return items[rand]["Item"];
}

function show() {
  chrome.tabs.getSelected(null, function(tab) {  
    if (tab.url.indexOf('http://www.youtube.com/watch') == 0 || tab.url.indexOf('https://www.youtube.com/watch') == 0) {  
      var title = getYouTubeTitle(tab);
      requestKeyPhrase(title);
      if(localStorage.isItem) {
	var item = getRandomItem(localStorage.rakutenProductJSON);
	var data = {
	  image: item["mediumImageUrls"][0]["imageUrl"],
	  text: item["itemName"],
	  url: item["affiliateUrl"],
	  price: item["itemPrice"]
	};
      }

      var notification = window.webkitNotifications.createHTMLNotification(
  	'notification.html#' + encodeURIComponent(JSON.stringify(data))
      );
      notification.show();
      notification.ondisplay = function() {
    	setTimeout(function() {
      	  notification.cancel();
    	}, 10000);
      };
    } 
  });
}

if (!localStorage.isInitialized) {
  localStorage.isActivated = true;
  localStorage.frequency = 10;
  localStorage.isInitialized = true;
}

if (window.webkitNotifications) {
  if (localStorage.isActivated) {
    show();
  }
  var interval = 0;
  setInterval(function() {
    interval = interval + 10;
    if (localStorage.isActivated && localStorage.frequency <= interval) {
      show();
      interval = 0;
    }
  }, 10000);
}

function getYouTubeTitle(tab) {
  var title = tab.title;
  return title;
}

function insertRakutenProducts(phrase) {
  var devid = "12e93771545fd01134acc95cb0e0f0f3";
  var afid = "11058cd3.4711ade0.11058cd4.94807d6a";
  var format = "json";

  $.ajax({
    url:"https://app.rakuten.co.jp/services/api/IchibaItem/Search/20120723?applicationId=" + devid +
      "&affiliateId=" + afid +
      "&format=" + format +
      "&keyword=" + phrase,
    type:"get",
    dataType:"text",
    timeout:10000,
    cache:false,
    error:function(){
      localStorage.isItem   = false;
      //alert("jsonの読み込み失敗(rakuten)");
    },
    success:function(json){
      localStorage.isItem   = true;
      localStorage.rakutenProductJSON = json;
    }
  }); 
}

function requestKeyPhrase(text) {
  var appid = "dj0zaiZpPW5jSFFvQVhYSnZENCZkPVlXazliekp0WW0xck4yVW1jR285TUEtLSZzPWNvbnN1bWVyc2VjcmV0Jng9NWY-";
  text = strChange(text);
  text = encodeURI(text.replace(/\s|　/g,"。"));

  $.ajax({
    url:"http://jlp.yahooapis.jp/KeyphraseService/V1/extract?appid=" + appid +
      "&sentence=" + text,
    type:"get",
    dataType:"xml",
    timeout:10000,
    cache:false,
    error:function(){
      localStorage.isItem   = false;
      //alert("xmlファイルの読み込み失敗(yahoo)");
    },
    success:function(xml){
      var phrase = $(xml).find("Keyphrase:first").text();
      insertRakutenProducts(phrase);
    }
  });
}

chrome.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "options.html";
    chrome.tabs.create({ url: newURL });
});

function strChange(str) {
  var c = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
  var cr = '！”＃＄％＆’（）＊＋，－．／：；＜＝＞？＠［￥］＾＿｀｛｜｝～';
  for (var i = 0; i < c.length; i++) {
    while (str != (str = str.replace(c.substr(i,1), " ")));
  }
  for (var i = 0; i < cr.length; i++) {
    while (str != (str = str.replace(cr.substr(i,1), " ")));
  }
  return str;
}

