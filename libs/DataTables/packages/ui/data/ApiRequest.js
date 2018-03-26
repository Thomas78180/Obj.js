/**
Fichier: ApiRequest
Rôle: Contacter une API (POST/GET)
Version: 01b
Encodage: utf-8 
Stabilite: 3 ( Stable )
MAJ: 02/10/2016
**/

var ApiRequest = function(options) {

	var defauts = {
		url: '',
		dataType: 'json',
		addClass: 'ApiRequest',
		onError: function(err) {
			sdk.error('ApiRequest onError', err)
		}
	};
	var param = $.extend(defauts, options);
	
	param.url = '../backend/api/'+param.url;
	
	var that = null;
	
	sdk.require({
		packages: ['ui.data.Ajax'],
		onSuccess: function() {
			that = Ajax(param);
		}
	});
	
	return that;
};