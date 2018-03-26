
window.requestAnimFrame = (function(){
	return (
		window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame	||
		function( callback ){
			window.setTimeout(callback, 1000 / 60);
		}
	);
})();

var Dessin = function (options) {
	
	var defauts = {
		addClass: 'Dessin',
		dataUrl: null,
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: $(window).width()+'px',
			height: $(window).height()+'px'
		},
		onUp: function(self, event) {},
		appendTo: null,
		points: []
	};
	
	var param = $.extend(true, defauts, options);
	
	sdk.require('ui.paint.Algo');
	sdk.require('ui.paint.CanvasFormes');
	sdk.require('ui.paint.Point');
	
	var _startPos = new Point({x:-1, y:-1});
	var _curPos = new Point({x:-1, y:-1});
	var _lastPos = new Point({x:-1, y:-1});
	var _color = 'rgb(0,0,0)';
	var _size = 2;
	var _drawActions = null;
	var _actionDessin = 'pinceau';
	var _isMouseDown = false;
	var _started = false;
	var _startTime = new Date().getTime();
	var _replay = [];
	var _dessins = [];
	var _posReplay = 0;
	var _posMaxReplays = 0;
	var _algo = new Algo();
	
	var that = Obj(param);
	
	var canvasBack = Obj({
		typeDOM: 'canvas',
		addClass: 'canvasBack',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
		},
		appendTo: that
	})
	canvasBack.attr('width', param.css.width).attr('height', param.css.height);
	param.contextBack = canvasBack.get(0).getContext('2d');
	
	var canvas = Obj({
		typeDOM: 'canvas',
		addClass: 'saisie',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
		},
		appendTo: that
	})
	canvas.attr('width', param.css.width).attr('height', param.css.height);
	param.context = canvas.get(0).getContext('2d');
	
	canvas
	.mousedown(function(e) {
		_isMouseDown = true;
		param.points = [];
		_startPos = _getCanvasMousePos(e);
		_algo.press(_startPos);
		_curPos = _startPos;
		param.points.push(_startPos);
		_lastPos = _startPos;
		_started = false;
		_initContext();
		_event('mousedown');
		_addToReplay('mousedown', _actionDessin);
	})
	.mousemove(function(e) {
		if(_isMouseDown) {
			_curPos = _getCanvasMousePos(e);
			_algo.move(_curPos);
			_event('mousemove');
			_addToReplay('mousemove', _actionDessin);
		}
	})
	.mouseup(function(e) {
		if(_isMouseDown) {
			param.contextBack.drawImage(canvas.get(0), 0, 0);
			_isMouseDown = false;
			_curPos = _getCanvasMousePos(e);
			_algo.release(_curPos);
			_event('mouseup');
			_addToReplay('mouseup', _actionDessin);
			_posReplay++;
			_posMaxReplays = _posReplay;
			// console.log('_posReplay', _posReplay);
			_clearCanvas();
			param.onUp();
		}
	});
	
	sdk.log('Dessin 42','EXEC - var _formes = CanvasFormes(options);');
	try {
		var _formes = CanvasFormes({
			context: param.context
		});
		sdk.log('Dessin 47','DONE - var _formes = CanvasFormes(options);');
	}
	catch(err) {
		throw sdk.error('Dessin 50','FAILED - var _formes = CanvasFormes(options); '+err);
	}
	
	var _initContext = function () {
		param.context.lineJoin = "round";
		param.context.lineCap = "round";
		param.context.strokeStyle = _color;
		param.context.fillStyle = _color;
		param.context.lineWidth = _size;
		param.contextBack.lineJoin = "round";
		param.contextBack.lineCap = "round";
		param.contextBack.strokeStyle = _color;
		param.contextBack.fillStyle = _color;
		param.contextBack.lineWidth = _size;
		_formes.setStrokeStyle(_color);
		_formes.setFillStyle(_color);
		_formes.setLineWidth(_size);
	};
	var _clearCanvas = function() {
		param.context.clearRect(0, 0, parseInt(param.css.width), parseInt(param.css.height));
	};
	var _clearAll = function() {
		param.context.clearRect(0, 0, parseInt(param.css.width), parseInt(param.css.height));
		param.contextBack.clearRect(0, 0, parseInt(param.css.width), parseInt(param.css.height));
	};
	var _setColor = function(color) {
		sdk.log('Dessin 147','EVENT - update _setColor = '+color);
		_color = color;
	};
	var _setSize = function(lineWidth) {
		_size = parseInt(lineWidth);
	};
	var _setActionDessin = function(action) {
		sdk.log('Dessin 147','EVENT - update _actionDessin = '+action);
		_actionDessin = action;
	};
	var _getDistance = function(from, to) {
		return Math.sqrt(Math.pow(from.getX() - to.getX(),2) + Math.pow(from.getY() - to.getY(), 2));
	};
	var _getCanvasMousePos = function(event) {
		return new Point({
			x: event.offsetX,
			y: event.offsetY
		});
	};
	
	/*
	var _importerImage = function(html5Image) {
		
		var cadreWidth = parseInt(param.css.width);
		var cadreHeight = parseInt(param.css.height);
		var _largeurImageUpdate = html5Image.width;
		var _hauteurImageUpdate = html5Image.height;
		var ratioImage = _largeurImageUpdate / _hauteurImageUpdate;
		
		if(_largeurImageUpdate > cadreWidth && _hauteurImageUpdate > cadreHeight) {
			console.log('a')
			_largeurImageUpdate = cadreWidth;
			_hauteurImageUpdate = _largeurImageUpdate / ratioImage;
			if(_hauteurImageUpdate > cadreHeight) {
				_hauteurImageUpdate = cadreHeight;
				_largeurImageUpdate = _hauteurImageUpdate * ratioImage;
			}
		}
		else if(_largeurImageUpdate > cadreWidth) {
			console.log('b')
			_largeurImageUpdate = cadreWidth;
			_hauteurImageUpdate = _largeurImageUpdate / ratioImage;
		}
		else if(_hauteurImageUpdate > cadreHeight) {
			console.log('c')
			_hauteurImageUpdate = cadreHeight;
			_largeurImageUpdate = _hauteurImageUpdate * ratioImage;
		}
			param.contextBack.drawImage(html5Image, cadreWidth/2 - largeurImageUpdate/2, cadreHeight/2 - hauteurImageUpdate/2, largeurImageUpdate, hauteurImageUpdate);
		
	};
	*/
	
	
	
	var _importerImage = function(html5Image) {
		// return param.contextBack.drawImage(html5Image, 0, 0, html5Image.width, html5Image.height);
		// param.contextBack.drawImage(html5Image, parseInt(param.css.width) / 2 - html5Image.width / 2, parseInt(param.css.height) / 2 - html5Image.height / 2, html5Image.width, html5Image.height);
		//*
		var ratioImage = html5Image.width / html5Image.height;
		
		if(html5Image.width > html5Image.height) {
			// paysage
			_hauteurImageUpdate = html5Image.height;
			if(html5Image.width > parseInt(param.css.width)) {
				// $('body').css('backgroundColor','red')
				hauteurImageUpdate = parseInt(param.css.height) / ratioImage;
				param.contextBack.drawImage(html5Image, parseInt(param.css.width)/2 - html5Image.width/2, parseInt(param.css.height)/2 - html5Image.height/2, html5Image.width, html5Image.height);
			}
			else {
				// $('body').css('backgroundColor','green')
				param.contextBack.drawImage(html5Image, (parseInt(param.css.width) / 2 - html5Image.width / 2), (parseInt(param.css.height) / 2 - html5Image.height / 2), html5Image.width, html5Image.height);
			}
		}
		else {
			// portrait
			var largeurImageUpdate = html5Image.width;
			var hauteurImageUpdate = html5Image.height;
			var largeurCadre = parseInt(param.css.width);
			var hauteurCadre = parseInt(param.css.height);
			
			if(hauteurImageUpdate > hauteurCadre) {
				hauteurImageUpdate = hauteurCadre;
				largeurImageUpdate = hauteurCadre * ratioImage;
			}
			
			param.contextBack.drawImage(html5Image, largeurCadre/2 - largeurImageUpdate/2, hauteurCadre/2 - hauteurImageUpdate/2, largeurImageUpdate, hauteurImageUpdate);
		}
		// */
	};
	var _setCursor = function(action) {
		if(action == 'mousemove') {
			dom.css('cursor', 'wait');
		} else if(action == 'mousedown') {
			dom.css('cursor', 'crosshair');
		} else if(action == 'mouseup') {
			dom.css('cursor', 'crosshair');
		}
	};
	var _addToReplay = function(type, action) {
		// console.log('_addToReplay("'+type+'","'+action+'")');
		_replay.push({
			time: new Date().getTime() - _startTime,
			type: type,
			action: action,
			position: _curPos,
			color: _color,
			size: _size,
			actionDessin: _actionDessin
		});
	};
	var _displayReplayUndoRedo = function() {
		
		_clearAll();
		param.points = [];
		
		var markerReplay = 0;
		for(var i = 0; i < _replay.length; i++) {
			
			_lastPos = _curPos;
			_curPos = _replay[i].position;
			param.points.push(_curPos);
			// _color = _replay[i].color;
			_size = _replay[i].size;
			param.context.strokeStyle = _replay[i].color;
			param.context.lineWidth = _replay[i].size;
			
			if(markerReplay == _posReplay ) {
				// console.log('break ',_posMaxReplays , _posReplay)
				break;
			}
			/*
			else if(_replay[i].type == 'mousedown') {
				// _clearAll();
					// alert('replay type mousedown')
					_points = [];
				param.context.beginPath();
				param.context.moveTo(_replay[i].position.getX(), _replay[i].position.getY());
			}
			else if(_replay[i].type == 'mouseup') {
					alert('replay type mouseup')
					_color = 'red'
					param.context.strokeStyle = 'red';
				markerReplay++;
				param.context.closePath();
				// param.context.moveTo(_replay[i].position.getX(), _replay[i].position.getY());
			}
			else if(_replay[i].type == 'mousemove') {
				// param.context.moveTo(_replay[i].position.getX(), _replay[i].position.getY());
				
				// if(_replay[i].action == 'pinceau') {
					// alert('replay type mousemove')
					
					// _drawPencil(true);
					_drawPencil(false);
				// }
				// else {
					// alert('action replay inconnue')
				// }
			}
			// else {
				// _event(_replay[i].type)
			// }
			*/
		}
	};
	var _undo = function() {
		_clearCanvas
		if (_posReplay >= 0) {			
			_posReplay--;
			_displayReplayUndoRedo();
		}
	};
	var _redo = function() {
		_clearCanvas
		if (_posReplay < _posMaxReplays) {			
			_posReplay++;
			_displayReplayUndoRedo();			
		}
	};
	var _event = function(type) {
		param.points.push(_curPos);
		if(_actionDessin == 'trait') {
			_drawLine(_startPos, _curPos);
		} else if(_actionDessin == 'pinceau') {
			_drawPencil(type == "mouseup");
		} else if(_actionDessin == 'cercle') {
			_drawCircle(_startPos, _curPos);
		} else if(_actionDessin == 'carre') {
			_drawCarre(_startPos, _curPos);
		} else if(_actionDessin == 'etoile') {
			_drawStar(_startPos, _curPos);
		} else if(_actionDessin == 'gommer') {
			_drawRubber();
		}
		_lastPos = _curPos;
	};
	var _drawStar = function (from, to) {
		_clearCanvas();
		_formes.setFillActivate(true);
		_formes.drawStar(from, to);
		_formes.setFillActivate(false);
		// rogner Point({x: , y: }) a Point({x: , y: })
		// console.log('_formes',_formes  );
		// console.log('param.contextBack',param.contextBack);
	};
	var _drawCarre = function (from, to) {
		_clearCanvas();
		_formes.setFillActivate(true);
		_formes.drawSquare(from, to);
		_formes.setFillActivate(false);
	};
	var _drawCircle = function (from, to) {
		_clearCanvas();
		_formes.setFillActivate(true);
		_formes.drawCircle(from, to);
		_formes.setFillActivate(false);
	};
	var _drawLine = function(from, to) {
		_clearCanvas();
		_formes.setStrokeActivate(true);
		_formes.setRotationActivate(false);
		_formes.drawLine(from, to);
		_formes.setStrokeActivate(false);
		_formes.setRotationActivate(true);
	};
	var _draw = function(context) {
		if (!_started) {
			context.beginPath();
			context.arc(_curPos.getX(), _curPos.getY(), _size / 2, 0, 2 * Math.PI, false);
			context.fill();
			context.moveTo(_curPos.getX(), _curPos.getY());
			_started = true;
		}
		else {
			context.beginPath();
			context.moveTo(_lastPos.getX(), _lastPos.getY());
			context.lineTo(_curPos.getX(), _curPos.getY());
			context.stroke();
		}
	};
	var _drawPencil = function(force) {
		// _initContext();
		// sdk.log('Dessin 302','drawPencil (_color: '+_color+' param.context.fillStyle: '+param.context.fillStyle+')');
		// param.context.fillStyle = _color;
		// sdk.log('Dessin 302','drawPencil (_color: '+_color+' param.context.fillStyle: '+param.context.fillStyle+')');
		param.context.beginPath();
		if ( param.points.length == 3) {
			var point1 = param.points[0];
			var point2 = param.points[1];
			var point3 = param.points[2];
			param.context.moveTo(point1.getX(), point1.getY());
			param.context.quadraticCurveTo(point2.getX(), point2.getY(), point3.getX(), point3.getY());
			param.points = [point3];
		}
		param.context.stroke();
		if (force === true) {
			
			if ( param.points.length == 1) {
				var point1 = param.points[0];
				param.context.beginPath();
				param.context.arc(point1.getX(), point1.getY(), _size / 2, 0, 2 * Math.PI, false);
				param.context.fill();
			} else if ( param.points.length == 2) {
				var point1 = param.points[0];
				var point2 = param.points[1];
				param.context.beginPath();
				param.context.moveTo(point1.getX(), point1.getY());
				param.context.lineTo(point2.getX(), point2.getY());
				param.context.stroke();
			}
		}
	};
	var _drawRubber = function() {
		param.contextBack.globalCompositeOperation = "destination-out";
		param.contextBack.strokeStyle = "rgba(0,0,0,1.0)";
		param.contextBack.lineWidth = _size;
		_draw(param.contextBack);
		param.contextBack.globalCompositeOperation = "source-over";
		param.contextBack.strokeStyle = _color;
		param.contextBack.lineWidth = _size;
	};
	var _showReplay = function() {
		
		_clearAll();
		var i = 0;
		var replayTime = 0;
		var end = _replay.length;
		
		var replayInterval = setInterval(function() {
			// console.log(replay[i])
			if(i == end - 1) {
				clearInterval(replayInterval);
			}
			
			if(_replay[i].time >= replayTime) {
				_color = _replay[i].color;
				_size = _replay[i].size;
				
				if(_replay[i].action == 'pinceau') {	
					param.context.strokeStyle = _replay[i].color;
					param.context.lineWidth = _replay[i].size;
					_drawPencil(_replay[i].position);
				}
				else if(_replay[i].action == 'gommer') {
					// update cursor
					// _setReplayCursor('gomme');
				}
				else if(_replay[i].action == 'mousedown') {
					param.context.beginPath();
					param.context.moveTo(_replay[i].position.getX(), _replay[i].position.getY());
				}
				else if(_replay[i].action == 'mousemove') {
					param.context.moveTo(_replay[i].position.getX(), _replay[i].position.getY());
				}
				else if(_replay[i].action == 'mouseup') {
					param.context.closePath();
					param.context.moveTo(_replay[i].position.getX(), _replay[i].position.getY());
				}
				i++;
			}
			
		},60/1000);
	};
	
	if(param.dataUrl) {
	
		var html5Image = new Image();
		html5Image.src = param.dataUrl;
		
		var intervalAsync = setInterval(function() {
		
			var largeur = html5Image.width;
			var hauteur = html5Image.height;
			
			if(largeur && hauteur) {			
				clearInterval(intervalAsync);
				_importerImage(html5Image);
			}
		},100);		
	}
	
	that.showReplay = _showReplay;
	that.setActionDessin = _setActionDessin;
	that.setColor = _setColor;
	that.setSize = _setSize;
	that.importerImage = _importerImage;
	that.effacer = _clearCanvas;
	that.undo = _undo;
	that.redo = _redo;
	that.recommencer = _clearCanvas;
	that.replay = _showReplay;
	that.getColor = function() {
		return _color;
	};
	that.getSize = function() {
		return _size;
	};
	that.getDataUrl = function() {
		return canvasBack.get(0).toDataURL();
	};
	that.getContext = function() {
		return param.context
	};
	that.setHeight = function(height) {
		param.css.height = height;
	};
	that.setWidth = function(width) {
		param.css.width = width;
	};
	that.getHeight = function() {
		return param.css.height;
	};
	that.getWidth = function() {
		return param.css.width;
	};
	that.getIcon = function(width, height) {
		return Image({
			src:  canvasBack.get(0).toDataURL('image/png'),
			css: {
				width: width,
				height: height
			}
		});
	};
	that.toXML = function() {
		if(!that.hasClass('deleted')) {
			return ''+
'					<dataUrl><![CDATA['+canvasBack.get(0).toDataURL()+']]></dataUrl>\n';
		}
		return '';
	};
	
	return that;
};