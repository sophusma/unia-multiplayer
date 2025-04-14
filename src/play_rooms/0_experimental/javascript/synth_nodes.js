import * as Tone from 'tone'

import * as bassSettings from '../tunes/bass.js'
import * as melodySettings from '../tunes/melody.js'

const toneNodes = {}

function initBass() {
  const { synth, chorus, pingPongDelay, reverb, distortion } =
    bassSettings.preset

  //ДОБАВЛЯЮ ЭФФЕКТЫ
  toneNodes.bassSynth = new Tone.Synth(synth)
  toneNodes.bassChorus = new Tone.Chorus(chorus).start()
  toneNodes.bassReverb = new Tone.Distortion(distortion).toDestination()
  toneNodes.bassDistortion = new Tone.Reverb(reverb).toDestination()
  toneNodes.bassPingPongDelay = new Tone.PingPongDelay(
    pingPongDelay
  ).toDestination()

  //ПОРЯДОК ВОЗДЕЙСТВИЯ
  toneNodes.bassSynth.chain(
    toneNodes.bassChorus,
    toneNodes.bassPingPongDelay,
    toneNodes.bassDistortion,
    toneNodes.bassReverb
  )

  toneNodes.bassPart = new Tone.Part((time, note) => {
    toneNodes.bassSynth.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, bassSettings.sequence.notes).start(0)

  toneNodes.bassPart.loopEnd = bassSettings.sequence.duration
  toneNodes.bassPart.loop = bassSettings.sequence.loop
}

function initMelody() {
  const { synth, chorus, distortion, bitCrusher, pingPongDelay } =
    melodySettings.preset

  toneNodes.melodySynth = new Tone.Synth(synth)
  toneNodes.melodyChorus = new Tone.Chorus(chorus).start()
  toneNodes.melodyDistortion = new Tone.Distortion(distortion)
  toneNodes.melodyBitCrusher = new Tone.BitCrusher(bitCrusher)
  toneNodes.melodyPingPongDelay = new Tone.PingPongDelay(
    pingPongDelay
  ).toDestination()

  toneNodes.melodySynth.chain(
    toneNodes.melodyChorus,
    toneNodes.melodyDistortion,
    toneNodes.melodyBitCrusher,
    toneNodes.melodyPingPongDelay
  )

  toneNodes.melodyPart = new Tone.Part((time, note) => {
    toneNodes.melodySynth.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, melodySettings.sequence.notes).start(0)

  toneNodes.melodyPart.loopEnd = melodySettings.sequence.duration
  toneNodes.melodyPart.loop = melodySettings.sequence.loop
}

function initToneTransport() {
  Tone.Transport.bpm.value = 80
  Tone.Transport.start()
}

function setBassProperty(property, value) {
  if (property === 'bassSoundPreset') {
    if (value === 'default') {
      toneNodes.bassChorus.frequency.value = 1.5
      toneNodes.bassChorus.delayTime = 3.5
      toneNodes.bassPingPongDelay.wet.value = 0.2
      toneNodes.bassPingPongDelay.delayTime.value = 0.25
    } else if (value === 'preset1') {
      toneNodes.bassChorus.frequency.value = 10
      toneNodes.bassChorus.delayTime = 5.5
      toneNodes.bassPingPongDelay.wet.value = 0.4
      toneNodes.bassPingPongDelay.delayTime.value = 0.4
    } else if (value === 'preset2') {
      toneNodes.bassChorus.frequency.value = 30
      toneNodes.bassChorus.delayTime = 8.5
      toneNodes.bassPingPongDelay.wet.value = 0.6
      toneNodes.bassPingPongDelay.delayTime.value = 0.6
    }
  } else if (property === 'bpm') {
    Tone.Transport.bpm.value = value
  } else if (property === 'bassReverbWet') {
    toneNodes.bassReverb.wet.value = value
  } else if (property === 'distortionWet') {
    toneNodes.bassDistortion.wet.value = value
  } else if (property === 'bassVolume') {
    toneNodes.bassSynth.volume.value = value // Tone.dbToGain(value) переводит значение громкости из заданного диапозона в тонДс децибелы
  } else {
    console.error('Bass node is not initialized.')
  }
}

function setMelodyProperty(property, value) {
  if (property === 'melodySoundPreset') {
    if (value === 'default') {
      toneNodes.melodyDistortion.wet.value = 0
      toneNodes.melodyDistortion.distortion = 0
      toneNodes.melodyPingPongDelay.wet.value = 0.6
    } else if (value === 'preset1') {
      toneNodes.melodyDistortion.wet.value = 0.4
      toneNodes.melodyDistortion.distortion = 0.5
      toneNodes.melodyPingPongDelay.wet.value = 1
    } else if (value === 'preset2') {
      toneNodes.melodyDistortion.wet.value = 0.8
      toneNodes.melodyDistortion.distortion = 0.8
      toneNodes.melodyPingPongDelay.wet.value = 0
    }
  } else if (property === 'bpm') {
    Tone.Transport.bpm.value = value
  } else if (property === 'melodyVolume') {
    toneNodes.melodySynth.volume.value = value
  } else {
    console.error('Bass node is not initialized.')
  }
}

// function setToneNodeProperty(property, value, type) {
//   if (type === 'bass') {
//     setBassProperty(property, value)
//   } else if (type === 'melody') {
//     setMelodyProperty(property, value)
//   }
// }
function setToneNodeProperty(property, value, type) {
  if (property === 'bpm') {
    Tone.Transport.bpm.value = value
    console.log('BPM updated to', value)
    return
  }

  if (property === 'bassVolume') {
    setBassProperty(property, value)
    return
  }
  if (property === 'melodyVolume') {
    setMelodyProperty(property, value)
    return
  }

  if (type === 'bass') {
    setBassProperty(property, value)
  } else if (type === 'melody') {
    setMelodyProperty(property, value)
  }
}

function initToneNodes() {
  initBass()
  initMelody()
  initToneTransport()
}

export {
  initToneNodes,
  setToneNodeProperty,
  setBassProperty,
  setMelodyProperty
}
