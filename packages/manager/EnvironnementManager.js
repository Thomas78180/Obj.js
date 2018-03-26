/**
Fichier: EnvironnementManager
Rôle: Tests Webview
Version: 01b
Encodage: utf-8 
Stabilite: 3 ( Stable )
MAJ: 02/10/2016
**/

var EnvironnementManager = function() {
	
	var that = null;	
	var _width = document.body.clientWidth || window.innerWidth;
	var _height = document.body.clientHeight || window.innerHeight;
	
	sdk.log('EnvironnementManager 36','Resolution: '+_width+' * '+_height);
	
	sdk.require({
		packages: [
			'ui.basic.Obj',
			'ui.basic.Mot'
		],
		onSuccess: function() {
			that = Obj({
				addClass: 'EnvironnementManager',
				css: {
					background: '-webkit-linear-gradient(to top,#123,#456);',
					backgroundImage: '-webkit-linear-gradient(to top,#123,#456);',
					display: 'none'
				},
				appendTo: 'body'
			});
			
			var _isLinearGradientAvailable = (that.css('background').indexOf('gradient') || that.css('backgroundImage').indexOf('gradient') > - 1);
	
			if(!_isLinearGradientAvailable) {
				sdk.warn('EnvironnementManager 36', 'Propriété linear-gradient indisponible.');
			}
			
			that.isLinearGradientAvailable = function() {
				return _isLinearGradientAvailable;
			};
			that.resolution = function() {
				return {
					width: _width,
					height: _height
				}
			}
			
			that.remove();
		}
	});
	
	return that;
};