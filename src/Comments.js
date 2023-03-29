import { Button, Card, Col, Input, message, Row, Space, Timeline } from "antd";
import dayjs from "dayjs";
import React from "react";
import { RoomCommentContext } from "./Context";

export function Comments() {
  const scrollRef = React.useRef(null);
  const { comments, setComments } = React.useContext(RoomCommentContext);
  const [comment, setComment] = React.useState("");

  React.useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [comments]);

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

  function clearComments() {
    setComments([]);
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
                    <Button onClick={clearComments}>删除全部</Button>
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
