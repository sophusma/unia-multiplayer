import './play_room.css'

import React from 'react'
import { createRoot } from 'react-dom/client'
import { setToneNodeProperty } from './javascript/synth_nodes.js'

import {
  sendToFirebase,
  setGetFromFirebaseCallback
} from '../../javascript/firebase_io.js'

import Container from './javascript/Container.jsx'

setGetFromFirebaseCallback(setToneNodeProperty)

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('reactComponentRoot')
  const root = createRoot(container)

  root.render(<Container sendToFirebase={sendToFirebase} />)
})
