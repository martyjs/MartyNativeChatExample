var _ = require('lodash');
var Room = require('./room');
var Marty = require('marty-native');
var React = require('react-native');

var {
  StyleSheet,
  Component,
  View,
  Text,
  ListView,
  ScrollView,
  TouchableHighlight
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
  room: {
    fontSize: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#CCC'
  }
});

class Home extends Component {
  constructor(props, context) {
    super(props, context);
    this.goToRoom = this.goToRoom.bind(this);
    this.renderRoom = this.renderRoom.bind(this);
    this.navigateToRoom = this.navigateToRoom.bind(this);
  }
  render() {
    return (
      <ScrollView>{this.props.rooms.map(this.renderRoom)}</ScrollView>
    );
  }
  renderRoom(room) {
    var goToRoom = () => this.goToRoom(room);

    return (
      <TouchableHighlight underlayColor="transparent" onPress={goToRoom}>
        <View>
          <Text style={styles.room}>{room.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }
  goToRoom(room) {
    this.props.toRoute({
      name: "Room: " + room.name,
      component: Room,
      data: {
        id: room.id
      }
    });
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