function show() {
	chrome.tabs.getSelected(null, function(tab) {  
  		if (tab.url.indexOf('http://www.youtube.com/watch') == 0 || tab.url.indexOf('https://www.youtube.com/watch') == 0) {  
    		var title = getYouTubeTitle(tab);
 			requestKeyPhrase(title);
 			if(localStorage.isItem) {
 				var itemname = localStorage.getItem("itemname");
	  			var imgurl   = localStorage.getItem("imgurl");
  				var url      = localStorage.getItem("url");
  				var price    = localStorage.getItem("price");	
				var data = { image: '', text: '', url: '', price: ''};
				data.image = imgurl;
				data.text  = itemname;
				data.url   = url;
				data.price = price;
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
  if (JSON.parse(localStorage.isActivated)) {
    show();
  }
  var interval = 0;
  setInterval(function() {
    interval = interval + 10;
    if (JSON.parse(localStorage.isActivated) && localStorage.frequency <= interval) {
      show();
      interval = 0;
    }
  }, 10000);
}

function getYouTubeTitle(tab) {
  //var title = document.getElementById("watch-headline-title").innerText;
  var title = tab.title;
  return title;
}

function insertRakutenProducts(phrase) {
  var devid = "12e93771545fd01134acc95cb0e0f0f3";
  var afid = "11058cd3.4711ade0.11058cd4.94807d6a";
  var format = "xml";

  $.ajax({
    url:"https://app.rakuten.co.jp/services/api/IchibaItem/Search/20120723?applicationId=" + devid +
      "&affiliateId=" + afid +
      "&format=" + format +
      "&keyword=" + phrase,
    type:"get",
    dataType:"xml",
    timeout:1000,
    cache:false,
    error:function(){
		localStorage.isItem   = false;
     	alert("xmlファイルの読み込み失敗(rakuten)");
    },
    success:function(xml){
    	var item = $(xml).find("Item:first");
    	name = item.find("itemName").text();
    	catchcopy = item.find("catchcopy").text();
    	price = item.find("itemPrice").text();
    	url = item.find("affiliateUrl").text();
    	imgurl = item.find("imageUrl:first").text();
      	//localstrage
      	localStorage.isItem   = true;
    	localStorage.itemname = name;
  		localStorage.imgurl   = imgurl;
  		localStorage.url      = url;
  		localStorage.price    = price;
    }
  }); 
}

function requestKeyPhrase(text) {
  var appid = "dj0zaiZpPW5jSFFvQVhYSnZENCZkPVlXazliekp0WW0xck4yVW1jR285TUEtLSZzPWNvbnN1bWVyc2VjcmV0Jng9NWY-";
  text = encodeURI(text.replace(/\s|　/g,"。"));

  $.ajax({
    url:"http://jlp.yahooapis.jp/KeyphraseService/V1/extract?appid=" + appid +
      "&sentence=" + text,
    type:"get",
    dataType:"xml",
    timeout:1000,
    cache:false,
    error:function(){
   		localStorage.isItem   = false;
    	alert("xmlファイルの読み込み失敗(yahoo)");
    },
    success:function(xml){
      var phrase = $(xml).find("Keyphrase:first").text();
      insertRakutenProducts(phrase);
    }
  });
}

