import { initializeApp } from 'firebase/app'
import { getDatabase, ref, push, set, onValue } from 'firebase/database'
import Cookies from 'js-cookie'

const firebaseConfig = {
  apiKey: 'AIzaSyA05hgqrTNI8yP9tWTYEArEBs8F_JpgY0c',
  authDomain: 'multiplayer-synth.firebaseapp.com',
  databaseURL:
    'https://multiplayer-synth-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'multiplayer-synth',
  storageBucket: 'multiplayer-synth.appspot.com',
  messagingSenderId: '655034490182',
  appId: '1:655034490182:web:d55ac7ad25dc34a28a1947'
}

const app = initializeApp(firebaseConfig)
const db = getDatabase()
const propertyListRef = ref(db, 'properties')

let getFromFirebaseCallback

function sendToFirebase(property, value) {
  const newPropertyRef = push(propertyListRef)

  set(newPropertyRef, {
    property,
    value
  })
}

function setGetFromFirebaseCallback(func) {
  getFromFirebaseCallback = func
}

onValue(propertyListRef, (snapshot) => {
  const data = snapshot.val()
  const keys = Object.keys(data)
  const lastKey = keys[keys.length - 1]
  const { property, value } = data[lastKey]

  getFromFirebaseCallback(property, value)
})

export { sendToFirebase, setGetFromFirebaseCallback }
