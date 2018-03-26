

var Parallax = function(options) {
	
	var defauts = {
		addClass: 'Parallax',
		onPreviousPage: function(i) {},
		onNextPage: function(i) {},
		pages: [],
		css: {
			width: Px(1024),
			height: Px(768),
		},
		appendTo: 'body'
	};
	var param = $.extend(true, defauts, options)
	
	var _currentPosition = 0;
	var _moving = false;
	var _iRubrique = 0;
	var _iPage = 0;
	var _lastScrollTop = -1;
	
	var that = Obj(param);
	
	var _zoneParallax = Obj({
		addClass: '_zoneParallax',
		css: {
			// height: $(param.appendTo).height()+'px',
			height: param.css.height,
			overflow: 'hidden'
		},
		appendTo: that
	});
	var _sommaire = Obj({
		addClass: '_sommaire',
		css: {
			position: 'absolute',
			top: Px(50),
			left: Px(20),
			width: Px(200)
		},
		appendTo: that
	});
	var _visuelPages = Obj({
		addClass: '_visuelPages',
		css: {
			position: 'absolute',
			top: '0px',
			left: '0px',
			width: $('body').width(),
			height: _zoneParallax.height()
		},
		appendTo: _zoneParallax
	});
	
	param.rubriques.forEach(function(rubrique) {
		
		// completer sommaire avec la rubrique
		var conteneurMenu = Obj({
			addClass: 'conteneurMenu',
			css: {
				marginBottom: Px(5)
			},
			appendTo: _sommaire
		});
		
		var labelMenu = Button({
			addClass: 'labelMenu',
			iRubrique: _iRubrique,
			mot: {html: rubrique.titre},
			css: {
				width: '100%',
				backgroundColor: 'lightgray'
			},
			onPress: function(self, event) {
				if(!_moving) {
					self.parent().siblings().find('.menu').slideUp();
					self.parent().find('.menu').slideDown();
					_sommaire.find('.lienContenu:eq('+this.iRubrique+')').mousedown();
				}
			},
			appendTo: conteneurMenu
		});
		
		var menu = Obj({
			addClass: 'menu',
			typeDOM: 'ul',
			css: {
				backgroundColor: 'white'
			},
			appendTo: conteneurMenu
		});
		
		rubrique.pages.forEach(function(page) {
			
			// generer page
			var contenuPage = Obj({
				addClass: 'contenuPage Scrollable',
				html: page.content,
				menuRubrique: menu,
				css: {
					height: _visuelPages.height(),
					backgroundImage: 'url('+page.backgroundImage+')',
					overflow: 'auto'
				},
				appendTo: _visuelPages
			});	
			
			// generer lien sommaire
			Button({
				addClass: 'lienContenu',
				typeDOM: 'li',
				iPage: _iPage,
				mot: {
					html: page.title,
					css: {
						textAlign: 'left',
						marginLeft: Px(10),
						lineHeight: Px(30)
					}
				},
				css: {
					width: '100%'
				},
				page: contenuPage,
				onPress: function(self, event) {
					if(!_moving) {
						this.page.scrollTop(0);
						var newPosition = -this.page.get(0).offsetTop;
						var i = this.iPage;
						_moving = true;
						
						param.onStartPageChange(_iPage, i, _sommaire);
						_visuelPages.animate({marginTop: newPosition+'px'}, param.delay, function() {
							_currentPosition = newPosition;
							_iPage = i;
							_moving = false;
						});
					}
				},
				appendTo: menu
			});
			
			_iPage++;
			_iRubrique++;
		});
	});
	
	_zoneParallax.on('mousewheel DOMMouseScroll', function(event) {
		
		if(!_moving) {
		
			if(event.originalEvent.wheelDelta >= 0) { // scroll up
				
				if(_currentPosition >= 0) {
					_currentPosition = 0;
					return _zoneParallax.css('marginTop', '0px');
				}
				
				var scrollTop = $('.contenuPage:eq('+_iPage+')').get(0).scrollTop;
				if(scrollTop != _lastScrollTop) {
					return _lastScrollTop = scrollTop;
				}
				
				$('.contenuPage:eq('+(_iPage-1)+')').scrollTop(0);
				_lastScrollTop = -1;
				_moving = true;
				var newPosition = _currentPosition + _zoneParallax.height();
				
				param.onStartPageChange(_iPage, _iPage-1, _sommaire);
				_visuelPages.animate({marginTop: newPosition+'px'}, param.delay, function() {
					_currentPosition = newPosition;
					_iPage--;
					_moving = false;
				});
				
			}
			else { // scroll down
				if(_currentPosition <= -_zoneParallax.height() * ($('.contenuPage').length - 1)) {
					return false;
				}
				
				var scrollTop = $('.contenuPage:eq('+_iPage+')').get(0).scrollTop;
				if(scrollTop != _lastScrollTop) {
					return _lastScrollTop = scrollTop;
				}
				
				$('.contenuPage:eq('+(_iPage+1)+')').scrollTop(0);
				_lastScrollTop = -1;
				_moving = true;
				var newPosition = _currentPosition - _zoneParallax.height();
				
				param.onStartPageChange(_iPage, _iPage+1, _sommaire);
				_visuelPages.animate({marginTop: newPosition+'px'}, param.delay, function() {
					_currentPosition = newPosition;
					_iPage++;
					_moving = false;
				});
			}
		}
	});
	
	param.onStartPageChange(_iPage = 0, _iPage, _sommaire);
	
	return that;
};

