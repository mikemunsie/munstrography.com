jQuery(".slide-image").each(function(){
	var bg = jQuery(this).data("bg");
	var pos = jQuery(this).data("kenburn-start");
	
	jQuery(this).css({
		"background-image":"url("+bg+")",
		"transform-origin": pos
	});
});

jQuery(".kenburn-slider").flexslider({
	slideshow: true,
	slideshowSpeed : 5000,
	animationSpeed : 1000,
	controlNav: false,
});