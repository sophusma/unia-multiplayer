import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import { initToneNodes, setToneNodeProperty } from './synth_nodes.js'

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
      bassSoundPreset: 'default',
      melodySoundPreset: 'default',
      bpm: 80,

      bassVolume: -25,
      bassReverbWet: 0.3,
      bassDistortionWet: 0,

      melodyVolume: -20
    }
  }

  handleStart = () => {
    this.setState({
      isStarted: true
    })

    initToneNodes()
  }

  handleChange = (property, value, type = '') => {
    this.setState({
      [property]: value
    })

    setToneNodeProperty(property, value, type)
    sendToFirebase(property, value)
  }

  renderUI = () => {
    const { bassSoundPreset, melodySoundPreset, bpm } = this.state

    return (
      <div className="Container">
        <SC_ToggleButtonSet
          name="Bass Sound Preset"
          options={['default', 'preset1', 'preset2']}
          value={this.state.bassSoundPreset}
          property="bassSoundPreset"
          handleChange={(property, value) =>
            this.handleChange(property, value, 'bass')
          }
        />

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
          name="BPM"
          min={0}
          max={300}
          step={1}
          value={this.state.bpm}
          property="bpm"
          handleChange={(property, value) =>
            this.handleChange(property, value, '')
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
          name="melody volume"
          min={-60}
          max={0}
          step={5}
          value={this.state.melodyVolume}
          property="melodyVolume"
          handleChange={this.handleChange}
        />

        <SC_Knob
          name="bass reverb"
          property="bassReverbWet"
          min={0}
          max={1}
          step={0.1}
          value={this.state.bassReverbWet}
          handleChange={this.handleChange}
        />

        <SC_Knob
          name="bass distortion"
          property="bassDistortionWet"
          min={0}
          max={1}
          step={0.1}
          value={this.state.bassDistortionWet}
          handleChange={this.handleChange}
        />
      </div>
    )
  }

  renderStartButton = () => {
    return <SC_Button text="начать" handleClick={this.handleStart} />
  }

  render() {
    const { isStarted } = this.state

    return (
      <div className="Container">
        {isStarted ? this.renderUI() : this.renderStartButton()}
      </div>
    )
  }
}
