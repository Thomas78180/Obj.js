/**
Fichier: RadioButton.js
Rôle: RadioButton paramétrable 
Version: ui
Encodage: utf-8
Stabilite: 1 ( Building )
MAJ: 11/11/2013
Hérite de:
	- 0bj
		- Bouton 
			- statuts: ['on','off','disabledOn','disabledOff','over']
			- statut
			- enableOnFunction, enableOffFunction, disableOnFunction, disableOffFunction
		- enterFunction, leaveFunction, upFunction, downFunction
		- html
Assemble:
	- 0bj	
		- Image 
			- src: images[param.status]
		- Texte 
			- html: param.html
			
Méthodes:
	- getCoche()
	- group(array)
	- setOn()
	
Exemple DialogBackgroundImage :
	_tailleOriginale.group([agrandissementMax, largeurMax, hauteurMax]);
	agrandissementMax.group([_tailleOriginale, largeurMax, hauteurMax]);
	largeurMax.group([_tailleOriginale, agrandissementMax, hauteurMax]);
	hauteurMax.group([_tailleOriginale, largeurMax, agrandissementMax]);
**/

var RadioButton = function(options) {

	var defauts = {
		addClass: 'RadioButton',
		linkedItem: null,
		status: 'off',
		images: {
			on: sdk.app.packageAssets+'../../ui/basic/radiobutton/on.png',
			off:sdk.app.packageAssets+'../../ui/basic/radiobutton/off.png',
			disabledOn: sdk.app.packageAssets+'../../ui/basic/radiobutton/disabledOn.png',
			disabledOff: sdk.app.packageAssets+'../../ui/basic/radiobutton/disabledOff.png',
			over: sdk.app.packageAssets+'../../ui/basic/radiobutton/over.png'
		},
		css: {
			border: 'none',
			textAlign: 'left',
		},
		img: {
			src: null,
			css: {
				left: '0px',
				width: '18px',
				height: '18px'
			}
		},
		mot: {
			html: options.html,
			css: {
				left: '25px',
				textAlign: 'left'
			}
		},
		group: [],
		onEnter: function(self, event) {
			//_coche.setSrc(param.images.over);
			self.setSrc(param.images.over);
		},
		onLeave: function(self, event) {
			self.setSrc(param.images[self.getStatus()]);
		},
		onEnableOn: function(self, event) {
			self.setSrc(param.images.on);
			for(var i = 0; i < param.group.length ; i++) {
				param.group[i].enableOff();
			}
		},
		onEnableOff: function(self) {		
			self.setSrc(param.images.off);
		},
		onDisableOn: function(self) {
			self.setSrc(param.images.disabledOn);
		},
		onDisableOff: function(self) {		
			self.setSrc(param.images.disabledOff);
		},
	};

	var param = $.extend(true, defauts, options);
	
	sdk.require('ui.basic.Button');
	sdk.require('ui.basic.Mot');
	
	var _labelText = param.html;
	param.html = null;
	if(param.css.color) param.mot.css.color = param.css.color;
	
	var that = Button(param);
	
	that.group = function(radioButtons) {	
		for(var i = 0; i < radioButtons.length; i++) {
			param.group.push(radioButtons[i]);
		}
	};
	
	return that;
};

