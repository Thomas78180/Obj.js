var Window = function(options) {
		
	var defauts = {
		addClass: 'Window',
		css: {
			zIndex: sdk.getMaxZIndex(),
			minWidth: Px(300),
			minHeight: Px(150),
			position: 'fixed',
			border: Px(1)+' solid gray',
			backgroundColor: 'white',
			overflow: 'hidden'
		},
		images: {
			close: sdk.packagesDirectory+'ui/desktop/window/close.png'
		},
		title: null,
		content: null,
		onDragStart: function(self, event) {},
		onDrag: function(self, event) {},
		onDragStop: function(self, event) {},
		onResizeStart: function(self, event) {},
		onResize: function(self, event) {},
		onResizeStop: function(self, event) {},
		onClose: function() {},
		onReady: function(self) {},
		appendTo: sdk
	};
	
	var param = $.extend(true, defauts, options);
	
	var _header = null;
	var _title = null;
	var _closeButton = null;
	var _content = null;
	
	var that = Obj(param);
	
	that.css('maxHeight', (that.parent().height()-50)+'px');
	that.mousedown(function() {
		that.css('zIndex', sdk.getMaxZIndex());
	});
	that.resize(function() {
		_content.css('paddingBottom', (parseInt(param.css.padding) / 2) +'px');
		if(_content.innerHeight() > _content.height()) {
			_content.css('paddingBottom', '0px');
		}
		_content.css({
			width: (that.width() - parseInt(_content.css('paddingLeft')) - parseInt(_content.css('paddingRight'))) +'px',
			height: (that.height() - _header.height() - parseInt(_content.css('paddingTop')) - parseInt(_content.css('paddingBottom')))+'px'
		});
	});
	
	_header = Obj({
		addClass: '_header',
		css: {
			backgroundColor: 'lightgray',
			cursor: 'move',
			height: Px(25),
			borderBottom: Px(1)+' solid gray',
			overflow: 'hidden'
		},
		appendTo: that
	});
	
	_title = Texte({
		html: param.title,
		css: {
			position: 'absolute',
			cursor: 'move',
			left: Px(10),
			lineHeight: Px(25)
		},
		appendTo: _header
	});
	
	_closeButton = Button({
		img: {
			src: param.images.close,
			width: Px(18),
			height: Px(18)
		},
		css: {
			position: 'absolute',
			top: Px(5),
			right: Px(5),
			width: Px(18),
			height: Px(18),
			border: 'none',
			backgroundColor: 'transparent'
		},
		onPress: function(sef, event) {
			that.remove();
		},
		appendTo: _header
	});
	
	_content = Obj({
		addClass: '_content scrollable',
		html: param.content,
		css: {
			// padding: Px(25),
			overflow: 'auto',
			height: that.css('height')
		},
		appendTo: that
	});

	that.setTitle = function(title) {
		_title.html(title);
	};
	
	that.getContent = function() {
		return _content;
	};
	
	that.addContent = function(obj) {
		obj.appendTo(_content);
		that.css('width', _content.innerWidth());
		_content.css('height', _content.find('>*').height())
		that.css('height', _header.height() + _content.height() + parseInt(_content.css('paddingTop'))*2)// + parseInt(_content.css('paddingLeft')) + parseInt(_content.css('paddingRight')));//(parseInt(_content.css('width')) - parseInt(_content.css('padding'))*2)+'px');
	};
	
	that.draggable({
		handle: _header,
		start: function(event, ui) {
			param.onDragStart(self, event);
		},
		drag: function(event, ui) {
			param.onDrag(self, event);
		},
		stop: function(event, ui) {
			param.onDragStop(self, event);
		},
	});	
	
	that.resizable({
		aspectRatio: false,
		autoHide: false,
		disabled: false,
		handles: 'ne, se, sw, nw',
		start: function(event, ui) {
			param.onResizeStart(self, event);
		},
		resize: function(event, ui) {
			param.onResize(self, event);
		},
		stop: function(event, ui) {
			param.onResizeStop(self, event);
		}
	});
	
	that.css({
		top: (($(window).height() - that.height()) / 2)+'px',
		left: (($(window).width() - that.width()) / 2)+'px'
	});
	
	if(options.css && options.css.top && options.css.left) {
		
		that.css({
			top: options.css.top,
			left: options.css.left
		});
	}
	
	return that;
};