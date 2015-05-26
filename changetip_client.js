
// Request Github credentials for the user
// @param options {optional}
// @param credentialRequestCompleteCallback {Function} Callback function to call on
//   completion. Takes one argument, credentialToken on success, or Error on
//   error.
Changetip.requestCredential = function (options, credentialRequestCompleteCallback) {
  // support both (options, callback) and (callback).
  if (! credentialRequestCompleteCallback && typeof options === 'function' ) {
    credentialRequestCompleteCallback = options;
    options = {};
  }

  var config = ServiceConfiguration.configurations.findOne({ service: 'changetip' });
  if (! config ) {
    credentialRequestCompleteCallback && credentialRequestCompleteCallback( new ServiceConfiguration.ConfigError() );
    return;
  }

  var credentialToken = Random.secret();
  var loginStyle = OAuth._loginStyle( 'changetip', config, options );
  config.loginStyle = loginStyle;   // hack to make sure '?close' is not added to redirectUri; SC doesn't like it

  var loginUrl =
    'https://www.changetip.com/o/authorize/' +
    '?client_id=' + config.clientId +
    '&scope=read_user_basic' +
    '&redirect_uri=' + OAuth._redirectUri( 'changetip', config, null, { replaceLocalhost: true }) +
    '&state=' + OAuth._stateParam( loginStyle, credentialToken ) +
    '&response_type=code' +
    '&display=popup';


  OAuth.launchLogin({
    loginService: "changetip",
    loginStyle: loginStyle,
    loginUrl: loginUrl,
    credentialRequestCompleteCallback: credentialRequestCompleteCallback,
    credentialToken: credentialToken,
    popupOptions: { width: 550, height: 382 }
  });
};
