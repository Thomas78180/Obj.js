var PolylineMap = function(options) {
    var defauts = {
        mapType: 'ROADMAP',
        streetViewControl: false,
        steps: [],
        departureColor: '35aa47',
        arrivalColor: 'd84a38',
        stepColor: 'bfbfbf',
        css: {width: '100%', height: '100%'}
    };
    var param = $.extend(defauts, options);
    
	if(typeof google === 'undefined') {
		
		param.html = 'La map n\'est pas disponible actuellement';
		return Obj(param);
	}
	
    var _bounds = new google.maps.LatLngBounds();
    
    var that = Obj(param);
	
	var _map = new google.maps.Map(that.get(0), {
        mapTypeId: google.maps.MapTypeId[param.mapType],
        streetViewControl: param.streetViewControl
    });
    
    var i = 0;
    
    param.steps.forEach(function(step) {
        
        var marker = new google.maps.Marker({
            position: {
                lat: step.latitude,
                lng: step.longitude
            },
            label : step.label,
            map: _map
        });
        
        // marker.setIcon('http://chart.sdks.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+param.stepColor);
        // if(i++ == 0) {
            // marker.setIcon('http://chart.sdks.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+param.departureColor);
        // }
        // if(i == param.steps.length) {
            // marker.setIcon('http://chart.sdks.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|'+param.arrivalColor);
        // }
        
        _bounds.extend(marker.position);
        
        var polyline = new google.maps.Polyline({
            strokeColor: '#3B78E7',
            strokeOpacity: 0.8,
            strokeWeight: 6,
            map: _map
        });
        
        if (!step.rawPath) { step.rawPath = ''; }
        var googlePolyline = step.rawPath.replace(/\[antislashes\]/g, '\\');
        var gCoords = google.maps.geometry.encoding.decodePath(googlePolyline);
        
        gCoords.forEach(function(gCoord) {
            polyline.getPath().push(gCoord);
        });
    });
    
    _map.fitBounds(_bounds);
	
    return that;
};
