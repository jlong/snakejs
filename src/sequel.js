
$.noconflict = Snake.noconflict;
window.Snake = $;
if (!$.noconflict) { window.$ = $; }

})(window, window.document, window.Snake || {});
