if ($) $ (function () {

  e2SelfSpin = function (me) {
    $ (me).find ('span').attr ('class', '').addClass ('i-loading')
    $ (me).fadeTo (333, 1)
  }
  
  // file upload
  
  e2UploadFile = function (file, uploadURL, doneCallback) {
    if (FormData) {
      var data = new FormData ()
      data.append ('file', file)
        
      $.ajax ({
        type: 'POST',
        url: uploadURL,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: doneCallback,
        error: function (jqXHR, textStatus, errorThrown) {
          //alert (textStatus)
        },
        complete: function (jqXHR, textStatus) {
          //alert (textStatus)
        }
      })
    }
  }
  
  // toggles

  var e2ToggleClick = function (event, me, functionOn, functionOff, functionSlow) {
    var functionOnGlobal = functionOn, functionOffGlobal = functionOff, functionSlowGlobal = functionSlow;

    $ (me).fadeTo (333, 0)

    slowTimeout = setTimeout (function () { functionSlowGlobal (me) }, 333)

    $.ajax ({
      type: "post",
      timeout: 10000,
      url: $ (me).attr ('href'),
      data: 'result=ajaxresult',
      success: function (msg) {
        clearTimeout (slowTimeout)
        if (msg.substr (0, 10) == 'on-rehref|') {
          functionOnGlobal (msg.substr (10))
        }
        if (msg.substr (0, 11) == 'off-rehref|') {
          functionOffGlobal (msg.substr (11))
        }
      },
      error: function (xhr) {
        location.href = $ (me).attr ('href')
      },
      complete: function (xhr) {
        //$ ('#e2-console').html (xhr.responseText)
      }
    })
    return false
  }

  $ ('.e2-favourite-toggle').click (function (event) {
    var me = this
    return e2ToggleClick (
      event, me, 
      function (msg) {
        $ (me).children ('span').stop ().attr ('class', '').addClass ('i-favourite-set')
        $ (me).show ().fadeTo (1, 1)
        $ (me).parent ().parent ().parent ().addClass ('e2-note-favourite')
        $ (me).attr ('href', msg)
      },
      function (msg) {
        $ (me).children ('span').stop ().attr ('class', '').addClass ('i-favourite-unset')
        $ (me).show ().fadeTo (1, 1)
        $ (me).parent ().parent ().parent ().removeClass ('e2-note-favourite')
        $ (me).attr ('href', msg)
      },
      e2SelfSpin
    )
  })
  
  $ ('.e2-important-toggle').click (function (event) {
    var me = this
    return e2ToggleClick (
      event, me, 
      function (msg) {
        $ (me).children ('span').stop ().attr ('class', '').addClass ('i-important-set')
        $ (me).show ().fadeTo (1, 1)
        $ (me).parent ().parent ().parent ().removeClass('').addClass ('important')
        $ (me).attr ('href', msg)
        $ct = $ (me).parents ('.e2-comment-control-group').eq (0)
        $ct.find ('.e2-markable').addClass ('e2-marked')
        if (document.$e2Mark) document.$e2Mark ()
      },
      function (msg) {
        $ (me).children ('span').stop ().attr ('class', '').addClass ('i-important-unset')
        $ (me).show ().fadeTo (1, 1)
        $ (me).parent ().parent ().parent ().removeClass('important').addClass ('')
        $ (me).attr ('href', msg)
        $ct = $ (me).parents ('.e2-comment-control-group').eq (0)
        $ct.find ('.e2-markable').removeClass ('e2-marked')
        if (document.$e2Mark) document.$e2Mark ()
      },
      e2SelfSpin
    )
  })

  $ ('.e2-removed-toggle').click (function (event) {
    var me = this
    //var cc = $ ('#e2-comments-count').text ().split (' ')[0]
    var $ct = $ (me).parents ('.e2-comment').eq (0)
    $ct.find ('.e2-comment-actions').hide ()
    $ct.find ('.e2-removed-toggling').css ('opacity', 0).show ().fadeTo (333, 1)
    return e2ToggleClick (
      event, me,
      function (href) {
        $ct.find ('.e2-removed-toggling').fadeTo (333, 0, function () {
          $ct.find ('.e2-comment-actions').show ()
        })
        $ct.find ('.e2-comment-actions').show ()
        $ct.find ('.e2-comment-actions-removed').hide ()
        $ct.find ('.e2-comment-content').slideDown (333)
        $ct.find ('.e2-comment-meta').slideDown (333)
        $ct.find ('.e2-comment-author').removeClass ('e2-comment-author-removed')
        $ct.find ('.e2-removed-toggle').attr ('href', href)
        $ (me).fadeTo (333, 1)
        if (!$ (me).parents ('.comment').is ('.reply')) {
          $ (me).parents ('.comment-and-reply').find ('.reply').slideDown (333)
        }
        /*
        $ ('#e2-comments-count').text (
          $ ('#e2-comments-count').text ().replace (cc, cc*1+1)
        )
        */
      },
      function (href) {
        $ct.find ('.e2-removed-toggling').fadeTo (1, 0)
        $ct.find ('.e2-comment-actions').hide ()
        $ct.find ('.e2-comment-meta').slideUp (333)
        $ct.find ('.e2-comment-content').slideUp (333, function () {
          $ct.find ('.e2-comment-actions-removed').slideDown (333)
        })
        $ct.find ('.e2-comment-author').addClass ('e2-comment-author-removed')
        $ct.find ('.e2-removed-toggle').attr ('href', href)
        $ (me).fadeTo (333, 1)
        if (!$ (me).parents ('.e2-comment').is ('.e2-reply')) {
          $ (me).parents ('.e2-comment-and-reply').find ('.e2-reply').slideUp (333)
        }
        /*
        $ ('#e2-comments-count').text (
          $ ('#e2-comments-count').text ().replace (cc, cc*1-1)
        )
        */
      },
      function (me) { return false }
    )
  })

  $ ('.e2-pinned-toggle').click (function (event) {
    var me = this
    return e2ToggleClick (
      event, me,
      function (href) {
        $ (me).children ('span').stop ().attr ('class', '').addClass ('i-pinned-set')
        $ (me).show ().fadeTo (1, 1)
        $ (me).attr ('href', href)
      },
      function (href) {
        $ (me).children ('span').stop ().attr ('class', '').addClass ('i-pinned-unset')
        $ (me).fadeTo (1, 1)
        $ (me).attr ('href', href)
      },
      e2SelfSpin
    )
  })
  
  
  // generic external drag-n-drop
  
  e2DragEnter = function (e) {
    
    dt = e.originalEvent.dataTransfer
    if (!dt) return
    
    //FF
    if (dt.types.contains && !dt.types.contains ('Files')) return
    
    //Chrome
    if (dt.types.indexOf && dt.types.indexOf ('Files') == -1) return
	  if (dt.dropEffect) dt.dropEffect = 'copy'
	 
	  $ (this).addClass ('e2-external-drop-target-dragover')
    return false
    
  }
  
  e2DragLeave = function () {
    $ (this).removeClass ('e2-external-drop-target-dragover')
    return false
  }

  //*
  $ ('.e2-external-drop-target')
	  .bind ('dragover', e2DragEnter)
	  .bind ('dragenter', e2DragEnter)
	  .bind ('dragleave', e2DragLeave)
    .bind ('drop', e2DragLeave)
  //*/



  // userpic

  $picContainer = $ ('.e2-user-picture-container')
  $pic = $picContainer.find ('img')
  
  e2UnfadeUserpic = function () {
    $picContainer.removeClass ('e2-user-picture-container-uploading')
    $picContainer.stop ()
    $pic.stop ()
    $picContainer.animate ({ 'height': $pic.height () + 2 }, 333, function () {
      $picContainer.css ({ 'height': '', 'overflow': '' })
    })
    $pic.fadeTo (333, 1)
  }
  
  e2DropUserpic = function (e) {
    dt = e.originalEvent.dataTransfer
    if (!dt && !dt.files) return
    
    var files = dt.files
    if (files.length == 1) {
      file = files[0]

  	  $picContainer.addClass ('e2-user-picture-container-uploading')

      e2UploadFile (
        file,
        $ ('#e2-userpic-upload-action').attr ('href'),
        function (data, textStatus, jqHXR) {
          $pic.hide ()
          // alert (data)
          if (data.substr (0, 6) == 'image|') {
            image = data.substr (6).split ('|')
            image = image[0]
            $picContainer.css ({ 'height': $picContainer.height (), 'overflow': 'hidden' })
            $pic.attr ('src', image + '?' + escape (new Date ()))
            $pic.bind ('load', e2UnfadeUserpic)
          } else {
            unfadeImage ()
          }
        }
      )
      
    }

    return false
  }
  
  $picContainer.bind ('drop', e2DropUserpic)
  
})