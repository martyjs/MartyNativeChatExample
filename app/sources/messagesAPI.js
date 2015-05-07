var _ = require('lodash');
var Marty = require('marty-native');

class MessageHttpAPI extends Marty.HttpStateSource {
  constructor(options) {
    super(options);
    this.baseUrl = 'http://localhost:5000';
  }
  getMessagesForRoom(roomId) {
    return this.get(`/api/rooms/${roomId}/messages`);
  }
  createMessage(message) {
    return this.post({
      body: _.omit(message, 'cid'),
      url: format(`/api/rooms/${message.roomId}/messages`)
    });
  }
}

module.exports = MessageHttpAPI;