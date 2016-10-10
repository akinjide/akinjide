jQuery(document).ready(function() {
  pageErrorMessage();
  (function displayLink() {
    var $kick = $('#kick');

    setTimeout(function() {
      // send 'em back
      $kick.append(
        '<a href="/">HOME</a>'
      );
    }, 45000);
  }())
});

function pageErrorMessage() {
  /*
   * 404 Message.
   */

   // Needed Variables
   var $weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ],
      $dayIndex = (new Date()).getDay(),
      $dayOfWeek = $weekdays[$dayIndex],
      $dayPastIndex = Math.floor($weekdays.length * Math.random()),
      $hour = (new Date()).getHours(),
      $story = $('#story'),
      $time,
      $dayPast;

   // Choose another day of the week apart from current day
   if ($dayPastIndex == $dayIndex) {
      $dayPast = $weekdays[($dayPastIndex - 1) % $weekdays.length];
   }
   else {
      $dayPast = $weekdays[$dayPastIndex];
   }

   // Assign time of the Day
   if (($hour >= 4) && ($hour <= 11)) {
      $time = 'morning';
   }
   else if (($hour >= 12) && ($hour <= 16)) {
      $time = 'afternoon';
   }
   else {
      $time = 'evening';
   }


   // Start Conversation
   $story.typed({
      strings: [
        'Oh Well, here we are.^2000 \nI\'m Akinjide.^300 I live off code,^300 \nmusic and hacking stuffs.^2000 \nAin\'t much to look at, is it?^2000 \nCame here on a ' + $dayPast + ' night once.^1000 \nIt was actually pretty crowded.^1000 \nBut on a ' + $dayOfWeek + ' ' + $time + ' .^300 .^300 .^1000 \nI guess it\'s just you^1000 and me.^3000 \nHeh.^1000 \n\nPage Not Found.^500 .^500 .^1000 \nFeeling lost?^2000'
      ],
      typeSpeed: 20,
      backDelay: 500,
      loop: false,
      loopCount: false,
      cursorChar: "_",
   });
}