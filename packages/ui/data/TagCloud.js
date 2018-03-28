/**
 * TagCloud - Nuage de tags
 * @constructor
 * @param [] tags - libellés des tags
 * @returns Obj
 * @author Thomas Rudrauf
 * @license @license Apache-2.0
 * @date   27/03/2018
 */

var TagCloud = function(options) {

    var defauts = {
        tags: [],
        radius: 100,
        speed: -0.5,
        timer: 40,
        fontMultiplier: 40,
        forceRatioTop: 1,
        forceRatioLeft: 1,
        mouseX: 417,
        mouseY: 106,
        css: {
            width: '400px',
            height: '300px',
            position: 'relative',
            border: '1px solid black'
        },
        onTagPress: function(tag, event) {}
    };

    var param = $.extend(true, defauts, options);

    var _tags = [];
    var _lastZindex = 0;
    var _interval = null;
    var _halfWidth = parseInt(param.css.width) / 2;
    var _halfHeight = parseInt(param.css.height) / 2;
    var _speedX = param.speed / _halfWidth;
    var _speedY = param.speed / _halfHeight;
    var _dtr = Math.PI / 180;
    var _diametr = param.radius * 2;
    var _whratio = parseInt(param.css.width) / parseInt(param.css.height);
    var _hwratio = parseInt(param.css.height) / parseInt(param.css.width);
    var _tLength = param.tags.length - 1;
    var _lastFx = param.speed;
    var _lastFy = param.speed;
    var _phi = 0;
    var _theta = 0;
    var _max = _tLength + 1; // a revoir
    var _i = 0;
    var _lastFy = null;
    var _lastFx = null;
    var _sy = null;
    var _cy = null;
    var _sx = null;
    var _cx = null;
    var _rx1 = null;
    var _ry1 = null;
    var _rz1 = null;
    var _mouseX = param.mouseX;
    var _mouseY = param.mouseY;

    var _calculRotation = function(fy, fx) {

        _sy = Math.sin(fy * _dtr);
        _cy = Math.cos(fy * _dtr);
        _sx = Math.sin(fx * _dtr);
        _cx = Math.cos(fx * _dtr);
    };

    var _updateTag = function(tag) {

        rx1 = tag.cx;
        ry1 = tag.cy * _cy + tag.cz * -_sy;
        rz1 = tag.cy * _sy + tag.cz * _cy;
        tag.cx = rx1 * _cx + rz1 * _sx;
        tag.cy = tag.cy * _cy + tag.cz * -_sy;
        tag.cz = rx1 * -_sx + rz1 * _cx;

        var per = _diametr / (_diametr + tag.cz);

        tag.x = tag.cx * per;
        tag.y = tag.cy * per;
        tag.alpha = per / 2;

        tag.css({
            top: (_hwratio * (tag.y - tag.h * per) + _halfHeight) * param.forceRatioTop,
            left: (_whratio * (tag.x - tag.w * per) + _halfWidth) * param.forceRatioLeft,
            opacity: tag.alpha,
            fontSize: param.fontMultiplier * tag.alpha + 'px',
            zIndex: Math.round(-tag.cz)
        }).find('.Mot').css('fontSize', param.fontMultiplier * tag.alpha + 'px');
    };

    var _animate = function() {

        _lastFy = param.speed - _speedY * _mouseY;
        _lastFx = _speedX * _mouseX - param.speed;

        if(Math.abs(_lastFy) > 0.01 || Math.abs(_lastFx) > 0.01) {

            _calculRotation(_lastFy, _lastFx);

            _tags.forEach(function(tag) {
                _updateTag(tag);
            });
        }
    };
    
    var that = Obj(param);
    
    param.tags.forEach(function(label) {
        
        _tags.push(Button({
            mot: {
                html: label,
                css: {
                    display: 'inline-block'
                }
            },
            css: {
                border: '3px solid blue',
                position: 'absolute',
                backgroundColor: 'red',
                listStyleType: 'none',
                listStylePosition: 'outside',
                listStyleImage: 'none'
            },
            onEnter: function(self, event) {
                that.stop();
            },
            onPress: function(self, event) {
                param.onTagPress(self, event);
            },
            onLeave: function(self, event) {
                that.start();
            },
            appendTo: that
        }));

        var tag = _tags[_i]
        tag.i = _i;

        // raw data
        _phi = Math.acos(-1 + (2 * _i - 1) / _max); // a revoir
        _theta = Math.sqrt(_max * Math.PI) * _phi;

        tag.cx = param.radius * Math.cos(_theta) * Math.sin(_phi);
        tag.cy = param.radius * Math.sin(_theta) * Math.sin(_phi);
        tag.cz = param.radius * Math.cos(_phi);
        tag.w = tag.width() / 4;
        tag.h = tag.height() / 4;

        // positionnement
        // _updateTag(tag);

        var per = _diametr / (_diametr + tag.cz);
        
        tag.css({
            top: _hwratio * (tag.y - tag.h * per) + _halfHeight,
            left: _whratio * (tag.x - tag.w * per) + _halfWidth,
            opacity: tag.alpha,
            fontSize: param.fontMultiplier * tag.alpha + 'px',
            zIndex: Math.round(-tag.cz)
        }).find('.Mot').css('fontSize', param.fontMultiplier * tag.alpha + 'px');

        _i++;
    });

    that.start = function() {
        clearInterval(_interval);
        _interval = setInterval(_animate, param.timer);
    };

    that.stop = function() {
        clearInterval(_interval);
    };

    that.start();

    return that;
};