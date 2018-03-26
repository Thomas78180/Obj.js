var Modal = function(options) {
	
	var defauts = {
		addClass: 'Modal',
		href: null,
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: $(window).width()+'px',
			height: $(window).height()+'px'
		},
		onClose: function() {},
		appendTo: 'body'
	};

	var param = $.extend(defauts, options);
	
	var that = null;
	var _background = null;
	var _content = null;
	var _loader = null;
	
	var _resize = function() {
		
		that.css({
			width: $(window).width()+'px',
			height: $(window).height()+'px'
		});
		
		_content.css({
			top: (that.height() / 2 - _content.height()/2)+'px',
			left: (that.width() / 2 - _content.width()/2)+'px'
		});
		
		_loader.css({
			top: (that.height() / 2 - _loader.height()/2)+'px',
			left: (that.width() / 2 - _loader.width()/2)+'px'
		});
	};
	
	var _build = function() {
		
		that = Obj(param);
		
		_background = Obj({
			addClass: '_background',
			css: {
				width: '100%',
				height: '100%',
				backgroundColor: '#333',
				opacity: 0.5,
				zIndex: sdk.getMaxZIndex()
			},
			appendTo: that
		});
		
		_content = Obj({
			addClass: '_content',
			css: {
				position: 'absolute',
				top: '0px',
				left: '0px'
			},
			appendTo: that
		});
		
		_loader = Img({
			addClass: '_loader',
			src: 'img/loading-spinner-default.gif',
			css: {
				position: 'absolute',
				top: that.height() / 2 - 11,
				left: that.width() / 2 - 11,
				width: '22px',
				height: '22px'
			},
			appendTo: that
		});
		
		if(param.href) {
			
			$.ajax({
				url: param.href,
				success: function(data) {
					
					try {
						_content.html(data).show();
						_content.find('.close').click(function() {
							that.fadeOut(function() {
								that.remove();
							});
						});
						_content.find('form').on('validSubmit', function (ev) {
							
							_loader.css('zIndex',sdk.getMaxZIndex()).show();
							
							App.form
							.post($(this))
							.done(function (response, status, jqXHR) {
								if (jqXHR.status == 201 || jqXHR.status == 202) {
									//Created
									location.reload();
								}
							})
							.fail(function (jqXHR, status, thrownError) {
								_content.html(jqXHR.responseText);
							});
						});
					}
					catch(err) {
						console.error('Error detected when loading Modal "'+param.href+'":\n\n\t', err);
					}
					
					_content.css({
						top: (that.height() / 2 - _content.height()/2)+'px',
						left: (that.width() / 2 - _content.width()/2)+'px'
					});
					
					_loader.hide();
	
					$(window).resize(function() {
						_resize();
					});
					
					if(param.onSuccess) param.onSuccess(that);
				},
				error: function(jqXHR, textStatus, errorThrown) {
					console.log(textStatus, errorThrown);
				}
			});
		}
	};
	
	sdk.require({
		packages: ['ui.basic.Obj', 'ui.basic.Img'],
		onSuccess: function() {
			_build();
		}
	});
	
	return that;
};