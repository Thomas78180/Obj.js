/**
Fichier: PageConnexion.js
Rôle: Modele de page de Connexion
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 18/03/2018
REVIEW: 18/03/2018
**/

var PageConnexion = function(_options) {
	
	var _defauts = {
		onSuccess: function() {},
		css: {
			position: 'absolute',
			top: Px(0),
			left: Px(0),
			width: '100%',
			height: '100%'
		},
		addClass: 'PageConnexion',
		appendTo: sdk
	};
	
	var _param = $.extend(true, _defauts, _options);
	
	sdk.require('ui.basic.Fond');
	sdk.require('ui.data.SocketForm');
	
	var _fond = Fond({
		css: {
			opacity: 1
		}
	});
	
	var _that = Obj(_param);
	
	var _loginFormName = Mot({
		html: 'Connexion : ',
		appendTo: _that
	});
	
	var _loginForm = SocketForm({ // login, password, remember (il faudra implementer les cookies)
		message: 'login',
		addClass: '_loginForm',
		onFormDefinition: function(self) {
			alert('onFormDefinition')
			console.log(self)
		},
		onSuccess: function(data) {
			_fond.remove();
			_that.remove();
			param.onSuccess(data);
		},
		onError: function(err) {
			console.log(err)
		},
		appendTo: _that
	});
	
	// mot de passe oublié
	var _oubli = Button({
		mot: {
			html: 'Renouveler le mot de passe'
		},
		onPress: function(self, event) {
			
		},
		appendTo: _that
	});
	
	// SSO
	// var _sso = SSO({});
	
	// permettre de créer un compte
	var _creerCompte = Button({
		mot: {
			html: 'Créer un compte'
		},
		onPress: function(self, event) {
			
		},
		appendTo: _that
	});
	
	return _that;
};