import React, { useState, useEffect } from 'react';
import { func } from 'prop-types';
import { Input, Button } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';

import firebase from '../../../firebase'

import './_style.scss'

const PhoneInput = ({ setParentState }) => {
  const [phoneNum, setPhoneNum] = useState('')
  const [isSendingOtp, setIsSendingOtp] = useState(false)

  const getOtp = () => {
    setIsSendingOtp(true)

    firebase.auth().signInWithPhoneNumber(`+91${phoneNum}`, window.recaptchaVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setIsSendingOtp(false)
        setParentState({ screen: 'otp', phoneNum })
      }).catch((error) => {
        console.log("error", error)
        setIsSendingOtp(false)
        setParentState({ isError: true, errorMessage: 'Otp could not be sent' })
        window.recaptchaVerifier.render().then(function(widgetId) {
          window.grecaptcha.reset(widgetId);
        })
      });
  }

  useEffect(() => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
      'size': 'invisible',
      'callback': (response) => {
        console.log("Success")
      },
      'expired-callback': () => {
        console.log("expired-callback")
      }
    });
  }, [])

  const handlePhoneNumChange = ({ target: { value } }) => {
    setPhoneNum(value)
  }

  const handlePhoneSubmit = () => {
    getOtp()
  }

  return (
    <div className="phone-input">
      <div className="phone-input__title">
        {/* We will send otp,
        <br /> */}
        Your Phone Number
      </div>
      <Input
        size="large"
        placeholder="Phone Number"
        prefix={<PhoneOutlined />}
        onChange={handlePhoneNumChange}
        value={phoneNum}
      />
      <Button
        size="large"
        type="primary"
        className="phone-input__submit"
        onClick={handlePhoneSubmit}
        id="sign-in-button"
        loading={isSendingOtp}
        disabled={phoneNum.length !== 10}
      >
        Enter
      </Button>
    </div>
  )
}

PhoneInput.propTypes = {
  setParentProps: func,
}

PhoneInput.defaultProps = {
  setParentProps() {},
}

export default PhoneInput
