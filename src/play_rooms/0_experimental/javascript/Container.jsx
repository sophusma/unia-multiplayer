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
      reverbWet: 0.3,
      distortionWet: 0
    }
  }

  handleStart = () => {
    this.setState({
      isStarted: true
    })

    initToneNodes()
  }

  handleChange = (property, value, type) => {
    this.setState({
      [`${type}${property}`]: value
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
          handleChange={this.handleChange}
          // handleChange={(property, value) => {
          //   this.handleChange(property, value, 'bass')
          //   this.handleChange(property, value, 'melody')
        />

        <SC_Knob
          name="reverb"
          property="bassReverbWet"
          min={0}
          max={100}
          step={0.1}
          value={this.state.reverbWet}
          handleChange={this.handleChange}
        />

        <SC_Knob
          name="distortion"
          property="distortionWet"
          min={0}
          max={100}
          step={0.1}
          value={this.state.distortionWet}
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
