import React from "react";
import "./whiteBoard.css";
export function WhiteBoard() {
    const [roomInput, setRoomInput] = React.useState("");
    const [room, setRoom] = React.useState(0);
    function changeRoomInput({ target }) {
        setRoomInput(target.value)
    }
    function changeRoom() {
        console.log(`Change room to ${roomInput}`)
        setRoom(roomInput)
    }

    return <>
        <input onChange={changeRoomInput}></input>
        <button onClick={changeRoom}> 切换房间 </button>
        <p />
        <div className="box">
            <iframe className="whiteboard" src={`https://code.meideng.dev/${room}`} title={room} ></iframe>
            <textarea className="comment" />
        </div>
        <p />
    </>
}