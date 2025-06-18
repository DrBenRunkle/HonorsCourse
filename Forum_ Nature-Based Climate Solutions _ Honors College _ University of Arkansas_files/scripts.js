//Home Hero Slider
$(document).ready(function(){	
$(".hero-slider").slick({
        dots: true,
        infinite: false,
        slidesToShow: 1,
        slidesToScroll: 1,
		accessibility: true,
		autoplay: false,
	    arrows: false,
        appendArrows: '.slide-controllers',
		focusOnSelect: true,
		pauseOnHover: false,
		speed:900,
		autoplaySpeed: 7000
      });
	
	if ($('.slick-slide').hasClass('slick-active')) {
    $('.carousel-caption-overlay').addClass('animated');
  } else {
    $('.carousel-caption-overlay').removeClass('animated');
  }

  $(".hero-slider").on("beforeChange", function() {
    
    $('.carousel-caption-overlay').removeClass('animated').hide();
    setTimeout(() => {    
      $('.carousel-caption-overlay').addClass('animated').show();
      
    }, 1000);
	  })
    
});

$(document).ready(function() {	
// Select all links with hashes
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .not('[data-toggle]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') 
      && 
      location.hostname === this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          }
        });
      }
    }
  });

  });


$(document).ready(function() {
$('.faculty-button[data-toggle="collapse"]').click(function() {
  $(this).toggleClass( "active" );
  if ($(this).hasClass("active")) {
    $(this).text("Show Fewer Faculty");
  } else {
    $(this).text("Show More Faculty");
  }
});
  });

$(document).ready(function() {
$('.fellows-button[data-toggle="collapse"]').click(function() {
  $(this).toggleClass( "active" );
  if ($(this).hasClass("active")) {
    $(this).text("Show Fewer Fellows");
  } else {
    $(this).text("Show More Fellows");
  }
});
  });

$(document).ready(function() {
$('.alumni-button[data-toggle="collapse"]').click(function() {
  $(this).toggleClass( "active" );
  if ($(this).hasClass("active")) {
    $(this).text("Show Fewer Alumni");
  } else {
    $(this).text("Show More Alumni");
  }
});
  });

$(document).ready(function () {
	var playing = true;
	$('.play-pause').click(function () {
	if (playing == false) {
	document.getElementById('myVideo').play();
	playing = true;
	$(this).html("<span class='fa fa-pause'></span>");
} else {
	document.getElementById('myVideo').pause();
	playing = false;
	$(this).html("<span class='fa fa-play'></span>");
	}
	});
});