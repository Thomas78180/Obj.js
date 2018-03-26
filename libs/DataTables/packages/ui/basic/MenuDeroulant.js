
var MenuDeroulant = function(options) {
	
	var defauts = {
		addClass: (param.addClass ? param.addClass+' ' : '')+'MenuDeroulant',
		blankOption: false,
		selectedOption: {
			value: null,
			html: null
		},
		buttons: [],
		css: {
			width: '80px',
			height: '50px',
			fontSize: '12px',
			fontFamily: 'Trebuchet MS',
			fontStyle: 'italic',
			color: 'gray',
			outline: 'none',
			cursor: 'pointer',
			overflow: 'hidden',
			cursor: 'pointer',
			border: '1px solid lightgray',
			paddingRight: ResponsiveEchelle({percent: 1.75}).px() + 'px',
		},
		images: {
			downBleu: sdk.packagesUrl+'ui/basic/menuDeroulant/downBleu.png',
			downBlanc: sdk.packagesUrl+'ui/basic/menuDeroulant/downBlanc.png',
			upBleu: sdk.packagesUrl+'ui/basic/menuDeroulant/upBleu.png',
			upBlanc: sdk.packagesUrl+'ui/basic/menuDeroulant/upBlanc.png'
		},
		menuOpen: false,
		openFunction: function() {
			return false;
		},
		closeFunction: function(obj) {
			return false;
		},
		changeFunction: function(i) {
			return false;
		},
		appendTo: null
	};
	
	var param = $.extend(true, defauts, options);
	
	sdk.require('ui.basic.Button');
	sdk.require('ui.basic.Image');
	
	var that = Obj({
		css: param.css,
		appendTo: param.appendTo,
		onUp: function(self, event) {			
			if(!param.menuOpen) {			
				return _openMenu();
			}
			return _closeMenu();
		}
	});
	
	var _listeObjs = Obj({
		addClass: 'listeObjs',
		appendTo: that,
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			overflow: 'hidden',
			width: param.width,
			height: param.height,
			backgroundColor: param.css.backgroundColor
		}
	});
	
	var _elemSelect = Obj({
		css: {
			width: param.css.width,
			height: param.css.height
		},
		appendTo: _listeObjs
	});
	
	_elemSelect.mouseup(function() {
		that.close();
	});
	
	var antiClick = Image({ // seule l'image n'efface pas la selection du texte
		addClass: 'anticlick',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			zIndex: 1,
			cursor: 'pointer',
			width: param.css.width,
			height: param.css.height,
			opacity: 0
		},
		appendTo: that
	});
	
	var _selectElem = function (elem) {
		_elemSelect.css('marginLeft', elem.css("marginLeft"));
		_elemSelect.html(elem.html());
	}
	
	var firstElem = null;
	
	var start = 0;
	var end = param.buttons.length;
	
	for(var i = start; i < end; i++ ) {
		var elem = param.buttons[i];
		if (i == 0 && param.blankOption == false) {
			_selectElem(elem);
		}
		_listeObjs.append(elem);
		elem.getDOM().mouseup(function() {
			_selectElem($(this));
		});
	}
	
	var _openMenu = function() {
		that.css('zIndex', sdk.getMaxZIndex());
		openIcon.setSrc(param.images.downBlanc);
		that.getDOM().animate({'height': _listeObjs.height() + "px"}, 200, function () {
			openIcon.setSrc(param.images.downBleu);
			openIcon.hide();
			closeIcon.show();
			param.menuOpen = true;			
			antiClick.hide();
			param.openFunction();
		});
	};
	
	var _closeMenu = function() {
		antiClick.show();
		closeIcon.setSrc(param.images.upBlanc);
		that.css('height', param.css.height);
		// that.getDOM().animate({'height': param.css.height}, 100, function () {
			closeIcon.hide();
			closeIcon.setSrc(param.images.upBleu);
			openIcon.show();
			param.menuOpen = false;
			param.closeFunction();
		// });
	};
	
	var openIcon = Image({
		addClass: 'openIcon',
		src: param.images.downBleu,
		css: {
			position: 'absolute',
			right: '0px',
			top: '0px',
			width: ResponsiveEchelle({percent: 1.7}).px()+'px',
			height: ResponsiveEchelle({percent: 4.7}).px()+'px',
			zIndex: 1
		},
		appendTo: that
	});
	
	var closeIcon = Image({
		addClass: 'closeIcon',
		src: param.images.upBleu,
		css: {
			position: 'absolute',
			right: '0px',
			top: '0px',
			width: ResponsiveEchelle({percent: 1.7}).px()+'px',
			height: ResponsiveEchelle({percent: 4.7}).px()+'px',
			display: 'none',
			zIndex: 1
		},
		appendTo: that
	});
	
	that.open = function() {
		return _openMenu();
	};
	
	that.close = function() {
		return _closeMenu();
	};
	
	that.isOpen = function () {
		return param.menuOpen;
	};
	
	that.update = function(value) {
		_elemSelect.css('marginLeft', elem.css("marginLeft"));
		if(_elemSelect.find('.Mot')) {
			_elemSelect.find('.Mot').html(value);	
		}
		else if(_elemSelect.find('.Image')) {
			_elemSelect.find('.Image').attr('src',value);	
		}
	};	
	
	return that;
};