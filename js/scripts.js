
/*video */

var videoWrap = $('.video-wrap');
var videoCover = $('.video-cover');
var videoFrame = $('.video-inner');

videoWrap.click(function () {
  $(this)
    .find($('.video-cover'))
    .css('display', 'none');
  $(this)
    .find($("video"))[0]
    .play();
});

/*wheel */
var resultWrapper = document.querySelector('.overlay');/*оверлей попап*/
var wheel = document.querySelector('.prize-wheel');/* имидж колеса*/
$('.wheel__cursor').click(function () {
  if (!wheel.classList.contains('rotated')) {
    wheel.classList.add('spin');/* класс анимации вращения */
    setTimeout(function () {
      resultWrapper.style.display = "block";
    }, 8000);
    setTimeout(function () {
      $('.wheel__wrapper').slideUp();/* обертка с барабаном */
      $('.order').slideDown();/* обертка с формой заказа */
      countDown();/* стартуем таймер */
    }, 10000);
    wheel.classList.add('rotated');
  }

});

$('.close-popup, .btn-popup').click(function (e) {
  e.preventDefault();
  $('.overlay').fadeOut();
});

$('.bottom-teaser').click(function (e) {
  if (!wheel.classList.contains('rotated')) {
    e.preventDefault();
    $('.wheel__wrapper').slideUp();/* обертка с барабаном */
    $('.order').slideDown();/* обертка с формой заказа */
    countDown();/* стартуем таймер */
  }
});


var element = $('.wheel');/* якорь для показа всплывающего камента */
var element2 = $('#teaser-comment')/* якорь для показа "нового" камента */
var teaserLoad = $('#comment-load')/* "новый камент" */
var teaserComment = $('.teaser')/*всплывающий каммент с кнопкой закрыть*/
let counter = localStorage.getItem('counter') ? localStorage.getItem('counter') : 0;;
let counter2 = localStorage.getItem('counter2') ? localStorage.getItem('counter2') : 0;

$(window).scroll(function () {
  var scroll = $(window).scrollTop() + $(window).height();
  var offset = element.offset().top;
  var offset2 = element2.offset().top;

  if (scroll > offset && counter == 0) {
    teaserComment.addClass('visible');
    counter = 1;
    localStorage.setItem('counter', counter);
  }
  if (teaserComment.hasClass('visible')) {
    setTimeout(function () {
      teaserComment.removeClass('visible')
    }, 5000);
  }
  $('.close-teaser').click(function () {
    $('.teaser').removeClass('visible');
  });

  if (scroll > offset2 && counter2 == 0) {
    teaserLoad.addClass('visible');
    counter2 = 1;
    localStorage.setItem('counter2', counter2);
  }

});


/*timer */
// if (document.getElementById('countdownTimer')) {
// var min = document.getElementById('countdownTimer').getAttribute('data-minutes');
// var sec = document.getElementById('countdownTimer').getAttribute('data-seconds');

function countDown() {
  localStorage.setItem('remember', "1");
  if (localStorage.getItem('sec') && localStorage.getItem('min')) {
    var min = localStorage.getItem('min');
    var sec = localStorage.getItem('sec');
  }
  else {
    var min = document.getElementById('countdownTimer').getAttribute('data-minutes');
    var sec = document.getElementById('countdownTimer').getAttribute('data-seconds');
  }
  var interval = setInterval(function () {
    if (parseInt(min) >= 0 && parseInt(sec) !== -1) {
      if (parseInt(sec) === 0 && parseInt(min) !== 0) {
        min--;
        sec = 59;
      }
      document.getElementById('countdownTimer').innerText = (min < 10 ? "0" + min : min) + ":" + (sec < 10 ? "0" + sec : sec);
      if (parseInt(sec) === 0 && parseInt(min) === 0) {
        min--;
        sec = 0;
        document.getElementById('countdownTimer').innerText = "00:00";
        clearInterval(interval);
      }
      sec--;
      localStorage.setItem('sec', sec);
      localStorage.setItem('min', min);
    }
  }, 1000)


}
//  window.onload = countDown; /* вызываю с появлением обертки с барабаном*/
// }

// if (localStorage.getItem('remember')) {
//   $('.wheel__wrapper').hide();
//   $('.order').show();
//   countDown();
// }

/*pacs */
var dig = 41;
function count() {
  var pack = document.querySelectorAll('.pack');
  let diglocal = localStorage.getItem('dig') ? localStorage.getItem('dig') : dig;
  if (parseInt(diglocal) > 2) {
    diglocal--;
    localStorage.setItem('dig', diglocal);
  } else {
    return 0;
  }
  pack.forEach(pack => {
    pack.innerHTML = diglocal;
  });

}

/*popup */
var nameInner = $('.float__name');
var saleInner = $('.float__sale');
var float = $('.float');
function getDiscount() {
  var discountVal = ['10%', '30%', '15%', '35%'];
  return discountVal[Math.floor(Math.random() * 4)];
}
// saleInner.html(getDiscount());

function getName() {
  var nameVal = ['Leonardo', 'Marco', 'Federico', 'Marcello', 'Giulio', 'Mimmo', 'Valerio', 'Gennaro', 'Mirko', 'Camillo', 'Arturo', 'Sergio', 'Jacopo', 'Amedeo', 'Paolo', 'Michele', 'Valentino', 'Pietro', 'Pasquale', 'Vincenzo', 'Larissa', 'Giovanna', 'Giorgia', 'Valeria', 'Valentina', 'Giovanna', 'Sara', 'Chiara', 'Erica', 'Antonella', 'Assunta', 'Roberta', 'Emma', 'Michela', 'Giorgina', 'Emilia', 'Marisa', 'Diana', 'Brigida', 'Alessia'];
  return nameVal[Math.floor(Math.random() * 40)];
}
if (localStorage.getItem('dig')) {
  var pack = document.querySelectorAll('.pack');
  pack.forEach(pack => {
    pack.innerText = localStorage.getItem('dig');
  });
}
// nameInner.html(getName());

function showFloat() {
  interval = setInterval(function () {
    float.toggleClass('visible');
    if (float.hasClass('visible')) {
      saleInner.html(getDiscount());
      nameInner.html(getName());
      if (count() === 0) {
        float.removeClass('visible');
        clearInterval(interval)
      }
    }
    $('.pack').toggleClass('animate');
    $('.close-float').click(function () {
      $('.float').removeClass('visible');
    });

  }, 8000);
};

showFloat();



/*comment*/

var textAlert = document.getElementById("textarea"),
  textName = document.getElementById("textareaname"),
  vk_text = document.getElementById("comment-text"),
  vk_name = document.getElementById("comment-name"),
  vk_block = document.getElementById('comment-answer'),
  vk_image = document.querySelector("#base64Img"),
  bannerImage = document.getElementById('avatar'),
  bannerImg = document.getElementById("base64Img"),
  dataImage = localStorage.getItem("ImgBase64");

if (localStorage.getItem("textAlert") && localStorage.getItem("textName")) {
  vk_text.innerHTML = localStorage.getItem("textAlert");
  vk_name.innerHTML = localStorage.getItem("textName");
  vk_block.style.display = "flex";
  bannerImg.src = localStorage.getItem("ImgBase64");
}

function changeText() {
  let textAlert_ = document.getElementById("textarea").value,
    textName_ = document.getElementById("textareaname").value,
    img = localStorage.getItem("ImgBase64");
  localStorage.setItem("textAlert", textAlert_);
  localStorage.setItem("textName", textName_);

  vk_text.innerHTML = textAlert_;
  vk_name.innerHTML = textName_;
  vk_block.style.display = "flex";
  vk_image.src = img;
  bannerImage.value = "";
  textAlert.value = "";
  textName.value = "";
  vk_image.scrollIntoView();
}

bannerImage.addEventListener("change", function (event) {
  loadImageFileAsURL(event);
});

function loadImageFileAsURL(event) {
  var filesSelected = document.getElementById(event.target.id).files;
  if (filesSelected.length > 0) {
    var fileToLoad = filesSelected[0];
    var fileReader = new FileReader();
    fileReader.onload = function (fileLoadedEvent) {
      let srcData = fileLoadedEvent.target.result; // <--- data: base64
      localStorage.setItem("ImgBase64", srcData);
      document.querySelector("#base64Img").src = srcData;
    };
    fileReader.readAsDataURL(fileToLoad);
  }
}


/*clik LPT */
var xhr = new XMLHttpRequest();
document.addEventListener("DOMContentLoaded", function () {
  var els = document.querySelectorAll('a[href*="img"]');
  var form = document.querySelector("#order");
  var scr = document.querySelectorAll('a[href*="offer"]');
  var wheelBtn = document.querySelector(".wheel-btn");
  var submit = document.querySelector(".btn.btn--submit");
  var videoW = document.querySelector(".video-wrap");
  for (var i = 0; i < els.length; i++) {
    var el = els[i];
    el.addEventListener('click', e => {
      e.preventDefault();
      var href = e.currentTarget.href;
      xhr.open('GET', href);
      xhr.send();
      // let overlay = document.querySelector('.overlay-pic'),
      //   src = e.currentTarget.firstElementChild.getAttribute('src'),
      //   popup = document.querySelector('.popup-pic');
      // popup_i = document.querySelector('.popup-pic img');
      // popup_i.setAttribute('src', src);
      // overlay.style.display = 'block';
      // overlay.addEventListener('click', function () {
      //   overlay.style.display = 'none';
      // });
    })
  }
  for (var i = 0; i < scr.length; i++) {
    var ell = scr[i];
    ell.addEventListener('click', e => {
      e.preventDefault();
      form.scrollIntoView({
        block: "center",
        behavior: "smooth"
      });
      var href2 = e.currentTarget.href;
      xhr.open('GET', href2);
      xhr.send();
    })
  }
  wheelBtn.addEventListener('click', e => {
    e.preventDefault();
    var href3 = e.currentTarget.href;
    xhr.open('GET', href3);
    xhr.send();
  })

  submit.addEventListener('click', e => {
    var href4 = e.currentTarget.dataset.link;
    xhr.open('GET', href4);
    xhr.send();
  })
  videoW.addEventListener('click', e => {
    var href5 = e.currentTarget.dataset.link;
    xhr.open('GET', href5);
    xhr.send();
  })
});




/*policy */
// $('a[href="#policy"]').click(function (e) {
//   e.preventDefault();
//   $('.overlay-policy').fadeIn();
// });


$('.policy-close').click(function () {
  $('.overlay-policy').fadeOut();
});
