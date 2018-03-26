var Img = function(options) {
	
	var defauts = {
		preload: false,
		loader: false,
		typeDOM: 'img',
		addClass: 'Img',
		src: null,
		css: {},
		appendTo: null
	};
	var param = $.extend(defauts, options);
	
	var that = null;
	
	var _buildImage = function() {

		that = Obj(param);

		that.attr('src', param.src);
		
		that.setSrc = function(src) {
			that.attr('src', src);
		};
	
		that.getIcon = function(width, height) {
			return Obj({
				html: Img({
					src: that.attr('src'),
					css: {
						width: width,
						height: height
					}
				}),
				css: {
					width: width,
					height: height
				}
			});
		};
	};
	
	if(param.preload) {
		$.ajax({
			url: param.src,
			async: false
		});
		_buildImage();
	}
	else if(param.loader) {
		var _loader = Obj({
			html: Img({
				src: sdk.app.packageAssets+'../../ui/basic/img/loader.gif',
				/*css: {
					position: 'absolute',
					top: function() {
						try {
							return (param.appendTo.height() / 2 - 9)+'px'
						}
						catch(err) {
							return ($(param.appendTo).height() /  2 - 9)+'px'
						}
					},
					left: function() {
						try {
							return (param.appendTo.width() / 2 - 9)+'px'
						}
						catch(err) {
							return ($(param.appendTo).width() /  2 - 9)+'px'
						}
					},
					width: Px(18),
					height: Px(18)
				}*/
			}),
			width: param.css.width || '100%',
			height: param.css.height || '100%',
			appendTo: param.appendTo
		})
		var image = new Image;
		image.src = param.src;
		var interval = setInterval(function() {
			if(image.width && image.height) {
				clearInterval(interval);
				_loader.remove();
				_buildImage();
			}
		}, 10);
	}
	else {
		_buildImage();
	}
	
	return that;
};