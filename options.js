window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequency.value = localStorage.frequency;
 
  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
  };
});
