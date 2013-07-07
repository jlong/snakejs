Snake.js
--------

The micro selector, element, and events library perfectly suited for widgets and simple applications or websites.

Browser support: IE8+ and other modern browsers (Chrome, Safari, Firefox).

Originally created by UserVoice for our widget framework (http://uservoice.com). Later extracted into a library by John W. Long (@johnwlong).


### Selecting elements

The $ function (aka snake function) can be used as a cross-browser querySelector(). Compared to jQuery the functionality it supports is quite limited, but it works well for some applications.

In its simplest form it only looks up divs by a class name:

    $('content')                // Find a div with a class of 'content'

But you can also pass a specific tag to find other types of tags:

    $('a', 'external')          // Find a link with a class of 'external'

It can also be invoked on an element to find child elements:

    $(el, 'post')               // Find a div with a class of 'post' inside of el
    $(el, 'article', 'post')    // Find an article tag with a class of 'post' inside of el

The $.all function is similar to the $ function except that much like querySelectorAll() it returns an array of matching elements. In the event that no elements are found an empty array is returned.

The $.all function supports the same parameters as the $ function:

    $.all('post')               // All divs with a class name of 'post'
    $.all(el, 'post')           // All 'post' divs inside of el

    $.all('a', 'external')      // All links with a class name of 'external'
    $.all(el, 'a', 'external')  // All 'external' links inside of el


### Retreiving IDs

The $.identify function can be used to obtain an ID for a given element:

    var el = document.createElement('div');
    el.id = 'main';
    $.identify(el);   // => 'main'

If the element doesn't have an ID, One will be generated for it. For instance:

    var el = document.createElement('div');
    $.identify(el);   // => 'snakejs-1'


### Storing data

The $.data function can be used to associate and retrieve arbitrary data with an element. The data is stored in a global object and associated by the ID of the element. If the element does not have an ID, the $.identify function is used to ensure that it does.

To store data for an element, pass in a key and value:

    $.data(el, 'tooltip', 'An example tooltip.');

To retrieve data for an element, simply pass in the key:

    $.data(el, 'tooltip'); // => "An example tooltip."


### Adding, removing, and testing classes

Use the $.addClass function to add a class to an element:

    $.addClass(el, 'is-hidden');

Use the $.removeClass function to remove a class from an element:

    $.removeClass(el, 'is-hidden');

Use the $.hasClass function to test if an element has a class:

    if ($.hasClass(el, 'is-hidden') {
       // el is hidden
    }


### Getting dimensions and offset

Use the $.dimensions function to retreive the width and height of an element. This function should work even if the element is invisible. Just call:

    $.dimensions(el)  // => { width: 200, height: 100 }

Use the $.offset function to get an element's coordinates relative to the entire page:

    $.offset(el)      // => { top: 10, left: 20 }


### Adding and removing Events

Use the $.on function to add an event listener to an element. For example:

    $.on(el, 'click', function(e) {
      console.log('clicked');
    });

Use the $.off function to remove an event listener from an element:

    var listener = function() { ... };
    $.on(el, 'click', listener);
    $.off(el, 'click', listener);

Use the $.one to add an event listener that will be removed the first time it is invoked:

    $.one(el, 'mousemove', function(e) {
      console.log('This should only ever be logged one time.');
    });


### DOM ready

Use the $.ready function to add a DOM ready event listener. This listener will be fired when the DOM has been fully loaded.

    $.ready(function() {
      console.log('The DOM is loaded!');
    });


### MIT License

Copyright (c) 2013 John W. Long. Portions contributed by Austin Taylor, Jonathan Novak, and Mark Martin.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
