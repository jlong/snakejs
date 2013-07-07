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
