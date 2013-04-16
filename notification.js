// Base part written by The Chromium Authors. Oresabre team implemented.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

document.addEventListener('DOMContentLoaded', function(){
  var data = window.location.hash.substr(1);
  if (data != '') {
    data = JSON.parse(decodeURIComponent(data));   
  }
  if (data != 0) {
    var html = '<a href="' + data.url + '" target="_blank"><div class="itemimage"><img src="' + data.image + '" width="50px" height="50px"></div></a>';
    html += '<a href="' + data.url + '" target="_blank"><div class="itemtext"><p class="text">' + data.text + '<br></a>';
    html += '価格：' + data.price + '円</p></div></div>';
    document.getElementById('content').innerHTML = html;
  }  
});
