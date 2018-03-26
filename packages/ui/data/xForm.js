var xForm = function(options) {
	
	var defauts = {
		url: '',
		values: {},
		addClass: 'xForm',
		onSuccess: function(data) {},
		onError: function(err) {
			sdk.error('xForm onError', err);
		},
		data: null
	};
	var param = $.extend(defauts, options);
	var that = Obj(param);
	
	var _toSend = [];
	
	sdk.require({
		packages: [
			'ui.input.Input',
			'ui.basic.Button',
			'ui.input.Textarea',
			'ui.data.SelectData',
			'ui.data.ApiRequest'
		],
		onSuccess: function() {
			
			ApiRequest({
				method: 'GET',
				url: param.url,
				data: param.data,
				onSuccess: function(data) {
				
					var _keys = Object.keys(data);
					var _dataToSend = {};
					
					_keys.forEach(function(key) {
						
						if(data[key].label != '' && key.substring(0, 6) != 'action') {
							
							var formLine = Obj({
								appendTo: that
							});
							
							var label = Obj({
								html: data[key].label,
								appendTo: formLine
							});
							
							if(data[key].type == 'varchar' && data[key].controler == '') {
								_toSend.push(Input({
									name: key,
									value: param.values[key] || '',
									addClass: 'saisie '+key,
									maxLength: data[key].length,
									appendTo: formLine
								}));
							}
							if(data[key].type == 'text') {
								_toSend.push(Textarea({
									name: key,
									value: param.values[key] || '',
									addClass: 'saisie '+key,
									maxLength: data[key].length,
									appendTo: formLine
								}));
							}
							if(data[key].type == 'datetime') {
								_toSend.push(Input({
									name: key,
									value: param.values[key] || '',
									url: data[key].controler,
									appendTo: formLine
								}));
							}
							if(sdk.inArray(data[key].type, ['int', 'varchar']) && data[key].controler != '') {
								
								_toSend.push(SelectData({
									name: key,
									value: param.values[key] || '',
									url: data[key].controler,
									appendTo: formLine
								}));
							}
							
							_dataToSend[key] = '';
						}
						
						if(data[key].label == '' && data[key].required) {
							_dataToSend[key] = param.values[key];
						}
					});
					
					var formLine = Obj({
						appendTo: that
					});
					
					_keys.forEach(function(key) {
						
						if(key.substring(0, 6) == 'action') {
							
							Button({
								html: data[key].label,
								onPress: function(self, event) {
									
									var i = 0;
									
									_toSend.forEach(function(obj) {
										_dataToSend[obj.attr('name')] = obj.val()
									});
									
									ApiRequest({
										url: data[key].controler,
										data: _dataToSend,
										onSuccess: function(data) {
											param.onSuccess(data);
										},
										onError: function(jqXHR) {
											// console.log(err)
											if(jqXHR.status == 403) {
												sdk.error('xForm 120', 'Formulaire invalide');
												return param.onError(JSON.parse(jqXHR.responseTexte))
											}
											
											param.onError(JSON.parse(jqXHR.responseTexte));
										}
									});
								},
								appendTo: formLine
							});
						}
					});
				},
				onError: function(err) {
					param.onError(err);
				},
				appendTo: that
			});
		}
	});
	
	return that;
};