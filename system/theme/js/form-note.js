if ($) $ (function () {

  var prevTitle = $ ('#title').val ()
  var prevTags = $ ('#tags').val ()
  var prevText = $ ('#text').val ()
  var prevAlias = $ ('#alias').val ()
  var prevStamp = $ ('#stamp').val ()
  var edited = false
  var filesToUpload = []
  
  var actionName = $ ('#action').val ()
  var liveSaving = false

  
  $.ajaxSetup ({ type: "post", timeout: 10000 })
  
  e2UpdateSubmittability = function () {
    shouldBeEnabled = (
      !/^ *$/.test ($ ('#title').val ()) &&
      !/^ *$/.test ($ ('#text').val ()) &&
      !liveSaving
    )
	  if (shouldBeEnabled) {
			$ ('#submit-button').removeAttr ('disabled')
	  } else {
		  $ ('#submit-button').attr ('disabled', 'disabled')
	  }
  }

  e2LiveSaveError = function (errmsg) {
    $ ('#e2-console').html (errmsg)
    $ ('#livesaving').hide ()
    $ ('#livesave-button').show ()
    $ ('#livesave-error').show ()
    $ ('#livesave-error').attr ('title', errmsg)
  }
  
  e2LiveSave = function () {
    if (liveSaving) return
    if ($ ('#text') .val () == '') return
    liveSaving = true
    e2UpdateSubmittability ()
    if ($ ('#title').val () == '') {
      var x
      var generatedTitle = $ ('#text').val ()
      if ((x = generatedTitle.indexOf ('.')) >= 0) generatedTitle = generatedTitle.substr (0, x)
      if ((x = generatedTitle.indexOf (';')) >= 0) generatedTitle = generatedTitle.substr (0, x)
      if ((x = generatedTitle.indexOf (',')) >= 0) generatedTitle = generatedTitle.substr (0, x)
      if ((x = generatedTitle.indexOf (')')) >= 0) generatedTitle = generatedTitle.substr (0, x)
      if (generatedTitle.indexOf ('((') == 0) generatedTitle = generatedTitle.substr (2)
      generatedTitle = generatedTitle.substr (0, 1).toUpperCase () + generatedTitle.substr (1)
      $ ('#title').val (generatedTitle)
    }
    $ ('#livesave-button').hide ()
    $ ('#livesaving').fadeIn (333)
    $.ajax ({
      data: $ ('form').serialize (),
      url: $ ('#e2-note-livesave-action').attr ('href'),
      success: function (msg) {
        $ ('#livesave-error').hide ()
        $ ('#livesaving').fadeOut (333)
        try { ajaxresult = JSON.parse (msg) } catch (e) {
          e2LiveSaveError (e.message)
        }
        if (ajaxresult['status'] == 'created') {
          newdraftid = ajaxresult['id']
          if (history.replaceState) {
            history.replaceState (null, '', ajaxresult['new-full-url'])
            $ ('.e2-admin-menu-new-selected').hide ()
            $ ('.e2-admin-menu-new').show ()
          }
          $ ('#note-id').val (newdraftid)
          if ($ ('#e2-drafts') && $ ('#e2-drafts-item')) {
            $ ('#e2-drafts-item').fadeIn (333)
            $ ('<div class="e2-menu-item-frame"></div>').css ({
              'position': 'absolute',
              'left': $ ('#e2-note-form-wrapper').offset ().left,
              'top': $ ('#e2-note-form-wrapper').offset ().top,
              'width': $ ('#e2-note-form-wrapper').width (),
              'height': $ ('#e2-note-form-wrapper').height ()
            }).appendTo ('body').animate ({
              'left': $ ('#e2-drafts').offset ().left - 10,
              'top': $ ('#e2-drafts').offset ().top - 5,
              'width': $ ('#e2-drafts').width () + 20,
              'height': $ ('#e2-drafts').height () + 10,
            }, 667).fadeTo (333, 0.667).fadeOut (333)
            $ ('#e2-drafts-count').html ($ ('#e2-drafts-count').html () * 1 + 1)
          }
        } else if (ajaxresult['status'] == 'saved') {
          $ ('#alias').val (ajaxresult['new-alias'])
          if (history.replaceState) {
            history.replaceState (null, '', ajaxresult['new-full-url'])
          }
        } else if (ajaxresult['status'] == 'error') {
          e2LiveSaveError (ajaxresult['message'])
        }
      },
      error: function (xhr) { e2LiveSaveError (xhr.responseText) },
      complete: function (xhr) {
        liveSaving = false
        e2UpdateSubmittability ()
        //$ ('#e2-console').html (xhr.responseText)
      }
    })
  }
  
  $ ('#title').bind ('input', function () {
    document.$e2UpdateTitle (this)
    $ ('#alias').attr ('placeholder', '')
  })
  
  $ ('#title').add ('#tags').add ('#text').add ('#alias').add ('stamp')
   .bind ('change input keyup keydown keypress mouseup mousedown cut copy paste', function () {
      e2UpdateSubmittability ()
      if ($ ('#title').val () != prevTitle) edited = true
      if ($ ('#tags').val ()  != prevTags) edited = true
      if ($ ('#text').val ()  != prevText) edited = true
      if ($ ('#alias').val ()  != prevAlias) edited = true
      if ($ ('#stamp').val ()  != prevStamp) edited = true
      if (edited && ($ ('#text').val () != '')) {
        edited = false
        $ ('#livesaving').hide ()
        $ ('#livesave-button').fadeIn (333)
        prevTitle = $ ('#title').val ()
        prevTags = $ ('#tags').val ()
        prevText = $ ('#text').val ()
        prevAlias = $ ('#alias').val ()
        prevStamp = $ ('#stamp').val ()
      }
    })

  $ ('#title').bind ('keydown', function (e) {
    if (e.keyCode == 13) $ ('#text').focus ()
  })
  
  $ ('#livesave-button').click (function () { e2LiveSave (); return false })
    
  $ (document).bind ('keydown keyup keypress', function (event) {
    key = event.keyCode
    if (!key) key = event.charCode
    
    ctrl = document.e2.mac? (event.metaKey && !event.ctrlKey) : event.ctrlKey
    
    // ctrl+s
    if (event.type == 'keypress') {
      if (ctrl && ((115 == key) || (1099 == key))) {
        // this make Safari work in Russian layout
        e2LiveSave ()
        return false
      }
    } else {
      if (ctrl && ((83 == key) || (1067 == key))) {
        e2LiveSave ()
        return false
      }
    }

  })
  
  e2UpdateSubmittability ()
  
  e2PastePic = function (pic) {
    //if (alt = $ ('#title').val ()) alt = ' ' + alt
    alt = ''
    text = ''
    if ($ ('#formatter-id').val () == 'calliope') text = '((' + pic + alt + '))'
    if ($ ('#formatter-id').val () == 'neasden') text = pic + alt
    if (!text) return
    field = document.getElementById ('text')
    field.focus ()
    if (field.selectionStart || field.selectionStart == '0') {
      selStart = field.selectionStart
      selEnd = field.selectionEnd
      textToPaste = text;
      extraLength = 0
      
      if (selStart == selEnd) {
        selStartBefore = selStart
        while ((field.value.charAt (selStart) != '\r') && (field.value.charAt (selStart) != '\n') && (selStart > 0)) { selStart -= 1 }
        while ((field.value.charAt (selStart) == '\r') || (field.value.charAt (selStart) == '\n')) { selStart += 1 }
        textToPaste = textToPaste + '\n\n'
        selEnd = selStart
      }
      
      field.value = field.value.substring (0, selStart) + textToPaste +
        field.value.substring (selEnd, field.value.length)
      
      field.selectionStart = // selStart
      field.selectionEnd = selStart + textToPaste.length - 2

    } else {
      field.value += '\r\n\r\n' + text
    }
    e2UpdateSubmittability ()
    field.focus ()
  }
  
  $e2AddImage = function (imageThumb, imageFull) {
    $newImage = $ ('#e2-uploaded-image-prototype').clone (true)
    $newImage.attr ('style', '')
    $newImage.css ('width', '')
    $newImage.find ('.e2-uploaded-image-preview img')
      .attr ('src', imageThumb)
      .attr ('alt', imageFull)
    $newImage.find ('.e2-uploaded-image-remover')
      .data ('file', imageFull)
    return $newImage
  }
    
  $ ('#e2-uploaded-image-prototype').click (function () {
    e2PastePic ($ (this).find ('.e2-uploaded-image-preview img').attr ('alt'))
  })
  
  e2Delfiles = function (theData, $thingToDelete) {
    $.ajax ({
      data: theData,
      url: $ ('#e2-file-remove-action').attr ('href'),
      success: function (msg) {
        //alert (msg)
        if (msg.substr (0, 6) == 'error|') {
          $thingToDelete.fadeTo (333, 1)
        } else {
          $thingToDelete.hide (333, function () { $ (this).remove () })
        }
      },
      error: function (xhr) {
        $thingToDelete.fadeTo (333, 1)
      }
    })
  }
  
  $ ('.e2-uploaded-image-remover').click (function () {
    var $picToDelete = $ (this).parent ().parent ()
    $picToDelete.fadeTo (333, 0.5)
    e2Delfiles ({
      'file': $ (this).data ('file')
    }, $picToDelete)
    return false
  })
  
  $ ('#e2-uploaded-images').children ().each (function () {
    imageThumb = $ (this).find ('.e2-uploaded-image-preview img').attr ('src')
    imageFull = $ (this).find ('.e2-uploaded-image-preview img').attr ('alt')
    $ (this).remove ()
    $e2AddImage (imageThumb, imageFull).appendTo ($ ('#e2-uploaded-images')).show ()
  })
  
  var e2CanUploadThisFile = function (file) {
    ext = ''
    if ((dot = file.lastIndexOf ('.')) != -1) ext = file.substr (dot + 1)
    $ ('.e2-upload-error').slideUp (333)
    if (/^gif|jpe?g|png|mp3$/i.test (ext)) {
      $ ('#e2-uploading').show ().css ('opacity', 1)
      $ ('#e2-upload-button').hide ()
      return true
    } else {
      $ ('#e2-upload-error-images-only').slideDown (333)
      return false
    }
  }
  
  var e2DoneUploadingThisFileWithResponse = function (file, response) {
    if (response.substr (0, 6) == 'image|') {
      image = response.substr (6).split ('|')
      imageFull = image[0]
      imageThumb = image[1]
      e2PastePic (imageFull)
      $e2AddImage (imageThumb, imageFull).appendTo ($ ('#e2-uploaded-images')).show (333, function () {
        $ ('#e2-uploading').hide ()
        $ ('#e2-upload-button').show ()
      })
    } else if (response.substr (0, 6) == 'audio|') {
      audio = response.substr (6).split ('|')
      audioFull = audio[0]
      audioThumb = audio[1]
      e2PastePic (audioFull)
      $e2AddImage (audioThumb, audioFull).appendTo ($ ('#e2-uploaded-images')).show (333, function () {
        $ ('#e2-uploading').hide ()
        $ ('#e2-upload-button').show ()
      })
    } else if (response.substr (0, 6) == 'error|') {
      $ ('#e2-uploading').hide ()
      $ ('#e2-upload-button').show ()
      if (response.substr (6) == 'could-not-create-thumbnail') {
        $ ('#e2-upload-error-cannot-create-thumbnail').slideDown (333)
      } else {
        $ ('#e2-upload-error-cannot-upload').slideDown (333)
      }
    }
    e2ClearUploadBuffer ()
  }
  
  new AjaxUpload ('e2-upload-button', {
    action: $ ('#e2-file-upload-action').attr ('href'),
    autoSubmit: true,
    onSubmit: e2CanUploadThisFile,
 		onComplete: e2DoneUploadingThisFileWithResponse,
  })

  $ ('#e2-upload-controls').show ()

  e2ClearUploadBuffer = function () {
    if (filesToUpload.length) {
      file = filesToUpload.shift ()
      filename = file.name
      if (e2CanUploadThisFile (filename)) {
        e2UploadFile (
          file,
          $ ('#e2-file-upload-action').attr ('href'),
          function (data, textStatus, jqHXR) {
            e2DoneUploadingThisFileWithResponse (filename, data)
          }
        )
      }
      return false
    } else {
      return true
    }
  }
  
  
  e2DropPictures = function (e) {
    dt = e.originalEvent.dataTransfer
    if (!dt && !dt.files) return

    var files = dt.files
    for (i = 0; i < files.length; i++) {
      filesToUpload.push (files[i])
    }

    e2ClearUploadBuffer ()

    return false
  }
  
  $ ('.e2-note-text-textarea').bind ('drop', e2DropPictures)


  
})