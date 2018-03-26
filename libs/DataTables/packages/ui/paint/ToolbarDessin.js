var ToolbarDessin = function(param) {

	var dom = $('<div/>', {
		id: 'controls',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			// right: '0px',
			// width: '115px',
			fontSize: '12px',
			zIndex: 1001
			// width: '70px'
		}
	});
	
	// var openCloseButton = $('<div/>',{
		// 'class': 'openCloseButton',
		// html: 'Dessiner',
		// css: {
			// backgroundColor: 'lightgray',
			// width: '100px',
			// height: '50px'
		// }
	// })
	// .click(function() {
		
		// if(openCloseButton.html() == 'Naviguer') {
			// openCloseButton.html('Dessiner');
			// panelDessin.slideUp();
			// param.dessin.getDOM().hide()//.css('zIndex', -1000);
		// }
		// else {
			// openCloseButton.html('Naviguer');
			// panelDessin.slideDown();
			// param.dessin.getDOM().css('zIndex', 1000).show();
		// }
	// })
	// .appendTo(dom);
	
	var panelDessin = $('<div/>',{
		css: {
			// display: 'none'
		}
	})
	.appendTo(dom);
	
	var colorBar = function() {
		
		return $('<div/>',{
			'class': 'colorBar',
			css: {}
		})
		.append(
			$('<button/>',{
				css: {
					width: '10px',
					height: '10px',
					backgroundColor: 'white'
				}
			})
			.click(function() {
				param.dessin.setColor('rgba(255, 255, 255, 0.5)');
			})
		)
		.append(
			$('<button/>',{
				css: {
					width: '10px',
					height: '10px',
					backgroundColor: 'black'
				}
			})
			.click(function() {
				param.dessin.setColor('rgba(0, 0, 0, 0.5)');
			})
		)
		.append(
			$('<button/>',{
				css: {
					width: '10px',
					height: '10px',
					backgroundColor: 'green'
				}
			})
			.click(function() {
				param.dessin.setColor('rgba(0, 255, 0, 0.5)');
			})
		)
		.append(
			$('<button/>',{
				css: {
					width: '10px',
					height: '10px',
					backgroundColor: 'blue'
				}
			})
			.click(function() {
				param.dessin.setColor('rgba(0, 0, 255, 0.5)');
			})
		)
		.append(
			$('<button/>',{
				css: {
					width: '10px',
					height: '10px',
					backgroundColor: 'red'
				}
			})
			.click(function() {
				param.dessin.setColor('rgba(255, 0, 0, 0.5)');
			})
		)
		.appendTo(panelDessin);
	}();
	
	
	// var sizeChooser = function() {
		// return $('<label/>',{
			// html: 'Taille'
		// })
		// .after(
			// $('<select/>')
			// .append(
				// $('<option/>',{
					// value: 1,
					// html: 1
				// })
			// )
			// .append(
				// $('<option/>',{
					// value: 5,
					// html: 5
				// })
			// )
			// .append(
				// $('<option/>',{
					// selected: true,
					// value: 8,
					// html: 8
				// })
			// )
			// .append(
				// $('<option/>',{
					// value: 10,
					// html: 10
				// })
			// )
			// .change(function() {
				// param.dessin.setSize($(this).val());
			// })
		// )
		// .appendTo(panelDessin);
	// }();
	
	var paintBar = function() {
		
		return $('<div/>',{
			css: {
				// width: '70px'
				display: 'inline-block'
			}
		})
		.append( // pinceau
			$('<button/>',{
				html: 'Pinceau'
			})
			.click(function() {
				param.dessin.setActionDessin('pinceau');
			})
		)
		.append( // trait
			$('<button/>', {
				html: 'Trait'
			})
			.click(function() {
				param.dessin.setActionDessin('trait');
			})	
		)
		.append( // rectangle
			$('<button/>', {
				html: 'Rectangle'
			})
			.click(function() {
				param.dessin.setActionDessin('rectangle');
			})
		)
		.append( // cercle
			$('<button/>', {
				html: 'Cercle'
			})
			.click(function() {
				param.dessin.setActionDessin('cercle');
			})
		)
		.append( // gomme
			 $('<button/>', {
				html: 'Gommer'
			})
			.click(function() {
				param.dessin.setActionDessin('gommer');
			})
		)
		.append( // gomme
			 $('<button/>', {
				html: 'Annuler'
			})
			.click(function() {
				param.dessin.annuler(true);
			})
		)
		// .append( // effacer
			// $('<button/>', {
				// html: 'Effacer'
			// })
			// .click(function() {
				// param.dessin.effacer();
			// })
		// )
		// .append( // recommencer
			// $('<button/>', {
				// html: 'Recommencer'
			// })
			// .click(function() {
				// dessin.recommencer();
			// })		
		// )
		// .append( // image
			// $('<button/>', {
				// html: 'Image'
			// })
			// .click(function() {
				// dessin.importerImage('../../blankus.png',100, 50);
			// })
		// )
		// .append( // sauver
			// $('<button/>', {
				// html: 'Sauver'
			// })
			// .click(function() {
				// var canvas_tmp = document.getElementById(param.dessin.getDOM().attr('id'));	// Ca merde en pernant le selecteur jQuery
				// window.location = canvas_tmp.toDataURL("image/png");
			// })
		// )
		// .append( // replay
			// $('<button/>', {
				// html: 'Replay'
			// })
			// .click(function() {
				// dessin.replay();
			// })
		// )
		.appendTo(panelDessin);
	}();
	
	return {
		getDOM: function() {
			return dom;
		}
	}
};