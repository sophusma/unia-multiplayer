import * as Tone from 'tone'

import { bassSettings } from '../tunes/bass.js'
import { melodySettings } from '../tunes/melody.js'
import { padSettings } from '../tunes/pad.js'

const toneNodes = {}
function createEffect(effectType, settings) {
  const effect = new Tone[effectType](settings)
  effect.toDestination()
  return effect
}
function createFilter(type = 'lowpass', frequency = 400, rolloff = -12) {
  return new Tone.Filter({
    type: type,
    frequency: frequency,
    rolloff: rolloff
  }).toDestination()
}
function initBass() {
  const { synth, chorus, pingPongDelay, reverb, distortion } =
    bassSettings.initialPreset

  //ДОБАВЛЯЮ ЭФФЕКТЫ
  toneNodes.bassSynth = new Tone.Synth(synth)
  toneNodes.bassChorus = new Tone.Chorus(chorus).start()
  toneNodes.bassDistortion = new Tone.Distortion(distortion)
  toneNodes.bassReverb = new Tone.Reverb(reverb)
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
    melodySettings.initialPreset

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

function initPad() {
  const { synth, autoFilter, lfo, reverb } = padSettings.initialPreset

  // Создаём synth и эффекты
  toneNodes.padSynth = new Tone.Synth(synth)
  toneNodes.padAutoFilter = createEffect('AutoFilter', autoFilter).start()
  toneNodes.padReverb = new Tone.Reverb(reverb).toDestination()
  const filter = createFilter('lowpass', 400, -12)

  // LFO → filter.frequency
  if (lfo) {
    toneNodes.padLfo = new Tone.LFO({
      frequency: 0.5,
      min: 200,
      max: 800
    }).start()
    toneNodes.padLfo.connect(filter.frequency)
  }

  // Цепочка сигнала
  toneNodes.padSynth.chain(toneNodes.padAutoFilter, filter, toneNodes.padReverb)

  toneNodes.padPart = new Tone.Part((time, note) => {
    toneNodes.padSynth.triggerAttackRelease(
      note.noteName,
      note.duration,
      time,
      note.velocity
    )
  }, padSettings.sequence.notes).start(0)

  toneNodes.padPart.loopEnd = padSettings.sequence.duration
  toneNodes.padPart.loop = padSettings.sequence.loop
}

function initToneTransport() {
  Tone.Transport.bpm.value = 80
  Tone.Transport.start()
}

function setBassProperty(property, value) {
  if (property === 'bassSoundPreset') {
    const preset = bassSettings.presets[value]

    if (!preset) {
      console.warn(`Пресет ${value} не найден`)
      return
    }

    // эффекты
    toneNodes.bassChorus.frequency.value = preset.chorus.frequency
    toneNodes.bassChorus.delayTime = preset.chorus.delayTime
    toneNodes.bassPingPongDelay.wet.value = preset.pingPongDelay.wet
    toneNodes.bassPingPongDelay.delayTime.value = preset.pingPongDelay.delayTime

    // реверб/дисторшн
    toneNodes.bassReverb.wet.value = preset.reverb.wet
    toneNodes.bassDistortion.wet.value = preset.distortion.wet

    // мелодия
    if (preset.sequence) {
      toneNodes.bassPart.clear()
      preset.sequence.forEach((note) => {
        toneNodes.bassPart.add(note)
      })
    }
  } else if (property === 'bpm') {
    Tone.Transport.bpm.value = value
  } else if (property === 'bassReverbWet') {
    toneNodes.bassReverb.wet.value = value
  } else if (property === 'distortionWet') {
    toneNodes.bassDistortion.wet.value = value
  } else if (property === 'bassVolume') {
    toneNodes.bassSynth.volume.value = value
  } else {
    console.error('Bass node is not initialized.')
  }
}

function setMelodyProperty(property, value) {
  if (property === 'melodySoundPreset') {
    const preset = melodySettings.presets[value]

    if (!preset) {
      console.warn(`Пресет ${value} не найден`)
      return
    }

    // эффекты
    toneNodes.melodyDistortion.wet.value = preset.distortion.wet
    toneNodes.melodyDistortion.distortion = preset.distortion.distortion
    toneNodes.melodyPingPongDelay.wet.value = preset.pingPongDelay.wet

    // мелодия
    if (preset.sequence) {
      toneNodes.melodyPart.clear()
      preset.sequence.forEach((note) => {
        toneNodes.melodyPart.add(note)
      })
    }
  } else if (property === 'bpm') {
    Tone.Transport.bpm.value = value
  } else if (property === 'melodyVolume') {
    toneNodes.melodySynth.volume.value = value
  } else {
    console.error('Melody node is not initialized.')
  }
}

const setPadProperty = (property, value) => {
  if (property === 'padSoundPreset') {
    const preset = padSettings.presets[value]

    if (!preset) {
      console.warn(`⛔️ Пресет ${value} не найден`)
      return
    }

    // Применение эффектов
    if (preset.effects?.reverb) {
      const rev = preset.effects.reverb
      if (toneNodes.padReverb && toneNodes.padReverb.wet && isFinite(rev.wet)) {
        toneNodes.padReverb.wet.value = rev.wet
      }

      if (isFinite(rev.decay)) toneNodes.padReverb.decay = rev.decay
      if (isFinite(rev.preDelay)) toneNodes.padReverb.preDelay = rev.preDelay
    }

    // Применение автофильтра и LFO
    const effects = preset.effects || padSettings.initialPreset.effects

    // Настройка автофильтра
    if (effects.autoFilter) {
      const af = effects.autoFilter
      if (toneNodes.padAutoFilter) {
        toneNodes.padAutoFilter.frequency.value = af.frequency
        toneNodes.padAutoFilter.baseFrequency = af.baseFrequency
        toneNodes.padAutoFilter.octaves = af.octaves
        toneNodes.padAutoFilter.filter.type = af.filter.type
        toneNodes.padAutoFilter.filter.rolloff = af.filter.rolloff
        toneNodes.padAutoFilter.filter.Q.value = af.filter.Q
        toneNodes.padAutoFilter.wet.value = af.wet
      }
    }

    // Настройка LFO
    if (effects.lfo) {
      const lfo = effects.lfo
      if (toneNodes.padLFO) {
        toneNodes.padLFO.frequency.value = lfo.frequency
        toneNodes.padLFO.min = lfo.min
        toneNodes.padLFO.max = lfo.max
        toneNodes.padLFO.type = lfo.type

        // Проверка корректности target и подключение LFO
        const targetNode = toneNodes.padSynth[lfo.target.split('.')[1]]
        if (targetNode) {
          toneNodes.padLFO.connect(targetNode)
        } else {
          console.warn(`⛔️ Не удалось найти цель для LFO: ${lfo.target}`)
        }
      }
    }

    // Обновление мелодии, если она есть в пресете
    if (preset.sequence) {
      toneNodes.padPart.clear()
      preset.sequence.forEach((note) => {
        toneNodes.padPart.add(note)
      })
    }
  } else if (property === 'padVolume') {
    if (toneNodes.padSynth.volume && isFinite(value)) {
      toneNodes.padSynth.volume.value = value
    } else {
      console.warn(`⛔️ Недопустимое значение громкости:`, value)
    }
  } else {
    console.warn(`⛔️ Неизвестное свойство pad: ${property}`)
  }
}

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

  if (property === 'padVolume') {
    setPadProperty(property, value)
    return
  }

  if (type === 'bass') {
    setBassProperty(property, value)
  } else if (type === 'melody') {
    setMelodyProperty(property, value)
  } else if (type === 'pad') {
    setPadProperty(property, value)
  }
}

function initToneNodes() {
  initBass()
  initMelody()
  initPad()
  initToneTransport()
}

export {
  initToneNodes,
  setToneNodeProperty,
  setBassProperty,
  setMelodyProperty,
  setPadProperty
}
