if ($) $ (function () {

e2FilterTags = function (value) {
  thresh = parseInt (Math.pow ((1 - (value / 100)) / 2, 1.5) * 99) + 1
  if (value > 99) thresh = 0
  h = 0
  for (i = 0; i <= 100; ++ i) { 
    if (i > thresh) {
      $ ('.e2-tag-weight-' + i).show ()
      h += $ ('.e2-tag-weight-' + i).length
    } else {
      $ ('.e2-tag-weight-' + i).hide ()
    }
  }
  return h
}
e2UpdateSlider = function (event) {
  //if (window.event) event = window.event
  if (!holding) return
  v = (event.clientX - $ ('#e2-tag-slide').offset ().left)
  if (v < 0) v = 0
  if (v > 100) v = 100
  $ ('#e2-tag-slider').css ('left', v)
  h = e2FilterTags (v)
  event.stopPropagation ()
  event.preventDefault ()
  return false
}
var holding = false
$ ('#e2-tag-slide-area').mousedown (function (event) { 
  holding = true;
  return e2UpdateSlider (event)
})
$ (document.body).mouseup (function () {
  holding = false
  return false
})
$ (document.body).mousemove (function (event) {
  return e2UpdateSlider (event)
})

h = e2FilterTags (50)

$ ('#e2-tag-slider').show ()
  
})
