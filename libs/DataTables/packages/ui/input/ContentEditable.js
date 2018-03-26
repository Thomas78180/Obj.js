/**
Fichier: Button.js
package: ui.input
Rôle: ContentEditable
Version: 01b
Encodage: utf-8
Stabilite: 2 ( Unstable ) - Revoir conditions pour sdk.require + build()
MAJ: 12/10/2016
**/

var ContentEditable = function(options) {
	
	var defauts = {
		addClass: 'ContentEditable',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: '200px',
			height: '100px',
			backgroundColor: 'white',
			color: 'black',
			fontSize: '16px',
			fontStyle: 'normal',
			fontWeight: 'normal',
			fontFamily: 'Arial',
			textDecoration: 'none',
			textAlign: 'left',
			padding: '0px',
			texte: '',
			overflow: 'hidden',
			lineHeight: 'initial',
			outline: 'none',
			cursor: 'text',
			'-webkit-user-select': 'initial'
		},
		onDown: function() {
			return false;
		},
		onUp: function() {
			return false;
		},	
		onKeyDown: function(self, event) {
			return false;
		},
		onKeyUp: function(self, event) {
			return false;
		},
	};
	
	var param = $.extend(true, defauts,options);
	
	var _history = [{
		html: param.html,
		style: ''
	}];
	var _indexHistory = 0;
	
	var _antiClickFunction = function(event) {	
		that.find('a').each(function() {			
			$(this).click(function() {
				alert('Les liens sont désactivés.')
				return false;
			});
		});		
		that.find('img').each(function() {			
			$(this).remove();
		});
		
		if(event)
			return param.onKeyUp(that, event);
	};
	
	var that = Obj(param);
	
	that.blur(function() {
		if(window.qml) window.qml.showKeyBoard('-1');
	});
	that.mousedown(function(event) {
		param.onDown();
	});
	that.mouseup(function(event) {
		param.onUp();
	});
	that.keydown(function(event) {
		param.onKeyDown(event);
	});
	that.keyup(function(event) {
		_antiClickFunction(event);
		that.saveHistory();
	});
	
	_antiClickFunction(null);
	
	that.active = function(callback) {
		that.css('cursor', 'text');
		that.css('-webkit-user-select', 'initial');
		that.attr('contentEditable','true');
		that.focus();
		if(callback) {
			callback();
		}
	};
	
	that.desactive = function(callback) {
		that.css('cursor', 'normal');
		that.css('-webkit-user-select', 'none');
		that.attr('contentEditable','false');
		if(callback) {
			callback();
		}
	};	
	
	that.getSelectionFontSize = function() {
		
		var getNodeStyle = function(node) {
			return node.style;
		};
		
		var _getNodeParent = function(node) {
			return node.parentNode;
		};
		
		var _getFontSize = function() {
			if(that.find('font').length > 0) {
				that.find('font:first').css('fontSize');
			}
			else {
				that.css('fontSize');
			}
		};
		
		var _recursiveScan = function(node) {
		
			if(node !== null && node !== 'undefined' && !$(node).hasClass('.ContentEditable')) {
				var nodeStyle = getNodeStyle(node);
				
				if(typeof nodeStyle === 'undefined') {
					return _recursiveScan(_getNodeParent(node));
				}
				else {
					if(nodeStyle.fontSize !== '') {
						return nodeStyle.fontSize;
					}
					else {						
						var parentNode = _getNodeParent(node)
						if(parentNode) {
							return _recursiveScan(parentNode);
						}
						_getFontSize();					
					}
				}
			}
			else {
				_getFontSize();
			}
		};
		
		var focusNode = document.getSelection().focusNode;
		return _recursiveScan(focusNode);
	};
	
	that.setSelectionFontSize = function(px) {
		if(document.getSelection().type === 'Range') {
			document.execCommand('fontSize', false, '1');
			var fontElements = that.find('font');
			for (var i = 0; i < fontElements.length; ++i) {
				if(fontElements[i].size === '1') {
					fontElements[i].removeAttribute('size');
					fontElements[i].style.fontSize = px;
				}
			}
		}
		
		that.saveHistory();
	};
	
	that.zoom = function(zoomLevel) {
		that.find('font').each(function() {
			$(this).css('fontSize', parseInt($(this).css('fontSize')) * zoomLevel);
		});
		that.find('span').each(function() {
			$(this).css('fontSize', parseInt($(this).css('fontSize')) * zoomLevel);
		});
		that.css('fontSize', parseInt(that.css('fontSize')) * zoomLevel);
	};
	
	
	// pour contourner le probleme de document.execCommand('backColor')
	that.getSelectionBackgroundColor = function() {
		
		var getNodeStyle = function(node) {
			return node.style;
		};
		
		var _getNodeParent = function(node) {
			// // console.log('NODE PARENT', node.parentNode)
			return node.parentNode;
		};
		
		var _recursiveScan = function(node) {
		
			// // console.log('NODE IN',node)
			if(node !== null && node !== 'undefined' && !$(node).hasClass('.ContentEditable')) {
				var nodeStyle = getNodeStyle(node);
				
				// // console.log('NODE STYLE', nodeStyle)
				if(typeof nodeStyle === 'undefined') {
					// // console.log('CHECK PARENT')
					return _recursiveScan(_getNodeParent(node));
				}
				else {
					if(nodeStyle.backgroundColor !== '') {
						return nodeStyle.backgroundColor;
					}
					else {						
						var parentNode = _getNodeParent(node)
						if(parentNode) {
							return _recursiveScan(parentNode);
						}
						
						if(that.find('font').length > 0) {
							that.find('font:first').css('backgroundColor');
						}
						else {
							that.css('backgroundColor');
						}						
					}
				}
			}
			else {
				if(that.find('font').length > 0) {
					that.find('font:first').css('backgroundColor');
				}
				else {
					that.css('backgroundColor');
				}
			}
		};
		
		var focusNode = document.getSelection().focusNode;
		return _recursiveScan(focusNode);
	};
	
	that.selectAllText = function() {
		that.focus();
		return document.execCommand('selectAll', false, null);
	};
	
	that.undo = function() {
		if(_indexHistory > 0) {
			_indexHistory--;
			that.html(_history[_indexHistory].html);
			that.attr('style', _history[_indexHistory].style)
		}
	};
	
	that.redo = function() {
		if(++_indexHistory < _history.length) {
			that.html(_history[_indexHistory].html);
			that.attr('style', _history[_indexHistory].style);
		}
	};
	
	that.saveHistory = function() {
		_history[++_indexHistory] = {
			html: that.html(),
			style: that.attr('style')
		};
		
		for(var i = _history.length; i < 0; i--) {
			if(i > _indexHistory) {
				_history.pop();
			}
		}
	};
	
	return that;
};