import { Alert, Button,message, Col, Input, Row, Space, Dropdown, Menu, Popconfirm } from "antd";
import { nanoid } from "nanoid";
import React from "react";
import { RoomCommentContext } from "./Context";
import { removeContent } from "./storage";

export function Room() {
  const { room, setRoom, rooms } = React.useContext(RoomCommentContext);
  const [roomInput, setRoomInput] = React.useState("default");
  const [matched, setMatched] = React.useState(true);

  function changeRoomInput({ target }) {
    setRoomInput(target.value);
    setMatched(false);
  }
  function changeRoom() {
    console.log(`Change room to ${roomInput}`);
    setRoom(roomInput);
    setMatched(true);
  }
  function random() {
    const newRoom = nanoid(10)
    setRoomInput(newRoom);
    console.log(`Change room to ${roomInput}`);
    setRoom(newRoom);
    setMatched(true);
  }
  function copyUrl(){
    const url = `https://code.meideng.dev/${room}`;
    const element = document.createElement("textarea");
    element.value = url;
    document.body.appendChild(element);
    element.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      message.success("已复制到剪贴板");
    }
    document.body.removeChild(element);
  }
  function deleteComments() {
    if (rooms.length <= 1) {
      message.warning("请不要删除最后一个房间");
      return;
    }
    removeContent(room);
    const newRooms = rooms.filter((val) => val !== room);
    const newRoom = newRooms[(Math.random() * 10000).toFixed(0) % newRooms.length];
    setRoomInput(newRoom);
    setRoom(newRoom);
  }
  function selectRoom(newRoom) {
    setRoomInput(newRoom);
    setRoom(newRoom);
    setMatched(true);
  }
  function renderInputWithDropDown() {
    const matchRooms = roomInput.length > 0 ? rooms.filter((val) => val.startsWith(roomInput)).map((val) => {
      return {
        key: `dropdown_${val}`,
        label: <div onClick={() => { selectRoom(val) }}>{val}</div>,
      };
    }) : [];
    return (
      <Dropdown overlay={<Menu items={matchRooms} />} visible={!matched && matchRooms.length > 0}>
        <Input
          placeholder="请输入候选人的唯一识别标记（比如手机号）"
          onChange={changeRoomInput}
          value={roomInput}
        ></Input>
      </Dropdown>
    );
  }

  return (
    <>
      <Col span={24} style={{ minWidth: 800, display: "flex", flexDirection: "column" }}>
        <Row style={{ padding: "10px", paddingTop: "20px" }}>
          <Col span={12}>
            {renderInputWithDropDown()}
          </Col>
          <Col span={12} style={{ paddingLeft: "10px" }}>
            <Space size="large">
              <Button type="primary" onClick={changeRoom}>
                切换房间
              </Button>
              <Button type="primary" onClick={random}>
                随机分配
              </Button>
              <Popconfirm
                onConfirm={deleteComments}
                title="你确定你要删除吗？"
                okText="是的"
                cancelText="我再想想"
              >
                <Button type="primary" danger>
                  删除本记录
                </Button>
              </Popconfirm>
            </Space>
          </Col>
        </Row>
        <Row style={{ padding: "10px" }}>
          <Alert
            type="info"
            message={`请将互动白板编程链接分享给候选人（点击复制链接）： https://code.meideng.dev/${room}`}
            onClick={copyUrl}
          ></Alert>
        </Row>
        <Row style={{ padding: "10px", flexGrow: 1 }}>
          <iframe
            height="100%"
            width="100%"
            src={`https://code.meideng.dev/${room}`}
            title={room}
          ></iframe>
        </Row>
      </Col>
    </>
  );
}
