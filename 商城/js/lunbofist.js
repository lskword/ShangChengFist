var oSpan1 = document.querySelectorAll('.craousel')[0];
var oSpan2 = document.querySelectorAll('.craousel')[1];

(function() {
  var save = 0;
  var timer = setInterval(function() {
    if (save == 0) {
      save = 1;
    } else  {
      save = 0;
    }
    if (save === 0) {
      oSpan1.style.display = 'none';
      oSpan2.style.display = 'block';
    } else if (save === 1) {
      oSpan1.style.display = 'block';
      oSpan2.style.display = 'none';
    }
  }, 2000);
})();
