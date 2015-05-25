var Application = require('./app');
var Marty = require('marty-native');
var React = require('react-native');
var Router = require('react-native-router');

var { AppRegistry } = React;
var { ApplicationContainer } = Marty;

require('marty-devtools-observer')(Marty);

var app = new Application();

var Main = React.createClass({
  getInitialState() {
    return {
      app: new Application(),
      route: {
        name: 'marty-native chat example',
        component: require('./app/components/home')
      }
    };
  },
  render() {
    return (
      <ApplicationContainer app={this.state.app}>
        <Router firstRoute={this.state.route} />
      </ApplicationContainer>
    );
  }
});

AppRegistry.registerComponent('MartyNativeChatExample', () => Main);