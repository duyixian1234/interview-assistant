import { Alert, Button, Col, Input, Row, Space } from "antd";
import { nanoid } from "nanoid";
import React from "react";

export function Room() {
  const [roomInput, setRoomInput] = React.useState("");
  const [room, setRoom] = React.useState("");
  function changeRoomInput({ target }) {
    setRoomInput(target.value);
  }
  function changeRoom() {
    console.log(`Change room to ${roomInput}`);
    setRoom(roomInput);
  }
  function random() {
    setRoomInput(nanoid(10));
    changeRoom();
  }

  return (
    <>
      <Col span={24} style={{ minWidth: 800 }}>
        <Row style={{ padding: "10px", paddingTop: "20px" }}>
          <Col span={12}>
            <Input
              placeholder="请输入候选人的唯一识别标记（比如手机号）"
              onChange={changeRoomInput}
              value={roomInput}
            ></Input>
          </Col>
          <Col span={12} style={{ paddingLeft: "10px" }}>
            <Space size="large">
              <Button type="primary" onClick={changeRoom}>
                切换房间
              </Button>
              <Button type="primary" onClick={random}>
                随机分配
              </Button>
            </Space>
          </Col>
        </Row>
        <Row style={{ padding: "10px" }}>
          <Alert
            type="info"
            message={`请将互动白板编程链接分享给候选人： https://code.meideng.dev/${room}`}
          ></Alert>
        </Row>
        <Row style={{ padding: "10px" }}>
          <iframe
            height="1600px"
            width="100%"
            src={`https://code.meideng.dev/${room}`}
            title={room}
          ></iframe>
        </Row>
      </Col>
    </>
  );
}
