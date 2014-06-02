$(function () {
  var $coverImg = $('img[alt^="cover"]');

  var src = $coverImg.attr('src');
  var ratio = $coverImg.attr('width') / $coverImg.attr('height');
  var $root = $('#layout-root');

  if (!src || !$root.attr('class').match(/layout--note|layout--draft/)) {
    // Удаляю обложки cover из ленты, cover! (с восклицательным знаком) оставляю
    $coverImg.not('[alt^="cover!"]').parents('.e2-text-picture').detach();
    return;
  } else {
    // Удаляю картинку обложки из тела поста
    $coverImg.parents('.e2-text-picture').detach();
  }

  var colors = $.map($coverImg.attr('alt').split(' ').slice(1), function (color) {
    return 'cover__color--' + color
  }).join(' ');
  var minHeight = 300;
  var $fotorama = $('<div class="cover__fotorama ' + colors + '"></div>')
      .insertBefore($root.addClass('cover'))
      .fotorama({
        width: '100%',
        ratio: ratio || 16/9,
        maxheight: '90%',
        minheight: minHeight,
        fit: 'cover',
        allowfullscreen: false,
        nav: false,
        arrows: false,
        click: false,
        swipe: false,
        trackpad: false,
        spinner: {
          zIndex: -1
        }
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

  var $window = $(window);
  var $stage = $('.fotorama__stage', $fotorama);
  var mobile = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i);
  var parallaxRatio = 5;
  var fotoramaHeight = 0;
  var scrollTop;

  $window
      .on('resize orientationchange', function () {
        var _minHeight = 0;

        $('.js-cover').each(function () {
          _minHeight += $(this).innerHeight();
        });

        if (_minHeight > minHeight) {
          minHeight = _minHeight;
          fotorama.setOptions({minheight: minHeight});
        }

        if (!mobile) {
          // Для параллакса
          fotoramaHeight = $fotorama.height();
          $window.scroll();
        }
      });

  if (!mobile) {
    // Включаю параллакс, если браузер не мобильный
    $window.on('scroll', function () {
          var _scrollTop = Math.min(Math.max($window.scrollTop(), 0), fotoramaHeight);

          if (_scrollTop !== scrollTop) {
            scrollTop = _scrollTop;
            $stage.css({transform: 'translateY(' + Math.round(_scrollTop / parallaxRatio) + 'px)'});
          }
        });
    }

  $window.resize();
});
