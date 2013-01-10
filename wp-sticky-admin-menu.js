/*!
 * WP Sticky Admin Menu
 * January 9th, 2013
 */

(function($) {
	
	/**
	 * Variable Declarations
	 */
	var _adminMenu = document.getElementById( 'adminmenuwrap' );
	var barHeight  = document.getElementById( 'wpadminbar' ).offsetHeight;
	
	var viewport = {
		
		$window:    $(window),
		scrollTop:  0,
		lastScroll: 0,
		height:     0
	};
	viewport.height = viewport.$window.height() - barHeight;
	
	var menu = {
		
		top:     0,
		height:  _adminMenu.offsetHeight,
		fixedTo: null,
		
		/**
		 * Fixes the menu to the top of the viewport
		 */
		fixToTop: function() {
			
			menu.fixedTo              = 'top';
			_adminMenu.style.top      = barHeight + 'px';
			_adminMenu.style.bottom   = 'auto';
			_adminMenu.style.position = 'fixed';
		},
		
		/**
		 * Fixes the menu to the bottom of the viewport
		 */
		fixToBottom: function() {
			
			menu.fixedTo              = 'bottom';
			_adminMenu.style.top      = 'auto';
			_adminMenu.style.bottom   = 0;
			_adminMenu.style.position = 'fixed';
		},
		
		/**
		 * unfixes the menu from the viewport
		 * 
		 * @param top the new top of the menu
		 */
		unfix: function( top ) {
			
			menu.fixedTo              = null;
			_adminMenu.style.top      = top + 'px';
			_adminMenu.style.bottom   = 'auto';
			_adminMenu.style.position = 'relative';
		}
	};
	
	
	/**
	 * Initial Settings
	 */
	_adminMenu.style.top    = 0;
	_adminMenu.style.zIndex = 100;
	
	// if the height of the viewport is greater than the menu, then fix the menu to the top
	if( viewport.$window.height() - barHeight > _adminMenu.offsetHeight )
		menu.fixToTop();
	
	
	/**
	 * Adjusts how the menu is fixed when the viewport is scrolled
	 */
	viewport.$window.scroll( function() {
		
		if( viewport.height > menu.height ) return;
		
		viewport.scrollTop = viewport.$window.scrollTop();
		menu.top           = parseFloat( _adminMenu.style.top );
		
		if( null === menu.fixedTo ) {
			
			if( viewport.scrollTop <= menu.top )
				menu.fixToTop();
			
			else if( viewport.scrollTop >= menu.top + menu.height - viewport.height )
				menu.fixToBottom();
		}
		
		else if( 'bottom' === menu.fixedTo && viewport.scrollTop < viewport.lastScroll )
			menu.unfix( viewport.lastScroll - ( menu.height - viewport.height ) );
		
		else if( 'top' === menu.fixedTo && viewport.scrollTop > viewport.lastScroll )
			menu.unfix( viewport.lastScroll );
		
		viewport.lastScroll = viewport.scrollTop;
	});
	
	
	/**
	 * Adjusts how the menu is fixed when the viewport is resized
	 */
	viewport.$window.resize( function() {
		
		viewport.height = viewport.$window.height() - barHeight;
		menu.height     = _adminMenu.offsetHeight;
		
		if( viewport.height > menu.height )
			menu.fixToTop();
		
		else if( viewport.scrollTop + viewport.height >= menu.top + menu.height )
			menu.fixToBottom();
	});
	
})(jQuery);