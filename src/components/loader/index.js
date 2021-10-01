import React from "react";
import { bool } from "prop-types";
import { Spin } from "antd";
import { Loading3QuartersOutlined } from "@ant-design/icons";

import "./_style.scss";

const Loader = ({ withOverlay }) => {
  const antIcon = <Loading3QuartersOutlined style={{ fontSize: 24 }} spin />;

  if (withOverlay) {
    return (
      <div className="overlay">
        <Spin indicator={antIcon} size="large" />
      </div>
    );
  }

  return <Spin indicator={antIcon} size="large" />;
};

Loader.propTypes = {
  withOverlay: bool,
};

Loader.defaultProps = {
  withOverlay: false,
};

export default Loader;
