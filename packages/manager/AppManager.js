/**
 * Load an app
 * @constructor
 * @param {string} message - socket à contacter
 * @param {*} data - data à envoyer
 * @param {function} onSuccess - callback pour receptionner les data
 * @param {function} onError - callback d'erreur pour réceptionner l'exception
 * @author Thomas Rudrauf (FR)
 * @version 04a
 * Stability: 3 ( Stable )
 * @date   20/03/2018
 */

var AppManager = function(options) {
	
	var defauts = {
		doc: '',
		page: '',
		sdk: null
	};
	var param = $.extend(defauts, options);
	
	var _autoLoader = function(ucfirst1, ucfirst2) {
		return sdk.ucfirst(ucfirst1) + sdk.ucfirst(ucfirst2);
	};
	
	var _appStart = function() {
		
		sdk.config.currentPage = param.page;
		
		if(sdk.inArray(sdk.appType, ['client', 'admin'])) {
            
			var appFullname = _autoLoader(sdk.appName, sdk.appType);
			console.log('appFullname '+appFullname)
			return sdk.require({
				packages: ['app.'+sdk.appName+'.'+appFullname],
				onSuccess: function() {
					
					sdk.log('AppManager 47', 'EXEC - '+appFullname+'({})');
					try {
						return window[appFullname]({});
						sdk.log('AppManager 53', 'DONE - '+appFullname+'({})');
					}
					catch(err) {
						sdk.error('AppManager 56', 'FAILED - '+appFullname+'({}) '+err+' (or contains a syntax error)');
						return param.onError(err);
					}
				}
			});
		}
		
		if(sdk.appName == 'demo') {
			
			return $.ajax({
				url: 'http://'+sdk.host+sdk.url+'Demo.js',
				// async: false
			})
			.done(function() {		
				sdk.log('AppManager 26','GET http://'+sdk.host+'/mods/demo/'+sdk.appType+'.js <span style="color:green;"><i>SUCCESS</i></span>');
				sdk.log('AppManager 27','EXEC - sdk.app = Demo(options);');
				try {
					sdk.config = {
						currentPage: 1
					}
					Demo({
						i: 0,
						objetsPage: [],
						onReady: function(self) {
							self.appendTo(sdk);
							sdk.app = self;
						}
					});
					sdk.log('AppManager 34','DONE - sdk.app = Demo(options);');
				}
				catch(err) {
					return sdk.error('AppManager 37','FAILED - sdk.app = Demo(options); '+err);
				}
				
				param.onReady();
			})
			.fail(function() {			
				sdk.error('AppManager 43', 'La Demo est inconnue ou contient une erreur de syntaxe.');
			});
		}
		
		sdk.error('AppManager 110','sdk.appType invalide ('+sdk.appType+')');
	};	
	
	/** récupération d'un fichier de configuration (?doc) **/
	var _configLoading = function() {
		
		try {
			sdk.log('AppManager 110','EXEC - ConfigManager({});');
			ConfigManager({
				sdk: sdk,
				onSuccess: function() {
					sdk.log('AppManager 114','EXEC - _appStart();');
					try {
						_appStart();
						sdk.log('AppManager 117','DONE - _appStart();');
					}
					catch(err) {
						sdk.error('AppManager 120','FAILED - _appStart(); '+err);
					}
				}
			});
			sdk.log('AppManager 124','DONE - ConfigManager({});');
		}
		catch(err) {
			sdk.error('AppManager 127','FAILED - ConfigManager({}); '+err)
		}
	};
	
	var _build = function() {
		_configLoading();
	};
	
	sdk.require({
		packages: [
			'manager.ConfigManager'
		],
		onSuccess: function() {
			// _build();
			_configLoading();
		}
	});
};