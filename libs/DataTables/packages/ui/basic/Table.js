/**
	
*/

var Table = function(options) {

	var defauts = {
		typeDOM: 'table',
		addClass: 'Table',
		cols: [],
		rows:[],
		opacification: true,
		onChooseLine: function(line, event) {},
		onNoData: function(cell) {
			Mot({
				html: 'Aucune donnée à afficher',
				css: {
					display: 'inline-block',
					width: '100%',
					lineHeight: ResponsiveEchelle({percent: 11.4138}).px()+'px',
					height: ResponsiveEchelle({percent: 13.7931}).px()+'px',
					textAlign: 'center'
				},
				appendTo: cell
			})
		},
		css: {
			rows: {
				pair: 'white',
				impair: 'lightgray',
				hover: 'lavender'
			}
		}
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = Obj(param);
	
	var _thead = Obj({
		typeDOM: 'thead',
		appendTo: that
	});
	
	var _tbody = Obj({
		typeDOM: 'tbody',
		appendTo: that
	});
	
	param.cols.forEach(function(col) {
		console.log('col', col)
		Obj({
			typeDOM:'th',
			addClass: col.index,
			html: col.html,
			css: col.css ? col.css : {},
			appendTo: _thead
		});
	});
	
	var color = 0;
	param.rows.forEach(function(row) {
		
		var backgroundColor = ++color % 2 == 0 ? param.css.rows.pair : param.css.rows.impair;
		
		var ligne = Obj({
			typeDOM: 'tr',
			css: {
				backgroundColor: backgroundColor
			},
			appendTo: _tbody
		});
		
		ligne.hover(
			function() {
				if(param.opacification) {
					ligne.siblings().css('opacity', '0.4');
					ligne.css('opacity', '1');
				}
				ligne.css('backgroundColor', param.css.rows.hover);
			},
			function() {
				ligne.css('backgroundColor', backgroundColor);
			}
		);
		
		ligne.mouseup(function(event) {
			param.onChooseLine(ligne, row, event);
		});
		
		for(var i = 0, j = param.cols.length; i < j ; i++) {
			
			var td = Obj({
				typeDOM: 'td',
				addClass: param.cols[i].index,
				html: row[param.cols[i].index],
				appendTo: ligne
			});
		}
	});
	
	if(param.rows.length == 0) {
		
		var tr = Obj({
			typeDOM: 'tr',
			appendTo: _tbody
		});
		
		var td = Obj({
			typeDOM: 'td',
			appendTo: tr
		});
		
		td.attr('colspan', param.cols.length);
		param.onNoData(td);
	}
	
	return that;
};