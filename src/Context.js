import * as React from 'react';

const RoomCommentContext = React.createContext({
  room: 'default',
  setRoom: (room) => { },
  comments: [],
  setComments: (comments) => { },
  rooms: [],
});

export { RoomCommentContext };
