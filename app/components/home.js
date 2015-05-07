var _ = require('lodash');
var Marty = require('marty-native');
var React = require('react-native');

var {
  StyleSheet,
  Component,
  View,
  Text,
  ListView
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  loading: {
    fontSize: 20,
    textAlign: 'center',
    margin: 50
  },
  error: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'red'
  },
  rooms: {
    margin: 5,
    marginTop: 20,
  },
  roomListItem: {
    fontSize: 20
  }
});

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.navigateToRoom = _.bind(this.navigateToRoom, this);

    var ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2}
    );

    this.state = {
      dataSource: ds.cloneWithRows(props.rooms)
    };
  }
  render() {
    return <ListView
      style={styles.rooms}
      dataSource={this.state.dataSource}
      renderRow={(room) => <Text style={styles.roomListItem}>{room.name}</Text>} />
  }
  navigateToRoom(roomId) {
    this.context.app.navigationActionCreators.navigateToRoom(roomId);
  }
}

Home.contextTypes = Marty.contextTypes;

module.exports = Marty.createContainer(Home, {
  listenTo: 'roomsStore',
  fetch: {
    rooms() {
      return this.app.roomsStore.getAll();
    }
  },
  pending() {
    return message('Loading rooms...', styles.loading);
  },
  failed() {
    return message('Failed to load rooms.', styles.error);
  }
});

function message(text, styles) {
  return container(<Text style={styles}>{text}</Text>);
}

function container(component) {
  return <View style={styles.container}>{component}</View>;
}