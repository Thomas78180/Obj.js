var SocketDialog = function(options) {

	sdk.require('ui.data.SocketForm');
	sdk.require('ui.dialogs.Dialog');

	var defauts = {
		addClass: 'SocketDialog',
		title: null,
		html: '',
		message: null,
		css: {
			position: 'absolute',
			backgroundColor: 'white',
			border: '1px solid darkgray',
			zIndex: sdk.getMaxZIndex(),
		},
		onFormDefinition: function(self) {},
		onClose: function() {},
		onSuccess: function(data) {},
		appendTo: sdk
	};
	
	var param = $.extend(true, defauts, options);
	
	var that = null;
	var _content = null;
	
	SocketForm({
		message: param.message,
		onFormDefinition: function(self) {
			
			param.content = self;
			that = Dialog(param);
			
			that.find('._label').css('margin', Px(10)+' 0px '+Px(10)+' 0px');
			that.find('._formActions').appendTo(that.find('._footer'));
			
			// that.find('input:first').focus(); // non a cause du mobile
			
			that.find('input').keydown(function(event) {
				if(event.keyCode == 13) {
					that.find('._formActions .Button:first').mouseup();
				}
			});
			
			param.onFormDefinition(that.show());
		},
		onSuccess: function(self, data) { // Renvoyer les données envoyées dans data + data.lastID
			that.remove();
			sdk.find('._fondOpaque').remove();
			param.onClose();
			param.onSuccess(data);
		},
		onError: param.onError
	});
};