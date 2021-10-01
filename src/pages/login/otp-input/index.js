import React, { useState } from 'react';
import { func } from 'prop-types';
import { Input, Button } from 'antd';
import { UnlockOutlined } from '@ant-design/icons';

import { setUserData } from '../../../utils/firebaseUtils'

const OtpInput = ({ setParentState, phoneNum }) => {
  const [otp, setOtp] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleOtpChange = ({ target: { value }}) => {
    setOtp(value)
  }

  const handlePhoneSubmit = () => {
    setIsSubmitting(true)
    window.confirmationResult.confirm(otp).then((result) => {
      setIsSubmitting(false)
      const { additionalUserInfo: { isNewUser }} = result
      const user = result.user;
      const userId = user.uid;
      if(isNewUser) {
        setUserData(userId, {
          phoneNum,
          phoneCode: '+91',
        })
      }
    }).catch((error) => {
      console.log("error whle otp", error)
      setIsSubmitting(false)
      setParentState({ isError: true, errorMessage: 'Entered Otp is wrong' })
    });
  }

  const onEdit = () => setParentState({ screen: "phone" })

  return (
    <div className="phone-input">
      <div className="phone-input__title">
        Otp has been sent on <span>{phoneNum}</span>,
        <br />
        Please enter that otp
      </div>
      <Input
        size="large"
        placeholder="Otp"
        prefix={<UnlockOutlined />}
        onChange={handleOtpChange}
        value={otp}
      />
      <div className="phone-input__edit" onClick={onEdit}>Edit Phone Number</div>
      <Button
        size="large"
        type="primary"
        className="phone-input__submit"
        onClick={handlePhoneSubmit}
        id="sign-in-button"
        loading={isSubmitting}
      >
        Enter
      </Button>
    </div>
  )
}

OtpInput.propTypes = {
  setParentState: func,
}

OtpInput.defaultProps = {
  setParentState() {}
}


export default OtpInput
