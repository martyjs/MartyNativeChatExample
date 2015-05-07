var _ = require('lodash');
var Marty = require('marty-native');

class RoomHttpAPI extends Marty.HttpStateSource {
  constructor(options) {
    super(options);
    this.baseUrl = 'http://localhost:5000';
  }
  getAllRooms() {
    return this.get('/api/rooms');
  }
  getRoom(id) {
    return this.get('/api/rooms/' + id);
  }
  createRoom(room) {
    return this.post({
      url: '/api/rooms',
      body: _.omit(room, 'cid')
    });
  }
}

module.exports = RoomHttpAPI;