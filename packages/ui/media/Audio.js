var Audio = function(options) {
	
	var defauts = {
		typeDOM: 'audio',
		addClass: 'Audio',
		src: null,
		html: 'unsupported',
		autoPlay: false,
		onProgress: function(self, event) {},
		onPlaying: function(self, event) {},
		onPlay: function(self, event) {},
		onPause: function(self, event) {},
		onCanPlayThrough: function(self, event) {},
		onDurationChange: function(self, duration, event) {},
		onEnd: function(self, event) {},
		onError: function(self, event) {}
	};
	
	var param = $.extend(defauts, options);
	
	var _intervalPlay = null;
	
	var that = Obj(param);
	that.attr('src', param.src);
	
	that.on('play', function(event) {param.onPlay(that, event);})
	that.on('progress', function(event) {param.onProgress(that, event);})
	that.on('pause', function(event) {param.onPause(that, event);})
	that.on('canplaythrough', function(event) {param.onCanPlayThrough(that, event);})
	that.on('durationchange', function(event) {
		param.onDurationChange(that, that.get(0).duration, event)
	});
	that.on('ended', function(event) {param.onEnd(that, event);})
	that.on('error', function(event) {param.onError(that, event);})
	
	that.load = function(source) {
		that.attr('src', source);
	};
	
	that.play = function() {
		_intervalPlay = setInterval(function() {
			param.onPlaying(that.get(0).currentTime);
		},100);
		return that.get(0).play();
	};
	
	that.pause = function() {
		clearInterval(_intervalPlay);
		return that.get(0).pause();
	};
	
	that.stop = function() {
		clearInterval(_intervalPlay);
		param.onPlaying(0);
		return that.get(0).load();
	};
	
	that.browseFile = function() {
		return input.click();
	};
	
	that.setVolume = function(f) {
		if(f < 0) f = 0.0;
		if(f > 1) f = 1.0;
		return that.get(0).volume = f;
	};
	
	that.getDuration = function() {
		return that.get(0).duration;
	};
	
	that.getCurrentTime = function() {
		return that.get(0).currentTime;
	};
	
	that.setCurrentTime = function(ms) {
		return that.get(0).currentTime = ms;
	};
	
	if(param.autoPlay) {
		that.play();
	}
	
	return that;
};