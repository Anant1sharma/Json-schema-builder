

import React, { useState } from "react";
import { Input, Select, Button, Space, Card } from "antd";
import NestedFields from "./NestedFields";

const { Option } = Select;

const defaultField = () => ({
  key: "",
  type: "string",
  children: [],
});

function SchemaBuilder() {
  const [fields, setFields] = useState([defaultField()]);

  const handleChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    setFields(updated);
  };

  const addField = () => {
    const hasEmptyKey = fields.some((f) => !f.key.trim());
    if (hasEmptyKey) {
      alert("Please enter a field name before adding another field.");
      return;
    }
    setFields([...fields, defaultField()]);
  };

  const deleteField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    setFields(updated);
  };

  const addNestedField = (index) => {
    if (!fields[index].key.trim()) {
      alert("Please enter a name before adding nested fields.");
      return;
    }
    const updated = [...fields];
    updated[index].type = "nested";
    updated[index].children.push(defaultField());
    setFields(updated);
  };

  const updateNested = (index, children) => {
    const updated = [...fields];
    updated[index].children = children;
    setFields(updated);
  };

  const buildSchema = (fields) => {
    const obj = {};
    fields.forEach((f) => {
      if (f.type === "nested") {
        obj[f.key || ""] = buildSchema(f.children);
      } else {
        obj[f.key || ""] = f.type;
      }
    });
    return obj;
  };

  return (
    <div style={{ padding: "16px", maxWidth: "100%" }}>
      {/* Schema Builder Card */}
      <Card
        title="Schema Builder"
        headStyle={{
          backgroundColor: "#fff",
          textAlign: "center",
          color: "#f25c54",
          fontWeight: "bold",
          fontSize: "18px",
          letterSpacing: "1px",
          borderRadius: "8px",
        }}
        style={{ marginBottom: 20 }}
      >
        {fields.map((field, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <Space
              direction="horizontal"
              wrap
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <Input
                placeholder="Field Name"
                value={field.key}
                onChange={(e) => handleChange(index, "key", e.target.value)}
              />
              <Select
                value={field.type}
                style={{ width: 120 }}
                onChange={(value) => {
                  handleChange(index, "type", value);
                  if (value === "nested" && field.children.length === 0) {
                    addNestedField(index);
                  }
                  if (value !== "nested") {
                    updateNested(index, []);
                  }
                }}
              >
                <Option value="string">String</Option>
                <Option value="number">Number</Option>
                <Option value="nested">Nested</Option>
              </Select>
              <Button danger onClick={() => deleteField(index)}>
                Delete
              </Button>
              <Button onClick={() => addNestedField(index)}>+ Nested</Button>
            </Space>

            {field.type === "nested" && (
              <div
                style={{
                  paddingLeft: "20px",
                  marginTop: "10px",
                  marginBottom: "10px",
                  borderLeft: "2px solid #f25c54",
                }}
              >
                <NestedFields
                  fields={field.children}
                  onChange={(children) => updateNested(index, children)}
                />
              </div>
            )}
          </div>
        ))}

        <Button type="primary" onClick={addField}>
          + Add Field
        </Button>
      </Card>

      
      <Card
        title="Live JSON Schema Preview"
        headStyle={{
          backgroundColor: "#fff",
          textAlign: "center",
          color: "#f25c54",
          fontWeight: "bold",
          fontSize: "18px",
          letterSpacing: "1px",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            textAlign: "center",
            padding: "10px",
          }}
        >
          <pre
            style={{
              display: "inline-block",
              textAlign: "left",
              backgroundColor: "#1e1e2f",
              color: "#fff",
              padding: "10px 20px",
              borderRadius: "8px",
              fontSize: "14px",
              overflowX: "auto",
              maxWidth: "100%",
              wordBreak: "break-word",
            }}
          >
            {JSON.stringify(buildSchema(fields), null, 2)}
          </pre>
        </div>
      </Card>
    </div>
  );
}

export default SchemaBuilder;
