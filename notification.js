document.addEventListener('DOMContentLoaded', function(){
    var data = window.location.hash.substr(1);
    if (data != '') {
       data = JSON.parse(decodeURIComponent(data));   
    }
    if (data != 0) {
		var html = '<div class="itemimage"><img src="' + data.image + '" width="50px" height="50px"></div>';
    	html += '<div class="itemtext"><p class="text">' + data.text + '<br>';
        html += '価格：' + data.price + '円</p></div></div><a href="' + data.url + '" target="_blank">商品ページへ</a>';
        document.getElementById('content').innerHTML = html;
    }  
});