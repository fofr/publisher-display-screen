(function(){
  "use strict"
  var root = this,
  $ = root.jQuery;
  if(typeof root.app === 'undefined'){ root.app = {} }

  var users = {
    $el: false,
    nextRefresh: 0,

    endpoint: function(profileId){
      return "/realtime?"
      + "ids=ga:"+ profileId +"&"
      + "metrics=ga:activeVisitors&"
      + "dimensions=ga:pageTitle,ga:pagePath&"
      + "sort=-ga:activeVisitors&"
      + "max-results=10000";
    },

    parseResponse: function(data){
      var totalUsers = data.totalsForAllResults['ga:activeVisitors'];

      users.$totalUsers.text(totalUsers);
    },

    init: function(){
      users.$totalUsers = $('.js-total-users');
      users.reload();
      window.setInterval(users.reload, 60e3);
    },

    reload: function(){
      var endpoint = users.endpoint(root.app.settings.profileId);

      users.nextRefresh = Date.now() + 60e3;
      $.ajax({
        dataType: 'json',
        url: endpoint,
        success: users.parseResponse
      });
    }
  };

  root.app.users = users;
}).call(this);
