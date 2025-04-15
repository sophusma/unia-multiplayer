const melodySettings = {
  //INITIAL SETTINGS////////////////////////
  initialPreset: {
    synth: {
      volume: -20,
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
        type: 'triangle',
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
    distortion: { wet: 0, distortion: 0, oversample: '4x' },
    bitCrusher: { wet: 0, bits: 4 },
    pingPongDelay: { wet: 0.6, delayTime: 0.25, maxDelayTime: 1 }
  },
  //INITIAL МЕЛОДИЯ////////////////////////////////////////////////////////
  sequence: {
    notes: [
      {
        time: '0:0:0',
        noteName: 'C4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:0:2',
        noteName: 'E4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:0:4',
        noteName: 'G4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:1:0',
        noteName: 'C5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:1:2',
        noteName: 'E5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:1:4',
        noteName: 'G5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:2:0',
        noteName: 'A4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:2:2',
        noteName: 'C5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:0',
        noteName: 'F4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '0:3:2',
        noteName: 'A4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:0:0',
        noteName: 'G4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:0:2',
        noteName: 'B4',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:0',
        noteName: 'C5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:1:2',
        noteName: 'E5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:2:0',
        noteName: 'D5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:2:2',
        noteName: 'F5',
        duration: '4n',
        velocity: 1
      },
      {
        time: '1:3:0',
        noteName: 'G5',
        duration: '4n',
        velocity: 1
      }
    ],
    duration: '2m',
    loop: true
  },

  //ПРЕСЕТЫ ДЛЯ СЕТБАРА////////////////////////////////////////////////////////
  //ТЕХНО
  presets: {
    default: {
      distortion: { wet: 0, distortion: 0 },
      pingPongDelay: { wet: 0.6 },
      sequence: [
        { time: '0:0:0', noteName: 'C4', duration: '8n', velocity: 0.8 },
        { time: '0:0:2', noteName: 'C4', duration: '8n', velocity: 0.8 },
        { time: '0:1:0', noteName: 'D#4', duration: '8n', velocity: 0.9 },
        { time: '0:1:2', noteName: 'C4', duration: '8n', velocity: 0.7 },
        { time: '0:2:0', noteName: 'G3', duration: '4n', velocity: 0.9 },
        { time: '0:3:0', noteName: 'F4', duration: '8n', velocity: 0.8 },
        { time: '0:3:2', noteName: 'D#4', duration: '8n', velocity: 0.8 }
      ]
    },

    //КОСМОС
    preset1: {
      distortion: { wet: 0.4, distortion: 0.5 },
      pingPongDelay: { wet: 1 },
      sequence: [
        { time: '0:0:0', noteName: 'A3', duration: '2n', velocity: 0.6 },
        { time: '0:2:0', noteName: 'C4', duration: '2n', velocity: 0.7 },
        { time: '1:0:0', noteName: 'D4', duration: '2n', velocity: 0.6 },
        { time: '1:2:0', noteName: 'E4', duration: '1n', velocity: 0.5 }
      ]
    },

    //ДЖАЗ
    preset2: {
      distortion: { wet: 0.8, distortion: 0.8 },
      pingPongDelay: { wet: 0.1 },
      sequence: [
        { time: '0:0:0', noteName: 'F#3', duration: '16n', velocity: 1 },
        { time: '0:0:2', noteName: 'C4', duration: '8n', velocity: 0.7 },
        { time: '0:1:1', noteName: 'B3', duration: '16n', velocity: 1 },
        { time: '0:1:3', noteName: 'E4', duration: '4n', velocity: 0.6 },
        { time: '0:2:1', noteName: 'G#4', duration: '8n', velocity: 1 },
        { time: '0:2:3', noteName: 'A#3', duration: '8n', velocity: 0.8 },
        { time: '0:3:1', noteName: 'C#5', duration: '8n', velocity: 0.7 }
      ]
    }
  }
}

export { melodySettings }
