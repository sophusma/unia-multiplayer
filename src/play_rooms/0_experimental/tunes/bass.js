const bassSettings = {
  //INITIAL SETTINGS////////////////////////
  initialPreset: {
    synth: {
      volume: -25,
      detune: 0,
      portamento: 0.05,
      envelope: {
        attack: 0.05,
        attackCurve: 'exponential',
        decay: 0.2,
        decayCurve: 'exponential',
        sustain: 0.2,
        release: 1.5,
        releaseCurve: 'exponential'
      },
      oscillator: {
        type: 'sawtooth',
        modulationType: 'sine',
        // partialCount: 0,
        // partials: [],
        phase: 0,
        harmonicity: 0.5
      }
    },
    chorus: {
      wet: 0.3,
      type: 'sine',
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      spread: 180
    },
    pingPongDelay: { wet: 0.2, delayTime: 0.25, maxDelayTime: 1 },
    reverb: {
      decay: 2, // длительность хвоста
      preDelay: 0.01, // задержка перед началом реверба
      wet: 0.3
    },
    distortionSettings: {
      wet: 0,
      distortion: 0,
      oversample: '4x'
    }
  },
  //INITIAL МЕЛОДИЯ////////////////////////////////////////////////////////
  sequence: {
    notes: [
      {
        time: '0:0:0',
        noteName: 'C2',
        duration: '1n',
        velocity: 0.8
      },
      {
        time: '2:0:0',
        noteName: 'A2',
        duration: '1n',
        velocity: 0.7
      },
      {
        time: '4:0:0',
        noteName: 'F2',
        duration: '1n',
        velocity: 0.6
      },
      {
        time: '6:0:0',
        noteName: 'D2',
        duration: '1n',
        velocity: 0.5
      },
      {
        time: '7:0:0',
        noteName: 'C2', // Возвращаемся к исходной ноте
        duration: '1n',
        velocity: 0.8
      }
    ],
    duration: '8m',
    loop: true
  },

  //ПРЕСЕТЫ ДЛЯ СЕТБАРА////////////////////////////////////////////////////////
  presets: {
    default: {
      chorus: { frequency: 1.5, delayTime: 3.5 },
      pingPongDelay: { wet: 0.2, delayTime: 0.25 },
      distortion: { wet: 0.5 },
      reverb: { wet: 0.3 },
      sequence: [
        { time: '0:0:0', noteName: 'C2', duration: '2n', velocity: 0.9 },
        { time: '0:2:0', noteName: 'G2', duration: '4n', velocity: 0.7 },
        { time: '1:0:0', noteName: 'A2', duration: '2n', velocity: 0.8 },
        { time: '1:2:2', noteName: 'E2', duration: '8n', velocity: 0.6 },

        { time: '2:0:0', noteName: 'F2', duration: '2n', velocity: 0.8 },
        { time: '2:2:0', noteName: 'C3', duration: '4n', velocity: 0.7 },
        { time: '3:0:2', noteName: 'D2', duration: '8n', velocity: 0.6 },
        { time: '3:1:2', noteName: 'A1', duration: '8n', velocity: 0.6 },

        { time: '4:0:0', noteName: 'G2', duration: '2n', velocity: 0.8 },
        { time: '4:2:0', noteName: 'E2', duration: '4n', velocity: 0.7 },
        { time: '5:0:0', noteName: 'B1', duration: '2n', velocity: 0.5 },

        { time: '6:0:0', noteName: 'D2', duration: '4n', velocity: 0.7 },
        { time: '6:1:2', noteName: 'A2', duration: '8n', velocity: 0.9 },
        { time: '6:2:2', noteName: 'C2', duration: '8n', velocity: 0.6 },
        { time: '7:0:0', noteName: 'F2', duration: '2n', velocity: 0.8 }
      ]
    },
    preset1: {
      chorus: { frequency: 10, delayTime: 5.5 },
      pingPongDelay: { wet: 0.4, delayTime: 0.4 },
      distortion: { wet: 0.6 },
      reverb: { wet: 0.5 },
      sequence: [
        { time: '0:0:0', noteName: 'E2', duration: '1n', velocity: 0.7 },
        { time: '2:0:0', noteName: 'G2', duration: '1n', velocity: 0.6 },
        { time: '4:0:0', noteName: 'B1', duration: '1n', velocity: 0.6 }
      ]
    },
    preset2: {
      chorus: { frequency: 30, delayTime: 8.5 },
      pingPongDelay: { wet: 0.6, delayTime: 0.6 },
      distortion: { wet: 0.1 },
      reverb: { wet: 0.7 },
      sequence: [
        { time: '0:0:0', noteName: 'G1', duration: '1n', velocity: 0.9 },
        { time: '1:0:0', noteName: 'F1', duration: '1n', velocity: 0.6 },
        { time: '2:0:0', noteName: 'D1', duration: '1n', velocity: 0.7 }
      ]
    }
  }
}

export { bassSettings }
