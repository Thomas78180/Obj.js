var Input = function(options) {
	
	var defauts = {
		name: '',
		typeDOM: 'input',
		type: 'text',
		value: null,
		placeholder: null,
		maxLength: null,
		css: {
			userSelect: 'true'
		}
	};
	var param = $.extend(defauts, options);
	
	var that = Obj(param);
	
	that.attr('type', param.type);
	that.attr('name', param.name);
	
	if(param.maxLength) {
		that.attr('maxlength', param.maxLength);
	}
	
	if(param.placeholder) {
		that.attr('placeholder', param.placeholder);
	}
	
	if(param.value) {
		that.attr('value', param.value);
	}
	
	return that;
};