/**
Fichier: Video.js
Rôle: Affiche et Manipuler l'API video HTML5
Version: 04a
Encodage: utf-8
Stabilite: 3 ( Stable )
MAJ: 18/03/2018

convertir media en Input media 
faire Media sans input
**/

var Video = function(options) {
	
	var defauts = {
		typeDOM: 'video',
		addClass: 'Video',
		src: null,
		css: {
			width: Px(400)
		},
		html: 'unsupported', // au cas ou le navigateur ne prend pas en charge
		autoplay: false,
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
        that.get(0).currentTime = ms;
	};
	
	that.fullscreen = function() {
		
		if(!_isFullscreen){
			if (that.requestFullscreen) {
				that.requestFullscreen();
			} 
			// else if (that.mozRequestFullScreen) {
				// that.mozRequestFullScreen(); // Firefox
			// } 
			// else if (that.webkitRequestFullscreen) {
				// that.webkitRequestFullscreen(); // Chrome and Safari
			// }
			_isFullscreen = true;
		}
		else{

			if(document.cancelFullScreen) {
				document.cancelFullScreen();
			} 
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} 
			else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
			}
			
			_isFullscreen = false;
		}
	};
	
	return that;
};


/*
ca me plait bien 
/*!
 * H5VF
 * HTML5 Video Framework
 * http://sarasoueidan.com/h5vf
 * @author Sara Soueidan
 * @version 1.0.0
 * Copyright 2013. MIT licensed.
 *
(function ($, window, document, undefined) {
    'use strict';

    $(function () {
        var video = document.getElementById('myvideo'),
            container = document.getElementById('custom-video'),
            playbutton = document.getElementById('playpause'),
            mutebutton = document.getElementById('mute'),
            fullscreenbutton = document.getElementById('fullscreen'),
            seek = document.getElementById('seekbar'),
            volume = document.getElementById('volumebar'),
            vval = volume.value,
            progressbar = document.getElementById('progressbar'),
            bufferbar = document.getElementById('bufferbar');        


    
        if(video.autoplay){
            playbutton.classList.add('icon-pause');
            playbutton.classList.remove('icon-play');
        }
        video.addEventListener('playing', function(){
            seek.classList.add('light');
        }, false);
    
        if(video.muted){
            mutebutton.classList.add('icon-volume');
            mutebutton.classList.remove('icon-volume-2');
            volume.value = 0;
        }
        else{
            mutebutton.classList.add('icon-volume-2');
            mutebutton.classList.remove('icon-volume');
        }
    
        
    
        function playpause(){
            if(video.paused){
                video.play();
                playbutton.classList.add('icon-pause');
                playbutton.classList.remove('icon-play');
                seek.classList.add('light');
            }
            else{
                video.pause();
                playbutton.classList.add('icon-play');
                playbutton.classList.remove('icon-pause');
                seek.classList.remove('light');
            }
        }
        
        playbutton.addEventListener('click', playpause, false);
        video.addEventListener('click', playpause, false);

        mutebutton.addEventListener('click', function(){
            if(video.muted){
                video.muted = false;
                mutebutton.classList.add('icon-volume-2');
                mutebutton.classList.remove('icon-volume');
                volume.value = vval;
            }
            else{
                video.muted = true;
                volume.value = 0;
                mutebutton.classList.add('icon-volume');
                mutebutton.classList.remove('icon-volume-2');
            }   
        }, false);
        
        var _isFullscreen= false;
        fullscreenbutton.addEventListener('click', function() {
            if(!_isFullscreen){
                if (video.requestFullscreen) {
                    video.requestFullscreen();
                } 
                else if (video.mozRequestFullScreen) {
                    container.mozRequestFullScreen(); // Firefox
                } 
                else if (video.webkitRequestFullscreen) {
                    video.webkitRequestFullscreen(); // Chrome and Safari
                }
                _isFullscreen=true;
                fullscreenbutton.classList.remove('icon-fullscreen-alt');
                fullscreenbutton.classList.add('icon-fullscreen-exit-alt');
            }
            else{

                if(document.cancelFullScreen) {
                    document.cancelFullScreen();
                } 
                else if(document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } 
                else if(document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen();
                }
                _isFullscreen=false;
                fullscreenbutton.classList.add('icon-fullscreen-alt');
                fullscreenbutton.classList.remove('icon-fullscreen-exit-alt');
            }
            
        }, false);

    
        //change video time when seek changes
        seek.addEventListener('change', function(){
            var time = video.duration * (seek.value/100);
            video.currentTime = time;
        }, false);

        seek.addEventListener('mousedown', function(){
            video.pause();
        }, false);
        seek.addEventListener('mouseup', function(){
            video.play();
            //if the user plays the video without clicking play, by starting directly with specifying a point of time on the seekbar, make sure the play button becomes a pause button
            playbutton.classList.remove('icon-play');
            playbutton.classList.add('icon-pause');
        }, false);

        //update progress bar as video plays
        video.addEventListener('timeupdate', function() { 
            var percent = Math.floor((100 / video.duration) * video.currentTime); 
            progressbar.value = percent; 
            progressbar.getElementsByTagName('span')[0].innerHTML = percent; 
        }, false);
        
        //change seek position as video plays
        video.addEventListener('timeupdate', function(){
            var value = (100/video.duration) * video.currentTime;
            seek.value = value;
        }, false);
        
        volume.addEventListener('change', function(){
            video.volume = this.value;
            vval = this.value;
            if(this.value === 0){
                video.muted = true;
                mutebutton.classList.add('icon-volume');
                mutebutton.classList.remove('icon-volume-2');
            }
            else if(this.value !== 0){
                video.muted = false;
                mutebutton.classList.add('icon-volume-2');
                mutebutton.classList.remove('icon-volume');
            }
        }, false);
        
        video.addEventListener('ended', function(){
            video.pause();
            video.currentTime = 0;
            playbutton.classList.add('icon-play');
            playbutton.classList.remove('icon-pause');
            seek.classList.remove('light');
        });

        
    });

})(jQuery, window, document);

*/