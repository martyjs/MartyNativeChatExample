var _ = require('lodash');
var React = require('react-native');
var Marty = require('marty-native');
var RoomsStore = require('../stores/roomsStore');
var MessagesStore = require('../stores/messagesStore');

var {
  Component,
  ScrollView,
  View,
  Text,
  TextInput
} = React;

var styles = {
  messages: {
  },
  message: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC'
  },
  newMessage: {
    borderWidth: 0.5,
    borderColor: '#0f0f0f',
    flex: 1,
    fontSize: 13,
    height: 50,
    padding: 4,
    marginBottom: 4
  }
}

class Room extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = { message: '' };
    this.sendMessage = this.sendMessage.bind(this);
  }
  render() {
    var room = this.props.room;
    var messages = _.sortBy(this.props.messages, message => new Date(message.timestamp));

    return (
      <ScrollView style={styles.room}>
        <View style={styles.messages}>
          {messages.map(this.renderMessage)}
        </View>
        <TextInput
          style={styles.newMessage}
          value={this.state.message}
          onSubmitEditing={this.sendMessage}
          onChangeText={(text) => this.setState({message: text})} />
      </ScrollView>
    );
  }
  sendMessage() {
    this.context.app.messageActionCreators.sendMessage(
      this.state.message,
      this.props.room.id
    );
    this.setState({
      message: ''
    });
    return false;
  }
  renderMessage(message) {
    return (
      <View>
        <Text style={styles.message}>
          {message.text}
        </Text>
      </View>
    );
  }
}

Room.contextTypes = Marty.contextTypes;

module.exports = Marty.createContainer(Room, {
  listenTo: ['roomsStore', 'messagesStore'],
  fetch: {
    room() {
      return this.app.roomsStore.getRoom(this.props.data.id)
    },
    messages() {
      return this.app.messagesStore.getMessagesForRoom(this.props.data.id)
    }
  },
  failed(errors) {
    return <View><Text>Failed to load room</Text></View>;
  }
});