// The $.data function can be used to associate and retrieve arbitrary data with
// an element. The data is stored in a global object and associated by the ID
// of the element. If the element does not have an ID, the $.identify function
// is used to ensure that it does.
//
// To store data for an element, pass in a key and value:
//
//     $.data(el, 'tooltip', 'An example tooltip.');
//
// To retrieve data for an element, simply pass in the key:
//
//     $.data(el, 'tooltip'); // => "An example tooltip."
//
$.data = (function() {
  var d = {};
  function data(el, key, value) {
    var id = $.identify(el);
    d[id] = d[id] || {};
    if (arguments.length > 2) {
      d[id][key] = value;
      return value;
    } else {
      return d[id][key];
    }
  }
  return data;
})();
