    window.onload = function () {
      var $footerbutton_Elements = document.getElementsByClassName("footer-fav__checked-button");
      var targetElement = document.getElementById('pcm-vitior');
      if(document.getElementsByClassName('footer-fav--open').length){
        targetElement.classList.add('is-opened');
      }else{
        targetElement.classList.remove('is-opened');
      }
      for( var $i = 0; $i < $footerbutton_Elements.length; $i++ ) {
        $footerbutton_Elements[$i].onclick = function () {
          if (targetElement.classList.contains('is-opened') == true){
            targetElement.classList.remove('is-opened');
          }else{
            targetElement.classList.add('is-opened');
          }
        }
      }
    }