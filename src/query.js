function qargs(args) {
  var el, tagName, className;
  if (args.length === 1) {
    el = document; tagName = 'div'; className = args[0];
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      el = document; tagName = args[0]; className = args[1];
    } else {
      el = args[0]; tagName = 'div'; className = args[1];
    }
  } else if (args.length === 3) {
    el = args[0]; tagName = args[1]; className = args[2];
  } else {
    throw 'invalid arguments';
  }
  return [el, tagName, className];
}

// The $ function (aka snake function) can be used as a cross-browser
// querySelector(). Compared to jQuery the functionality it supports is quite
// limited, but it works well for some applications.
//
// In its simplest form it only looks up divs by a class name:
//
//     $('content')                // Find a div with a class of 'content'
//
// But you can also pass a specific tag to find other types of tags:
//
//     $('a', 'external')          // Find a link with a class of 'external'
//
// It can also be invoked on an element to find child elements:
//
//     $(el, 'post')               // Find a div with a class of 'post' inside of el
//     $(el, 'article', 'post')    // Find an article tag with a class of 'post' inside of el
//
var $ = function() {
  var args = qargs(arguments)
  ,   el = args[0]
  ,   tagName = args[1]
  ,   className = args[2]
  ;
  if (el === document && el.querySelector) {
    return el.querySelector(tagName + '.' + className);
  } else {
    var els = el.getElementsByTagName(tagName)
    ,   regexp = new RegExp("\\b" + className + "\\b", 'gmi')
    ;
    for (var i=0; i < els.length; i++) {
      if (regexp.test(els[i].className)) {
        var element = els[i];
        return element;
      }
    }
    return null;
  }
};
