var Home = require('./home');
var React = require('react-native');
var Router = require('react-native-router');

var Root = React.createClass({
  render() {
    var firstRoute = {
      component: Home,
      name: 'marty-native chat example'
    };

    return <Router firstRoute={firstRoute} />;
  }
});

module.exports = Root;