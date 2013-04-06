window.addEventListener('load', function() {
  options.frequency.value = localStorage.frequency; 
  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
});
