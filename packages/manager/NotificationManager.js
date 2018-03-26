/**
Fichier: NotificationManager
Rôle: Gestionnaire de notifications
Package: manager
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 22/01/2018
**/

var NotificationManager = function(options) {
	
	var defauts = {
		packages: [
			'ui.desktop.AppNotification'
		],
		addClass: 'NotificationManager',
		css: {
			position: 'fixed',
			zIndex: 1,
			top: Px(5),
			right: Px(5)
		},
		appendTo: sdk
	};
	var param = $.extend(defauts, options);
	
	// sdk.require('ui.desktop.AppNotification');
	
	var that = Obj(param);
	
	that.notice = function(message) {
		AppNotification({
			msg: message,
			type: 'notice',
			prependTo: that.css('zIndex', sdk.getMaxZIndex())
		});
	};
	that.success = function(message) {
		AppNotification({
			msg: message,
			type: 'success',
			prependTo: that.css('zIndex', sdk.getMaxZIndex())
		});
	};
	that.warn = function(message) {
		AppNotification({
			msg: message,
			type: 'warn',
			prependTo: that.css('zIndex', sdk.getMaxZIndex())
		});
	};
	that.error = function(message) {
		AppNotification({
			msg: message,
			type: 'error',
			prependTo: that.css('zIndex', sdk.getMaxZIndex())
		});
	};
	
	return that;
};	


