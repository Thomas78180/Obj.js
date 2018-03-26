var MenuVertical = function(options) {
	
	var defauts = {
		icon: null,
		label: null,
		content: [],
		showContent: true,
		onPress: function(self) {},
		addClass: 'MenuVertical',
		css: {
			zIndex: 1,
			position: 'relative',
			fontSize: Px(14),
			lineHeight: Px(30),
			textAlign: 'left',
			listStyleType: 'none',
			backgroundColor: 'transparent',
			backgroundColorOpened: 'transparent',
			backgroundColorOver: 'transparent'
		},
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	var _zoneLabel = Obj({
		addClass: '_zoneLabel',
		// css: {border: '1px solid red'},
		appendTo: that
	});
	var _zoneContent = Obj({
		addClass: '_zoneContent',
		css: {
			// border: '1px solid blue'
			// backgroundColor: 'red'
		},
		appendTo: that
	});
	
	if(!param.showContent) {
		_zoneContent.hide();
		_zoneLabel.mouseup(function() {
			if(_zoneContent.is(':visible')) {
				return _zoneContent.slideUp();
			}
			_zoneContent.slideDown();
		});
		
		that.close = function() {
			_zoneContent.slideUp();
		};
		that.open = function() {
			_zoneContent.slideDown();
		};
	}
	
	if(param.icon) {
		
		Icon({
			name: param.icon.name,
			color: param.icon.color,
			width: param.css.fontSize,
			appendTo: _zoneLabel
		});
	}
	
	Mot({
		html: param.label,
		css: {
			fontSize: param.css.fontSize,
			color: param.css.color
		},
		appendTo: _zoneLabel
	});
	
	var _isAnimate = false;
	
	param.content.forEach(function(content) {
		
		var isOpened = false;
		
		var li = Obj({
			css: {
				height: Px(30),
				cursor: 'pointer',
				paddingLeft: Px(10),
			},
			appendTo: _zoneContent
		});
		
		var icon = Icon({
			name: content.icon.name,
			width: param.css.fontSize,
			color: param.css.color,
			css: {
				lineHeight: Px(30),
				position: 'absolute',
				top: Px(5),
				left: Px(5),
				cursor: 'pointer'
			},
			appendTo: li
		});
		
		var label = Mot({
			html: '&nbsp;'+content.label,
			css: {
				position: 'absolute',
				top: Px(0),
				left: Px(30),
				height: Px(30),
				fontSize: param.css.fontSize,
				lineHeight: Px(30),
				color: param.css.color,
				cursor: 'pointer'
			},
			appendTo: li
		});
		
		if(content.content && content.content.length > 0) {
			
			var contentIcon = Icon({
				addClass: 'contentIcon',
				name: 'angle-right',
				width: param.css.fontSize,
				color: param.css.color,
				css: {
					lineHeight: Px(30),
					position: 'absolute',
					top: Px(5),
					right: Px(10),
					cursor: 'pointer'
				},
				appendTo: li
			});
			contentIcon.addClass('contentIcon');
			
			var contentIcon2 = Icon({
				addClass: 'contentIcon2',
				name: 'angle-down',
				width: param.css.fontSize,
				color: param.css.color,
				css: {
					lineHeight: Px(30),
					position: 'absolute',
					top: Px(5),
					right: Px(10),
					cursor: 'pointer',
					display: 'none'
				},
				appendTo: li
			});
			contentIcon.addClass('contentIcon')
			
			var subMenu = MenuVertical({
				content: content.content,
				css: {
					paddingLeft: Px(10),
					display: 'none',
					color: param.css.color,
					fontSize: Px(14),
					lineHeight: Px(100)
				},
				appendTo: _zoneContent
			});
		}
		
		li.mouseup(function(event) {
			
			if(!_isAnimate && typeof subMenu !== 'undefined' && !subMenu.is(':visible')) {
				
				_isAnimate = true;
				that.find('.MenuVertical').slideUp();
				contentIcon.show();
				contentIcon2.hide();
				
				if(content.content && content.content.length > 0) {
					subMenu.slideDown(function() {
						contentIcon.hide();
						contentIcon2.show();
						isOpened = true;
						_isAnimate = false;
					});
				}
				else {
					_isAnimate = false;
				}
			}
				if(content.onPress) {
					content.onPress(li, event);
				}
		});
		
		// .css('backgroundColor', '#3e4b5c')
	});
	
	return that;
};