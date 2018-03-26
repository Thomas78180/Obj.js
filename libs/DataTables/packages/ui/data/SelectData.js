var SelectData = function(options) {
	
	sdk.require('ui.input.Select');
	sdk.require('ui.input.Option');
	
	var defauts = {
		addClass: 'SelectData',
		name: '',
		url: null, // restAPI
		socketMessage: null, // socketAPI
		value: '',
		onSelect: function(id, nom) {
			console.log('SelectData defauts.onselect', id, nom);
		},
		onSuccess: function(self, data) {},
		onError: function(err) {
			sdk.error('SelectData 14', err);
		}
	};
	
	var param = $.extend(defauts, options);
	
	var that = Select(param);
	
	var _addOptions = function(data) {
		// console.log('SelectData 26', data);
		data.forEach(function(item) {
			
			Option({
				selected: param.value == item.id ? true : false,
				value: item.id,
				html: item.nom, // TODO documenter et s'y tenir ou ameliorer
				// onSelect: function() {
					// param.onSelect(item.id, item.nom);
				// },
				appendTo: that
			});
		});
		
		that.change(function() {
			param.onSelect(that.val()); // TODO fournir that.attr('name')
		});
	};
	
	if(param.url) {

		Ajax({
			url: param.url,
			onSuccess: _addOptions,
			onError: param.onError,
			appendTo: that
		});
	}
	
	if(param.socketMessage) {
		
		sdk.socket.on(param.socketMessage+'_success', function(data) {
			_addOptions(data);
		});
		
		sdk.socket.on(param.socketMessage+'_error', function(data) {
			param.onError('Erreur lors de la récupération des options');
		});
		
		sdk.socket.emit(param.socketMessage, {
			token: sdk.token
		});
	}
	
	return that;
}