function show() {
  var notification = window.webkitNotifications.createHTMLNotification(
    'notification.html'
  );
  notification.show();
  notification.ondisplay = function() {
    setTimeout(function() {
      notification.cancel();
    }, 5000);
  };
}

if (!localStorage.isInitialized) {
  localStorage.isActivated = true;
  localStorage.frequency = 1;
  localStorage.isInitialized = true;
}

if (window.webkitNotifications) {
  if (JSON.parse(localStorage.isActivated)) {
    show();
    notification.ondisplay = function() {
      setTimeout(function() {
        notification.cancel();
      }, 5000);
    };
  }
  var interval = 0;
  setInterval(function() {
    interval = interval + 10;
    if (JSON.parse(localStorage.isActivated) && localStorage.frequency <= interval) {
      show();
      notification.ondisplay = function() {
        setTimeout(function() {
          notification.cancel();
        }, 5000);
      };
      interval = 0;
    }
  }, 30000);
}
