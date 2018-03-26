var FileExplorer = function(options) {
	var defauts = {
		data: []
	};
	var param = $.extend(true, defauts, options);
	
	sdk.require('ui.data.Folder');
	sdk.require('ui.data.File');
	
	var that = Obj(param);
	
	Ajax({
		method: 'GET'
		url: 'backend/filesystem/?dir='+param.dir,
		onSuccess: function(data) {
			var data = [
				'dossier1/dossierA/',
				'dossier1/dossierA/fichier1A1.txt',
				'dossier1/dossierA/fichier1A2.txt',
				'dossier1/dossierB/fichier1B1.txt',
				'dossier1/fichier11.txt',
				'dossier1/fichier12.txt',
				'dossier2/fichier21.txt',
				'dossier3/',
				'fichier0.txt'
			];
			
			var filesystem = {};
			var _currentDir = '';
			
			var showDir = function(dir) {
				
				_currentDir = dir;
				
				data.forEach(function(item) {
					if(item.substring(0, _currentDir.length) == _currentDir) {
						var pathFromCurrentDir = item.substring(_currentDir.length, item.length);
						var split = pathFromCurrentDir.split('/');
						
						if(split.length == 1) {// || (split.length == 2 && pathFromCurrentDir.substring(pathFromCurrentDir.length-1, pathFromCurrentDir.length) == '/')) {
							//fichiers du dossier
							console.log('--> '+split.join('**')+' ('+split.length+')')
						}
						else {
							// sous dossiers
							if(split.length == 2 && pathFromCurrentDir.substring(pathFromCurrentDir.length-1, pathFromCurrentDir.length)) {
								console.log(split[0])
							}
						}
					}
				});
			}
			showDir('')
		},
		onError: function(err) {
			console.error(err);
		},
		appendTo: that
	});
	
	param.data.forEach(function(item) {
		if(item.type == 'folder') {
			Folder({
				appendTo: that
			});
		}
		else {
			File({
				appendTo: that
			});
		}
	});
	
	
	
	return that;
};