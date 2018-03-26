var Form = function(options) {
	
	var defauts = {
		addClass: 'Form'
	};
	var param = $.extend(defauts, options);
	
	var that = Obj(param);
	
	Input({
		type: 'hidden',
		value: sdk.token,
		appendTo: that
	});
	
	return that;
};