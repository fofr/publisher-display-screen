(function(){
  "use strict"
  var root = this,
  $ = root.jQuery;
  if(typeof root.app === 'undefined'){ root.app = {} }

  var users = {

    endpoint: function(profileId){
      return "/realtime?"
      + "ids=ga:"+ profileId +"&"
      + "metrics=ga:activeVisitors&"
      + "dimensions=ga:pageTitle,ga:pagePath&"
      + "sort=-ga:activeVisitors&"
      + "max-results=10000";
    },

    parseApplications: function(rows) {
      var applications = {},
          environments = {preview: 0, production: 0};

      for(var i = 0, l = rows.length; i < l; i++) {
        var title = rows[i][0],
            url = rows[i][1],
            count = parseInt(rows[i][2], 10),
            urlParts = url.split('.'),
            application = urlParts[0],
            environment = urlParts[1];

        if (typeof applications[application] === "undefined") {
          applications[application] = 0;
        }

        if (typeof environments[environment] === "undefined") {
          environments[environment] = 0;
        }

        applications[application] += count;
        environments[environment] += count;
      }

      return [applications, environments];
    },

    parseResponse: function(data){
      var totalUsers = data.totalsForAllResults['ga:activeVisitors'],
          applications = users.parseApplications(data.rows);

      users.$totalUsers.text(totalUsers);
      users.$whitehallUsers.text(applications[0]['whitehall-admin']);
      users.$previewUsers.text(applications[1]['preview']);
    },

    init: function(){
      users.$totalUsers = $('.js-total-users');
      users.$whitehallUsers = $('.js-whitehall-users');
      users.$previewUsers = $('.js-preview-users');

      users.reload();
      window.setInterval(users.reload, 20e3);
    },

    reload: function(){
      var endpoint = users.endpoint(root.app.settings.profileId);

      $.ajax({
        dataType: 'json',
        url: endpoint,
        success: users.parseResponse
      });
    }
  };

  root.app.users = users;
}).call(this);
