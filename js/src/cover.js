$(function () {
  var $coverImg = $('img[alt="cover"]');
  var src = $coverImg.attr('src');
  var $root = $('#layout-root');

  $coverImg.parents('.e2-text-picture').remove();

  if (!src || !$root.hasClass('layout--note')) {
    return;
  }

  var minheight = 300;
  var fotorama = $('<div class="cover__fotorama"></div>')
      .insertBefore($root)
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
      })
      .data('fotorama');

  var html = $('#cover-html').html();
  var $dummy = $('<div></div>');

  $('.js-cover').each(function () {
    $(this).appendTo($dummy);
  });

  $('*[lead]').each(function () {
    $(this).wrapInner('<span class="text-bg"><span class="text-bg__1"><span class="text-bg__2"></span></span></span>').appendTo($('.js-cover-lead', $dummy));
  });

  fotorama.load([{img: src, html: html.replace('+++', $dummy.html())}]);

  $(window).on('resize orientationchange', function () {
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

  }).resize();

});
