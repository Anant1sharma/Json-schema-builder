import React from "react";
import { Layout, Typography } from "antd";
import SchemaBuilder from "./Components/SchemaBuilder";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout style={{ minHeight: "100vh", padding: "20px" }}>
      <Header style={{ background: "#fff", padding: 0 }}>
        <Title
  level={2}
  style={{
    margin: "10px 0",
    textAlign: "center",
    color: "#f25c54", 
    fontWeight: "bold",
    letterSpacing: "1px",
  }}
>
  JSON Schema Builder
</Title>

      </Header>
      <Content>
        <SchemaBuilder />
      </Content>
    </Layout>
  );
}

export default App;

