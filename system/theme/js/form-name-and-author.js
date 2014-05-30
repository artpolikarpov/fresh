if ($) $ (function () {
  
  $ ('#blog-title').bind ('input blur cut copy paste keypress', function () {
  	if ($ ('#e2-blog-title')) $ ('#e2-blog-title').text (
  	  this.value? this.value : $ ('#e2-blog-title-default').val ()
  	)
  })

  $ ('#blog-description').bind ('input blur cut copy paste keypress', function () {
  	if ($ ('#e2-blog-description')) $ ('#e2-blog-description').text (this.value)
  })

  $ ('#blog-author').bind ('input blur cut copy paste keypress', function () {
  	if ($ ('#e2-blog-author')) $ ('#e2-blog-author').text (
  	  this.value? this.value : $ ('#e2-blog-author-default').val ()
  	)
  })
  
})