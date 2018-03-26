/**
Fichier: Obj.js
Rôle: Classe mère principale avec gestion de dépendances
Version: 03c
Encodage: utf-8
Stabilite: 4 ( Enhanced )
MAJ: 21/03/2017
*/

var Obj = function(options) {
	
	var defauts = {
		typeDOM: 'div',
		addClass: 'Obj',
		id: null,
		html: null,
		css: {
			fontFamily: 'Open Sans',
			fontSize: Px(14),
			position: 'relative',
			userSelect: 'none',
			cursor: 'default'
		},
		prependTo: null,
		appendTo: null
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = $('<'+param.typeDOM+'/>', {
		html: param.html,
		css: param.css
	});
	
	if(param.id) {
		that.attr('id', param.id);
	}
	
	if(param.addClass) {
		that.addClass(param.addClass);
	}
	
	if(param.prependTo) {
		that.prependTo(param.prependTo);
	}
	else if(param.appendTo) {
		that.appendTo(param.appendTo);
	}
	
	return that;
};