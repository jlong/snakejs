// Use the $.dimensions function to retreive the width and height of an element.
// This function should work even if the element is invisible. Just call:
//
//     $.dimensions(el)  // => { width: 200, height: 100 }
//
$.dimensions = function(el) {
  var d = el.display;
  if (d !== 'none' && d !== null) { // Safari bug
    return { width: el.offsetWidth, height: el.offsetHeight };
  }

  var s = el.style
  ,   vis = s.visibility
  ,   pos = s.position
  ,   dis = s.display
  ;
  s.visibility = 'hidden';
  s.position = 'absolute';
  s.display = 'block';

  var w = el.clientWidth
  ,   h = el.clientHeight
  ;
  s.display = dis;
  s.position = pos;
  s.visibility = vis;

  return { width: w, height: h };
};
