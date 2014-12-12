# Publisher Display Dashboard

Based on [display-screen](https://github.com/edds/display-screen) by @edds.

To run the server you will need the following `ENV` variables set:

```
CLIENT_ID
CLIENT_SECRET
REFRESH_TOKEN
```

You can create the client id and client secret using the [Google developer
console][1]. You need to generate the refresh token, there is a [short Ruby
script to create one for you][2].

Once you have them you can start the server running:

```
CLIENT_ID=... CLIENT_SECRET=... REFRESH_TOKEN=... ruby ./server.rb
```

You can then browse to the server in your browser.

[1]: https://developer.google.com/console
[2]: https://gist.github.com/edds/9363713
