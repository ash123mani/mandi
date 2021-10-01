import React, { Fragment, useState, useEffect } from 'react'

import { setUserData, getUserData } from '../../utils/firebaseUtils'

import ProfileForm from '../../components/forms/profile-form'
import Loader from '../../components/loader'


const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [user, setUser] = useState({})

  useEffect(() => {
    setIsLoading(true)
    getUserData().then((userData) => {
      console.log("userData", userData)
      setUser(userData)
    }).finally(() => setIsLoading(false))
  }, [])

  const handleSubmit = (data) => {
    const sendData = {
      ...user,
      ...data
    }
    console.log("sendData", sendData)
    setIsSubmitting(true)
    setUserData(user.uid, data).finally(() => {
      setIsSubmitting(false)
    })
  }

  if(isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <Fragment>
      <ProfileForm handleSubmit={handleSubmit} user={user} />
      {isSubmitting && <Loader withOverlay />}
    </Fragment>
  )
}

export default Profile
