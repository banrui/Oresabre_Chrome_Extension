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
      alert("xmlファイルの読み込み失敗(rakuten)");
    },
    success:function(xml){
      var item = $(xml).find("Item:first");
      name = item.find("itemName").text();
      catchcopy = item.find("catchcopy").text();
      price = item.find("itemPrice").text();
      url = item.find("affiliateUrl").text();
      imgurl = item.find("imageUrl:first").text();

      console.log("item:" + name);
      console.log("item:" + imgurl);
    }
  }); 
};

function requestKeyPhrase(text) {
  var appid = "dj0zaiZpPW5jSFFvQVhYSnZENCZkPVlXazliekp0WW0xck4yVW1jR285TUEtLSZzPWNvbnN1bWVyc2VjcmV0Jng9NWY-";
  text = encodeURI(text.replace(/\s|　/g,"。"));
  console.log("replaced text:" + text);

  $.ajax({
    url:"http://jlp.yahooapis.jp/KeyphraseService/V1/extract?appid=" + appid +
      "&sentence=" + text,
    type:"get",
    dataType:"xml",
    timeout:1000,
    cache:false,
    error:function(){
      alert("xmlファイルの読み込み失敗(yahoo)");
    },
    success:function(xml){
      var phrase = $(xml).find("Keyphrase:first").text();
      console.log("key phrase:" + phrase);
      insertRakutenProducts(phrase);
    }
  });
};

function getYouTubeTitle() {
  var title = document.getElementById("watch-headline-title").innerText;
  console.log("title:" + title);
  return title;
};

if (location.hostname == "www.youtube.com") {
  console.log("hostname:" + location.hostname);
  var title = getYouTubeTitle();
  requestKeyPhrase(title);
};

