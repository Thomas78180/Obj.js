var Option = function(options) {
	
	var defauts = {
		value: '',
		html: '',
		selected: false,
		addClass: 'Option',
		onSelect: function(name, value) {
			console.log('Option defaut.onSelect', name, value);
		},
		typeDOM: 'option'
	};
	var param = $.extend(defauts, options);
	
	var that = Obj(param);
	that.attr('value', param.value);
	if(param.selected) that.attr('selected', 'selected');
	
	that.click(function() {
		param.onSelect('name (undefined)', param.value);
	});
	
	return that;
};