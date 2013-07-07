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

test("Data is maintined even when an element is recreated", function() {
  var el = document.createElement('button');
  el.id = 'toolbar-button';
  $.data(el, 'tooltip', 'An example tooltip.');

  el = document.createElement('button');
  el.id = 'toolbar-button';
  assert.equal($.data(el, 'tooltip'), 'An example tooltip.');
});
