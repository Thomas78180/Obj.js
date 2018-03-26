var DatePicker = function(options) {
	
	sdk.require('ui.input.Input');
	
	var defauts = {
		name: '',
		value: null,
		css: {
			userSelect: 'true'
		}
	};
	var param = $.extend(defauts, options);
	
	var that = Input(param);
	
	that.datepicker();
	
	return that;
};