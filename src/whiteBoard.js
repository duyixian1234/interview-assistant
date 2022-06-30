import React from "react";
import {
    Input,
    Button,
    Col,
    Row,
    Select,
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

    return (
        <>
            <Row>
                <Col span={24}>
                    <Row>
                        <Input.TextArea
                            placeholder="请输入评论或记录面试流程"
                            onChange={changeComment}
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
                        <Timeline>
                            {comments.map(({ ts, comment }) => (
                                <Timeline.Item>{`${ts.format(
                                    "HH:mm:ss"
                                )} ${comment}`}</Timeline.Item>
                            ))}
                        </Timeline>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

function ConclusionBox() {
    return (
        <Col span={8}>
            <Row style={{ padding: "20px", paddingTop: "10px" }}>
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
    function random() {
        setRoomInput(nanoid(10));
        changeRoom();
    }

    return (
        <>
            <Col Span={16}>
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
                        width="800px"
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
                    <BackTop />
                </Content>
            </Layout>
        </>
    );
}
