var Application = require('./app');
var Marty = require('marty-native');
var Root = require('./app/components/root');
var AppRegistry = require('react-native').AppRegistry;

require('marty-devtools-observer')(Marty);

var app = new Application();

AppRegistry.registerComponent('MartyNativeChatExample', () => app.bindTo(Root));
