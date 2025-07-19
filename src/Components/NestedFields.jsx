import React from "react";
import { Input, Select, Button, Space } from "antd";

const { Option } = Select;

const defaultField = () => ({
  key: "",
  type: "string",
  children: [],
});

function NestedFields({ fields, onChange }) {
  const handleChange = (index, key, value) => {
    const updated = [...fields];
    updated[index][key] = value;
    onChange(updated);
  };

  const addField = () => {
    const hasEmptyKey = fields.some((f) => !f.key.trim());
    if (hasEmptyKey) {
      alert("Please enter a name before adding another nested field.");
      return;
    }
    onChange([...fields, defaultField()]);
  };

  const deleteField = (index) => {
    const updated = [...fields];
    updated.splice(index, 1);
    onChange(updated);
  };

  const addNestedField = (index) => {
    if (!fields[index].key.trim()) {
      alert("Please enter a name before adding nested fields.");
      return;
    }
    const updated = [...fields];
    updated[index].type = "nested";
    updated[index].children.push(defaultField());
    onChange(updated);
  };

  const updateNested = (index, children) => {
    const updated = [...fields];
    updated[index].children = children;
    onChange(updated);
  };

  return (
    <div>
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

      <Button onClick={addField}>+ Add Field</Button>
    </div>
  );
}

export default NestedFields;
