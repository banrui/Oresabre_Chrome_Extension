// Base part written by The Chromium Authors. Oresabre team implemented.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

window.addEventListener('load', function() {
  options.frequency.value = localStorage.frequency; 
  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
});
