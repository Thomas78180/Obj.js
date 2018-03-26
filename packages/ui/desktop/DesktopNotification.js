var DesktopNotification = function(options) {
    
    var defauts = {
        imgSrc: 'data:image/png;base64,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',
        title: '',
        message: '',
        onShow: function() {},
        onClose: function() {},
        delay: null,
        id: new Date().getTime() // Pour afficher une notification en remplacement d'une autre si meme id
    };
    
    var param = $.extend(defauts, options);
    
    var _testPermission = function(onSuccess) {
        
        if(window.Notification.permission == 'granted') { 
            return _showNotification();
        }
        
        if(window.Notification.permission != 'denied') {
            
            window.Notification.requestPermission(function() {
                _testPermission();
            });
        }
    };
    
    var _showNotification = function() {
        
        var that = new Notification(param.title, {
            icon: param.imgSrc,
            tag: param.id,
            body: param.message
        });
        
        if(param.delay) {
            
            that.onshow = function() {
                param.onShow();
                
                if(param.delay) {
                    setTimeout(function() {that.close();}, parseInt(param.delay));
                };
            };
            that.onclose = function() {
                param.onClose();
            };
        }
    };
    
    if(window.Notification) {
        return _testPermission();
    }
    
    sdk.error('DesktopNotifications are not supported with this browser.');
};
