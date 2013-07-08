// Use the $.one to add an event listener that will be removed the first time
// it is invoked:
//
//     $.one(el, 'mousemove', function(e) {
//       console.log('This should only ever be logged one time.');
//     });
//
$.one = function(el, name, f) {
  var wrapper = function() {
    f(arguments);
    $.off(el, name, wrapper);
  };
  $.on(el, name, wrapper);
};
