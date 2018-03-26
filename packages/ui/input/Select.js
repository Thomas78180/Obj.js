var Select = function(options) {
	
	var defauts = {
		name: '',
		addClass: 'Select',
		typeDOM: 'select'
	};
	var param = $.extend(defauts, options);
	
	var that = Obj(param);
	that.attr('name', param.name);
	
	that.addOption = function(option) {
		console.log('option')
		option.appendTo(that);
	};
	
	return that;
};