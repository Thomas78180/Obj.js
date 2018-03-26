var Liste = function(options) {

	var defauts = {
		addClass: (options.addClass ? options.addClass+' ' : '' ) + 'Liste',
		typeDOM: 'ul',
		label: null,
		objs: [],
		css: {
			// width: Px(1024),
			display: 'inline-block',
			// color: 'black',
			// backgroundColor: 'green',
			listStyleType: 'none'
		},
		alignementHorizontal: false
	};
	
	var param = $.extend(true, defauts, options);

	sdk.require('ui.basic.Obj');
	
	var that = Obj(param);
	
	var _label = null;
	
	var _build = function() {
		that.html('');
		if(param.label) {
			param.label.appendTo(that);
		}
		for(var obj in param.objs) {
				
			var _li = Obj({
				typeDOM: 'li',
				css: {width: param.css.width},
				appendTo: that
			});
			
			if(param.alignementHorizontal) {
				_li.css('float','left');
			}
			
			if(!param.css.color) param.css.color = 'purple';
			
			var _content = Obj({
				addClass: 'content',
				html: param.objs[obj],
				appendTo: _li
			});
		}
	};
	
	that.build = _build;	
	that.addObj = function(obj) {		
		param.objs.push(obj);
		_build();
	};
	that.showContent = function() {
		that.find('li').each(function() {
			$(this).show();
		})
	};
	that.hideContent = function() {
		that.find('li').each(function() {
			$(this).hide();
		})
	};
	
	_build();
	
	return that;
}