/**
Fichier: CheckBox.js
Rôle: CheckBox paramétrable 
Version: 03e
Encodage: utf-8
Stabilite: 1 ( Building )
MAJ: 13/07/2017
Hérite de:
	- 0bj
		- Bouton 
			- status: ['on','off','disabledOn','disabledOff'] + over
			- onEnableOn, onEnableOff, onDisableOn, onDisableOff
			- onEnter, onLeave, onUp, onDown
		- html
Assemble:
	- 0bj	
		- Image 
			- src: param.images[param.status]
		- Mot 
			- html: options.html
**/

var CheckBox = function(options) {
	
	var defauts = {
		addClass: 'Checkbox',
		status: 'off',
		images: {
			on: sdk.app.packageAssets+'../../ui/basic/checkbox/on.png',
			off: sdk.app.packageAssets+'../../ui/basic/checkbox/off.png',
			disabledOn: sdk.app.packageAssets+'../../ui/basic/checkbox/disabledOn.png',
			disabledOff: sdk.app.packageAssets+'../../ui/basic/checkbox/disabledOff.png',
			over: sdk.app.packageAssets+'../../ui/basic/checkbox/over.png'
		},
		css: {
			height: Px(20),
			border: 'none'
		},
		img: {
			css: {
				left: Px(0),
				width: Px(18),
				height: Px(18)
			}
		}
	};
	
	
	var param = $.extend(true, defauts, options);
	
	param.mot = {html: options.html, css: {left: Px(25)}};
	param.html = null;
	
	return Button(param);
};