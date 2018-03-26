// sdk.require('libs.vendors.......') // faire redirection ;)

/**
 *		-------------------------------------------
 *						UTILISATION
 *		-------------------------------------------
 *
 *		var maSocketDataTable = SocketDataTable({
 *			message: 'listeOffres',
 *			editable: true,
 *			appendTo: 'body'
 *		});
 */

var SocketDataTable = function(options) {
	
	sdk.require('ui.data.CustomDataTable');
	
	var defauts = {
		message: null,
		data: null,
		addClass: 'SocketDataTable row-border',
		editable: true,
		wording: {
			loading: 'Chargement ...',
			typeContenu: 'élément',
			empty: 'Aucun résultat'
		}
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	var _customDataTable = null;
	var _socketDialog = null;
	
	SocketMessage({
		message: param.message,
		data: param.data,
		onSuccess: function(data) {
			
			sdk.config.data[param.message] = data;
			console.log('DATA',data)
			
			var cols = [];
			data.cols.forEach(function(col) {
				cols[col] = {label: col};
			});
			
			_customDataTable = CustomDataTable({
				paging: true,
				pageLength: 25,
				cols: cols,
				data: data.data,
				wording: param.wording,
				onChooseLine: function(line, data, event) {
					
					if(!param.editable) return false;
					
					if(_socketDialog) _socketDialog.remove();
					
					var updateMessage = param.message.substring(0, param.message.length-1);
					updateMessage = 'update'+sdk.ucfirst(updateMessage.replace('liste', ''));
					
					_socketDialog = SocketDialog({
						title: 'Edition '+this.wording.typeContenu,
						message: updateMessage,
						onFormDefinition: function(self) {
							Object.keys(data).forEach(function(key) {
								self.find('.'+key).val(data[key]);
							});
						},
						onSuccess: function(data) {
							
							sdk.success('SocketDatatTable 71', 'Modifications enregistrées');
							
							for(var i = 0, j = sdk.config.data[param.message].length; i < j ; i++) {
								if(typeof sdk.config.data[param.message][i] !== 'undefined') {
									if(parseInt(sdk.config.data[param.message][i].id) == parseInt(data.id)) {
										sdk.config.data[param.message][i] = data
									}
								}
							}
							
							_customDataTable.refresh(sdk.config.data[param.message]);
						},
						onError: function(err) {
							sdk.error('SocketDataTable 77', err);
						}
					});
				},
				appendTo: that
			});
		},
		onError: function(err) {
			sdk.error('SocketDataTable 89', 'Une erreur est survenue '+err);
		}
	});
	
	return that;
};