/*$(document).ready(function(){
//** notice we are including jquery and the color plugin at
//** http://code.jquery.com/color/jquery.color-2.1.0.js
var sections = [];
var sectionsYStart = [];
var activeSection = 0;

var pageInit = function(){
	sections = [];
	sectionsYStart = [];
	$('[id^="box"]').each(function(i,v){
		sections[i] = v;
		sectionsYStart[i] = $(v).offset().top;
	});
};

var ChangeColorOnScroll = function(){
	var scroll = $(window).scrollTop();
	scrollColors(scroll, $(".bg-colors"), ["#F0FBFF", "#F6E4DF", "#ECECFF"]);
}

var scrollColors = function(scroll, el, colors){
	// which of all the sections, are we in between?
	var z = 0, seclen = sections.length;
	for(var i = 0; i < seclen; i ++){
		if (scroll > sectionsYStart[i]){
			z = i;
		}
	}
	activeSection = z;

	scroll_pos = scroll;
	var animation_begin_pos = sectionsYStart[z]; //where you want the animation to begin
	var animation_end_pos = sectionsYStart[z+1]; //where you want the animation to stop
	var beginning_color = new $.Color(colors[z]);
	var ending_color = new $.Color(colors[z+1]);

	if(scroll_pos >= animation_begin_pos && scroll_pos <= animation_end_pos ){
		var percentScrolled = scroll_pos / ( animation_end_pos - animation_begin_pos );
		if(percentScrolled>1){ percentScrolled = percentScrolled - z; }
		var newRed = beginning_color.red() + ( ( ending_color.red() - beginning_color.red() ) * percentScrolled );
		var newGreen = beginning_color.green() + ( ( ending_color.green() - beginning_color.green() ) * percentScrolled );
		var newBlue = beginning_color.blue() + ( ( ending_color.blue() - beginning_color.blue() ) * percentScrolled );

		var newAlpha = beginning_color.alpha() + ( ( ending_color.alpha() - beginning_color.alpha() ) * percentScrolled );

		var newColor = new $.Color( newRed, newGreen, newBlue, newAlpha );
		el.animate({ backgroundColor: newColor }, 0);
	} else if ( scroll_pos > animation_end_pos ) {
		el.animate({ backgroundColor: ending_color }, 0);
	} else if ( scroll_pos < animation_begin_pos ) {
		el.animate({ backgroundColor: beginning_color }, 0);
	} else { }

};


$(function(){
	pageInit();
	$(document).scroll(ChangeColorOnScroll);
	$(window).resize(pageInit);
});*/
/*
$(window).scroll(function () {
	$('[id^="box"]').each(function () {
		if (($(this).offset().top - $(window).scrollTop()) < 0) {
			$(this).stop().fadeTo(100, 0);
		} else {
			$(this).stop().fadeTo('fast', 1);
		}
	});
});*/
/*});*/

$( document ).ready( function( )
{
	new ScrollFlow();
} );


var content = document.getElementsByClassName('block'),
	scrolled = null,
	items,
	others;

function deactivate(element) {
	'use strict';
	var isActive = element.classList.contains('_active');

	if (isActive) {
		element.classList.remove('_active');
	}

	return isActive;
}

function deactivateAll(elements) {
	'use strict';
	var i;

	for (i = 0; i < elements.length; i += 1) {
		deactivate(elements[i]);
	}
}

function toggle(list, index) {
	'use strict';
	var item = list[index],
		others = list.slice(0);

	if (!deactivate(item)) {
		item.classList.add('_active');
	}

	others.splice(index, 1);
	deactivateAll(others);
	return true;
}

function box(item) {
	'use strict';
	return item.getBoundingClientRect();
}

function configure(list) {
	'use strict';
	return Array
		.prototype
		.slice
		.call(list)
		.sort(function(a, b) {
			return box(a).top - box(b).top;
		})
		.filter(function(a) {
			if (box(a).top + (box(a).height / 2) >= 0) {
				return a;
			}
		});
}

window.addEventListener('scroll', function() {
	'use strict';

	if (scrolled !== null) {
		clearTimeout(scrolled);
	}

	scrolled = setTimeout(function() {
		items = configure(content);
		others = items.slice(0);
		items[0].classList.add('_active');
		others.splice(0, 1)
		deactivateAll(others);
	}, 250);
});