document.addEventListener('DOMContentLoaded', function(){
    var data = window.location.hash.substr(1);
    if (data != '') {
       data = JSON.parse(decodeURIComponent(data));   
    }
    if (data != 0) {
		var html = '<img src="' + data.image + '">';
    	html += '<p class="text">' + data.text + '<br>';
        html += '価格：' + data.price + '円</p>';
        document.getElementById('content').innerHTML = html;
    }  
});