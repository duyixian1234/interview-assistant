import { Footer } from "antd/lib/layout/layout";

export function TheFooter() {
  return (
    <Footer>
      <div style={{ maxWidth: "calc(100% - 120px)", textAlign: "center" }}>
        Made with ❤️ by{" "}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/duyixian1234"
        >
          {" "}
          Yixian Du
        </a>
      </div>
    </Footer>
  );
}
