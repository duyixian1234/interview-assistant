import {
  Alert,
  Button,
  message,
  Col,
  Input,
  Row,
  Space,
  Select,
  Popconfirm,
} from "antd";
import { nanoid } from "nanoid";
import React from "react";
import { RoomCommentContext } from "./Context";
import { getIds, removeContent } from "./storage";

export function Room() {
  const { room, setRoom } = React.useContext(RoomCommentContext);
  const [roomInput, setRoomInput] = React.useState("");
  const [roomIds, setRoomIds] = React.useState([]);
  const [selected, setSelected] = React.useState("default");

  React.useEffect(() => {
    setRoomIds(getIds());
  }, [room, selected]);

  function changeRoomInput({ target }) {
    setRoomInput(target.value);
  }
  function changeRoom() {
    console.log(`Change room to ${roomInput}`);
    setRoom(roomInput);
  }
  function random() {
    const newRoom = nanoid(10);
    setRoomInput(newRoom);
    console.log(`Change room to ${roomInput}`);
    setRoom(newRoom);
  }
  function copyUrl() {
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
  function onSelectedChange(value) {
    setSelected(value);
  }

  function load() {
    setRoomInput(selected);
    setRoom(selected);
  }

  function remove() {
    removeContent({ id: selected });
    setRoom("");
    setRoomInput("");
    setSelected("");
  }

  return (
    <>
      <Col
        span={24}
        style={{ minWidth: 800, display: "flex", flexDirection: "column" }}
      >
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
          <Space>
            <Select
              style={{ width: 200 }}
              value={selected}
              key={selected}
              onChange={onSelectedChange}
              options={roomIds.map((id) => ({
                value: id,
                label: id,
              }))}
            ></Select>

            <Popconfirm
              title={`确认载入记录：${selected}吗？`}
              onConfirm={load}
            >
              <Button>载入</Button>
            </Popconfirm>
            <Popconfirm
              title={`确认删除记录：${selected}吗？`}
              onConfirm={remove}
            >
              <Button type="danger">删除</Button>
            </Popconfirm>
          </Space>
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
