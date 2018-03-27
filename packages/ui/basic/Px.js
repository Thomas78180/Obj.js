/**
 * Px - Echelle de mesure
 * @constructor
 * @param {int} px - dimension de référence sur un écran de 1024px
 * @returns float
 * @author Thomas Rudrauf
 * @license @license Apache-2.0
 * @date   27/03/2018
 */

var initialWidth = 0;

try {
	initialWidth = document.body.clientWidth;
}
catch(err) {
	initialWidth = window.innerWidth;
}

var Px = function(px) {
	return px / (1024 / initialWidth)+'px';
};