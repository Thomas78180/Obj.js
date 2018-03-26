var Icon = function(options) {
	
	var defauts = {
		typeDOM: 'i',
		name: 'info',
		color: 'black',
		width: Px(10),
		// lineHeight: Px(10),
		css: {}
	};
	
	var param = $.extend(defauts, options);
	
	param.addClass = 'fas fa-'+param.name;
	param.css.color = param.color;
	param.css.width = param.css.height = param.width;
	param.css.lineHeight = param.width;
	
	return Obj(param);
	// var that = 
	
	// return that;
};