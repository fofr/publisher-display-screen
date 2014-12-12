/*
 Based on slides used within:
 https://github.com/Demotive/gds-data-screens
*/
(function(){
  "use strict"
  var root = this,
  $ = root.jQuery;
  if(typeof root.app === 'undefined'){ root.app = {} }

  var slides = {
    init: function(){
      var slides = document.getElementsByClassName('slide');

      var cycleSlides = function() {
        console.log('cycing');
        for (var i = 0; i < slides.length; i++) {
          slides[i].classList.remove('prev');
        }
        var current = document.getElementsByClassName('now')[0];
        var next = current.nextElementSibling;
        if (!next) {
          next = slides[0];
        }
        current.classList.add('prev');
        current.classList.remove('now');
        next.classList.add('now');
      };

      var sliderTimer = window.setInterval(cycleSlides, 3e3);
    }
  };

  root.app.slides = slides;

}).call(this);
