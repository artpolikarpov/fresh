if ($) $ (function () {
  
  var csscPrefix = 'e2-text-picture'
  
  var imageAnimateWidthTo = function ($img, width) {
    
    $img.stop ()
    $img.css ('height', 'auto')
    $img.animate ({ width: width }, 'fast')
    
    return false
    
  }  
  
  var imageToggleSize = function () {
  
    this.blur ()
    
    var $this = $ (this)
    var $img = $ ('img', $this)

    if ($this.hasClass (csscPrefix + '-zoomed')) {
    
      var newWidth = $img.data ('previewWidth')

    } else {

      var newWidth = $this.attr ('width') // full width

      $img.data ({ 'previewWidth': $img.width () })

      // full picture src is a's href
      fullSrc = this.href
      
      bigImg = new Image ()
      $ (bigImg).attr ('src', fullSrc);
      $ (bigImg).bind ('load', function () {
        $img.attr ('src', fullSrc)
      })
      
    }
    
    $this.toggleClass (csscPrefix + '-zoomed')
    return imageAnimateWidthTo ($img, newWidth)
  
  }
  
  $ ('a.' + csscPrefix + '-zoom-link').click (imageToggleSize)

})
