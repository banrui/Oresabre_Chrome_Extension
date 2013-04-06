function getKeyPhrase(text) {
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
      alert("xmlファイルの読み込み失敗");
    },
    success:function(xml){
      var res = $(xml).find("Keyphrase:first").text();
      console.log("key phrase:" + res);
      return res;
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
  var phrase = getKeyPhrase(title);
};

