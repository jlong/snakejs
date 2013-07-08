// Use the $.offset function to get an element's coordinates relative to the
// entire page:
// 
//     $.offset(el)      // => { top: 10, left: 20 }
//
$.offset = function(el) {
  var e = el
  ,   o = { top: 0, left: 0 }
  ;
  while (e) {
    o.top += e.offsetTop;
    o.left += e.offsetLeft;
    e = e.offsetParent;
  }
  return o;
};
