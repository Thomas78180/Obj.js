// sdk.require('libs.vendors.......') // faire redirection ;)

/**
 *		-------------------------------------------
 *						UTILISATION
 *		-------------------------------------------
 *
 *		var maDataTable = CustomDataTable({
 *			cols: {
 *				date: {label: 'Date'},
 *				phone: {label: 'Téléphone'}
 *			},
 *			data: [
 *				{date: 'Date 1', phone: 'Tel 1'},
 *				{date: 'Date 2', phone: 'Tel 2'},
 *				{date: 'Date 3', phone: 'Tel 3'},
 *				{date: 'Date 4', phone: 'Tel 4'},
 *				{date: 'Date 5', phone: 'Tel 5'},
 *				{date: 'Date 6', phone: 'Tel 6'},
 *			],
 *			appendTo: 'body'
 *		});
 */

var CustomDataTable = function(options) {
	
	var defauts = {
		typeDOM: 'table',
		addClass: 'CustomDataTable row-border',
		css: {
			width: '100%',
			height: '100%'
		},
		paging: false,
		pageLength: 25,
		cols: [{}],
		data: [],
		wording: {
			loading: 'Chargement ...',
			typeContenu: 'élément',
			empty: 'Aucun résultat'
		},
		onChooseLine: function(line, data, event) {}
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	that.api = null;
	
	// cols: compativilité Obj <-> DataTable pluggin
	var _columns = [];
	for(var key in param.cols) {
		_columns.push({
			data: key,
			title: param.cols[key].label instanceof jQuery ? param.cols[key].label.get(0).outerHTML : param.cols[key].label
		})
	};
	
	// rows: compativilité Obj <-> DataTable pluggin
	for(var item in param.data) {
		
		for(var key in param.data[item]) {
			
			if(param.data[item][key] instanceof jQuery) {
				param.data[item][key] = param.data[item][key].get(0).outerHTML
			}
		}
	};
	
	that.api = that.DataTable({
		deferRender: true,
		processing: true,
		columns: _columns,
		paging: param.paging ? param.data.length <= 10 ? false : true : false,
		lengthChange: false, // requis sinon erreur pluggin
		pageLength: param.pageLength,
		oLanguage: {
			sProcessing: param.wording.loading,
			sSearch: 'Rechercher :',
			sLengthMenu: '_MENU_ '+param.wording.typeContenu+' par page',
			sInfo: sdk.ucfirst(param.wording.typeContenu)+' _START_ à _END_ (sur _TOTAL_)',
			sInfoEmpty: '',
			sInfoFiltered: '(filtré de _MAX_ '+param.wording.typeContenu+'s au total)',
			sInfoPostFix: '',
			sLoadingRecords: param.wording.loading,
			sZeroRecords: param.wording.empty,
			sEmptyTable: param.wording.empty,
			oPaginate: {
				sFirst: 'Premier',
				sPrevious: 'Précédent',
				sNext: 'Suivant',
				sLast: 'Dernier'
			}
		},
		data: param.data
	});
	
	// click sur une ligne
	that.on('click', 'tbody tr', function(event) {
		param.onChooseLine($(event.currentTarget), that.api.row(this).data(), event);
	});
	
	that.refresh = function(operations) {
		
		that.api.clear().draw();
		that.api.rows.add(operations); // Add new data
		that.api.columns.adjust().draw(); // Redraw the DataTable
	};

	return that;
};