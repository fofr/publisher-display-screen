(function(){
  "use strict"
  var root = this,
  $ = root.jQuery;
  if(typeof root.app === 'undefined'){ root.app = {} }

  if(typeof root.app === 'undefined'){
    root.app = {}
  }

  var manager = {
    init: function(){
      app.users.init();
    }
  };

  root.app.manager = manager;

}).call(this);
