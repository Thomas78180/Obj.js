/**
Fichier: CRUD.js
Rôle: CRUD
Version: 04a
Encodage: utf-8
Stabilite: 1 ( BUILDING )
MAJ: 10/03/2018
*/

var CRUD = function(_options) {
	
	var _defauts = {
		// cols: {
			// date: {label: 'Date'},
			// phone: {label: 'Téléphone'}
		// },
		data: {
			db: null,
			table: null
		},
		addClass: 'CRUD'
	};
	
	var _param = $.extend(true, _defauts, _options);
	
	var _that = Obj(_param);
	
	var _btnAdd = Button({
		mot: {html: 'Ajouter'},
		onPress: function(self, event) {
			alert('Ajouter un enregistrement avec socketForm + trigger actualisation Liste')
		},
		appendTo: _that
	});
	
	// var _list = CustomDataTable({
		// cols: _param.cols,
		// data: _param.data,
		// appendTo: _that
	// });
	
	var _list = SocketDataTable({
		message: 'CRUD',
		data: {
			db: _param.data.db,
			table: _param.data.table,
			action: 'READ'
		},
		appendTo: _that
	});
	
	return _that;
};