// Use the $.on function to add an event listener to an element. For example:
//
//     $.on(el, 'click', function(e) {
//       console.log('clicked');
//     });
//
$.on = function(el, name, f) {
  if ('addEventListener' in el) {
    el.addEventListener(name, f, false);
  } else {
    el.attachEvent('on' + name, function() {
      return f.call(el, window.event);
    });
  }
};

// Use the $.off function to remove an event listener from an element:
//
//     var listener = function() { ... };
//     $.on(el, 'click', listener);
//     $.off(el, 'click', listener);
//
$.off = function(el, name, f) {
  if ('removeEventListener' in el) {
    el.removeEventListener(name, f, false);
  } else {
    el.detachEvent(name, f);
  }
};
