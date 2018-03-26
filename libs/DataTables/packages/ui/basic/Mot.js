var Mot = function(options) {
	var defauts = {
		addClass: 'Mot',
		typeDOM: 'span',
		css: {
			color: 'black',
			// display: 'block'
			// font: '',
			// backgroundColor: '',
			// border: Px(1)+' solid yellow'
		}
	};
	return Obj($.extend(true, defauts, options));
};