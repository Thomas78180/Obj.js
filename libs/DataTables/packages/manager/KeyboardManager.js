var KeyboardManager = function (options) {

	var defauts = {};
	
	var param = $.extend(defauts, options);
	
	var keysNum = [];
	keysNum[37] = 'ENTER';
	keysNum[37] = 'LEFT';
	keysNum[38] = 'TOP';
	keysNum[39] = 'RIGHT';
	keysNum[40] = 'DOWN';
	keysNum[32] = 'SPACE';
	
	$('body').keydown(function(event) {
		keysNum[event.which] = true;
	})
	
	$('body').keyup(function(event) {
		keysNum[event.which] = false;
	});

	return {
		keydowns: function() {
			var keyDowns = [];
			for(var key in keysNum) {
				keyDowns.push(keysNum[key]);
			}
			return keyDowns;
		}
	}

};