var Marty = require('marty-native');
var RoomUtils = require('../utils/roomUtils');
var RoomConstants = require('../constants/roomConstants');

class RoomActionCreators extends Marty.ActionCreators {
  createRoom(name) {
    var room = RoomUtils.createRoom(name);

    this.dispatch(RoomConstants.RECIEVE_ROOMS, room);

    this.app.roomsAPI.createRoom(room).then(res => {
      this.dispatch(RoomConstants.UPDATE_ROOM, room.cid, res.body);
    });
  }
  recieveRooms(rooms) {
    this.dispatch(RoomConstants.RECIEVE_ROOMS, rooms);
  }
}

module.exports = RoomActionCreators;