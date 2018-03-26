/**
Fichier: ConsoleWeb
Rôle: Fourni une console dans la webview
Package: ui.basic
Version: 03b
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 15/03/2017
**/

var ConsoleWeb = function(options) {
	
	sdk.require('ui.basic.Button');
	sdk.require('ui.input.ContentEditable');
	
	var defauts = {
		journal: [],
		logsFilters: ['ALL'], // ['FAILED','EVENT','DOM','SIGNAL','EXEC'],
		classFilters: ['ALL'],
		initialConsoleInputCommand: "sdk.printConfig(); <br> sdk.debug('sdk.config',sdk.config);"
	};
	
	var param = $.extend(defauts,options);
	
	var that = null;
	var _isAppend = false;
	var _handler = null;
	var _closeButton = null;
	var _output = null;
	var _input = null;
	
	var _start = function() {
		if(sdk && sdk.isDebug && !_isAppend) {
			sdk.before(that);
			_isAppend = true;
		}
	};
	var _evalJs = function() {
		var h = sdk.getTime();		
		try {
			eval(_input.text());
		}
		catch(err) {
			sdk.error('ConsoleWeb 80','eval error: '+err);
		}
	};
	var _gestionClavier = function() {
		
		$('body').on('keydown', function(event) {
			
			if(event.keyCode == '112' && event.ctrlKey) {
				if(!_isAppend) {
					_start();
				}
				if(that.is(':visible')) {
					that.close();
				}
				else {
					that.open();
				}				
			}
		});
	};
	var _filtrerClasses = function(name, toLog, color) {
		if(sdk.inArray('ALL', param.classFilters) ) {
			return _filtrerLogs(name, toLog, color);
		}
		if(typeof toLog === 'object' && typeof toLog.splice === 'function') {
			for(var i = 0; i < param.classFilters.length; i++ ) {
				if(name.substr(0,param.classFilters[i].length) === param.classFilters[i]) {
					for(var a = 0; a < param.logsFilters.length; a++ ) {
						if(toLog.substr(0,param.logsFilters[a].length) === param.logsFilters[a]) {
							// // console.log(name+' - '+ (new Date().getTime() - startTime) + 'ms - '+toLog)
							return _output.prepend('<code style="color:'+color+'display:block;margin-left:5px;font-size:10px;line-height:12px;">'+name+' - '+ (new Date().getTime() - sdk.startTime) + 'ms - '+toLog+'</code>');				
						}
					}
				}
			}
		}
		else {
			return sdk.debug('DEBUG ',toLog);
		}
	};
	var _filtrerLogs = function(name, toLog, color) {
		for(var i = 0, j = param.logsFilters.length ; i < j ; i++ ) {
			_visuelVars(name, toLog, param.logsFilters[i], color);
		}
	};
	var _visuelVars = function(name, toLog, logFiltre, color) {
		
		if(toLog && typeof toLog === 'object' && typeof toLog.length === 'number' && typeof toLog.splice === 'function' && !(toLog.propertyIsEnumerable('length'))){
			if(toLog.length > 5) {
				_output.prepend('<code style="color:'+color+';display:block;margin-left:5px;font-size:10px;line-height:12px;;">['+toLog.join(',<br />')+']</code>');
			}
			else {
				_output.prepend('<code style="color:'+color+';display:block;margin-left:5px;font-size:10px;line-height:12px;;">['+toLog.join(', ')+']</code>');
			}
		}
		else {
			_output.prepend('<code style="color:'+color+';display:block;margin-left:5px;font-size:10px;line-height:12px;">'+name+' - '+ (new Date().getTime() - sdk.startTime) + 'ms - '+toLog+'</code>');
		}
	};
	
	that = Obj({
		addClass: 'ConsoleWeb',
		css: {
			position:'absolute',
			top: '10px',
			right: '10px',
			width: '80%',
			height: 'auto',
			border: '1px solid gray',
			zIndex: 1000,
			background: 'lightgray',
			borderRadius: '0.8em',
			padding: '5px',
			display: 'none'
		},
		appendTo: param.appendTo
	});
	
	_handler = Obj({
		css: {
			height: '10px',
			backgroundColor: 'lightgray',
			cursor: 'move'
		},
		appendTo: that
	});
	
	that.draggable({
		handle: _handler
	});
	
	_closeButton = Button({
		html: 'X',
		css: {
			'float': 'right',
			width: '10px',
			height: '10px',
		},
		onPress: function() {
			that.close();
		},
		appendTo: _handler
	});
	
	_output = ContentEditable({
		css: {
			position: 'relative',
			overflow: 'auto',
			width: 'auto',
			height: '350px',
			backgroundColor: '#fff9bd',
			border: '1px solid black',
			marginTop: '5px',
			zIndex: 1
		},
		onDown: function(that, event) {
			_output.active();
		},
		appendTo: that
	});
	
	_input = ContentEditable({
		css: {
			position: 'relative',
			width: 'auto',
			height: '120px',
			background: 'white',
			border: '1px solid black',
			marginTop: '5px',
			marginBottom: '-5px'
		},
		html: param.initialConsoleInputCommand,
		onDown: function(self, event) {
			_input.active();
		},
		onKeyUp: function(self, event) {
			if(event.keyCode == 13 && event.ctrlKey) {			
				_evalJs();
			}
		},
		appendTo: that
	});
	
	that.open = function() {
		if(!_isAppend) {
			_start();
		}
		that.show();
	};
	that.close  = function() {
		_isOpen = false;
		that.hide();
	};
	that.success = function(name, toLog) {
		param.notif.success(toLog);
		if(sdk.isDebug) {
			return _filtrerClasses(name, toLog, 'green');
		}
	};
	that.log = function(name, toLog) {
		if(sdk.isDebug) {
			return _filtrerClasses(name, toLog, 'black');
		}
	};
	that.debug = function(name, toLog) {
		if(sdk.isDebug) {
			return _filtrerClasses(name, toLog, 'orange');
		}
	};
	that.warn = function(name, toWarn) {
		param.notif.warn(toWarn);
		if(sdk.isDebug) {
			return _filtrerClasses(name, toWarn, 'orange');
		}
		if(console) console.warn(name+' '+toWarn);
	};
	that.notice = function(from, x) {
		param.notif.notice(x);
		if(sdk.isDebug) {
			// window.console.log(from+' - NOTICE - '+x);	
			// affiche les valeurs entre [] si Array
			if(x && typeof x === 'object' && typeof x.length === 'number' && typeof x.splice === 'function' && !(x.propertyIsEnumerable('length')))
				return _output.prepend('<code style="display:block;margin-left:5px;font-size:10px;line-height:12px;color:blue;">'+from+' '+sdk.getTime()+' ('+(new Date().getTime() - sdk.startTime) + 'ms) : ['+x+']</code>');		
			else
				return _output.prepend('<code style="display:block;margin-left:5px;font-size:10px;line-height:12px;color:blue;">'+from+' '+sdk.getTime()+' ('+(new Date().getTime() - sdk.startTime) + 'ms) : '+x+'</code>');
		}
		if(console) console.log(from, x)
	};
	that.error = function(from, message){
		param.notif.error(message);
		if(sdk.isDebug) {
			console.error(from+' - '+ (new Date().getTime() - sdk.startTime) + 'ms - '+message);
			_output.prepend('<code style="display:block;margin-left:5px;font-size:10px;line-height:12px;;color:red;">'+from+' - '+ (new Date().getTime() - sdk.startTime) + 'ms - '+message+'</code>');
			if(sdk.showConsoleOnError) that.open();
			return message;
		}
		if(console) window.console.error(from+' '+message);
		return message;
	};
	that.clean = function() {
		_output.html('');
	};
	
	for(var i = 0; i < param.journal.length; i++) {

		var event = param.journal[i];
		
		if(event.type === 'log') {
			try {
				that.log(event.from, event.message);
			}
			catch(err) {
				alert('ConsoleWeb 253 log err '+err)
			}
			
		}
		else if(event.type === 'warn') {
			try {
				that.warn(event.from, event.message);
			}
			catch(err) {
				alert('ConsoleWeb 262 warn err '+err)
			}
			
		}
		else if(event.type === 'error') {
			try {
				that.error(event.from, event.message);
				}
			catch(err) {
				alert('ConsoleWeb 271 error err '+err)
			}
		}
		else if(event.type === 'notice') {
			try {
				that.notice(event.from, event.message);
			}
			catch(err) {
				alert('ConsoleWeb 279 notice err '+err)
			}
		}
		else {
			throw sdk.error('ConsoleWeb 218', 'Entrée de journal invalide: '+event.type);
		}
	}
	_gestionClavier();
	
	return that
};