$(function () {
  var $coverImg = $('img[alt^="cover"]');

  var src = $coverImg.attr('src');
  var $root = $('#layout-root');

  $coverImg.parents('.e2-text-picture').remove();

  if (!src || !$root.hasClass('layout--note')) {
    return;
  }

  var colors = $.map($coverImg.attr('alt').split(' ').slice(1), function (color) {
    return 'cover__color--' + color
  }).join(' ');
  var minheight = 300;
  var $fotorama = $('<div class="cover__fotorama ' + colors + '"></div>')
      .insertBefore($root.addClass('cover'))
      .fotorama({
        width: '100%',
        ratio: 16/9,
        maxheight: '90%',
        minheight: minheight,
        fit: 'cover',
        allowfullscreen: false,
        nav: false,
        arrows: false,
        click: false,
        swipe: false,
        trackpad: false
      });
  var fotorama = $fotorama.data('fotorama');

  var $dummy = $('<div></div>');

  $('.js-cover').each(function () {
    $(this).appendTo($dummy);
  });

  $('*[lead]').each(function () {
    $(this).wrapInner('<span class="text-bg"><span class="text-bg text-bg--1"><span class="text-bg text-bg--2"></span></span></span>').appendTo($('.js-cover-lead', $dummy));
  });

  fotorama.load([{img: src, html: '<div class="layout layout--cover cover__layout ' + colors + ' fotorama__select"><div class="layout__floor cover__floor">' + $dummy.html() +'</div></div>'}]);

  if (!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i)) {
    // Включаю параллакс, если браузер не мобильный
    var $window = $(window);
    var $stage = $('.fotorama__stage', $fotorama);
    var parallax = 5;

    $window
        .on('resize orientationchange', function () {
          var _minheight = 0;

          $('.js-cover').each(function () {
            console.log('$(this).innerHeight()', $(this).innerHeight());
            _minheight += $(this).innerHeight();
          });

          console.log('_minheight', _minheight);

          if (_minheight > minheight) {
            minheight = _minheight;
            fotorama.setOptions({minheight: minheight});

            console.log('new minheight', minheight);
          }
          $window.scroll();
        })
        .on('scroll', function () {
          $stage.css({transform: 'translateY(' + ($window.scrollTop() / parallax) + 'px)'});
        })
        .resize();
    }

});
