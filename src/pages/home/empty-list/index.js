import React from "react";
import { Empty, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const EmptyList = () => {
  return (
    <Empty
      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
      imageStyle={{
        height: 80,
      }}
      description={<span>No Fasal data present</span>}
    >
      <Link to="/add-procurement" style={{ color: "white" }}>
        <Button type="primary" icon={<PlusOutlined />}>
          Add a fasal
        </Button>
      </Link>
    </Empty>
  );
};

export default EmptyList;
