import * as React from 'react';

import { WhiteBoard } from "./whiteBoard";
import { RoomCommentContext } from "./Context";
import { getContent, setContent } from "./storage";
import dayjs from 'dayjs';
import "./App.css";

function App() {
  const [comments, setComments] = React.useState([]);
  const [room, setRoom] = React.useState('default');
  const [inited, setInited] = React.useState(false);

  React.useEffect(() => {
    console.log("Loading comments from storage.");
    setComments(
      getContent({ id: room })?.map(({ ts, comment }) => {
        console.log(ts, comment);
        return {
          ts: new dayjs(ts),
          comment,
        };
      }) || []
    );
    setInited(true);
  }, [room]);

  React.useEffect(() => {
    if (!inited) return;
    setContent({ id: room, content: comments });
    // eslint-disable-next-line
}, [comments]);

  return (
    <RoomCommentContext.Provider value={{ room, setRoom, comments, setComments }}>
      <div className="App">
        <WhiteBoard />
      </div>
    </RoomCommentContext.Provider>
  );
}

export default App;
