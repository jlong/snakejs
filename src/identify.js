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
