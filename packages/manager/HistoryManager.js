/**
Gestion page précédente / page suivante 
restitue des data en fonction de l'url
**/
var HistoryManager = function(options) {
	
	var defauts = {
		onPrevNext: function(data) {}
	};
	var param = $.extend(defauts, options);
	
	window.onpopstate = function() {
		param.onPrevNext(history.state);
	};
	
	return {
		add: function(url, data) {
			history.pushState(data, '', url);
		},
		update: function(url, data) {
			history.replaceState(data, '', url);
		},
		onPrevNext: function(callback) { // callback renvoie data lié à url
			param.onPrevNext = callback;
		}
	};
};	


