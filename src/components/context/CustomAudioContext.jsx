import React, { createContext, useContext, useState } from 'react';

// 1. Create Context
const CustomAudioContext = createContext();

// 2. Provider with two grouped objects
export const CustomAudioProvider = ({ children }) => {
  const [variable0InstrumentOptions, setVariable0InstrumentOptions] = useState({
    instrument: 'drone',
    carrierWaveformType: 'sine',
    modulatorWaveformType: 'triangle',
    modulationFrequency: 220,
    harmonicity: 1,
    modulationIndex: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.7,
    release: 0.3,
    vibratoDepth: 10,
    vibratoFrequency: 5,
    tremoloDepth: 0.5,
    tremoloRate: 6,
    electricGuitarTone: 'clean',
    minFrequency: 261.63,
    maxFrequency: 1046.50,
    note: 'C',
    lowestOctave: '0',
    highestOctave: '8',
    playingRole: 'melody'
  });

  const [variable1InstrumentOptions, setVariable1InstrumentOptions] = useState({
    instrument: 'drone',
    carrierWaveformType: 'sine',
    modulatorWaveformType: 'triangle',
    modulationFrequency:220,
    harmonicity: 1,
    modulationIndex: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.7,
    release: 0.3,
    vibratoDepth: 10,
    vibratoFrequency: 5,
    tremoloDepth: 0.5,
    tremoloRate: 6,
    electricGuitarTone: 'clean',
    minFrequency: 261.63,
    maxFrequency: 1046.50,
    note: 'C',
    lowestOctave: '0',
    highestOctave: '8',
    playingRole: 'melody'
  });

  const [variable2InstrumentOptions, setVariable2InstrumentOptions] = useState({
    instrument: 'drone',
    carrierWaveformType: 'sine',
    modulatorWaveformType: 'triangle',
    modulationFrequency:220,
    harmonicity: 1,
    modulationIndex: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.7,
    release: 0.3,
    vibratoDepth: 10,
    vibratoFrequency: 5,
    tremoloDepth: 0.5,
    tremoloRate: 6,
    electricGuitarTone: 'clean',
    minFrequency: 261.63,
    maxFrequency: 1046.50,
    note: 'C',
    lowestOctave: '0',
    highestOctave: '8',
    playingRole: 'melody'
  });

  const [variable3InstrumentOptions, setVariable3InstrumentOptions] = useState({
    instrument: 'drone',
    carrierWaveformType: 'sine',
    modulatorWaveformType: 'triangle',
    modulationFrequency:220,
    harmonicity: 1,
    modulationIndex: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.7,
    release: 0.3,
    vibratoDepth: 10,
    vibratoFrequency: 5,
    tremoloDepth: 0.5,
    tremoloRate: 6,
    electricGuitarTone: 'clean',
    minFrequency: 261.63,
    maxFrequency: 1046.50,
    note: 'C',
    lowestOctave: '0',
    highestOctave: '8',
    playingRole: 'melody'
  });

  const [variable4InstrumentOptions, setVariable4InstrumentOptions] = useState({
    instrument: 'drone',
    carrierWaveformType: 'sine',
    modulatorWaveformType: 'triangle',
    modulationFrequency:220,
    harmonicity: 1,
    modulationIndex: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.7,
    release: 0.3,
    vibratoDepth: 10,
    vibratoFrequency: 5,
    tremoloDepth: 0.5,
    tremoloRate: 6,
    electricGuitarTone: 'clean',
    minFrequency: 261.63,
    maxFrequency: 1046.50,
    note: 'C',
    lowestOctave: '0',
    highestOctave: '8',
    playingRole: 'melody'
  });

  const [variable5InstrumentOptions, setVariable5InstrumentOptions] = useState({
    instrument: 'drone',
    carrierWaveformType: 'sine',
    modulatorWaveformType: 'triangle',
    modulationFrequency:220,
    harmonicity: 1,
    modulationIndex: 1,
    attack: 0.01,
    decay: 0.2,
    sustain: 0.7,
    release: 0.3,
    vibratoDepth: 10,
    vibratoFrequency: 5,
    tremoloDepth: 0.5,
    tremoloRate: 6,
    electricGuitarTone: 'clean',
    minFrequency: 10,
    maxFrequency: 1046.50,
    note: 'C',
    lowestOctave: '0',
    highestOctave: '8',
    playingRole: 'melody'
  });

  const [playbackOptions, setPlaybackOptions] = useState({
    playbackSpeedUnits: 'musical',
    playbackSpeed: 500,
    tempoPlaybackSpeed: 120,
    timeSignature: '44',
    key: 'C',
    scale: 'major',
    drums: 'on',
    ambientSounds: 'off',
    eq: {
        enabled: 'off',
        lowFrequencyCentre: 100,
        lowFrequencyQ: 1,
        lowFrequencyGain: 0,
        midFrequencyCentre: 1000,
        midFrequencyQ: 1,
        midFrequencyGain: 0,
        highFrequencyCentre: 10000,
        highFrequencyQ: 1,
        highFrequencyGain: 0
    },
    compression: {
        enabled: 'off',
        threshold: -24,
        ratio: 4,
        attack: 0.003,
        release: 0.25,
        knee: 30
    },
    distortion: {
        enabled: 'off',
        drive: 1
    },
    bitCrusher: {
        enabled: '',
        bitDepth: 8,
        frequencyReduction: 10
    },
    delay: {
        enabled: 'off',
        time: 0.3,
        feedbackGain: 0.4,
        wetLevel: 0.5
    },
    reverb: {
        enabled: 'off',
        preDelayTime: 0.01,
        decayTime: 1.5,
        wetLevel: 0.5
    },
    chorus: {
        enabled: 'off',
        rate: 1.5,
        depth: 7,
        wetLevel: 0.5
    },
    flanger: {
        enabled: 'off',
        rate: 0.5,
        depth: 5,
        feedback: 0.7,
        wetLevel: 0.5
    },
    phaser: {
        enabled: 'off',
        rate: 0.5,
        depth: 0.7,
        feedback: 0.6,
        wetLevel: 0.5
    },
    tremolo: {
        enabled: 'off',
        frequency: 5,
        depth: 0.5
    },
    vibrato: {
        enabled: 'off',
        frequency: 5,
        depth: 10
    },
    autoPan: {
        enabled: 'off',
        rate: 0.25,
        depth: 0.7
    }
  });

  return (
    <CustomAudioContext.Provider
      value={{
        variable0InstrumentOptions,
        setVariable0InstrumentOptions,
        variable1InstrumentOptions,
        setVariable1InstrumentOptions,
        variable2InstrumentOptions,
        setVariable2InstrumentOptions,
        variable3InstrumentOptions,
        setVariable3InstrumentOptions,
        variable4InstrumentOptions,
        setVariable4InstrumentOptions,
        variable5InstrumentOptions,
        setVariable5InstrumentOptions,
        playbackOptions,
        setPlaybackOptions
      }}
    >
      {children}
    </CustomAudioContext.Provider>
  );
};

// 3. Hook for easy access
export const useCustomAudio = () => useContext(CustomAudioContext);
