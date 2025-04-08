const preset = {
  synth: {
    volume: -10,
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
}

const sequence = {
  notes: [
    {
      time: '0:0:0',
      noteName: 'C2', // Начинаем с основного тона
      duration: '1n', // Продолжительность удлиняем для плавности
      velocity: 0.8 // Меньше громкость для мягкости
    },
    {
      time: '2:0:0',
      noteName: 'A2', // Плавный переход на более низкую ноту
      duration: '1n',
      velocity: 0.7
    },
    {
      time: '4:0:0',
      noteName: 'F2', // Добавляем неожиданный переход
      duration: '1n',
      velocity: 0.6
    },
    {
      time: '6:0:0',
      noteName: 'D2', // Еще один неожиданный переход
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
}

export { preset, sequence }
