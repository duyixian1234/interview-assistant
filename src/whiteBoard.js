import { BackTop, Layout, Row } from "antd";
import { Comments } from "./Comments";
import { Room } from "./Room";
import { TheFooter } from "./TheFooter";
import "./whiteBoard.css";

const { Content } = Layout;

export function WhiteBoard() {
  return (
    <>
      <Layout style={{height: "100vh"}}>
        <Content style={{height: "100%", display: "flex", flexDirection: "column"}}>
          <Row style={{flexGrow: 1}}>
            <Room />
          </Row>
          <Comments />
          <BackTop />
          <TheFooter />
        </Content>
      </Layout>
    </>
  );
}
