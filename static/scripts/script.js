/*
 * connectivity.
 */
jQuery(window).load(function() {

  // Preloader
  var $loader = $('.loader');
  var $preloader = $('.preloader');
  var $body = $('body');

      $loader.addClass("is-loading").delay(500).fadeOut(1000, function() {
        $preloader.fadeOut(500).addClass("done-loading");
        $body.delay(350).css({
          'overflow': 'visible'
        });
      });


  // Needed variables.
  var $errorBanner = $('#error-banner');
  var $errorHide = $('#error-hide');
  var $errorRefresh = $('#error-refresh');
  var condition;

  function updateOnlineStatus(event) {
    condition = navigator.onLine ? "online" : "offline";

    if (condition == "online" && event.type == "online")
      $errorBanner.hide();
    else
      $errorBanner.fadeIn(200);
  }

  $errorHide.click(function(e) {
    e.preventDefault();
    $errorBanner.animate({ top: '-=50px' }, 500).fadeOut(200);
  });

  $errorRefresh.click(function(e) {
    e.preventDefault();
    document.location.reload(true);
  });

  jQuery(window).bind('online', updateOnlineStatus);
  jQuery(window).bind('offline', updateOnlineStatus);
});


jQuery(document).ready(function() {

 /*
  * Clipboard functions.
  */
  var $fingerprintdownload = $('#copy-key');
  var $btns = document.querySelectorAll('button[data-clipboard-demo]');

  for (var i = 0; i < $btns.length; i++) {
    $btns[i].addEventListener('mouseleave', function(e) {
      e.currentTarget.setAttribute('class', 'btn');
      e.currentTarget.removeAttribute('aria-label');
    });
  }

  function showTooltip(elem, msg) {
    elem.setAttribute('class', 'btn tooltipped tooltipped-e');
    elem.setAttribute('aria-label', msg);
  }

  function fallbackMessage(action) {
    var actionMsg = '';
    var actionKey = (action === 'cut' ? 'X' : 'C');

    if (/iPhone|iPad/i.test(navigator.userAgent)) {
      actionMsg = 'No support :(';
    } else if (/Mac/i.test(navigator.userAgent)) {
      actionMsg = 'Press ⌘-' + actionKey + ' to ' + action;
    } else {
      actionMsg = 'Press Ctrl-' + actionKey + ' to ' + action;
    }

    return actionMsg;
  }

  var clipboard = new Clipboard('[data-clipboard-demo]');

  clipboard.on('success', function(e) {
    e.clearSelection();
    showTooltip(e.trigger, 'Copied!');
  })

  clipboard.on('error', function(e) {
    showTooltip(e.trigger, fallbackMessage(e.action));
  });


/*
 * Custom functions.
 */

  // Logo.
  var $logo = $('#logo');

  if (location.href.indexOf('#') != -1) $logo.show();

  // Show and Hide logo.
  $('.menu .tabs a').click(function() {
    $logo.fadeIn('slow');
  });

  $('.tab-profile').click(function() {
    $logo.fadeOut('slow');
  });

  // Funny Alerts
  var messages = [
    "Dude, you wanna piece of that?",
    "Mommy is that you??",
    "You think that you can inject HTML?",
    "Mommm comfy.",
    "Let’s do the bamboo dance!",
    "Don’t mess with this source code.",
    "Close the console, I’m cold.",
    "Licky licky, yummy yummy, kiss kiss <3",
    "What are you doing here!!??",
    "Let’s open this console and make things better.\n[After 2 seconds] Oh shit.",
    "Humming is fun.",
    "You will receive an error message in the future. Get error message:",
    "An error occurred while displaying the previous error.",
    "Your browser is lonely.",
    "Run as fast as you can and don't look back.",
    "Unknown Hard Error.",
    "User error - Replace user.",
    "Error Code 42: User Error. It's not our fault!",
    "Console has performed an illegal operation. Console must be closed.",
    "No error occurred.",
    "Deleted code is debugged code.",
    "So, you like looking under the hood? Why not work with me?",
    "But why!, What have I done to you?",
    "This page is thirsty, close this console.",
    "I’m a web addict",
    "I love everything about the web, except Internet Explorer.",
    "Coding and bringing a design to life are my driving passions.",
    "Addicted to Chocolates",
    "File Not Found",
    "Choose something else to play with",
    "Disconnected from server; Connection failed, OOPS: Child died",
    "A team of highly trained monkeys has been dispatched to deal with this situation.",
    "Keyboard not found",
    "Failed to print to the console",
    "Hang in there, baby",
    "Keep calm and carry on. . .",
    "The obstacle is the path. . ."
  ];

  function showMessage() {
    return messages[Math.floor(Math.random() * messages.length)];
  };


  /*
   * Resume
   */

  // Rating bars.
  $('.skills li .rating').each(function(index, e) {

    // Variables
    var ratNum = 7;
    var $rat = $(e).attr('data-rat');
    var point = '<span></span';

    // Append points.
    while (ratNum > 0) {
      $(e).append(point);
      ratNum--;
    }

    $(e).find('span').each(function(index, e) {
      if (index >= $rat) return false;

      // Append Disabled rats.
      $(e).animate({
        opacity: 1
      });
    });
  });

  /*
   * About.
   */

   // Profile photo slider.
    $('.photo-inner ul').carouFredSel({
      direction: 'left',
      circular: true,
      auto: true,
      scroll: {
        items: 1,
        fx: 'crossfade',
        duration: 1500,
        wipe: true
      },
      swipe: {
        onTouch: true
      },
      items: {
        width: 153
      }
    });


  /*
   * Menu
   */

   // Needed variables.
   var $content = $('#content');

   // Run easytabs.
    $content.easytabs({
      animate: true,
      updateHash: false,
      transitionIn: 'slideDown',
      transitionOut: 'slideUp',
      animationSpeed: 600,
      tabs: '.tmenu',
      tabActiveClass: 'active'
    });

    // Hover menu effect.
    $content.find('.tabs li a').hover(
      function() {
        $(this).stop().animate({ marginTop: '-7px' }, 200);
      }, function() {
        $(this).stop().animate({ marginTop: '0px' }, 300);
      }
    );

    // Menu navigation.
    $('.menu .tabs').carouFredSel({
      responsive: true,
      direction: 'left',
      circular: false,
      infinite: false,
      pagination: '#menu-controls',
      auto: false,
      scroll: {
        items: 1,
        duration: 300,
        wipe: true
      },
      prev: {
        button: '#menu-prev',
        key: 'right'
      },
      next: {
        button: '#menu-next',
        key: 'left'
      },
      swipe: {
        onTouch: true
      },
      items: {
        width: 140,
        visible: {
          min: 2,
          max: 5
        }
      }
    });


  /*
   * Cats filter.
   */

    var $catsfilter = $('.cats-filter');

    // Copy categories to item classes.
    $catsfilter.find('a').click(function() {
      var currentOption = $(this).attr('data-fiter');

      $(this).parent().parent().find('a').removeClass('current');
      $(this).addClass('current');
    });


  /*
   * Portfolio.
   */

    // Needed variables.
    var $plist = $('#portfolio-list');
    var $pfilter = $('#portfolio-filter');

    // Run isotope.
    $plist.isotope({
      filter: '*',
      layoutMode: 'masonry',
      animationOptions: {
        duration: 750,
        easing: 'linear'
      }
    });

    // Isotope filter.
    $pfilter.find('a').click(function() {
      var selector = $(this).attr('data-filter');

      $plist.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });

    // Portfolio image animation
    $plist.find('img').adipoli({
      'startEffect': 'transparent',
      'hoverEffect': 'boxRandom',
      'imageOpacity': 0.6,
      'animSpeed': 100
    });

  /*
   * Book.
   */

    // Needed variables.
    var $blist = $('#book-list');
    var $bfilter = $('#book-filter');

    // Run isotope.
    $blist.isotope({
      filter: '*',
      layoutMode: 'masonry',
      animationOptions: {
        duration: 750,
        easing: 'linear'
      }
    });

    // Isotope filter.
    $bfilter.find('a').click(function() {
      var selector = $(this).attr('data-filter');

      $blist.isotope({
        filter: selector,
        animationOptions: {
          duration: 750,
          easing: 'linear',
          queue: false
        }
      });
      return false;
    });

    // Portfolio image animation
    $blist.find('img').adipoli({
      'startEffect': 'transparent',
      'hoverEffect': 'boxRandom',
      'imageOpacity': 0.6,
      'animSpeed': 100
    });



  /*
   * prettyPhoto.
   */

    $("a[rel^='portfolio']").prettyPhoto({
      animation_speed: 'fast', // fast. slow. normal.
      social_tools: '',
      theme: 'pp_default',
      horizontal_padding: 5
    });


  /*
   * Contact form.
   */

    // Needed variables.
    var $contactform = $('#contactform');
    var success = 'Your message has been sent. Thank you!';
    var $remember = $("#remember");
    var $notify = $("#notify");
    var $legalNotice = $('#legal-notice');
    var cookieEnabled;
    var url = 'https://formspree.io/r@akinjide.me';

    // Check for cookieState
    cookieEnabled = (navigator.cookieEnabled) ? true : false;

    // if not IE4+ nor NS6+
    if (typeof navigator.cookieEnabled == "undefined" && !cookieEnabled){
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true : false
        $legalNotice.addClass("hidden");
    }

    // if cookies are enabled on client's browser
    if (typeof navigator.cookieEnabled != "undefined" && cookieEnabled) {
      Cookies.set('_TS', Date.now(), { expires: 30, path: '', secure: true, domain: 'resume.akinjide.me' });

      if (Cookies.get("AcceptCookie") == 'Y') {
        $legalNotice.addClass("hidden");

        // Remember Name and Email.
        // $remember.on("click", function(e) {
        $remember.on("change", function(e) {
          var $target = $(e.target);

          if ($target.is(":checked")) {
            $name = $contactform.find("#name").val();
            $email = $contactform.find("#email").val();

            Cookies.defaults = { expires: 30, path: '', secure: true, domain: 'resume.akinjide.me' };
            Cookies.set('_USN', $name);
            Cookies.set('_UEM', $email);
          } else {
            Cookies.remove('_USN', { path: '' });
            Cookies.remove('_UEM', { path: '' });
          }
        });

        (function() {
          if (Cookies.get("AcceptCookie") == 'Y' && typeof Cookies.get("_USN") != "undefined" && typeof Cookies.get("_UEM") != "undefined") {
            $name = Cookies.get("_USN");
            $email = Cookies.get("_UEM");

            $contactform.find("#name").val($name);
            $contactform.find("#email").val($email);

            $remember.prop("checked", $name);
          }
        }())
      } else {
        $legalNotice.removeClass("hidden");
        $("label[for='remember']").addClass('not-selected').hide();
      }
    }

    // Form validation
    var validator = $contactform.validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        email: {
          required: true,
          email: true
        },
        message: "required"
      },
      messages: {
        name: {
          required: "Name field is required.",
          minlength: "Please enter at least 2 characters."
        },
        email: {
          required: "Email field is required.",
          email: "Please enter a valid email address."
        },
        message: "I would love to see your message."
      }
    });

    $contactform.keyup(function() {
      if (validator.numberOfInvalids() > 0) {
        $contactform.find("input[type='submit']").attr('disabled', true).addClass('disabled');
      } else {
        $contactform.find("input[type='submit']").removeAttr('disabled').removeClass('disabled');
      }
    });

    $contactform.submit(function(e) {
      $.ajax({
        type: 'POST',
        url: url,
        data: $(this).serialize(),
        dataType: "json",
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        async: true,
        crossDomain: true,
        cache: false,
        beforeSend: function(xhr) {
          xhr.withCredentials = true;
        }
      })
      .done(function(msg) {
        if (msg.success) {
          response = '<div class="success">' + success + '</div>';
          $contactform.find("textarea").val("");
          $contactform.addClass('has-error');
        } else {
          response = '<div class="error">' + msg.errors.message + '</div>';
        }

        // Hide any previous response text.
        $('.error, .success').remove();

        // Show response message.
        $contactform.prepend(response);
      })
      .fail(function(msg) {
        $('.error, .success').remove();
        $contactform.prepend('<div class="error">Oh no! Something Broke. Try Again.</div>');
      });

      return false;
    });


  /*
   * Google maps.
   */

    // Needed variables.
    var $map = $('#map');
    var $tabContactClass = ('tab-contact');
    var lat = '6.507093';
    var long = '3.383739';

    $map.gmap().bind('init', function(ev, map) {
      $map.gmap('addMarker', {
        'position': lat + ',' + long,
        'icon': 'static/images/pin.png',
        'bounds': true
      }).click(function() {
        $map.gmap('openInfoWindow', {
          'content': 'I am here!<br><br><strong>Latitude:</strong> ' + lat + '<br><strong>Longitude:</strong> ' + long + '<br>'
        }, this);
      });

      $map.gmap('option', 'styles', [{
        "stylers": [{
            "hue": "#FFFFFF"
          }, {
            saturation: -100
          }, {
            gamma: 2
          }
        ]
      }]);
      $map.gmap('option', 'disableDefaultUI', true);
      $map.gmap('option', 'zoom', 16);
    });

//   $map.gmap().bind('init', function(ev, map) {
//     // Detect user location
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(function(position) {
//         var longtitude =  parseFloat(position.coords.longitude);
//
//         $map.gmap('addMarker', {
//             'position': position.coords.latitude + ',' + longtitude,
//             'icon': 'images/pin.png',
//             'bounds': true,
//             'animation': google.maps.Animation.BOUNCE
//           }).click(function() {
//             $map.gmap('openInfoWindow', {
//               'content': 'You\'re here!<br><br><strong>Latitude:</strong> ' + position.coords.latitude + '<br><strong>Longitude:</strong> ' + longtitude + '<br>'
//             }, this);
//         });
//
//         var latLng = new google.maps.LatLng(position.coords.latitude, longtitude);
//         $map.gmap('option', 'center', latLng);
//       }, function() {
//         console.log('Couldn\'t find you :(');
//       });
//     }
//   });

    // Refresh map.
    $content.bind('easytabs:after', function(evt, tab, panel) {
      $map.gmap('refresh');
    });


  /*
   * Tooltip.
   */

    // Needed variables.
    var $tip = $('.tooltip');
    var $tipcontent = $('.tooltip_content');

    $tip.click(function( click ) {
      $(this).toggleClass("tooltip--on");
      click.preventDefault();
    });

    $(window).bind("load resize", function() {
      $tipcontent.each(function() {
        var offset = $(this).offset();
        var spaceNeeded = ($(this).width() + 24);
        var minSpace = ($(window).width() - offset.left);

        if (minSpace < spaceNeeded) {
          $(this).parent().addClass('right');
        } else {
          $(this).parent().removeClass('right');
        }

        if (offset.left < 24) {
          $(this).parent().addClass('left');
        } else {
          $(this).parent().removeClass('left');
        }
      });
    });


  /*
   * ServiceWorker.
   */

    if ('serviceWorker' in navigator) {
      navigator
        .serviceWorker
        .register('./service-worker.js', { scope: './'})
        .then(function(registration) {
          console.log('[ServiceWorker] Register')
        })
        .catch(function(error) {
          console.log('[ServiceWorker] Failed to Register')
        })
    }

    console.clear();
    console.log(showMessage());
});
