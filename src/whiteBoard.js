import React from "react";
import "./whiteBoard.css";

function Conclusion() {
    return <>
        <span>结论</span>
        <select >
            <option value="2">不通过</option>
            <option value="1">通过</option>
        </select>
    </>
}

function Grade({ type }) {
    return <><span>{type}</span><select>
        <option value="A">A</option>
        <option value="A-">A-</option>
        <option value="B">B</option>
        <option value="B-">B-</option>
        <option value="C">C</option>
        <option value="C-">C-</option>
        <option value="D">D</option>
        <option value="D-">D-</option>
    </select></>;
}

function ConclusionBox() {
    return <div id="结论" className="conclusion">
        <Conclusion />
        <Grade type="思路" />
        <Grade type="代码实现" />
        <Grade type="沟通" />
    </div>;
}
export function WhiteBoard() {
    const [roomInput, setRoomInput] = React.useState("");
    const [room, setRoom] = React.useState("");
    function changeRoomInput({ target }) {
        setRoomInput(target.value)
    }
    function changeRoom() {
        console.log(`Change room to ${roomInput}`)
        setRoom(roomInput)
    }

    return <>
        <div className="toolbox">
            <div>
                <input onChange={changeRoomInput}></input>
                <button onClick={changeRoom}> 切换房间 </button>
            </div>
            <ConclusionBox />
        </div>
        <div className="box">
            <iframe className="whiteboard" src={`https://code.meideng.dev/${room}`} title={room} ></iframe>
            <textarea className="comment" />
        </div>
        <p />
    </>


}


