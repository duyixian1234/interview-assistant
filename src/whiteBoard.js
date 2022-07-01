import React from "react";
import {
  Input,
  Button,
  Col,
  Row,
  Layout,
  Space,
  Card,
  Timeline,
  Alert,
  message,
  BackTop,
} from "antd";
import dayjs from "dayjs";
import { nanoid } from "nanoid";
import { getContent, init, setContent } from "./storage";
import "./whiteBoard.css";

const { Content } = Layout;

function Comments() {
  const scrollRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [comment, setComment] = React.useState("");
  const [comments, setComments] = React.useState([]);
  React.useEffect(() => {
    if (!loading) return;
    console.log("Loading comments from storage.");
    init();
    setComments(
      getContent({ id: "default" })?.map(({ ts, comment }) => {
        return {
          ts: new dayjs(ts),
          comment,
        };
      }) || []
    );
    setLoading(false);
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [comments]);

  React.useEffect(() => {
    if (loading) return;
    setContent({ id: "default", content: comments });
  }, [comments, loading]);
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
  function copy() {
    const content = comments
      .map(({ ts, comment }) => `${ts.format("HH:mm:ss")} ${comment}`)
      .join("\n");
    const element = document.createElement("textarea");
    element.value = content;
    document.body.appendChild(element);
    element.select();
    if (document.execCommand("copy")) {
      document.execCommand("copy");
      message.info("复制成功");
    }
    document.body.removeChild(element);
  }

  function handleKeyUp(event) {
    if (event.keyCode === 13 && event.ctrlKey) {
      changeComments();
    }
  }

  return (
    <>
      <div className="comment">
        <Row style={{ paddingTop: "20px" }}>
          <Card
            title="实时记录"
            size="default"
            bordered={true}
            style={{ width: "400px" }}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Input.TextArea
                    placeholder="请输入评论或记录面试流程。Ctrl + Enter 提交内容"
                    onChange={changeComment}
                    onKeyDown={handleKeyUp}
                    value={comment}
                  ></Input.TextArea>
                </Row>
                <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                  <Space size="middle">
                    <Button onClick={changeComments} type="default">
                      记录
                    </Button>
                    <Button onClick={removeLastComment}>删除上一条</Button>
                  </Space>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card
                  title="面试记录与评价"
                  size="default"
                  bordered={true}
                  extra={
                    <Button onClick={copy} type="primary">
                      点击复制
                    </Button>
                  }
                >
                  <div
                    ref={scrollRef}
                    style={{ overflow: "auto", height: "30vh", paddingTop: 10 }}
                  >
                    <Timeline>
                      {comments.map(({ ts, comment }) => (
                        <Timeline.Item key={ts}>{`${ts.format(
                          "HH:mm:ss"
                        )} ${comment}`}</Timeline.Item>
                      ))}
                    </Timeline>
                  </div>
                </Card>
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
    </>
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

export function WhiteBoard() {
  return (
    <>
      <Layout>
        <Content>
          <Row>
            <Room />
          </Row>
          <Comments />
          <BackTop />
        </Content>
      </Layout>
    </>
  );
}
