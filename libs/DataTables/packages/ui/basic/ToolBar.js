var ToolBar = function(options) {
	
	var defauts = {
		// typeDOM: 'ul',
		leftItems: [],
		rightItems: [],
		css: {
			position: 'relative',
			// listStyleType: 'none',
			height: Px(30),
			backgroundColor: 'transparent'
		},
		addClass: 'ToolBar'
	};
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	var _leftItems = Obj({
		addClass: '_leftItems',
		typeDOM: 'ul',
		css: {
			position: 'absolute',
			left: '0px',
			listStyleType: 'none',
			// backgroundColor: 'yellow'
		},
		appendTo: that
	});
	
	var _rightItems = Obj({
		addClass: '_rightItems',
		typeDOM: 'ul',
		css: {
			position: 'absolute',
			right: '0px',
			listStyleType: 'none',
			// backgroundColor: 'blue'
		},
		appendTo: that
	});
	
	param.leftItems.forEach(function(content) {
		
		content.find('._zoneContent').css('backgroundColor', param.css.backgroundColor);
		
		Obj({
			css: {display: 'inline', float: 'left'},
			html: content,
			appendTo: _leftItems
		});
	});
	
	param.rightItems.forEach(function(content) {
		Obj({
			css: {display: 'inline', float: 'right'},
			html: content,
			appendTo: _rightItems
		});
	});
	
	that.closeMenus = function() {
		that.find('._zoneContent').slideUp();
		that.find('._zoneContent ._zoneContent').slideDown();
	};
	
	return that;
};