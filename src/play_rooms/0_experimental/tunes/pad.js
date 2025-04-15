const padSettings = {
  //INITIAL SETTINGS////////////////////////
  initialPreset: {
    synth: {
      volume: -10,
      detune: 5,
      portamento: 0.1,
      envelope: {
        attack: 4,
        attackCurve: 'exponential',
        decay: 2,
        decayCurve: 'exponential',
        sustain: 0.6,
        release: 6,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'triangle',
        modulationType: 'sine',
        phase: 0
        // harmonicity: 1
      }
    },
    effects: {
      reverb: {
        wet: 0.4,
        decay: 6,
        preDelay: 0.1
      },
      autoFilter: {
        frequency: '0.1hz', // медленная эволюция
        // depth: 1,
        baseFrequency: 200,
        octaves: 2.5,
        filter: {
          type: 'lowpass',
          rolloff: -24,
          Q: 1
        },
        wet: 0.5
      },
      lfo: {
        frequency: '0.05hz', // медленное движение
        min: -20,
        max: 20,
        type: 'sine',
        target: 'synth.detune'
      }
    }
  },
  //INITIAL МЕЛОДИЯ////////////////////////////////////////////////////////
  sequence: {
    notes: [
      { time: '0:0:0', noteName: 'C3', duration: '2n', velocity: 0.5 },
      { time: '2:0:0', noteName: 'A2', duration: '2n', velocity: 0.5 },
      { time: '4:0:0', noteName: 'F2', duration: '2n', velocity: 0.5 },
      { time: '6:0:0', noteName: 'G2', duration: '2n', velocity: 0.5 }
    ],
    duration: '8m',
    loop: true
  },

  //ПРЕСЕТЫ ДЛЯ СЕТБАРА////////////////////////////////////////////////////////
  presets: {
    default: {
      effects: {
        reverb: {
          wet: 0.6,
          decay: 10,
          preDelay: 0.3
        }
      },
      sequence: [
        { time: '0:0:0', note: 'C4', duration: '1n' },
        { time: '1:0:0', note: 'E4', duration: '1n' },
        { time: '2:0:0', note: 'G4', duration: '1n' },
        { time: '3:0:0', note: 'B3', duration: '1n' }
      ]
    },

    preset1: {
      effects: {
        reverb: {
          wet: 0.1,
          decay: 2,
          preDelay: 0.01
        }
      },
      sequence: [
        { time: '0:0:0', note: 'A3', duration: '1n' },
        { time: '1:0:0', note: 'C4', duration: '1n' },
        { time: '2:0:0', note: 'E4', duration: '1n' },
        { time: '3:0:0', note: 'G3', duration: '1n' }
      ]
    },

    preset2: {
      effects: {
        reverb: {
          wet: 0.3,
          decay: 4,
          preDelay: 0.05
        }
      },
      sequence: [
        { time: '0:0:0', note: 'F3', duration: '1n' },
        { time: '1:0:0', note: 'A3', duration: '1n' },
        { time: '2:0:0', note: 'C4', duration: '1n' },
        { time: '3:0:0', note: 'D3', duration: '1n' }
      ]
    }
  }
}

export { padSettings }
