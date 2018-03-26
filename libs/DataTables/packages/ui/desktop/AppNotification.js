/**
Fichier: AppNotification
Rôle: Notification utilisateur (success, notice, warn, error)
Package: ui.desktop.notification
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 22/01/2018
**/

var AppNotification = function(options) {
	
	var defauts = {
		addClass: 'AppNotification',
		type: 'notice',
		msg: '',
		onEnter: function(self) {
			self.css('opacity', '1');
		},
		onLeave: function(self) {
			self.css('opacity', '0.7');
		},
		css: {
			marginBottom: Px(10),
			width: Px(200),
			height: 'auto',
			padding: Px(20),
			paddingLeft: Px(50),
			color: 'white',
			display: 'none',
			zIndex: (sdk ? sdk.getMaxZIndex() : 1),
			backgroundColor: 'blue',
			opacity: '0.7'
		},
	};
	
	var param = $.extend(defauts, options);
	
	param.onPress = function() {
		that.fadeOut();
	};
	
	var iconName = 'check';
	var timeout = true;
	
	if(param.type == 'success') {
		param.css.backgroundColor = 'green';
	}
	else if(param.type == 'error'){
		param.css.backgroundColor = 'red';
		iconName = 'exclamation-triangle';
		timeout = false;
	}
	else if(param.type == 'warn'){
		param.css.backgroundColor = 'orange';
		iconName = 'frown';
		timeout = false;
	}
	else {
		iconName = 'comment';
	}
	
	var that = Button(param);
	
	Mot({
		html: param.msg,
		css: {
			cursor: 'pointer',
			color: 'white'
		},
		appendTo: that
	});
	
	Icon({
		name: iconName,
		css: {
			position: 'absolute',
			cursor: 'pointer',
			top: Px(20),
			left: Px(10)
		},
		width: Px(20),
		color: 'white',
		appendTo: that
	});
	
	if(timeout) {
		setTimeout(function() {
			that.fadeOut(function() {
				that.remove();
			});
		}, 5000);
	}
	
	that.mouseup(function(event) {
		that.fadeOut(function() {
			that.remove();
		});
	});
	
	that.fadeIn();
};