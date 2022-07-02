import { BackTop, Layout, Row } from "antd";
import { Comments } from "./Comments";
import { Room } from "./Room";
import { TheFooter } from "./TheFooter";
import "./whiteBoard.css";

const { Content } = Layout;

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
          <TheFooter />
        </Content>
      </Layout>
    </>
  );
}
