Package.describe({
  name: 'davalb:changetip',
  summary: 'Changetip for Meteor',
  version: '0.0.1',
  git: 'https://github.com/davalb/meteor-changetip'
});


Package.onUse( function( api ){
  api.versionsFrom( '1.0' );
  var both = [ 'client', 'server' ];

  api.use( 'oauth2', both );
  api.use( 'oauth', both );
  api.use( 'http', 'server' );
  api.use( 'underscore', 'server' );
  api.use( 'random', 'client' );
  api.use( 'templating', 'client' );
  api.use( 'service-configuration', both );

  api.addFiles( 'settings.js', both );

  api.export( "Changetip" );

  api.addFiles( 'changetip_configure.html', 'client' );
  api.addFiles( 'changetip_configure.js', 'client' );

  api.addFiles( 'changetip_client.js', 'client' );
  api.addFiles( 'changetip_server.js', 'server' );

});

Package.onTest( function( api ){
  api.use('tinytest');
  api.use('davalb:changetip');
  api.addFiles('davalb:changetip-tests.js');
});
