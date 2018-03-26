var Point = function(options) {

	var defauts = {
		x: 0.0,
		y: 0.0
	};
	
	var param = $.extend(defauts, options);

	var that = {};
	
	that.getX = function () {
		return param.x;
	};
	that.getY = function () {
		return param.y;
	};
	that.setX = function (x) {
		param.x = x;
	};
	that.setY = function (y) {
		param.y = y;
	};
	return that;
};