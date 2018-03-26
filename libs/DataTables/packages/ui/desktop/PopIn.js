var PopIn = function(options) {
	
	var defauts = {
		iframeUrl: null,
		videoData: null, // sous la forme [{file: xxxxx, points: [{nom: xxxxx, time: xxxx}]}]
		addClass: 'PopIn',
		css: {
			backgroundColor: 'rgba(0,0,0,.7)',
			position: 'fixed',
			zIndex: 10000,
			top: 0,
			left: 0,
			bottom: 0,
			right: 0
		},
		onOpen: function(self) {},
		onClose: function(data) {},
		appendTo: 'body'
	};
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	var _iframe = null;
	var _videoManager = null;
	var _close = Button({
		appendTo: that,
		html: 'Fermer',
		css: {
			position: 'fixed',
			top: '10%',
			left: '92%',
			width: '20px',
			height: '20px',
			color: 'white',
			textDecoration: 'underline'
		},
		onUp: function(self, event) {
			_onClose();
		}
	});
	var _background = Obj({
		addClass: '_background',
		css: {
			width: '100%',
			height: '100%',
			cursor: 'pointer'
		},
		appendTo: that
	});
	
	_background.mouseup(function(event) {
		_onClose();
	});
	
	// methode privee
	var _onClose = function() {
		that.remove();
		if(_videoManager) {
			return param.onClose(_videoManager.getCurrentTime());
		}
		param.onClose(null);
	};
	
	if(param.iframeUrl) {
		
		_iframe = Obj({
			typeDOM: 'iframe',
			css: {
				position: 'fixed',
				top: '10%',
				left: '10%',
				width: '80%',
				height: '80%',
				margin: '0 auto'
			},
			appendTo: that
		});
		
		_iframe.attr('src', param.iframeUrl);
		param.onOpen();
	}
	else if(param.videoData) {
		_videoManager = VideoManager({
			canBeFullScreen: true,
			data: param.videoData,
			css: {
				position: 'fixed',
				top: '10%',
				left: '10%',
				width: '80%',
				height: '80%',
				margin: '0 auto'
			},
			appendTo: that
		});
		
		param.onOpen(_videoManager);
	}
	else {
		var _content = Obj({
			addClass: '_content',
			html: param.content,
			css: {position: 'fixed', top: '0px'},
			appendTo: that
		});
		
		that.getContent = function() {
			return _content;
		};
	}
	
	return that;
};