var Textarea = function(options) {
	var defauts = {
		name: '',
		typeDOM: 'textarea',
		addClass: 'Textarea',
		css: {
			userSelect: 'true'
		}
	};
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	that.attr('name', param.name);
	
	return that;
};