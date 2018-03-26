var GoogleMap = function(options) {
    var defauts = {
        mapType: 'ROADMAP',
        streetViewControl: false,
        // steps: [],
        // departureColor: '35aa47',
        // arrivalColor: 'd84a38',
        // stepColor: 'bfbfbf',
		// lat: -12.043333,
		// lng: -77.028333,
		// zoom:
        css: {width: '100%', height: '100%'}
    };
    var param = $.extend(defauts, options);
    
	if(typeof google === 'undefined') {
		
		param.html = 'La map n\'est pas disponible actuellement';
		return Obj(param);
	}
	
    // var _bounds = new google.maps.LatLngBounds();
    
    var that = Obj(param);
	
	// var position = 
	
	var _map = new google.maps.Map(that.get(0), {
        mapTypeId: google.maps.MapTypeId[param.mapType],
		center: {
			lat: 48.768026,
			lng: 2.041595
		},
		zoom: 14,
        streetViewControl: param.streetViewControl
    });
    
    // _map.fitBounds(_bounds);
	
    return that;
};
