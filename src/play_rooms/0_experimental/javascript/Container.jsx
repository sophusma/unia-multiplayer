import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { initToneNodes, setToneNodeProperty } from './synth_nodes.js'
import { bassSettings } from '../tunes/bass.js'
import { melodySettings } from '../tunes/melody.js'
import { padSettings } from '../tunes/pad.js'

import SC_Button from '../../../javascript/components/SC_Button.jsx'
import SC_Slider from '../../../javascript/components/SC_Slider.jsx'
import SC_Knob from '../../../javascript/components/SC_Knob.jsx'
import SC_ToggleButtonSet from '../../../javascript/components/SC_ToggleButtonSet.jsx'
import { sendToFirebase } from '../../../javascript/firebase_io.js'

export default class Container extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isStarted: false,
      selectedSynth: null,

      activePresets: {
        melody: false,
        bass: false,
        pad: false
      },
      bassSoundPreset: 'default',
      melodySoundPreset: 'default',
      padSoundPreset: 'default',

      //БАСС
      bassVolume: -25,
      bassReverbWet: 0.3,
      bassDistortionWet: 0,

      //МЕЛОДИЯ
      melodyVolume: -20,

      //ПЭД
      padVolume: -12,

      //МАСТЕР
      masterVolume: -20,
      masterReverbWet: 0.2,
      masterBpm: 80
    }
  }

  handleStart = () => {
    this.setState({
      isStarted: true
    })

    initToneNodes()
  }

  handleMasterChange = (property, value) => {
    this.setState({
      [property]: value
    })

    // Применяем это изменение ко всем синтезаторам
    if (property === 'masterVolume') {
      setToneNodeProperty('bassVolume', value, 'bass')
      setToneNodeProperty('melodyVolume', value, 'melody')
      setToneNodeProperty('padVolume', value, 'pad')
    }

    if (property === 'masterReverbWet') {
      setToneNodeProperty('bassReverbWet', value, 'bass')
      setToneNodeProperty('melodyReverbWet', value, 'melody')
      setToneNodeProperty('padReverbWet', value, 'pad')
    }

    if (property === 'masterBPM') {
      setToneNodeProperty('bassBPM', value, 'bass')
      setToneNodeProperty('melodyBPM', value, 'melody')
      setToneNodeProperty('padBPM', value, 'pad')
    }

    sendToFirebase(property, value)
  }

  // handleChange = (property, value, type = '') => {
  //   this.setState({
  //     [property]: value
  //   })

  //   setToneNodeProperty(property, value, type)

  //   if (property === 'bassSoundPreset') {
  //     const bassPresetSettings = bassSettings?.presets?.[value]
  //     if (bassPresetSettings) {
  //       this.setState({
  //         bassReverbWet: bassPresetSettings.reverbWet,
  //         bassDistortionWet: bassPresetSettings.distortionWet,
  //         bassVolume: bassPresetSettings.volume
  //       })
  //     } else {
  //       console.warn(`Пресет ${value} не найден в bassSettings.presets`)
  //     }
  //   }

  //   if (property === 'melodySoundPreset') {
  //     const melodyPresetSettings = melodySettings?.presets?.[value]
  //     if (melodyPresetSettings) {
  //       this.setState({
  //         melodyVolume: melodyPresetSettings.volume
  //       })
  //     } else {
  //       console.warn(`Пресет ${value} не найден в melodySettings.presets`)
  //     }
  //   }

  //   if (property === 'padSoundPreset') {
  //     const padPresetSettings = padSettings?.presets?.[value]
  //     if (padPresetSettings) {
  //       this.setState({ padVolume: padPresetSettings.volume })

  //       setToneNodeProperty('padVolume', padPresetSettings.volume, 'pad')
  //     }
  //   }

  //   sendToFirebase(property, value)
  // }

  // Универсальная функция для обработки клика по кнопке
  handleChange = (property, value, type = '') => {
    this.setState({
      [property]: value
    })

    setToneNodeProperty(property, value, type)

    if (property === 'bassSoundPreset') {
      const bassPresetSettings = bassSettings?.presets?.[value]
      if (bassPresetSettings) {
        this.setState({
          bassReverbWet: bassPresetSettings.reverbWet,
          bassDistortionWet: bassPresetSettings.distortionWet,
          bassVolume: bassPresetSettings.volume
        })
      } else {
        console.warn(`Пресет ${value} не найден в bassSettings.presets`)
      }
    }

    if (property === 'melodySoundPreset') {
      const melodyPresetSettings = melodySettings?.presets?.[value]
      if (melodyPresetSettings) {
        this.setState({
          melodyVolume: melodyPresetSettings.volume
        })
      } else {
        console.warn(`Пресет ${value} не найден в melodySettings.presets`)
      }
    }

    if (property === 'padSoundPreset') {
      const padPresetSettings = padSettings?.presets?.[value]
      if (padPresetSettings) {
        this.setState({ padVolume: padPresetSettings.volume })

        setToneNodeProperty('padVolume', padPresetSettings.volume, 'pad')
      }
    }

    sendToFirebase(property, value)
  }

  // Универсальная функция для обработки клика по кнопке
  handlePresetToggle = (presetType) => {
    this.setState((prevState) => ({
      activePresets: {
        ...prevState.activePresets,
        [presetType]: !prevState.activePresets[presetType]
      }
    }))
  }

  renderUI = () => {
    const { selectedSynth } = this.state

    return (
      <div className="Container">
        {selectedSynth === 'bass' && (
          <>
            <SC_ToggleButtonSet
              name="Bass Sound Preset"
              options={['default', 'preset1', 'preset2']}
              value={this.state.bassSoundPreset}
              property="bassSoundPreset"
              handleChange={(property, value) =>
                this.handleChange(property, value, 'bass')
              }
            />

            <SC_Slider
              name="bass volume"
              min={-60}
              max={0}
              step={5}
              value={this.state.bassVolume}
              property="bassVolume"
              handleChange={this.handleChange}
            />
            <SC_Slider
              name="Master Volume"
              min={-60}
              max={0}
              step={1}
              value={this.state.masterVolume}
              property="masterVolume"
              handleChange={this.handleMasterChange}
            />

            <SC_Knob
              name="Master Reverb"
              property="masterReverbWet"
              min={0}
              max={1}
              step={0.1}
              value={this.state.masterReverbWet}
              handleChange={this.handleMasterChange}
            />

            <SC_Knob
              name="bass reverb"
              property="bassReverbWet"
              min={0}
              max={1}
              step={0.1}
              value={this.state.bassReverbWet || 0.3}
              handleChange={this.handleChange}
            />

            <SC_Knob
              name="bass distortion"
              property="bassDistortionWet"
              min={0}
              max={1}
              step={0.1}
              value={this.state.bassDistortionWet || 0}
              handleChange={this.handleChange}
            />
          </>
        )}

        {selectedSynth === 'melody' && (
          <>
            <SC_ToggleButtonSet
              name="Melody Sound Preset"
              options={['default', 'preset1', 'preset2']}
              value={this.state.melodySoundPreset}
              property="melodySoundPreset"
              handleChange={(property, value) =>
                this.handleChange(property, value, 'melody')
              }
            />

            <SC_Slider
              name="melody volume"
              min={-60}
              max={0}
              step={5}
              value={this.state.melodyVolume}
              property="melodyVolume"
              handleChange={this.handleChange}
            />
          </>
        )}

        {selectedSynth === 'pad' && (
          <>
            <SC_ToggleButtonSet
              name="Pad Sound Preset"
              options={['default', 'preset1', 'preset2']}
              value={this.state.padSoundPreset}
              property="padSoundPreset"
              handleChange={(property, value) =>
                this.handleChange(property, value, 'pad')
              }
            />

            <SC_Slider
              name="pad volume"
              min={-60}
              max={0}
              step={5}
              value={this.state.padVolume}
              property="padVolume"
              handleChange={this.handleChange}
            />
          </>
        )}

        {/* Можно добавить универсальные контролы вроде BPM, если нужно */}
        <SC_Slider
          name="BPM"
          min={0}
          max={300}
          step={1}
          value={this.state.masterBpm}
          property="masterBpm"
          handleChange={(property, value) =>
            this.handleChange(property, value, '')
          }
        />
      </div>
    )
  }

  renderStartButton = () => {
    return <SC_Button text="начать" handleClick={this.handleStart} />
  }

  render() {
    const { isStarted, selectedSynth } = this.state

    return (
      <div className="Container">
        {!isStarted ? (
          <>
            <SC_ToggleButtonSet
              name="Выбор синтезатора"
              options={['bass', 'melody', 'pad']}
              value={selectedSynth}
              property="selectedSynth"
              handleChange={this.handleChange}
            />
            {this.renderStartButton()}
          </>
        ) : (
          this.renderUI()
        )}
      </div>
    )
  }
}
