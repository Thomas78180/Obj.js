/**
Fichier: Fond.js
Rôle: FondOpaque d'une application (filtre)
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 18/03/2018
REVIEW: 18/03/2018
**/

var Fond = function(_options) {
	
	var _defauts = {
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: document.body.scrollWidth+'px',
			height: document.body.scrollHeight+'px',
			backgroundColor: '#364150',
			opacity: '0.8'
		},
		addClass: 'Fond',
		appendTo: sdk
	};
	
	var _param = $.extend(true, _defauts, _options);
	
	return Obj(_param);
};