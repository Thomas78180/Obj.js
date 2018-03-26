/**
Fichier: SocketForm.js
Rôle: Equivalent xForm / API mais basé sur les Socket (SocketForm <-> SocketAPI)

	Recoit les rgl de la socket et génère un formulaire + validation

Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 18/03/2018
*/

var SocketForm = function(options) {
	
	var defauts = {
		message: '',
		values: {},
		addClass: 'SocketForm',
		onFormDefinition: function(self) {},
		onSuccess: function(self, data) {},
		onError: function(data) {},
		data: null
	};
	
	var param = $.extend(defauts, options);
	
	var _toSend = [];
	
	sdk.require('ui.input.Input');
	sdk.require('ui.input.Textarea');
	sdk.require('ui.data.SelectData');
	sdk.require('ui.data.SocketMessage');
	
	var that = null;
	
	var _buildForm = function(data) {
		
		that = Obj(param);
		
		var _keys = Object.keys(data);
		var _dataToSend = {};
		
		_keys.forEach(function(key) {
			
			if(data[key].label != '' && key.substring(0, 6) != 'action' && data[key].type != 'hidden') {
				
				var _formLine = Obj({
					addClass: '_formLine',
					appendTo: that
				});
				
				var label = Obj({
					addClass: '_label',
					html: data[key].label,
					appendTo: _formLine
				});
				
				// input int ou varchar
				if(sdk.inArray(data[key].type, ['int', 'varchar']) && data[key].controler == '') {
					_toSend.push(Input({
						name: key,
						value: param.values[key] || '',
						addClass: 'saisie '+key,
						maxLength: data[key].length,
						appendTo: _formLine
					}));
				}
				
				// textarea
				if(data[key].type == 'text') {
					_toSend.push(Textarea({
						name: key,
						value: param.values[key] || '',
						addClass: 'saisie '+key,
						maxLength: data[key].length,
						appendTo: _formLine
					}));
				}
				
				// date
				if(data[key].type == 'date') {
					_toSend.push(Input({
						name: key,
						value: param.values[key] || '',
						addClass: 'saisie '+key,
						appendTo: _formLine
					}).datepicker({
						closeText: 'Fermer',
						prevText: 'Précédent',
						nextText: 'Suivant',
						currentText: 'Aujourd\'hui',
						monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
						monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
						dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
						dayNamesShort: ['Dim.', 'Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.'],
						dayNamesMin: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
						weekHeader: 'Sem.',
						firstDay: 1 ,
						dateFormat: 'dd/mm/yy'
					}));
				}
				
				// TODO
				if(data[key].type == 'datetime') {
					_toSend.push(Input({
						name: key,
						value: param.values[key] || '',
						url: data[key].controler,
						appendTo: _formLine
					}));
				}
				
				// selectData
				if(sdk.inArray(data[key].type, ['int', 'varchar']) && data[key].controler != '') {
					
					_toSend.push(SelectData({
						addClass: 'saisie '+key,
						name: key,
						value: param.values[key] || '',
						socketMessage: data[key].controler,
						appendTo: _formLine
					}));	
				}
				
				_dataToSend[key] = '';
			}
			
			if(data[key].label == '' || data[key].type == 'hidden') {
				
				_toSend.push(Input({
					name: key,
					value: param.values[key] || '',
					addClass: 'saisie '+key,
					maxLength: data[key].length,
					css: {display: 'none'},
					appendTo: that
				}));
			}
		});
		
		var _formActions = Obj({
			addClass: '_formActions',
			appendTo: that
		});
		
		_keys.forEach(function(key) {
			if(key.substring(0, 6) == 'action') {
				Button({
					mot: {
						html: data[key].label
					},
					onPress: function(self, event) {
						
						_toSend.forEach(function(obj) {
							_dataToSend[obj.attr('name')] = obj.val();
						});
						
						_dataToSend.token = sdk.token;
						
						sdk.socket.emit(param.message, _dataToSend);
					},
					appendTo: _formActions
				});
			}
		});
		
		param.onFormDefinition(that);
	};
	
	SocketMessage({
		message: param.message,
		onFormDefinition: function() {
			_buildForm(data);
		},
		onSuccess: function() {
			param.onSuccess(that, data);
		},
		onError: function(err) {
			sdk.error('SocketForm 181', 'Validation du formulaire refusée');
			_buildForm(data);
		}
	});
};