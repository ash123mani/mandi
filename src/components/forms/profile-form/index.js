import React from "react";
import { Form, Input, Button } from "antd";

class ProfileForm extends React.Component {
  onFinish = (values) => {
    const { handleSubmit } = this.props;
    handleSubmit(values);
    console.log("Success:", values);
  };

  render() {
    const { user } = this.props;
    return (
      <Form name="basic" onFinish={this.onFinish} initialValues={user}>
        <Form.Item label="Phone Number" name="phoneNum">
          <Input disabled/>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your Name!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default ProfileForm;
