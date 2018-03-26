var ListeExemples = function(options) {
	
	var defauts = {
		addClass: 'ListeExemples',
		css: {
			fontSize: Px(10),
			// width: Px(1024)
		},
		obj: null
	};
	
	var param = $.extend(defauts, options);
	
	var that = Obj(param);
	
	var _loader = Img({
		src: sdk.app.packageAssets+'../../ui/basic/img/loader.gif',
		appendTo: that
	});
	
	var _build = function(data) {
		_loader.hide();
		var j = Object.keys(data).length+1;
		
		for(var i = 1; i < j ; i++) {
			
			var exemple = data[i];
			
			var ligne = Obj({
				css: {
					padding: Px(30)
				},
				appendTo: that
			});
			
			Obj({
				addClass: 'collone1',
				typeDOM: 'h2',
				html: 'Exemple '+i,
				appendTo: ligne
			});
			
			Obj({
				addClass: 'code',
				typeDOM: 'p',
				css: {
					userSelect: 'text'
				},
				html: '<pre class="prettyprint">\n\n'+exemple.replace(/	/g, '    ')+'\n\n</pre>',
				appendTo: ligne
			});
			
			Obj({
				addClass: 'exemple'+i,
				// typeDOM: 'p',
				html: '<p style="text-align: left""><i>exemple '+i+':</i></p><script>'+exemple+'</script>',
				css: {
					paddingTop: Px(20)
				},
				appendTo: ligne
			}).attr('align', 'center');
		}
	};
	
	sdk.socket.on('exemples_success', function(data) {
		_build(data);
	});
	
	sdk.socket.on('exemples_error', function(err) {
		sdk.error('ListeExemples 67', err);
	});
	
	sdk.socket.emit('exemples', {
		obj: param.obj,
		token: sdk.token
	});
	
	return that;
};