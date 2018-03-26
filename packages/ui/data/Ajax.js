/**
Fichier: Ajax
Rôle: Requete Http ajax avec visuel loader
Version: 03b
Encodage: utf-8 
Stabilite: 3 ( Stable )
MAJ: 17/03/2017
**/

var Ajax = function(options) {

	sdk.require('ui.basic.Img');
	
	var defauts = {
		method: 'POST',
		url: '',
		data: null,
		async: true,
		onSuccess: function(data) {},
		onError: function(err) {},
		addClass: 'Ajax',
		dataType: 'json',
		typeDOM: 'div',
		images: {
			loader: sdk.packagesDirectory+'ui/data/ajax/loader.gif'
		},
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%',
			// backgroundColor: 'lightgray',
			// opacity: '0.8'
		}
	};
	var param = $.extend(defauts, options);
	
	var that = Obj({
		addClass: 'Ajax',
		typeDOM: 'div',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: '100%',
			height: '100%',
			// backgroundColor: 'lightgray',
			// opacity: '0.8'
		}
	}); // un peu special à cause du callback onSuccess de Obj
	
	var _loader = Img({
		src: param.images.loader,
		css: {
			position: 'absolute',
			top: (that.height() / 2 - 9)+'px',
			left: (that.width() / 2 - 9)+'px',
			width: '18px',
			height: '18px',
		},
		appendTo: that
	});
		
	$.ajax({
		method: param.method,
		url: param.url,
		data: param.data,
		// datatype: param.datatype,
		async: param.async,
		success: function(data) {
			if(!data) {
				throw console.warn('no json response');
			}
			// if(param.dataType = 'json') {
				// data = JSON.parse(data);
			// }
			that.remove();
			if(data.err) {
				sdk.error('Ajax 71', 'ERROR '+param.method+' '+param.url+' '+data.err.message);
				return param.onError(param.method+' '+param.url+' '+data.err.message)
			}
			sdk.log('Ajax 74', 'SUCCESS '+param.method+' '+param.url);
			sdk.debug('AJAX RECEIVED DATA:', data);
			param.onSuccess(data);
		},
		error: function(jqXHR, errorThrown) {
			sdk.log('Ajax 78', 'ERROR '+param.method+' '+param.url+' '+jqXHR.responseText);
			that.remove();
			param.onError(param.method+' '+param.url+' '+jqXHR.responseText);
		}
	});
	
	sdk.log('Ajax 87', param.method+' '+param.url);
	if(param.data) sdk.debug('data', param.data);
	
	// sdk.require({
		// packages: ['ui.basic.Img'],
		// onSuccess: function() {
			// _build();
		// }
	// });
	return that;
};