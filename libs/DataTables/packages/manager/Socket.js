/**
 * Initialize sdk.socket and sdk.token with scotchServer
 * @constructor
 * @param {bool} ssl - ssl protocol or not
 * @param {*} sdk - library sdk.js from scotchServer
 * @returns null
 * @author Thomas Rudrauf
 * @license @license Apache-2.0
 * @date   20/03/2018
 */

var Socket = function(options) {
	
	var defauts = {
		ssl: false,
		sdk: null
	};
	
	var param = $.extend(defauts, options);
	
	sdk.socket = io( (param.ssl ? 'https://' : 'http://') + sdk.host, {transports: ['websocket']}); // {rejectUnauthorized: true, transports: ['websocket'], ignoreExtensions: true} echec
	
	sdk.socket.on('connect', function(data) {
		
		SocketMessage({
			message: 'helloFromUser',
			data: null,
			onSuccess: function() {

				// eviter le duplicata si le serveur reboot
				sdk.socket.off('connect');

				sdk.socket.on('helloFromServer', function(token) {

					// reception du token
					sdk.notice('Socket 31','helloFromServer gives token - '+ token);
					sdk.token = token;
				});
				
				// signale qu'on est toujours fonctionnel lorsque le serveur détecte une déconnexion client
				sdk.socket.on('areYouPresent', function() {
					sdk.socket.emit('iAmPresent', sdk.token);
				});
				
				// signale qu'on est toujours fonctionnel lorsque le serveur détecte une déconnexion client
				sdk.socket.on('server restarted', function() {
					sdk.socket.emit('iAmPresent', sdk.token);
				});
				
				// Indique  Maintenance
				sdk.socket.on('maintenance_start', function() {
					
				});

				// Force le rechargement de l'app client en cas de force majeure
				sdk.socket.on('forceStop', function() {
					
				});
			},
			onError: function(err) {
				sdk.error('Socket 28', err.code+' '+err.message);
			}
		});
	});
};
