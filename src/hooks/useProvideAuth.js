import { useState, useEffect } from 'react'

import firebase from '../firebase'

const useProvideAuth = () => {
  const [userId, setUserId] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const getAuth = async () => {
    setIsLoading(true)
    await firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        var uid = user.uid;
        console.log('uid', uid)
        setUserId(uid)
        setIsLoading(false)
      } else {
        setUserId('')
        setIsLoading(false)
      }
    });
  }
  
  useEffect(() => {
    getAuth()
  }, [userId])

  return {
    isLoading,
    userId,
  }
}

export default useProvideAuth
