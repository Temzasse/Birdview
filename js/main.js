$( document ).ready(function() {

	fluidvids.init({
	  selector: ['iframe'], // runs querySelectorAll()
	  players: ['www.youtube.com'] // players to support
	});


	// smoothit page jumpit
	// a[href*=#]:not([href=#])
	$('nav a').click(function() {
		
	    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') || location.hostname == this.hostname) {

	        var target = $(this.hash);
	        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
	           if (target.length) {
	             $('html,body').animate({
	                 scrollTop: target.offset().top - $('nav').outerHeight()
	            }, { duration: 1000, queue: false} );
	            return false;
	        }
	    }
	});


	// Piilota nav bar kun skrollataan alas päin
    // ja tuo se esiin ku skrollataan ylös päin
    var hide = false;
	var didScroll;
	var lastScrollTop = 0;
	var delta = 5;
	var navbarHeight = $('nav').outerHeight();
	var nav_position = $("nav").offset();

	$(window).scroll(function(event){
	    didScroll = true;

	    if ( nav_position.top === $(window).scrollTop() || nav_position.top < $(window).scrollTop()){
			$("nav").css("position","fixed");
			$("nav").css("top","0");
			hide = true;
		}
		else if ( nav_position.top > $(window).scrollTop() ){
			$("nav").css("position","relative");
			hide = false;
		}

		console.log(hide);

	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	function hasScrolled() {
	    var st = $(this).scrollTop();
	    
	    // Make sure they scroll more than delta
	    if(Math.abs(lastScrollTop - st) <= delta)
	        return;
	    
	    // If they scrolled down and are past the navbar, add class .nav-up.
	    // This is necessary so you never see what is "behind" the navbar.
	    if (hide && st > lastScrollTop && st > navbarHeight){
	        // Scroll Down
	        $('nav').removeClass('nav-down').addClass('nav-up');
	    } else {
	        // Scroll Up
	        if(st + $(window).height() < $(document).height()) {
	            $('nav').removeClass('nav-up').addClass('nav-down');
	        }
	    }
	    
	    lastScrollTop = st;
	}

	

});