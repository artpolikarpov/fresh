if ($) $ (function () {

  e2UpdateSubmittability = function () {

	  shouldBeDisabled = (
	    /^ *$/.test ($ ('#name').val ()) ||
	    /^ *$/.test ($ ('#email').val ()) ||
	    /^ *$/.test ($ ('#text').val ())
    )
	  if (shouldBeDisabled) {
		  $ ('#submit-button').attr ('disabled', 'disabled')
	  } else {
		  $ ('#submit-button').removeAttr ('disabled')
	  }

  }
  
  e2UpdateSubmittability ()
 
  $ ('.required').bind ('input blur cut copy paste keypress', e2UpdateSubmittability)
  
  
})