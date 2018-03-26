var Draggable = function(options) {
	
	var defauts = {
		container: null,
		onDragStart: function(self, event) {},
		onDrag: function(self, event) {},
		onDragStop: function(self, event) {},
		addClass: 'Draggable'
	};
	
	var param = $.extend(defauts, options);
	
	var that = Obj(param).draggable({
		dragstart: function(event) {
			param.onDragStart(self, event);
		},
		drag: function(event) {
			param.onDrag(self, event);
		},
		dragstop: function(event) {
			param.onDragStop(self, event);
		},
		container: param.container
	});
	
	return that;
};