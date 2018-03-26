var Slider = function(options) {

	var defauts = {
		addClass: 'Slider',
		min: 0,
		max: 100,
		disabled: false,
		value: 50,
		onDown: function(self) {},
		onStart: function(self) {},
		onSlide: function(self, event, ui) {},
		onStop: function(self, event, ui) {},
		css: {
			width: '200px',
			height: '4px',
			cursor: 'pointer',
            background: 'none',
            backgroundColor: 'transparent'
		},
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	that.slider({
		min: param.min,
		max: param.max,
		disabled: param.disabled,
		value: param.value,
		start: function() {
			param.onStart();
		},
		slide: function(event, ui) {
			param.onSlide(that, event, ui);
		},
		stop: function(event,ui) {
			param.onStop(that, event, ui);
		}
	});
    
    that.find('.ui-slider-handle').hide();
	
	that.mousedown(function() {
		param.onDown(self);
	})
	
	that.enable = function() {
		that.slider('enable');
	};
	
	that.disable = function() {
		that.slider('disable');
	};
	
	return that;
};