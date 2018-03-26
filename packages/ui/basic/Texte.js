var Texte = function(options) {
	var defauts = {
		addClass: 'Texte',
		typeDOM: 'p',
		css: {}
	};
	var param = $.extend(defauts, options);
	var that = Obj(param);
	return that;
};