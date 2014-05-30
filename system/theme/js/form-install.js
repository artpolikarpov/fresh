if ($) $ (function () {
  var dbCount = 0
  var bingo = false
  var initialGlassCheck = true
  var xhrCheckDBConfig, xhrListDatabases

  e2UpdateSubmittability = function () {
	  shouldBeDisabled = (
      (!bingo) ||
			/^ *$/.test ($ ('#password').val ())
    )
	  if (shouldBeDisabled) {
		  $ ('#submit-button').attr ('disabled', 'disabled')
	  } else {
		  $ ('#submit-button').removeAttr ('disabled')
	  }
  }

  e2AllCompleted = function () {
    if (xhrCheckDBConfig) xhrCheckDBConfig.abort ()
    if (xhrListDatabases) xhrListDatabases.abort ()
    if (Boolean (dbCount) == ($ ('#db-database-list').css ('display') == 'none')) {
      $ ('#db-database-list').add ('#db-database').toggle ()
    }
    $ ('.e2-glass').fadeOut (333)
    initialGlassCheck = false
  }

  e2CheckDbConfig = function (me) {
    dbCount = 0

    var completedCheckDBConfig, completedListDatabases

    if (me) $ ('#' + (me.id) + '-checking').fadeIn (333)
    
    ajaxData = {
      server: $ ('#db-server').val (),
      user: $ ('#db-user').val (),
      password: $ ('#db-password').val (),
      database: $ ('#db-database').val (),
      //exists: $ ('#db-exists').attr ('checked'),
      exists: $ ('#db-exists').is (':checked'),
      prefix: $ ('#db-prefix').val ()
    }

    //alert (ajaxData.exists)
    
    $.ajaxSetup ({
      type: "post",
      timeout: 10000,
      data: ajaxData
    })
    
    $ ('#db-server').get (0).e2OldValue = $ ('#db-server').val ()
    $ ('#db-user').get (0).e2OldValue = $ ('#db-user').val ()
    $ ('#db-password').get (0).e2OldValue = $ ('#db-password').val ()
    $ ('#db-database').get (0).e2OldValue = $ ('#db-database').val ()
    $ ('#db-prefix').get (0).e2OldValue = $ ('#db-prefix').val ()
    
    clearTimeout (document.e2TimeOut)

    document.e2TimeOut = setTimeout (function () {

      if (xhrCheckDBConfig) xhrCheckDBConfig.abort ()
      if (xhrListDatabases) xhrListDatabases.abort ()

      xhrCheckDBConfig = $.ajax ({
        
        url: $ ('#e2-check-db-config-action').attr ('href'),
        
        success: function (msg) {
          $ ('.livecheckable').removeClass ('verified')
          
          if (msg == 'no-connect') {
          } else if (msg == 'server-responding') {
            $ ('.db-server-ok').addClass ('verified')
            if (initialGlassCheck) $ ('#db-user').focus ()
          } else if (msg == 'server-lets-in') {
            $ ('.db-user-password-ok').addClass ('verified')
          } else if (msg == 'prefix-occupied') {
            $ ('.db-database-ok').addClass ('verified')
            $ ('#db-prefix').addClass ('wrong')
            $ ('#db-prefix-not-found').hide ()
            $ ('#db-prefix-occupied').show ()
            if (initialGlassCheck) $ ('#db-prefix').focus ()
          } else if (msg == 'prefix-not-found') {
            $ ('.db-database-ok').addClass ('verified')
            $ ('#db-prefix').addClass ('wrong')
            $ ('#db-prefix-not-found').show ()
            $ ('#db-prefix-occupied').hide ()
            if (initialGlassCheck) $ ('#db-prefix').focus ()
          } else if (msg == 'bingo') {
            if (initialGlassCheck) $ ('#password').focus ()
            $ ('.db-everything-ok').addClass ('verified')
          }

          if ((msg != 'prefix-occupied') && (msg != 'prefix-not-found')) {
            $ ('#db-prefix').removeClass ('wrong')
          }
          
          if (msg != 'prefix-occupied') {
            $ ('#db-prefix-occupied').hide ()
          }
          
          if (msg != 'prefix-not-found') {
            $ ('#db-prefix-not-found').hide ()
          }
          
          //if ((msg != 'no-connect') && (msg != 'server-responding')) {
          if (msg != 'no-connect') {
          
            if (xhrCheckDBConfig) xhrCheckDBConfig.abort ()
            if (xhrListDatabases) xhrListDatabases.abort ()
            xhrListDatabases = $.ajax ({
              
              url: $ ('#e2-list-databases-action').attr ('href'),
              
              success: function (msg) {
                if (msg) {
                  var dbs = msg.split ('|')
                  valBefore = $ ('#db-database').val ()
                  if ($ ('#db-database').val () == '') {
                    $ ('#db-database').val (dbs[0])
                  } else {
  										for (var i in dbs) {
  										if (dbs[i].match (RegExp ('^' + $ ('#db-database').val () + ''))) {
  										  $ ('#db-database').val (dbs[i])
  										  break
                      }
  									}
                  }
                  $ ('#db-database-list').empty ()
                  for (var i in dbs) {
                    ++ dbCount
                    $ ('#db-database-list')
                      .append (
                      '<option id="db-database-option-' + dbs[i] + '">' +
                      dbs[i] +
                      '<' + '/option>'
                      )
                  }

                  $ ('#db-database-list #db-database-option-' + $ ('#db-database').val ())
                    .attr ('selected', 'selected')
                    
                  $ ('#db-database').val ($ ('#db-database-list option:selected').val ())
                  $ ('#db-database-list').addClass ('verified')
                  if (valBefore != $ ('#db-database').val ()) {
                    e2CheckDbConfig ()
                  }
                }
              },
              
              error: function () {
                if (initialGlassCheck) $ ('#db-database').focus ()
              },
              
              complete: function (xhr) {
                completedListDatabases = true
                if (completedCheckDBConfig && completedListDatabases) e2AllCompleted ()
                if (initialGlassCheck) $ ('#db-prefix').focus ()
              }
              
            })

          } else {
            completedListDatabases = true
          }
          
          bingo = (msg == 'bingo')
          e2UpdateSubmittability ()
          
        },
        
        error: function (msg) {
          if (initialGlassCheck) {
            $ ('.input-editable').removeAttr ('disabled')
            $ ('#db-server').add ('#db-user').add ('#db-password').add ('#db-database').val ('')
            $ ('#db-server').focus ()
            setTimeout (function () { $ ('.e2-glass').fadeOut (333) }, 333)
            initialGlassCheck = false
          }
        },
        
        complete: function (xhr) {
          $ ('.input-editable').removeAttr ('disabled')
          completedCheckDBConfig = true
          if (completedCheckDBConfig && completedListDatabases) e2AllCompleted ()
          $ ('#e2-console').html (xhr.responseText)
          //if (me) $ ('#' + (me.id) + '-checking').fadeOut (333)
          $ ('.ajaxload').fadeOut (333)
        }
        
      })
      
    }, 333)
    
  }
  
  $ ('.input-editable').attr ('disabled', 'disabled')
  
  e2CheckDbConfig ()

  $ ('.input-editable').bind ('input', function () {
  })
  
  $ ('.livecheckable').bind ('input', function () {
    bingo = false
    e2UpdateSubmittability ()
  })

  $ ('.livecheckable').bind ('input blur', function () {
    if (!this.e2OldValue || ($ (this).val () != this.e2OldValue)) {
      $ (this).removeClass ('verified').removeClass ('wrong')
      e2CheckDbConfig (this)
    }
  })
  
  $ ('#db-database-list').bind ('change', function () {
    $ ('#db-database').val ($ ('#db-database-list').val ())
    e2CheckDbConfig (this)
  })
  
  $ ('#db-exists').bind ('change', function () {
    $ ('#db-prefix').removeClass ('verified').removeClass ('wrong')
    $ ('#db-prefix-occupied').hide ()
    $ ('#db-prefix-not-found').hide ()
    e2CheckDbConfig (this)
  })
  
  $ ('#password').bind ('input', e2UpdateSubmittability)
  
})