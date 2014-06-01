window.console = window.console || {log: $.noop};

$(function () {
  function sendEvent (optional) {
    if (window.ga) {
      //console.log('Analytics event', optional);
      ga('send', 'event', optional);
    }
  }

  var $window = $(window);

  $(document)
      // клик по внешним ссылкам
      .on('click', '.js-analytics-click', function (e) {
        if (!window.ga) {
          // Если аналитики нет, ничего не делаем
          return;
        }

        if (!e.shiftKey && !e.altKey && !e.ctrlKey && !e.metaKey && !e.wheel && e.button !== 1) {
          // Если клик простой (ни одной модифицируещей кнопки),
          // запрещаем нативный переход и ждём колбека hitCallback
          e.preventDefault();
        }

        var $this = $(this),
            data = $this.data(),
            href = $this.attr('href');

        sendEvent({
          eventCategory: 'Link',
          eventAction: data.action,
          eventLabel: $this.text() + ' (' + href + ')',
          hitCallback: function () {
            // Действие засчитано в Гугле
            if (e.isDefaultPrevented()) {
              // Если нативный переход был запрещён,
              // форсируем смену location
              location = href;

              console.log('Analytics hit callback');
            }
          }
        });
      });

  var resizeTimeout,
      innerWidth = window.innerWidth,
      resizeStart = innerWidth;

  $window.on('resize orientationchange', function resizeCallback (e) {
    var _innerWidth = window.innerWidth;
    if (_innerWidth === innerWidth) {
      return;
    }
    innerWidth = _innerWidth;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function () {
      $window.off('resize orientationchange', resizeCallback);
      sendEvent({
        eventCategory: 'Resize',
        eventAction: e.type,
        eventLabel: resizeStart + 'px → ' + _innerWidth + 'px'
      });
    }, 1000);
  });
});