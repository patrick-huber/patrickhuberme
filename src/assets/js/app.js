import $ from 'jquery';
import jQuery from 'jquery';
import whatInput from 'what-input';


window.$ = $;
window.jQuery = jQuery;
var $document = $(document);
var $window = $(window);

// import Foundation from 'foundation-sites';
// If you want to pick and choose which modules to include, comment out the above and uncomment
// the line below
import './lib/foundation-explicit-pieces';

// Custom media queries
Foundation.Interchange.SPECIAL_QUERIES['smallRetina'] = 'only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (min--moz-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2), only screen and (min-resolution: 192dpi), only screen and (min-resolution: 2dppx)';
Foundation.Interchange.SPECIAL_QUERIES['mediumRetina'] = 'only screen and (min-width: 720px), only screen and (min-width: 720px) and (-webkit-min-device-pixel-ratio: 2), only screen and (min-width: 720px) and (min--moz-device-pixel-ratio: 2), only screen and (min-width: 720px) and (-o-min-device-pixel-ratio: 2/1), only screen and (min-width: 720px) and (min-device-pixel-ratio: 2), only screen and (min-width: 720px) and (min-resolution: 192dpi), only screen and (min-width: 720px) and (min-resolution: 2dppx)';

$document.foundation();

// Moving between modals
// Need this to fix closing of the new modal since it moves focus to carousel slide out of view
/* HTML example:
  <a href="#next-modal" data-open="next-modal" data-reveal-return="return-modal-id">go to next modal</a>
*/
$('a[data-reveal-return]').on('click', function() {
  var $a = $(this);
  var returnModalID = $a.data('reveal-return');
  var $returnModal = $('#'+returnModalID);
  var $nextModal = $($a.attr('href'));
  $nextModal.one('closed.zf.reveal', function() {
    $returnModal.foundation('open');
  });
})

// Fixing bug in reveal close scroll position on mobile devices
var scrollPosition = 0;
var modalOpen = false;
var $reveal = $('.reveal');
$reveal.on('closeme.zf.reveal', function() {
  if(!modalOpen) scrollPosition = $document.scrollTop();
});
$reveal.on('open.zf.reveal', function() {
  modalOpen = true;
});
$reveal.on('closed.zf.reveal', function() {
  $document.scrollTop(scrollPosition);
  modalOpen = false;
});


$document.ready(function ($) {
  // Experience carousels
  if ($.fn.owlCarousel) {
    var $owl = $('.owl-carousel');
    $owl.owlCarousel({
      center: true,
      nav: true,
      navText: ['<button class="show-for-sr" aria-label="Previous">Previous</button>','<button class="show-for-sr" aria-label="Next">Next</button>'],
      items: 1.5,
      URLhashListener: true,
      startPosition: 'URLHash',
      autoHeight: true,
      responsive : {
        0 : {
          margin: 20
        },
        1024 : {
          margin: 40
        }
      }
    });
    // Scroll to top of item after navigation
    $owl.on('change.owl.carousel', function(event) {
      $('html, body').animate({scrollTop: $(this).offset().top });
    });
  }

  // Dynamic dates
  var currentYear = new Date().getFullYear();
  var experienceYears = currentYear - 2004;
  var experienceYearsLeader = currentYear - 2016;
  $document.find('.experienceYears').text(experienceYears);
  $document.find('.experienceYearsLeader').text(experienceYearsLeader);
  
});

// Show nav only after initial scroll
$window.one('scroll', function() {
  var $primaryNav = $('.nav-primary');
  $primaryNav.addClass('visible');
});


// Parallax background effect
var $parallaxSection = $('[data-parallax-bg]');
$window.on('scroll', function() {
  $parallaxSection.each(function() {
    var thisOffset = this.getBoundingClientRect()
    if(thisOffset.top < document.documentElement.clientHeight && thisOffset.bottom > 0) {
      // If in view
      var $background = $(this).find('.background');
      //var currentTop = $background.css('top');
      var newTop = ((thisOffset.top / document.documentElement.clientHeight) * 50 - 13).toFixed(2) + 'px';
      $background.css('top', newTop);
    }
  });
});