/**
 * request socket.io message and data to scotchServer and callback on response
 * 
 * @constructor
 * @param {string} message - socket à contacter
 * @param {*} data - data à envoyer
 * @param {function} onSuccess
 * @param {function} onError
 * @returns null * 
 * @author Thomas Rudrauf
 * @license @license Apache-2.0
 * @date   20/03/2018
 */

var SocketMessage = function(options) {
	
	var defauts = {
		message: '',
		data: null,
		onSuccess: function(data) {
			sdk.warn();
		},
		onError: function(err) {}
	};

	var param = $.extend(defauts, options);
	
	sdk.socket.off(param.message);
	sdk.socket.off(param.message+'_success');
	sdk.socket.off(param.message+'_error');
	
	sdk.socket.on(param.message+'_success', function(data) {
		param.onSuccess(data);
	});
	
	sdk.socket.on(param.message+'_error', function(err) {
		param.onError(err);
	});
	
	sdk.socket.emit(param.message, {
		data: param.data,
		token: sdk.token
	});
};