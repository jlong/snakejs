// Use the $.addClass function to add a class to an element:
//
//     $.addClass(el, 'is-hidden');
//
$.addClass = function(el, name) {
  if ((new RegExp("\\b" + name + "\\b")).test(el.className)) return;
  el.className += (el.className ? ' ' : '') + name;
};

// Use the $.removeClass function to remove a class from an element:
//
//     $.removeClass(el, 'is-hidden');
//
$.removeClass = function(el, name) {
  el.className = el.className.replace(new RegExp("\\b" + name + "\\b", "g"), '');
};

// Use the $.hasClass function to test if an element has a class:
//
//     if ($.hasClass(el, 'is-hidden') {
//       // el is hidden
//     }
//
$.hasClass = function(el, name) {
  return el.className.indexOf(name) > -1;
};
