var initialWidth = document.body.clientWidth || window.innerWidth;
var Px = function(px) {
	return px / (1024 / initialWidth)+'px';
};