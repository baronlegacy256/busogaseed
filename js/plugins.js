"use strict";
jQuery(document).ready(function() {

	// 2/3/4th level main menu offscreen fix
	var MainWindowWidth = jQuery(window).width();
	jQuery(window).resize(function(){
		MainWindowWidth = jQuery(window).width();
	});
	jQuery('.mainmenu ul li').mouseover(function(){
		if(MainWindowWidth > 767) {
			// checks if third level menu exist         
			var subMenuExist = jQuery(this).find('ul').length;            
			if( subMenuExist > 0){
				var subMenuWidth = jQuery(this).find('ul').width();
				var subMenuOffset = jQuery(this).find('ul').parent().offset().left + subMenuWidth;
				// if sub menu is off screen, give new position
				if((subMenuOffset + subMenuWidth) > MainWindowWidth){                  
						var newSubMenuPosition = subMenuWidth + 0;
						jQuery(this).find('ul').first().css({
								left: -newSubMenuPosition,
								//top: '10px',
						});
				} else {
					jQuery(this).find('ul').first().css({
						left: '100%',
						//top: '10px',
					});
				}
			}
		}
	});
});

//isotope plugin init
jQuery(window).on('load', function() {
	// init Isotope
	jQuery('.isotope_container').each(function(index) {
		var $container = jQuery(this);
		$container.imagesLoaded( function() {
			var layoutMode = ($container.hasClass('masonry-layout')) ? 'masonry' : 'fitRows';
			$container.isotope({
				percentPosition: true,
				layoutMode: layoutMode,
				masonry: {}
			});
			
		}, 1000);
			

			
		var $filters = jQuery(this).attr('data-filters') ? jQuery(jQuery(this).attr('data-filters')) : $container.prev().find('.filters');
		// bind filter click
		if ($filters.length) {
			$filters.on( 'click', 'a', function( e ) {
				e.preventDefault();
				var filterValue = jQuery( this ).attr('data-filter');
				$container.isotope({ filter: filterValue });
				jQuery(this).siblings().removeClass('selected active');
				jQuery(this).addClass('selected active');
			});
		}
	});
		
});

//timetable
jQuery( function() {
	// init Isotope
	var $timetable = jQuery('#timetable');
	if ($timetable.length) {
		// bind filter click
		jQuery('#timetable_filter').on( 'click', 'a', function( e ) {
			e.preventDefault();
			e.stopPropagation();
			if ( jQuery(this).hasClass('selected') ) {
				return;
			}
			var selector = jQuery(this).attr('data-filter');
			$timetable.find('tbody td').removeClass('current').end().find(selector).closest('td').addClass('current');
			jQuery( this ).closest('ul').find('a').removeClass('selected');
			jQuery( this ).addClass('selected');
		});
	}
});

//Plugin for adding CSS classes depending from element width
//adding CSS classes for elements that needs different styles depending on they widht
(function ( $ ) {
	$.fn.addWidthClass = function( options ) {
		// Default options.
		var settings = $.extend({
			breakpoints: [200,400,600,1000,1200]
		}, options );
		
		//string which contains all of the possible CSS classes (needs for remove classes on windows resizing)
		var availableClassesString = '';
		for (var i = settings.breakpoints.length - 1; i >= 0; i--) {
			availableClassesString += " " + "width-lt-" + settings.breakpoints[i] + " " + "width-gt-" + settings.breakpoints[i];
		};
		return this.each(function(){
			var $this = jQuery(this);
			var newClassesString = '';
			for (var i = settings.breakpoints.length - 1; i >= 0; i--) {
				if( $this.width() <= settings.breakpoints[i] ) {
					newClassesString += ' width-lt-' + settings.breakpoints[i]
				} else {
					newClassesString += ' width-gt-' + settings.breakpoints[i]
				}
			};
			$this.addClass(newClassesString);
				//processing window resize event
				jQuery(window).resize(function(){
						//removing all classes
						newClassesString = '';
						$this.removeClass(availableClassesString);
						for (var i = settings.breakpoints.length - 1; i >= 0; i--) {
								if( $this.width() <= settings.breakpoints[i] ) {
										newClassesString += ' width-lt-' + settings.breakpoints[i]

								} else {
										newClassesString += ' width-gt-' + settings.breakpoints[i]
								}
						};
						$this.addClass(newClassesString);
				});
			});
		};
}( jQuery )); 