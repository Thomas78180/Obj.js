/**
Fichier: Button.js
Rôle: Button avec etats et callbacks
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 11/02/2018

- status: ['on', 'off', 'disabledOn', 'disabledOff'] + 'over'
- callbacks:	
		- onEnableOn
		- onEnableOff
		- onDisableOn
		- onDisableOff
		- onEnter
		- onLeave
		- onPress
**/

var Button = function(options) {
	
	var defauts = {
		typeDOM: 'div',
		addClass: 'Button',
		status: null,
		img: null,
		mot: null,
		css: {
			width: Px(60),
			height: Px(30),
			display: 'inline-block',
			cursor: 'pointer'
		},
		onEnter: function(self, event) {},
		onLeave: function(self, event) {},
		onPress: function(self, event) {},
		onEnableOn: function(self) {},
		onEnableOff: function(self) {},
		onDisableOn: function(self) {},
		onDisableOff: function(self) {},
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	var _status = param.status;
	var _mot = null; 
	var _img = null;
	
	var _addImg = function() {
		if(!param.img.css) {
			param.img.css = {
				width: '100%',
				height: '100%'
			};
		}
		else {
			param.img.css.position = 'absolute'
			if(!param.img.css.top && param.img.css.height) param.img.css.top = ((parseInt(that.css('height')) - parseInt(param.img.css.height))/2)+'px';
			if(!param.img.css.left && param.img.css.width) param.img.css.left = ((parseInt(that.css('width')) - parseInt(param.img.css.width))/2)+'px';
			if(!param.img.css.height) param.img.css.height = '100%';
			if(!param.img.css.width) param.img.css.width = '100%';
		}
		
		if(param.images) {
			param.img.src = param.images[param.status];
		}
		
		if(sdk.inArray(param.status, ['disabledOn', 'disabledOff'])) param.img.css.cursor = 'default';
		else param.img.css.cursor = 'pointer';
		
		_img = Img(param.img).appendTo(that);
		
		that.setSrc = function(src) {_img.attr('src', src)};
		that.getSrc = function() {return _img.attr('src')};
	};
	var _addMot = function() {
		if(!param.mot.css) {
			param.mot.css = {
				width: param.css.width,
				height: that.css('height'),
				// lineHeight: that.css('height'),
				// textAlign: 'center'
			};
		}
		else {
			if(!param.mot.css.left && !param.mot.css.right) {
				param.mot.css.width = param.css.width;
			}
		}
		if(!param.mot.css.height) {
			param.mot.css.height = param.css.height;
			param.mot.css.lineHeight = param.css.height;
		}
		if(!param.mot.css.top && !param.mot.css.bottom) {
			param.mot.css.lineHeight = param.css.height;
		}
		else {
			param.mot.css.lineHeight = null;
		}
		if(!param.mot.css.left && !param.mot.css.right && !param.mot.css.textAlign) {
			param.mot.css.display = 'block';
			param.mot.css.textAlign = 'center';
		}
		if(param.mot.css.left || param.mot.css.right) {
			param.mot.css.position = 'absolute';
		}
		if(sdk.inArray(param.status, ['disabledOn', 'disabledOff'])) {
			param.mot.css.cursor = 'default';
		}
		else {
			param.mot.css.cursor = 'pointer';
		}
		
		if(param.img) {
			param.mot.css.position = 'absolute';
			if(!param.mot.css.top) param.mot.css.top = '0px';
			if(!param.mot.css.left) param.mot.css.left = '0px';
		}
		
		_mot = Mot(param.mot).appendTo(that);
	};
	
	if(param.img) {
		sdk.require('ui.basic.Img');
		_addImg();
	}
	if(param.mot) {
		sdk.require('ui.basic.Mot');
		_addMot();
	}
	
	that.mouseenter(function(event) {
		
		if(!sdk.inArray(_status, ['disabledOn','disabledOff'])) {
			that.css('cursor', 'pointer');
			that.addClass('over');
			
			if(param.images && param.images.over) {
				_img.attr('src', param.images.over);
			}
			return param.onEnter(that, event);
		}
		
		that.css('cursor', 'default');
		that.find('.Mot, .Img').css('cursor', 'default');
	});
	
	that.mouseleave(function(event) {
		
		if(!sdk.inArray(_status, ['disabledOn','disabledOff'])) {
			that.css('cursor', 'pointer');
			that.removeClass('over');
			
			if(param.images) {
				_img.attr('src', param.images[_status]);
			}
			return param.onLeave(that, event);
		}
		
		that.css('cursor', 'default');
		that.find('.Mot, .Img').css('cursor', 'default');
	});
	
	that.mousedown(function(event) { // modifier l'apparence du bouton (visuel appuyé)
		/*
		if(!sdk.inArray(_status, ['disabledOn','disabledOff'])) {
			
			if(_status == null) return param.onDown(that, event);
			
			if(_status == 'on') {
				
				// if(that.hasClass('RadioButton')) {
					// return false;
				// }
				
				_refreshButton('off');
				return param.onEnableOff(that);
			}
			
			_refreshButton('on');
			param.onEnableOn(that);
		}*/
	});
	
	that.mouseup(function(event) {
		
		if(!sdk.inArray(_status, ['disabledOn','disabledOff'])) {
			
			if(_status == 'on') {
				_refreshButton('off');
				return param.onEnableOff(that);
			}
			
			if(_status == 'off') {
				_refreshButton('on');
				return param.onEnableOn(that);
			}
			
			param.onPress(that, event);
		}
	});
	
	var _refreshButton = function(status) {
		
		_status = status;
		
		// update html class
		that.removeClass('on off disabledOn disabledOff').addClass(_status);
		
		// update cursor
		if(!sdk.inArray(_status, ['disabledOn','disabledOff'])) {
			that.css('cursor', 'pointer');
			if(_mot) _mot.css('cursor', 'pointer');
			if(_img) _img.css('cursor', 'pointer');
		}
		else {
			that.css('cursor', 'default');
			if(_mot) _mot.css('cursor', 'default');
			if(_img) _img.css('cursor', 'default');
		}
		
		// update img status
		if(_img && param.images) {
			_img.attr('src', param.images[_status]);
		}
	};
	
	that.enableOn = function() {
		_refreshButton('on');
		param.onEnableOn(that);
	};
	
	that.enableOff = function() {
		_refreshButton('off');
		param.onEnableOff(that);
	};
	
	that.disableOn = function() {
		_refreshButton('disabledOn');
		param.onDisableOn(that);
	};
	
	that.disableOff = function() {
		_refreshButton('disabledOff');
		param.onDisableOff(that);
	};
	
	that.getStatus = function() { // TODO determiner son utilité apres CheckBox et RadioButton
		return _status;
	};
	
	that.showStatus = function(status) {
		_refreshButton(status);
	};
	
	if(_status) {
		that.showStatus(_status);
	}
	
	return that;
};