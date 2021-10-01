import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Alert } from "antd";

import PhoneInput from "./phone-input";
import OtpInput from "./otp-input";
import authContext from "../../components/provide-auth/context";

import "./_style.scss";

class Login extends React.Component {
  state = {
    phoneNum: "",
    isError: "",
    errorMessage: "",
    screen: "phone",
    userId: "",
  };

  componentDidMount() {
    const { location, history } = this.props;
    let { from } = location.state || { from: { pathname: "/" } };
    let auth = this.context;
    if (auth.userId) history.replace(from);
  }

  setParentState = (obj) => {
    this.setState(obj, () => {
      return obj;
    });
  };

  render() {
    const { screen, phoneNum, errorMessage } = this.state;

    return (
      <Fragment>
        <div className="login">
        {errorMessage && (
          <Alert
            message="Error"
            description={errorMessage}
            type="error"
            closable
            onClose={() => this.setState({ errorMessage: "", isError: false })}
          />
        )}

        {screen === "phone" ? (
            <PhoneInput setParentState={this.setParentState} />
          ) : (
            <OtpInput
              phoneNum={phoneNum}
              setParentState={this.setParentState}
            />
          )}

        </div>

      </Fragment>
    );
  }
}

Login.contextType = authContext;

export default withRouter(Login);
