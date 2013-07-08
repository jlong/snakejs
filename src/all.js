// The $.all function is similar to the $ function except that much like
// querySelectorAll() it returns an array of matching elements. In the
// event that no elements are found an empty array is returned.
//
// The $.all function supports the same parameters as the $ function:
//
//     $.all('post')               // All divs with a class name of 'post'
//     $.all(el, 'post')           // All 'post' divs inside of el
//
//     $.all('a', 'external')      // All links with a class name of 'external'
//     $.all(el, 'a', 'external')  // All 'external' links inside of el
//
$.all = function() {
  var args = qargs(arguments)
  ,   el = args[0]
  ,   tagName = args[1]
  ,   className = args[2]
  ;
  if (el === document && el.querySelectorAll) {
    return el.querySelectorAll(tagName + '.' + className);
  } else {
    var els = el.getElementsByTagName(tagName)
    ,   regexp = new RegExp("\\b" + className + "\\b", 'gmi')
    ,   result = []
    ;
    for (var i=0; i < els.length; i++) {
      if (regexp.test(els[i].className)) {
        result.push(els[i]);
      }
    }
    return result;
  }
};
