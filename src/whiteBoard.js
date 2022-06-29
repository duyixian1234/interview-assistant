import React from "react";
import { Input, Button, Col, Row, Select, Layout, Space } from "antd";
import dayjs from "dayjs";

const { Content } = Layout;

function Conclusion() {
  return (
    <>
      <Col span={6}>
        <Space size="middle">
          <span>结论：</span>
          <Select defaultValue="不通过">
            <Select.Option value="不通过">不通过</Select.Option>
            <Select.Option value="通过">通过</Select.Option>
          </Select>
        </Space>
      </Col>
    </>
  );
}

function Grade({ type }) {
  return (
    <>
      <Col span={6}>
        <Space size="middle">
          <span>{type + "："}</span>
          <Select defaultValue="A">
            <Select.Option value="A">A</Select.Option>
            <Select.Option value="A-">A-</Select.Option>
            <Select.Option value="B">B</Select.Option>
            <Select.Option value="B-">B-</Select.Option>
            <Select.Option value="C">C</Select.Option>
            <Select.Option value="C-">C-</Select.Option>
            <Select.Option value="D">D</Select.Option>
            <Select.Option value="D-">D-</Select.Option>
          </Select>
        </Space>
      </Col>
    </>
  );
}

function Comments() {
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  function changeComment({ target }) {
    setComment(target.value);
  }
  function changeComments() {
    setComments([...comments, { ts: dayjs(), comment }]);
    setComment("");
  }
  function removeLastComment() {
    setComments(comments.splice(0, comments.length - 1));
  }
  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            <Input.TextArea
              onChange={changeComment}
              value={comment}
            ></Input.TextArea>
          </Row>
          <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
            <Button onClick={changeComments}>记录</Button>
            <Button onClick={removeLastComment}>删除上一条</Button>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {comments.map(({ ts, comment }) => (
            <Row>{`${ts.format("H:m:ss")}：${comment}`}</Row>
          ))}
        </Col>
      </Row>
    </>
  );
}

function ConclusionBox() {
  return (
    <Col span={8}>
      <Row style={{ padding: "20px" }}>
        <Conclusion />
        <Grade type="思路" />
        <Grade type="代码实现" />
        <Grade type="沟通" />
      </Row>
      <Comments />
    </Col>
  );
}

function Room() {
  const [roomInput, setRoomInput] = React.useState("");
  const [room, setRoom] = React.useState("");
  function changeRoomInput({ target }) {
    setRoomInput(target.value);
  }
  function changeRoom() {
    console.log(`Change room to ${roomInput}`);
    setRoom(roomInput);
  }

  return (
    <>
      <Col Span={16}>
        <Row style={{ padding: "20px" }}>
          <Col span={12}>
            <Input placeholder="13888888888" onChange={changeRoomInput}></Input>
          </Col>
          <Col span={12}>
            <Button onClick={changeRoom}> 切换房间 </Button>
          </Col>
        </Row>
        <Row>
          <iframe
            height="1600px"
            width="1200px"
            src={`https://code.meideng.dev/${room}`}
            title={room}
          ></iframe>
        </Row>
      </Col>
    </>
  );
}

export function WhiteBoard() {
  return (
    <>
      <Layout>
        <Content>
          <Row>
            <Room />
            <Col span={2}></Col>
            <ConclusionBox />
          </Row>
        </Content>
      </Layout>
    </>
  );
}
