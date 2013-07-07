suite('$');

test("$('content')", function(){
  var el = $('content');
  assert.isNotNull(el);
  assert.equal(el.className, 'content');
});

test("$('a', 'external')", function(){
  var el = $('a', 'external');
  assert.isNotNull(el);
  assert.equal(el.tagName, 'A');
  assert.equal(el.className, 'external');
});

test("$(el, 'post')", function() {
  var el = $('content')
  ,   post = $(el, 'post')
  ;
  assert.isNotNull(post);
  assert.equal(post.id, 'post-2');
});

test("$(el, 'article', 'post')", function() {
  var el = $('content')
  ,   post = $(el, 'article', 'post')
  ;
  assert.isNotNull(post);
  assert.equal(post.id, 'post-4');
});


suite('$.all');

test("$.all('post')", function() {
  var posts = $.all('post');
  assert.equal(posts.length, 3);
});

test("$.all(el, 'post')", function() {
  var el = $('content')
  ,   posts = $.all(el, 'post')
  ;
  assert.isNotNull(el);
  assert.equal(posts.length, 1);
});

test("$.all('a', 'external')", function() {
  var externalLinks = $.all('a', 'external');
  assert.equal(externalLinks.length, 2);
});

test("$.all(el, 'a', 'external')", function() {
  var el = $('content')
  ,   externalLinks = $.all(el, 'a', 'external')
  ;
  assert.equal(externalLinks.length, 1);
});


suite('$.identify');

test("Returns the correct ID on an element", function() {
  var el = document.createElement('div');
  el.id = 'main';
  assert.equal($.identify(el), 'main');
});

test("Returns and sets a new ID on an element without one", function() {
  var el = document.createElement('div');
  assert.equal($.identify(el), 'snakejs-1');
  assert.equal($.identify(el), 'snakejs-1');
});


suite('$.data');

test("Storing and retrieving arbitrary data", function() {
  var el = document.createElement('button');
  el.id = 'toolbar-button';
  $.data(el, 'tooltip', 'An example tooltip.');
  assert.equal($.data(el, 'tooltip'), 'An example tooltip.');
});

test("Data is maintained even when an element is recreated", function() {
  var el = document.createElement('button');
  el.id = 'toolbar-button';
  $.data(el, 'tooltip', 'An example tooltip.');

  el = document.createElement('button');
  el.id = 'toolbar-button';
  assert.equal($.data(el, 'tooltip'), 'An example tooltip.');
});


suite('$.addClass');

test("Can add a class to an element", function() {
  var el = document.createElement('div');
  el.className = 'panel';
  $.addClass(el, 'is-hidden');
  assert.equal(el.className, 'panel is-hidden');
});


suite('$.removeClass');

test("Can remove a class from an element", function() {
  var el = document.createElement('div');
  el.className = 'panel is-hidden';
  $.removeClass(el, 'is-hidden');
  assert.equal(el.className, 'panel ');
});


suite('$.hasClass');

test("Tests true when an element has specified class", function() {
  var el = document.createElement('div');
  el.className = 'panel is-hidden';
  assert.isTrue($.hasClass(el, 'is-hidden'));
});

test("Tests false when an element does not have specified class", function() {
  var el = document.createElement('div');
  el.className = 'panel';
  assert.isFalse($.hasClass(el, 'is-hidden'));
});


suite('$.dimensions');

test("Get the width and height of an element", function() {
  var el = document.createElement('div');
  el.style.width = '200px';
  el.style.height = '100px';
  document.body.appendChild(el);

  var d = $.dimensions(el);
  assert.equal(d.width, 200);
  assert.equal(d.height, 100);
});


suite('$.offset');

test('Get top,left coordinates for element', function() {
  var el = document.createElement('div');
  el.style.position = 'absolute';
  el.style.top = '10px';
  el.style.left = '20px';
  document.body.appendChild(el);

  var o = $.offset(el);
  assert.equal(o.top, 10);
  assert.equal(o.left, 20);
});
