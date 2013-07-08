// Use the $.ready function to add a DOM ready event listener. This listener
// will be fired when the DOM has been fully loaded.
//
//     $.ready(function() {
//      console.log('The DOM is loaded!');
//     });
//
$.ready = function(f) {
  if (document.addEventListener) {
    if ("complete" === document.readyState) {
      f();
    } else {
      document.addEventListener("DOMContentLoaded", f, false);
      window.addEventListener("load", f, false);
    }
  } else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", f);
    window.attachEvent("onload", f);
    var topf = false;
    try {
      topf = (window.frameElement === null);
    } catch(e) {}
    if (document.documentElement.doScroll && topf) {
      var scrollCheck = function() {
        try {
          document.documentElement.doScroll("left");
        } catch(e) {
          setTimeout(scrollCheck, 1);
          return;
        }
        f();
      };
    }
  }
};
