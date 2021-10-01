import { useContext } from 'react'

import authContext from '../components/provide-auth/context'

const useAuth = () => {
  return useContext(authContext)
}

export default useAuth
