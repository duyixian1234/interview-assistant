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
import { getContent, removeContent, setContent } from "./storage";

export function Room() {
  const [roomInput, setRoomInput] = React.useState("");
  const [room, setRoom] = React.useState("");
  const [roomIds, setRoomIds] = React.useState([]);
  const [selected, setSelected] = React.useState("");
  React.useEffect(() => {
    const roomIds = new Set(getContent({ id: "roomIds" }) || []);
    setRoomIds(Array.from(roomIds));
    const _room = new URLSearchParams(document.location.search).get("_room");
    if (!_room) return;
    if (!roomIds.has(_room)) return;
    setRoom(_room);
    setRoomInput(_room);
    setSelected(_room);
    const content = getContent({ id: _room });
    setContent({ id: "default", content });
    setTimeout(() => {
      document.getElementById("iframe").contentDocument.location.reload(true);
    }, 1000);
    console.log(`Load room ${_room}`);
  }, []);
  function changeRoomInput({ target }) {
    setRoomInput(target.value);
  }
  function changeRoom() {
    console.log(`Change room to ${roomInput}`);
    setRoom(roomInput);
    setTimeout(() => {
      document.getElementById("iframe").contentDocument.location.reload(true);
    }, 1000);
  }
  function random() {
    setRoomInput(nanoid(10));
    changeRoom();
  }
  function onSelectedChange(value) {
    setSelected(value);
    console.log(`Selected ${value}`);
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

  function save() {
    const id = room;
    const content = getContent({ id: "default" });
    const roomIds = new Set(getContent({ id: "roomIds" }) || []);
    roomIds.add(id);
    setContent({ id: "roomIds", content: Array.from(roomIds) });
    setContent({ id, content });
    message.success("已保存");
  }
  function load() {
    console.log("load", selected);
    message.success("已载入");
    window.location.href = `/?_room=${selected}`;
  }

  function remove() {
    const id = selected;
    const roomIds = new Set(getContent({ id: "roomIds" }) || []);
    roomIds.delete(id);
    setContent({ id: "roomIds", content: Array.from(roomIds) });
    removeContent({ id });
    console.log("remove content", id);
    message.success("已删除");
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
              <Button type="primary" onClick={save}>
                保存
              </Button>
            </Space>
          </Col>
        </Row>
        <Row style={{ padding: "10px" }}>
          <Space>
            <Select
              style={{ width: 200 }}
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
            id="iframe"
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
