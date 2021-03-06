import { Button, Card, Col, Input, message, Row, Space, Timeline } from "antd";
import dayjs from "dayjs";
import React from "react";
import { getContent, init, setContent } from "./storage";

export function Comments() {
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
      message.info("ε€εΆζε");
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
            title="ε?ζΆθ?°ε½"
            size="default"
            bordered={true}
            style={{ width: "400px" }}
          >
            <Row>
              <Col span={24}>
                <Row>
                  <Input.TextArea
                    placeholder="θ―·θΎε₯θ―θ?Ίζθ?°ε½ι’θ―ζ΅η¨γCtrl + Enter ζδΊ€εε?Ή"
                    onChange={changeComment}
                    onKeyDown={handleKeyUp}
                    value={comment}
                  ></Input.TextArea>
                </Row>
                <Row style={{ paddingTop: "20px", paddingBottom: "20px" }}>
                  <Space size="middle">
                    <Button onClick={changeComments} type="default">
                      θ?°ε½
                    </Button>
                    <Button onClick={removeLastComment}>ε ι€δΈδΈζ‘</Button>
                    <Button onClick={clearComments}>ε ι€ε¨ι¨</Button>
                  </Space>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card
                  title="ι’θ―θ?°ε½δΈθ―δ»·"
                  size="default"
                  bordered={true}
                  extra={
                    <Button onClick={copy} type="primary">
                      ηΉε»ε€εΆ
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
