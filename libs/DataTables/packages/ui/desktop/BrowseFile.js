var BrowseFile = function(_options) {
	
	var _defauts = {
		typeDOM: 'input',
		addClass: 'BrowseFile',
        extensions: ['jpg','jpeg','png'],
		onSuccess: function(file) {
			sdk.success('Browsefile 7', 'file is available');
		},
		onError: function(err) {
			sdk.error('Browsefile 7', 'file is not available');
		}
	};
	
	var _param = $.extend(_defauts, _options);
	
	var _that = Obj(_param);
	var _file = null;
    var _extensions = [];
    var _validExtension = false;
    var _currentExtension = null;
	
	_that.attr('type', 'file');
	_that.attr('accept', _extensions.join(', '));
	
	// limitation des extensions à afficher
	for(var i = 0; i < _param.extensions.length; i++) {
		_extensions.push('.'+_param.extensions[i]);
	}
	
	var _testExtension = function() {
        
        if(_file) {
            
            var fileTab = null;
            try {
                fileTab = _file.name.split('.');
            }
            catch(err) {
                fileTab = _file.split('.');
            }
            
            _currentExtension = fileTab[fileTab.length-1];
            
            if(!sdk.inArray(_currentExtension, _param.extensions)) {  
            
                _param.onBadExtension(_currentExtension);
                return false;
            }
        }
        
        _validExtension = true;
        return true;
    };
	
	_that.on('change', function(event) {
            
		// _preview.html('');
		
		try {
			_file = this.files[0];
		}
		catch(err) {
			_file = event.target.value;
		}
		
		if(_file) {
			
			if(_testExtension()) {
				return _param.onSuccess(_file);
			}
			
			// proposer un nouveau fichier
			_that.click();
			_param.onError('BrowseFile 74', 'Invalid extension');
		}
	});    
	
	return _that;
};