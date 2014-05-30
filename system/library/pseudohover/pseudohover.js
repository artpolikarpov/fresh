if ($) $ (function () {

$ ('a').hover (
  function () {
    if (($ (this).attr ('href') != '') && ($ (this).attr ('href') != '#')) {
      $ ('a[href="' + $ (this).attr ('href') + '"]').addClass ('hover')
    }
  },
  function () {
    $ ('a').removeClass ('hover')
  }
)

})