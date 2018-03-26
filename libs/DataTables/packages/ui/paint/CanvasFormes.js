
var CanvasFormes = function(options) {

	var defauts = {
		context: null,
		widthMin: 10,
		rotationActivate: true,
		fillActivate: false,
		fillStyle: "#000000",
		strokeActivate: false,
		strokeStyle: "#000000",
		lineWidth: 5,
		lineCap: "round",
		css: {
			
		},
		appendTo: null
	};
	
	var param = $.extend(true, defauts, options);	
	
	var that = {};
	var _minPos = null;
	var _maxPos = null;
	
	if(!param.context) {
	
		that = Obj({
			typeDOM: 'canvas',
			addClass: 'CanvasFormes',
			css: param.css,
			appendTo: param.appendTo
		});
	
		param.context = that.get(0).getContext('2d');
	}
	
	sdk.require('ui.paint.Point');
	
	var _startContext = function (posStart, posEnd) {
		param.context.save();
		param.context.beginPath();
		param.context.translate(posStart.getX(), posStart.getY());
		param.context.fillStyle = param.fillStyle;
		param.context.strokeStyle = param.strokeStyle;
		param.context.lineWidth = param.lineWidth;
		param.context.lineCap = param.lineCap;
		if (param.rotationActivate == true) {
			param.context.rotate(_getAngleInRadianBetweenTwoPoint(posStart, posEnd));
		}
	}

	var _endContext = function () {
		if (param.fillActivate === true) {
			param.context.fill();
		}
		if (param.strokeActivate === true) {
			param.context.stroke();
		}
		param.context.restore();
	}
	
	var _getDistanceBetweenTwoPoints = function (point1, point2) {
		var xs = point2.getX() - point1.getX();
		var ys = point2.getY() - point1.getY();
		var distance = Math.sqrt(xs * xs + ys * ys);
		if (distance > param.widthMin) {
			return distance;
		}
		return param.widthMin;
	}
	
	var _getAngleInRadianBetweenTwoPoint = function (point1, point2) {
		var deltaY = point2.getY() - point1.getY();
		var deltaX = point2.getX() - point1.getX();
		return Math.atan2(deltaY, deltaX);
	}
	
	var _canDraw = function () {
		if (param.context === false) {
			sdk.log('CanvasFormes 69', 'Init the context before drawing');
			return false;
		}
		return true;
	}
	
	var _drawPolygon = function (posStart, posEnd, nbPoints, pCenter) {
		if (_canDraw() == true) {
			var width = _getDistanceBetweenTwoPoints(posStart, posEnd);
			_startContext(posStart, posEnd);
			param.context.moveTo(0, 0 - width);
			for (var i = 0; i < nbPoints; i++) {
				if (pCenter === false) {
					param.context.rotate(Math.PI * 2 / nbPoints);
					param.context.lineTo(0, 0 - width);
				} else {
					param.context.rotate(Math.PI / nbPoints);
					param.context.lineTo(0, 0 - (width * pCenter));
					param.context.rotate(Math.PI / nbPoints);
					param.context.lineTo(0, 0 - width);
				}
			}
			_endContext();
		}
		// console.log('polygon drawed')
	}
	
	var _drawCircle = function (posStart, posEnd) {
		if (_canDraw() == true) {
			var width = _getDistanceBetweenTwoPoints(posStart, posEnd);
			_startContext(posStart, posEnd);
			param.context.arc(0, 0, width, 0, 2 * Math.PI, false);
			_endContext();
		}
	}
	
	var _drawLine = function (posStart, posEnd) {
		if (_canDraw() == true) {
			var width = _getDistanceBetweenTwoPoints(posStart, posEnd);
			_startContext(posStart, posEnd);
			param.context.moveTo(0, 0);
			param.context.lineTo(posEnd.getX() - posStart.getX(), posEnd.getY() - posStart.getY());
			_endContext();
		}
	}
	
	that.getDistanceBetweenTwoPoints = _getDistanceBetweenTwoPoints;
	that.setContext = function(context) { param.context = context; };
	that.setFillActivate = function(activate) { param.fillActivate = activate; };
	that.setFillStyle = function(style) { param.fillStyle = style; };
	that.setStrokeStyle = function(style) { param.strokeStyle = style; };
	that.setStrokeActivate = function(activate) { param.strokeActivate = activate; };
	that.setRotationActivate = function(activate) { param.rotationActivate = activate; };
	that.setLineWidth = function(lineWidth) { param.lineWidth = lineWidth; };
	that.drawLine = function(posStart, posEnd) {
		_drawLine(posStart, posEnd);
	};
	that.drawCircle = function(posStart, posEnd) {
		_drawCircle(posStart, posEnd);
	};
	that.drawStar = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 5, 0.5);
	};
	that.drawPolygon = function(posStart, posEnd, nbPoints) {
		_drawPolygon(posStart, posEnd, nbPoints);
	};
	that.drawTriangle = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 3);
	};
	that.drawSquare = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 4);
	};
	that.drawPentagon = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 5);
	};
	that.drawHexagon = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 6);
	};
	that.drawHeptagon = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 7);
	};
	that.drawOctagon = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 8);
	};
	that.drawNonagon = function(posStart, posEnd) {
		_drawPolygon(posStart, posEnd, 9);
	};
	that.getAlpha = function(a, b) {
		return _getAngleInRadianBetweenTwoPoint(a, b);
	};
	// that.rogner = function() {
		// _minPos
		// _maxPos
		
		
		// var width = _getDistanceBetweenTwoPoints(_minPos, _maxPos);
		
		
	// }
	
	return that;
};