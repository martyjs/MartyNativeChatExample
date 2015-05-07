/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var Application = require('./app');
var Home = require('./app/components/home');
var AppRegistry = require('react-native').AppRegistry;

var app = new Application();

AppRegistry.registerComponent('MartyNativeChatExample', () => app.bindTo(Home));
