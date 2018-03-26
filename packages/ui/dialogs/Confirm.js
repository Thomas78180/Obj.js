var Confirm = function(options) {

	var defauts = {
		title: null,
		message: '',
		css: {
			position: 'absolute',
			backgroundColor: 'white',
			border: '1px solid darkgray',
			zIndex: sdk.getMaxZIndex(),
		},
		onOk: null, // a retirer
		onCancel: null, // a retirer 
		btnValid: null,
		btnCancel: null,
		onClickOut: function(self, event) {},
		addClass: 'Confirm',
		appendTo: sdk
	};
	
	var param = $.extend(true, defauts, options);
	var that = Obj(param);
	
	sdk.require('ui.input.Input');
	
	var _fondOpaque = Obj({
		addClass: '_fondOpaque',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			border: 'none',
			width: document.body.scrollWidth+'px',//$('body').css('width'),
			height: document.body.scrollHeight+'px',//$('body').css('height'),
			backgroundColor: 'black',
			opacity: '0.4'
		},
		appendTo: param.appendTo
	});
	
	if(param.title) {

		var _header = Obj({
			addClass: '_header',
			appendTo: that
		});
		
		var _title = Obj({
			addClass: '_title',
			typeDOM: 'p',
			html: param.title,
			css: {
				textAlign: 'center',
				fontWeight: 'bold',
				padding: Px(10)+' '+Px(20)+' '+Px(10)+' '+Px(20)
			},
			appendTo: _header
		});
	}
	
	var _content = Obj({
		addClass: '_content',
		css: {
			padding: Px(20),
			paddingTop: param.title ? '0px' : Px(20)
		},
		html: param.message,
		appendTo: that
	});
	
	var _footer = Obj({
		addClass: '_footer',
		css: {
			textAlign: 'right',
			padding: Px(10)
		},
		appendTo: that
	});
	
	if(param.onCancel || param.onOk) {
		
		sdk.require('ui.basic.Button');
		
		var _btnOk = Button({
			addClass: '_btnOk _btnValid',
			mot: {html: 'Ok'},
			css: {
				height: '35px',
				width: '100px',
				marginRight: '20px'
			},
			onPress: function(self, event) {
				_fondOpaque.remove();
				that.remove();
				if(param.onOk) param.onOk();
			},
			appendTo: _footer
		});
		
		if(param.onCancel) {
		
			var _btnCancel = Button({
				mot: {html: 'Annuler'},
				addClass: '_btnCancel',
				css: {
					height: '35px',
					width: '100px',
					marginRight: '20px'
				},
				onPress: function(self, event) {
					_fondOpaque.remove();
					that.remove();
					param.onCancel();
				},
				appendTo: _footer
			});	
		}
	}
	
	if(param.btnValid || param.btnCancel) {
		
		param.btnValid.appendTo(_footer);
		param.btnCancel.appendTo(_footer);
		
		that.getButtonValid = function() {
			return param.btnValid;
		};
		that.getButtonCancel = function() {
			return param.btnCancel;
		};
	}
	
	var _positionner = function() {
		that.css({
			top: (window.scrollY + ($('body').height() - that.height()) / 2)+'px',
			left: ((document.body.scrollWidth - that.width()) / 2)+'px'
		});
	};
	
	$(window).on('scroll', _positionner);
	that.on('remove', function() {
		$(window).off('scroll', _positionner);
	});
	
	_positionner();
	
	return that;
};