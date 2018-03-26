/**
Fichier: sdk.js
Rôle: Gestionnaire de packages et d'application
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 21/03/2017
**/

function isInteger(x) {
	return Math.floor(x) === x;
}
function isFloat(x) {
	return !!(x % 1);
}

var sdk = {
	version: '04a',
	showConsoleOnError: false,
	isDebug: true,
	startTime: new Date().getTime(),
	console: function() {
		return {
			journal: [],
			log: function(from, message) {
				return this.journal.push({
					type: 'log',
					from: from,
					message: message
				});
			},
			warn: function(from, message) {
				return this.journal.push({
					type: 'warn',
					from: from,
					message: message
				});
			},
			error: function(from, message) {
				return this.journal.push({
					type: 'error',
					from: from,
					message: message
				});
			},
			notice: function(from, message) {
				return this.journal.push({
					type: 'notice',
					from: from,
					message: message
				});
			},
			debug: function(from, obj) {
				return this.journal.push({
					type: 'debug',
					from: from,
					message: obj
				});
			},
			clean: function() {
				return false;
			},
			open: function() {
				return false;
			}
		}
	}(),
	config: {
		currentPage: 1,
		data: []
	}
};

sdk.console.log('sdk'+sdk.version+' 73', 'preload sdk successfull');

var sdk = function() {
	
	var _version = sdk.version;
	var _debug = sdk.isDebug;
	var _startTime = sdk.startTime;
	var _config = sdk.config;
	var _journal = sdk.console.journal;
	var _console = sdk.console;
	
	var _that = null;
	var _loadedPackages = [];
	var _packagesDirectory = '../../packages/';
	var _maxZIndex = 0;
	var _url = window.location.href;
	var _tabUrl = _url.split('/');
	var _appProtocol = _tabUrl[0]+'//';
	var _appHost = _tabUrl[2];
	var _appName = _tabUrl[3];
	var _appType = _tabUrl[4];
	var _urlVars = [];
	
	var tabKeyVal = window.location.search.replace('?','').split('&');
	for(var i = 0; i < tabKeyVal.length; i++) {
		var split = tabKeyVal[i].split('=');
		_urlVars[split[0]] = split[1];
	}
	
	var _getTime = function() {
		
		var now = new Date();
		var d = now.getDate();
		var mo = now.getMonth() + 1;
		var y = now.getYear(); 
		if (y < 2000)
			y = 1900 + y; 
		
		var h = now.getHours();
		if (h<10) {h = "0" + h}
		var m = now.getMinutes();
		if (m<10) {m = "0" + m}
		var s = now.getSeconds();
		if (s<10) {s = "0" + s}
		
		return h+":"+m+':'+s;
	};
	var _getDDMMYYYY = function(separator) {
		if(!separator) separator = '/';
		var now = new Date();
		var d = now.getDate();
		var mo = now.getMonth() + 1;
		var y = now.getYear(); 
		if (d<10) {d = "0" + d}
		if (mo<10) {mo = "0" + mo}
		if (y < 2000)
			y = 1900 + y; 
		
		return d+separator+mo+separator+y;
	};
	var _inArray = function(val, array) {
		for(var i = 0, j = array.length; i < j; i++) {
			if(array[i] == val) return true;
		}
		return false;
	};
	var _print_r = function(theObj) {
		if(!theObj) return 'null';
		var html = "";	
		var _objType = typeof(theObj);
		if(theObj instanceof Array) {		
			_objType = 'Array';
		}
			
		for(var key in theObj){  
			
			var valueType = typeof(theObj[key]);
			if(typeof(theObj[key]) === "string") {			
				valueType = 'String';
			}
			else if(theObj[key] instanceof Array) {
				valueType = 'Array';
			}
			else if(typeof theObj[key] === 'number') {
				if(isInteger(theObj[key])) {
					valueType = 'Integer';
				}
				else if(isFloat(theObj[key])) {
					valueType = 'Float';
				}
				else {
					valueType = 'Number';
				}
			}
			else if(isInteger(theObj[key])) {
				valueType = 'Integer';
			}
			else if(isFloat(theObj[key])) {
				valueType = 'Float';
			}
			else {			
				valueType = 'Object';
			}
			
			if(_inArray(valueType, ['String', 'string', 'Number', 'number', 'Integer', 'Float'])) {
				if(_inArray(valueType, ['String', 'string']) && theObj[key].substring(0, 21) == 'data:image/png;base64') {
					html += "<li>"+key+" => <b>"+valueType+"</b> 'data:image/png;base64,.....'</li>";  
				}
				else {
					html += "<li>"+key+" => <b>"+valueType+"</b> '"+theObj[key]+"'</li>";  
				}
			}
			else if(valueType === 'function') {
				html += "<li>"+key+" => <b>Function '"+theObj[key]+"'</b></li>";  
			}
			else if(valueType === 'Array') {
				html += "<li>";   
				html += ""+key+" => <b>Array (length: "+theObj[key].length+")</b>"
				html += "<ul>";  
				html += _print_r(theObj[key]);  
				html += "</ul>";
				html += "</li>";
			}
			else {
				html += "<li>";   
				html += ""+key+" => <b>Object</b>"
				html += "<ul>";  
				html += _print_r(theObj[key]);  
				html += "</ul>";
				html += "</li>";
			}
		}
		return html;  
	};
	var _loadPackageSync = function(packageName) {
		// alert(_packagesDirectory+packageName.replace(/\./g, '/')+'.js')
		if(!_inArray(packageName, _loadedPackages)) {
			$.ajax({
				// url: _packagesDirectory+packageName.replace(/\./g, '/').replace(_appName, _appName+'/frontend')+'.js',
				url: _packagesDirectory+packageName.replace(/\./g, '/')+'.js',
				async: false,
				success: function() {
					_loadedPackages.push(packageName);
					_console.log('sdk'+_version+' 227','Package "'+packageName+'" successfully loaded (sync).');
				},
				error: function(jqXHR, textStatus, errorThrown) {
					if(jqXHR.status == 200) {
						_console.error('sdk'+_version+' 219', 'Le package "'+packageName+'" contient une erreur de syntaxe.');
					}
					else if(jqXHR.status == 404) {
						_console.error('sdk'+_version+' 222', 'Le package "'+packageName+'" est inconnu.');
					}
					else {
						_console.error('sdk'+_version+' 225', 'Le package "'+packageName+'" est inconnu ou contient une erreur de syntaxe.');
					}
				}
			});
		}
	};
	var _loadPackageAsync = function(options) {
		// alert(_packagesDirectory+options.packageName.replace(/\./g, '/')+'.js')
		$.ajax({
			url: _packagesDirectory+options.packageName.replace(/\./g, '/')+'.js',
			success: function() {
				_loadedPackages.push(options.packageName);
				_console.log('sdk'+_version+' 237','Package "'+options.packageName+'" successfully loaded (async).')
				options.onSuccess();
			},
			error: function(jqXHR, textStatus, errorThrown) {
				if(jqXHR.status == 200) {
					_console.error('sdk'+_version+' 242', 'Le package "'+options.packageName+'" contient une erreur de syntaxe.');
				}
				else if(jqXHR.status == 404) {
					_console.error('sdk'+_version+' 245', 'Le package "'+options.packageName+'" est inconnu.');
				}
				else {
					_console.error('sdk'+_version+' 248', 'Le package "'+options.packageName+'" est inconnu ou contient une erreur de syntaxe.');
				}
				options.onError(options.packageName, errorThrown);
			}
		});
	};
	var _require = function(options) {
		
		/**
		* options.packages: Array(string) || string
		* options.onSuccess: function()
		* options.onError: optionnal function(package, err)
		*/
		
		if(typeof options === 'string') {
			if(!_inArray(options, _loadedPackages)) {
				
				_console.warn('sdk'+_version+' 284','Will use deprecated synchronous mode to load the package "'+options+'".');
				_loadPackageSync(options);
			}
			return ;
		}
		
		if(!options.packages) {
			throw 'Option "packages" (type Array) is required.';
		}
		var downloads = options.packages.length;
		
		if(!options.onSuccess) {
			
			var warnCount = 0;
			
			for(var i = 0, j = downloads; i < j ; i++) {
				
				if(!_inArray(options.packages[i], _loadedPackages)) {
					
					warnCount++;
					if(warnCount == 1) {
						console.warn('Callback "onSuccess" is not specified. Will use deprecated synchronous mode to load the package.');
					}
					_loadPackageSync(options.packages[i]);
				}
			}
			return false;
		}
		var nextLoad = function() {
			
			if(downloads == 0) {
				if(options.onSuccess) return options.onSuccess();
				return false;
			}
			
			if(options.packages.length > 0) {
				
				var currentPackage = options.packages.shift();
				
				if(!_inArray(currentPackage, _loadedPackages)) {
					
					_loadPackageAsync({
						packageName: currentPackage,
						onSuccess: function() {
							downloads--;
						},
						onError: function(err) {
							if(options.onError) options.onError(currentPackage, err);
						}
					});
				}
				else {
					downloads--;
				}
				
				return setTimeout(nextLoad, 0);
			}
			else {
				setTimeout(nextLoad, 0);
			}
		};
		
		nextLoad();	
	};
	
	$(document).ready(function() {
		
		_require({
			packages: [
				'ui.basic.Obj',
				'ui.basic.Mot',
				'ui.basic.Img',
				'ui.basic.Icon',
				'ui.basic.ConsoleWeb',
				'ui.data.Ajax',
				'manager.SdkApp',
				'manager.AppManager',
				'manager.NotificationManager',
				'manager.Socket',
				'ui.desktop.AppNotification',
				'ui.basic.Color',
				'ui.basic.Px'
			],
			onSuccess: function() {
				
				sdk = {
					require: _require
				};
				
				_require({
					packages: [
						'ui.basic.Obj',
						'ui.basic.Button',
						'ui.input.ContentEditable',
						'ui.basic.Mot',
						'ui.basic.Img',
						'ui.basic.ConsoleWeb',
						'ui.data.Ajax',
						'manager.AppManager',
						'manager.SdkApp',
						'manager.NotificationManager',
						'manager.Socket',
						'ui.desktop.AppNotification',
					],
					onSuccess: function() {
						
						var self = Obj({
							id: 'dom',
							addClass: 'sdk'+_version,
							css: {
								display: 'none',
								margin: '0px',
								padding: '0px',
								width: document.body.clientWidth || window.innerWidth,
								height: document.body.clientHeight || window.innerHeight,
								
								// sdk.log('EnvironnementManager 36','Resolution: '+_width+' * '+_height);
							},
							appendTo: 'body'
						});
						
						self.parent().css({
							margin: '0px',
							padding: '0px'	
						});
						
						self.version = _version;
						self.isDebug = _debug;
						self.startTime = _startTime;
						self.config = _config;
						self.protocol = _appProtocol;
						self.host = _appHost;
						self.packagesDirectory = _packagesDirectory;
						self.packagesUrl = _appProtocol+_appHost+_packagesDirectory;
						self.loadedPackages = _loadedPackages;
						self.appType = _appType;
						self.appName = _appName;
						self.inArray = _inArray;
						self.require = _require;
						self.getTime = _getTime;
						self.getDDMMYYYY = _getDDMMYYYY;
						self.urlVars = _urlVars;
						self.ucfirst = function(text) {
							return text.charAt(0).toUpperCase() + text.slice(1);//.toLowerCase();
						};
						self.getMaxZIndex = function() {
							return ++_maxZIndex;
						};
						self.log = function(a, b) {self.console.log(a, b);};
						self.success = function(a, b) {self.console.success(a, b);};
						self.warn = function(a, b) {self.console.warn(a, b);};
						self.error = function(a, b) {self.console.error(a, b);};
						self.notice = function(a, b) {self.console.notice(a, b);};
						self.debug = function(from, message) {self.console.debug('DEBUG '+from, _print_r(message));};
						self.openConsole = function() {if(sdk.showConsoleOnError) self.console.open()};
						self.setReplayMaxZIndex = function() {
							$('.Etiquette').each(function(etiquette) {
								var zIndex = $(etiquette).css('zIndex')
								if(zIndex > _maxZIndex) {
									_maxZIndex = zIndex;
								}
							});
						};
						
						self.notif = NotificationManager({appendTo: self});
						sdk = self;
						
						self.console = ConsoleWeb({
							journal: _journal,
							notif: self.notif,
							onSuccess: function(self) {
								sdk.console = _console = self;
							},
							onError: function(err) {
								sdk.error('sdk'+_version+' 449', +err);
							},
							appendTo: 'body'
						});
						
						sdk.log('sdk'+_version+' 418', 'EXEC - AppManager({})');
						try {
							AppManager({
								onSuccess: function(app) {
									
									sdk.app = app;
									sdk.show();
									sdk.notice('sdk 447', 'sdk.app is ready');
								},
								onError: function(err) {
									sdk.show();
									sdk.error('sdk'+_version+' 451', err);
								}
							});
							sdk.log('sdk'+_version+' 454', 'DONE - AppManager({})');
						}
						catch(err) {
							sdk.error('sdk'+_version+' 381', 'FAILED - AppManager({}) '+err);
							if(sdk.showConsoleOnError) sdk.console.open();
						}
						
						if(typeof socketPort !== 'undefined') {
							Socket({
								ssl: true,
								protocol: sdk.protocol,
								port: socketPort,
								sdk: self
							});
						}
					},
					onError: function(err) {
						sdk.error('sdk'+_version+' 455', +err);
					}
				});
			},
			onError: function(currentPackage, errorThrown) {
				sdk.error('sdk'+_version+' 456', currentPackage+' '+errorThrown);
			}
		});
	});
}();