Snake.js
--------

The lightweight querySelector and events library perfectly suited for widgets and simple applications or websites.

Browser support: IE8+ and other modern browsers (Chrome, Safari, Firefox).

Originally created by UserVoice for our widget framework (http://uservoice.com). Later extracted into a library by John W. Long (@johnwlong).


## Snake function

The $ function (aka snake function) can be used as a cross-browser querySelector(). Compared to jQuery the functionality it supports is quite limited, but it works well for some applications.

In its simplest form it only looks up divs by a class name:

    $('content')             // Find a div with a class of 'content'

But you can also pass a specific tag to find other types of tags:

    $('a', 'external')      // Find a link with a class of 'external'

It can also be invoked on an element to find child elements:

    $(el, 'classname')        // Find a div inside of el
    $(el, 'article', 'post')  // Find an article tag with a class of 'post' inside of el


## $.all

The $.all function is similar to the $ function except that much like querySelectorAll() it returns an array of matching elements. In the event that no elements are found an empty array is returned.

The $.all function supports the same parameters as the $ function:

    $$('post')               // All divs with a class name of 'post'
    $$(el, 'post')           // All 'post' divs inside of el

    $$('a', 'external')      // All links with a class name of 'external'
    $$(el, 'a', 'external')  // All 'external' links inside of el


## MIT License

Copyright (c) 2013 John W. Long. Portions contributed by Austin Taylor, Jonathan Novak, and Mark Martin.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
