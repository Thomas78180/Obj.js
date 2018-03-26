var InputFile = function(options) {
    
    var defauts = {
		addClass: 'InputFile',
        html: 'Upload',
        multiple: false,
        onDown: function(self, event) {},
		onPreviewClick: function(src) {}
    };
    var param = $.extend(defauts, options);
    
    var that = Obj({
		css: param.css,
        appendTo: param.appendTo
    });
    
    var _selectFiles = Button({
        html: param.html,
        appendTo: that
    });
    
    var _files = [];
    
    var _hidden = Obj({
        typeDOM: 'input',
        type: 'file',
        css: {
            display: 'none'
        }
    });
    
    _hidden.attr('type', 'file');
    _hidden.attr('name', 'myFile');
    _hidden.attr('multiple', 'false');
    
    var _sendButton = Button({
        html: 'Envoyer',
        css: {
            display: 'none'
        },
        onDown: function(self, event) {
            sendFiles();
        },
        appendTo: that
    });
    
    var _preview = Obj({
        appendTo: that
    });
    
    var _displayPreviews = function() {

        // var list = document.createElement("ul");
        _preview.html('');
        
        for(var i = 0; i < _files.length; i++) {

            // var li = document.createElement("li");
            // list.appendChild(li);
            var p = Obj({
               appendTo: _preview 
            });
            
            var img = document.createElement("img");
            img.src = window.URL.createObjectURL(_files[i]);
            // img.height = 60;
            
            img.onload = function(e) {
                // window.URL.revokeObjectURL(this.src);
            }
            
            p.append(img);

            var info = document.createElement("span");
            info.innerHTML = _files[i].name + ": " + (_files[i].size/1000) + " Ko";
            p.append(info);
        }
        
        _preview.append(p);
		_preview.click(function() {
			param.onPreviewClick(img.src);
		});
    };
    
    var sendFiles = function() {
        
        var xhr = new XMLHttpRequest();

        xhr.open('POST', '');

        xhr.upload.addEventListener('progress', function(e) {
            console.log('progress value: '+ e.loaded)
            console.log('progress max: '+ e.total)
        }, false);

        xhr.addEventListener('load', function() {
            console.log('Upload terminé !');
        }, false);

        var form = new FormData();
        
        form.append('file', _files[0]);
        for(var i = 1; i < _files.length ; i++) {
            form.append('file'+i, _files[i]);
        }
        
        xhr.send(form);
    };
    
    _selectFiles.mousedown(function(self, event) {
        _hidden.click();
    });
    
    _hidden.on('change', function() {
        _files = this.files;
        if(_files.length > 0) {
            // _sendButton.show();
            // return sendFiles();
            return _displayPreviews();
        }
        // _sendButton.hide();
    });
    
    return that;
};