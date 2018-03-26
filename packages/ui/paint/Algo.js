
var Algo = function (options) {
	
	var defauts = {
		filter_max: 20,
		filter_pts_max: 5,
		buffer: [],
		sigma: new Point(),
		tail: 0,
		nb: 0,
		head: 0
	};
	
	var param = $.extend(true, defauts, options);
	
	sdk.require('ui.paint.Point');

	var _move = function(point) {
		if (param.tail < 0 || param.tail >= param.filter_max) {
			param.tail = 0;
		}
	
		param.sigma.setX(param.sigma.getX() + point.getX());
		param.sigma.setY(param.sigma.getY() + point.getY());

		param.nb++;
		if (param.nb > param.filter_pts_max) {
			param.nb--;
			param.sigma.setX(param.sigma.getX() - param.buffer[param.head].getX());
			param.sigma.setY(param.sigma.getY() - param.buffer[param.head].getY());
			param.head++;
			if (param.head >= param.filter_max) {
				param.head = 0;
			}
	   }
		param.buffer[param.tail] = new Point({x:point.getX(), y:point.getY()});

		param.tail++;
		if (param.tail >= param.filter_max) {
			param.tail = 0;
		}
		point.setX(param.sigma.getX() / param.nb);
		point.setY(param.sigma.getY() / param.nb);
	};
	
	var that = {};
	that.press = function(point) {
		param.head = 0;
		param.tail = 1;
		param.nb = 1;
		param.buffer[0] = new Point({x:point.getX(), y:point.getY()});;
		param.sigma = new Point({x:point.getX(), y:point.getY()});;
	};
	that.move = function(point) {
		_move(point);
	};
	that.release = function(point) {
		_move(point);
	};
	return that;
};