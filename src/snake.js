;(function(window, document, Snake, undefined) {

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

  var uniqIdCount = 0;
  function uniqId() {
    uniqIdCount += 1;
    return 'snakejs-' + uniqIdCount;
  }

  // The $.identify function can be used to obtain an ID for a given element:
  //
  //     var el = document.createElement('div');
  //     el.id = 'main';
  //     $.identify(el);   // => 'main'
  //
  // If the element doesn't have an ID, One will be generated for it. For instance:
  //
  //     var el = document.createElement('div');
  //     $.identify(el);   // => 'snakejs-1'
  //
  $.identify = function(el) {
    var id = el.getAttribute('id');
    if (id) {
      return id;
    } else {
      id = uniqId();
      el.setAttribute('id', id);
      return id;
    }
  };

  // The $.data function can be used to associate and retrieve artitrary data with
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

  // Use the $.addClass function to add a class to an element:
  //
  //     $.addClass(el, 'is-hidden');
  //
  $.addClass = function(el, name) {
    if ((new RegExp("\\b" + name + "\\b")).test(el.className)) return;
    el.className += (el.className ? ' ' : '') + name;
  };

  // Use the $.addClass function to remove a class from an element:
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

  // Get the width and height of el.
  $.dimensions = function(el) {
    var d = el.display;
    if (d !== 'none' && d !== null) { // Safari bug
      return { width: el.offsetWidth, height: el.offsetHeight };
    }

    // All *Width and *Height properties give 0 on elements with display none,
    // so enable the element temporarily
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

  // Get top and left offset of el.
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

  $.noconflict = Snake.noconflict;
  window.Snake = $;
  if (!$.noconflict) { window.$ = $; }

})(window, window.document, window.Snake || {});
