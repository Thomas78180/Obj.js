var SocketMessage = function(options) {
	
	var defauts = {
		message: '',
		onSuccess: function(data) {},
		onError: function(err) {}
	};

	var param = $.extend(defauts, options);
	
	var that = null;
	
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
		token: sdk.token
	});
	
	return that;
};