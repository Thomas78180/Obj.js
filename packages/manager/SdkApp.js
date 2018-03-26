/**
 * SdkApp - js application hosted by a scothServer instance
 * @constructor
 * @param {bool} ssl - ssl protocol or not
 * @param {*} sdk - library sdk.js from scotchServer
 * @returns null
 * @author Thomas Rudrauf
 * @license @license Apache-2.0
 * @date   20/03/2018
 */

var SdkApp = function(options) {
	
	var defauts = {
		preload: {
			packages: [],
			onSuccess: function(self) {
				sdk.warn('SdkApp 18', 'options.preload.onSucces is not defined');
			},
			onError: function(err) {
				sdk.warn('SdkApp 21', 'options.preload.onError is not defined ('+err+')');
			}
		},
		appendTo: sdk
	};
	
	var param = $.extend(true, defauts, options);
	
	return sdk.require({
		packages: param.preload.packages,
		onSuccess: function() {
			
			param.addClass = sdk.ucfirst(sdk.appName)+sdk.ucfirst(sdk.appType);

			sdk.app = Obj(param);
			sdk.app.packageAssets = '/packages/app/'+sdk.appName+'/';
			
			options.preload.onSuccess(sdk.app);
			
			sdk.fadeIn(2000);
			sdk.log('SdkApp', 'SdkApp '+sdk.appName+sdk.ucfirst(sdk.appType)+' is ready');
		}
	});
};