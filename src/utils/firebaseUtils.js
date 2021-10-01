import firebase from '../firebase'

const fireStoreDb = firebase.firestore()

const setUserData = async (userId, data) => {
    const usersRef = fireStoreDb.collection('users').doc(userId)
    const finalData = {
      ...data,
      updatedAt: new Date(),
      uid: userId,
    }
    try {
      const result = await usersRef.set(finalData)
      return result
    } catch (err) {
      return err
    }
}

const getUserData = async () => {
  const user = firebase.auth().currentUser
  const userId = user.uid
  const userRef = fireStoreDb.collection('users').doc(userId)
  try {
    const doc = await userRef.get()
    return doc.data()
  } catch(err) {
    return err
  }
}

const addProcurement = async (procurementId, data) => {
  const user = firebase.auth().currentUser
  const userId = user.uid
  const userFasalRef = fireStoreDb.collection('allProcurements').doc(userId).collection('crop').doc(procurementId)
  data.uid = userId
  data.updatedAt = new Date()
  data.procurementId = procurementId
  try {
    const result = await userFasalRef.set(data)
    console.log("result", result)
    return result
  } catch (err) {
    console.log("err", err)
    return err
  }
}


const getProcurements = async () => {
  const user = firebase.auth().currentUser
  const userId = user.uid
  let procurements = []

  const doc =  await fireStoreDb.collection('allProcurements').doc(userId).collection('crop').get()
  doc.forEach((d) => {
    if(d.exists) {
      procurements.push(d.data())
    }
  })

  return procurements
}

const getSingleProcurement = async (procurementId) => {
  const user = firebase.auth().currentUser
  const userId = user.uid

  try {
    const doc =  await fireStoreDb.collection('allProcurements').doc(userId).collection('crop').doc(procurementId).get()
    return doc.data()
  } catch(err) {
    return err
  }
}

const logOut = async () => {
  try {
    await firebase.auth().signOut()
  } catch (err) {
    console.log("error while logout", err)
  }
}

export  {
  setUserData,
  addProcurement,
  getProcurements,
  getUserData,
  logOut,
  getSingleProcurement,
}
