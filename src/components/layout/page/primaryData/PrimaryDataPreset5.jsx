import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import Controls from '../../../ui/button/Controls';
import PresetOptionsPanel from '../../../ui/panel/PresetOptionsPanel';
import Modal from '../../../ui/modal/Modal';
import { Modal as bsModal } from 'bootstrap';
import TreeN1Modal from '../../../ui/modal/TreeN1Modal';
import TreeN2Modal from '../../../ui/modal/TreeN2Modal';
import TreeAnonModal from '../../../ui/modal/TreeAnonModal';
import AboutPrimaryDataModal from '../../../ui/modal/AboutPrimaryDataModal';
import PresetHelpModal from '../../../ui/modal/PresetHelpModal';
import useRealtimeUpdates from '../../../hook/useRealtimeUpdates';
import logo from '../../../../assets/stf-logo.png';
import ForestScene from '../../../ui/visualisation/animation/ForestScene';
import { getAudioContext } from '../../../context/AudioContext';

export default function PrimaryDataPreset5({ endpoints={} }) {
  const navigate = useNavigate();

  const [incrementalData, setIncrementalData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const audioCtxRef = useRef(null);
  const isFirstRender = useRef(true);

  const displacementGainNodeRef = useRef(null);
  const soilMoistureGainNodeRef = useRef(null);
  const temperatureGainNodeRef = useRef(null);
  const humidityGainNodeRef = useRef(null);
  const drumsGainNodeRef = useRef(null);
  const masterVolumeGainNodeRef = useRef(null);

  const displacementMuteNodeRef = useRef(null);
  const soilMoistureMuteNodeRef = useRef(null);
  const temperatureMuteNodeRef = useRef(null);
  const humidityMuteNodeRef = useRef(null);
  const drumsMuteNodeRef = useRef(null);
  const masterVolumeMuteNodeRef = useRef(null);

  const displacementPannerNodeRef = useRef(null);
  const soilMoisturePannerNodeRef = useRef(null);
  const temperaturePannerNodeRef = useRef(null);
  const humidityPannerNodeRef = useRef(null);
  const drumsPannerNodeRef = useRef(null);
  const masterVolumePannerNodeRef = useRef(null);

  const [hide, setHide] = useState(false);
  const hideOnClick = () => setHide(!hide);
  const [mute, setMute] = useState(false);
  const muteOnClick = () => setMute(!mute);
  const [pause, setPause] = useState(false);
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(true);
  const [initialiseVisuals, setInitialiseVisuals] = useState(true);
  const [refinedDataValues, setRefinedDataValues] = useState([]);
  const [hideMute, setHideMute] = useState(true);

  useEffect(() => {
    if (masterVolumeMuteNodeRef.current) setHideMute(false);
    else setHideMute(true);
  }, [play, masterVolumeMuteNodeRef.current]);
  const scene = true;

  const pauseOnClick = () => {
    setPlay(false);
    setPause(true);
    setStop(false);
    stopSound();
  };
  const playOnClick = () => {
    setInitialiseVisuals(false);
    setPlay(true);
    setPause(false);
    setStop(false);
    playSound();
  };

  const [variable0Volume, setVariable0Volume] = useState(100);
  const variable0SetVolume = volume => {
    setVariable0Volume(volume);
    const audioCtx = audioCtxRef.current;
    const displacementGainNode = displacementGainNodeRef.current;
    displacementGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.8), audioCtx.currentTime + 0.01);
  };
  const [variable0Mute, setVariable0Mute] = useState(false);
  const variable0MuteOnClick = () => setVariable0Mute(!variable0Mute);
    
  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const displacementMuteNode = displacementMuteNodeRef.current;
    if (variable0Mute) displacementMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else displacementMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume * 0.8), audioCtx.currentTime + 0.01);
  }, [variable0Mute]);

  const [variable1Volume, setVariable1Volume] = useState(100);
  const variable1SetVolume = volume => {
    setVariable1Volume(volume);
    const audioCtx = audioCtxRef.current;
    const soilMoistureGainNode = soilMoistureGainNodeRef.current;
    soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.8), audioCtx.currentTime + 0.01);
  };
  const [variable1Mute, setVariable1Mute] = useState(false);
  const variable1MuteOnClick = () => setVariable1Mute(!variable1Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const soilMoistureMuteNode = soilMoistureMuteNodeRef.current;
    if (variable1Mute) soilMoistureMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else soilMoistureMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume * 0.8), audioCtx.currentTime + 0.01);
  }, [variable1Mute]);

  const [variable2Volume, setVariable2Volume] = useState(100);
  const variable2SetVolume = volume => {
    setVariable2Volume(volume);
    const audioCtx = audioCtxRef.current;
    const temperatureGainNode = temperatureGainNodeRef.current;
    temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
  };
  const [variable2Mute, setVariable2Mute] = useState(false);
  const variable2MuteOnClick = () => setVariable2Mute(!variable2Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const temperatureMuteNode = temperatureMuteNodeRef.current;
    if (variable2Mute) temperatureMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else temperatureMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume), audioCtx.currentTime + 0.01);
  }, [variable2Mute]);

  const [variable3Volume, setVariable3Volume] = useState(100);
  const variable3SetVolume = volume => {
    setVariable3Volume(volume);
    const audioCtx = audioCtxRef.current;
    const humidityGainNode = humidityGainNodeRef.current;
    humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
  };
  const [variable3Mute, setVariable3Mute] = useState(false);
  const variable3MuteOnClick = () => setVariable3Mute(!variable3Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const humidityMuteNode = humidityMuteNodeRef.current;
    if (variable3Mute) humidityMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else humidityMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume), audioCtx.currentTime + 0.01);
  }, [variable3Mute]);
  
  const [playbackSpeed, setPlaybackSpeed] = useState(50);
  const playbackSpeedSet = playbackSpeed => setPlaybackSpeed(playbackSpeed);
  const [graphZoom, setGraphZoom] = useState(0);
  const [dataSource, setDataSource] = useState('northern_1');
  const dataSourceSet = dataSource => setDataSource(dataSource);
  const [dataRange, setDataRange] = useState('0');
  const dataRangeSet = dataRange => setDataRange(dataRange);


  const rescaleVolume = volume => Math.pow(volume / 100, 2);
  const rescaleMasterVolume = volume => Math.pow(volume / 200, 2);

  const rescaleFrequency = (valueMin, valueMax, freqMin, freqMax, value) => {
    if (valueMax === valueMin) return freqMin;
    const clampedValue = Math.max(Math.min(value, valueMax), valueMin);
    const normalized = (clampedValue - valueMin) / (valueMax - valueMin);
    const logMin = Math.log10(freqMin);
    const logMax = Math.log10(freqMax);
    const logFreq = logMin + normalized * (logMax - logMin);
    return Math.pow(10, logFreq);
  };

  const rescaleAudioParameter = (valueMin, valueMax, parameterMin, parameterMax, value) => {
    const clamped = Math.max(valueMin, Math.min(value, valueMax));
    return ((clamped - valueMin) / (valueMax - valueMin)) * (parameterMax - parameterMin) + parameterMin;
  };

  const BASE_KEY = 60; // C4 (Middle C)
let scaleType = 'major';

const SCALES = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10]
};

function getNoteFromValue(value, min, max, scale = SCALES[scaleType]) {
  const norm = (value - min) / (max - min);
  const index = Math.floor(norm * scale.length * 3); // 3 octaves
  const octave = Math.floor(index / scale.length);
  const noteInScale = scale[index % scale.length];
  return BASE_KEY + noteInScale + 12 * (octave - 1);
}

function midiToFreq(midi) {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

function createSynth(freq, type = 'sine', duration = 0.5, gainLevel = 0.3, outputNode = audioCtx.destination) {
  const audioCtx = audioCtxRef.current;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq || 261.63;
  osc.type = type;
  gain.gain.value = gainLevel;

  osc.connect(gain).connect(outputNode);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

function playChord(rootValue, min, max) {
  const temperatureGainNode = temperatureGainNodeRef.current;
  const rootNote = getNoteFromValue(rootValue, min, max);
  const chordOffsets = [0, 4, 7]; // Major triad
  chordOffsets.forEach(offset => {
    const freq = midiToFreq(rootNote + offset);
    createSynth(freq, 'triangle', 1, 0.2, temperatureGainNode);
  });
}

function playMelody(value, min, max) {
  const displacementGainNode = displacementGainNodeRef.current;
  let note = getNoteFromValue(value, min, max);
  if (note > 126) note = 91;
  const freq = midiToFreq(note);
  createSynth(freq, 'square', 1, 2.5, displacementGainNode);
}

function playGuitarNote(value, min, max, distorted = false) {
  const audioCtx = audioCtxRef.current;
  const humidityGainNode = humidityGainNodeRef.current;
  const note = getNoteFromValue(value, min, max);
  const freq = midiToFreq(note);
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  let output = gain;

  if (distorted) {
    const waveShaper = audioCtx.createWaveShaper();
    waveShaper.curve = new Float32Array([0, 1, -1, 0]);
    waveShaper.oversample = '4x';
    osc.connect(waveShaper).connect(gain);
  } else {
    osc.connect(gain);
  }

  gain.gain.value = 0.25;
  osc.frequency.value = freq;
  osc.type = 'sawtooth';
  gain.connect(humidityGainNode);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function playBassNote(value, min, max, soilMoisture) {
  const audioCtx = audioCtxRef.current;
  const soilMoistureGainNode = soilMoistureGainNodeRef.current;
  const note = getNoteFromValue(value, min, max);
  const freq = midiToFreq(note - 12);
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  const lowpass = audioCtx.createBiquadFilter();

  lowpass.type = 'lowpass';
  lowpass.frequency.value = soilMoisture < 70 ? 500 * (soilMoisture / 70) : 20000;

  gain.gain.value = 0.25;
  osc.frequency.value = freq;
  osc.type = 'sine';

  osc.connect(gain).connect(lowpass).connect(soilMoistureGainNode);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.5);
}

function playDrums(intervalMs = 1000) {
  const audioCtx = audioCtxRef.current;
  const now = audioCtx.currentTime;
  const intervalSec = intervalMs / 1000;
  const beatDuration = intervalSec / 4; // 4 steps per update

  for (let i = 0; i < 4; i++) {
    const time = now + i * beatDuration;

    // Always play hi-hat every half beat
    playHiHat(time);
    playHiHat(time + beatDuration / 2);

    // If interval is short, skip other drums to avoid clutter
    if (intervalMs < 300) continue;

    // Kick on beat 1 and 3
    if (i === 0 || i === 2) {
      playKick(time);
    }

    // Snare on beat 2 and 4
    if (i === 1 || i === 3) {
      playSnare(time);
    }

    // Tom only on last beat (with slight delay)
    if (i === 3 && intervalMs >= 600) {
      playTom(time + beatDuration / 4);
    }
  }
}

function playKick() {
  const audioCtx = audioCtxRef.current;
  const drumsGainNode = drumsGainNodeRef.current;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(150, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(50, audioCtx.currentTime + 0.2);
  gain.gain.setValueAtTime(1, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);
  osc.connect(gain).connect(drumsGainNode);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.2);
}

function playSnare() {
  const audioCtx = audioCtxRef.current;
  const drumsGainNode = drumsGainNodeRef.current;
  const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.2, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < output.length; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const noiseGain = audioCtx.createGain();
  noiseGain.gain.setValueAtTime(1, audioCtx.currentTime);
  noiseGain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.2);

  const bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 1500;

  noise.connect(bandpass).connect(noiseGain).connect(drumsGainNode);
  noise.start();
  noise.stop(audioCtx.currentTime + 0.2);
}

function playHiHat() {
  const audioCtx = audioCtxRef.current;
  const drumsGainNode = drumsGainNodeRef.current;
  const noiseBuffer = audioCtx.createBuffer(1, audioCtx.sampleRate * 0.05, audioCtx.sampleRate);
  const output = noiseBuffer.getChannelData(0);
  for (let i = 0; i < output.length; i++) {
    output[i] = Math.random() * 2 - 1;
  }

  const noise = audioCtx.createBufferSource();
  noise.buffer = noiseBuffer;

  const highpass = audioCtx.createBiquadFilter();
  highpass.type = 'highpass';
  highpass.frequency.value = 8000;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);

  noise.connect(highpass).connect(gain).connect(drumsGainNode);
  noise.start();
  noise.stop(audioCtx.currentTime + 0.05);
}

function playTom() {
  const audioCtx = audioCtxRef.current;
  const drumsGainNode = drumsGainNodeRef.current;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(200, audioCtx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, audioCtx.currentTime + 0.3);
  gain.gain.setValueAtTime(0.7, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.3);
  osc.connect(gain).connect(drumsGainNode);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

const playSound = () => {
    if (!play) {
      const audioCtx = getAudioContext();
      audioCtxRef.current = audioCtx;

      const displacementGainNode = audioCtx.createGain();
      displacementGainNodeRef.current = displacementGainNode;
      const soilMoistureGainNode = audioCtx.createGain();
      soilMoistureGainNodeRef.current = soilMoistureGainNode;
      const temperatureGainNode = audioCtx.createGain();
      temperatureGainNodeRef.current = temperatureGainNode;
      const humidityGainNode = audioCtx.createGain();
      humidityGainNodeRef.current = humidityGainNode;
      const drumsGainNode = audioCtx.createGain();
      drumsGainNodeRef.current = drumsGainNode;

      const displacementMuteNode = audioCtx.createGain();
      displacementMuteNodeRef.current = displacementMuteNode;
      const soilMoistureMuteNode = audioCtx.createGain();
      soilMoistureMuteNodeRef.current = soilMoistureMuteNode;
      const temperatureMuteNode = audioCtx.createGain();
      temperatureMuteNodeRef.current = temperatureMuteNode;
      const humidityMuteNode = audioCtx.createGain();
      humidityMuteNodeRef.current = humidityMuteNode;
      const drumsMuteNode = audioCtx.createGain();
      drumsMuteNodeRef.current = drumsMuteNode;

      const masterVolumeGainNode = audioCtx.createGain();
      masterVolumeGainNodeRef.current = masterVolumeGainNode;
      const masterVolumeMuteNode = audioCtx.createGain();
      masterVolumeMuteNodeRef.current = masterVolumeMuteNode;

      const displacementPannerNode = audioCtx.createPanner();
      displacementPannerNodeRef.current = displacementPannerNode;
      displacementPannerNode.panningModel = 'HRTF';
      displacementPannerNode.distanceModel = 'inverse';
      displacementPannerNode.setPosition(-2, -2, -1); // 2m left, 2m down, 1m back

      const soilMoisturePannerNode = audioCtx.createPanner();
      soilMoisturePannerNodeRef.current = soilMoisturePannerNode;
      soilMoisturePannerNode.panningModel = 'HRTF';
      soilMoisturePannerNode.distanceModel = 'inverse';
      soilMoisturePannerNode.setPosition(2, 2, -1); // 2m right, 2m up, 1m back

      const temperaturePannerNode = audioCtx.createPanner();
      temperaturePannerNodeRef.current = temperaturePannerNode;
      temperaturePannerNode.panningModel = 'HRTF';
      temperaturePannerNode.distanceModel = 'inverse';
      temperaturePannerNode.setPosition(-5, -5, 1); // 5m left, 5m down, 1m front

      const humidityPannerNode = audioCtx.createPanner();
      humidityPannerNodeRef.current = humidityPannerNode;
      humidityPannerNode.panningModel = 'HRTF';
      humidityPannerNode.distanceModel = 'inverse';
      humidityPannerNode.setPosition(5, 5, 1); // 5m right, 5m up, 1m front

      const drumsPannerNode = audioCtx.createPanner();
      drumsPannerNodeRef.current = drumsPannerNode;
      drumsPannerNode.panningModel = 'HRTF';
      drumsPannerNode.distanceModel = 'inverse';
      drumsPannerNode.setPosition(0, 0, 0); // Centre

      const masterVolumePannerNode = audioCtx.createPanner();
      masterVolumePannerNodeRef.current = masterVolumePannerNode;
      masterVolumePannerNode.panningModel = 'HRTF';
      masterVolumePannerNode.distanceModel = 'inverse';
      masterVolumePannerNode.setPosition(0, 0, 0); // Centre

      displacementGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume * 0.8), audioCtx.currentTime + 0.01);
      soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume * 0.8), audioCtx.currentTime + 0.01);
      temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume), audioCtx.currentTime + 0.01);
      humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume), audioCtx.currentTime + 0.01);
      drumsGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.5), audioCtx.currentTime + 0.01);
      masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume), audioCtx.currentTime + 0.01);

      displacementGainNode.connect(displacementMuteNode);
      soilMoistureGainNode.connect(soilMoistureMuteNode);
      temperatureGainNode.connect(temperatureMuteNode);
      humidityGainNode.connect(humidityMuteNode);
      drumsGainNode.connect(drumsMuteNode);

      displacementMuteNode.connect(displacementPannerNode);
      soilMoistureMuteNode.connect(soilMoisturePannerNode);
      temperatureMuteNode.connect(temperaturePannerNode);
      humidityMuteNode.connect(humidityPannerNode);
      drumsMuteNode.connect(drumsPannerNode);

      displacementPannerNode.connect(masterVolumePannerNode);
      soilMoisturePannerNode.connect(masterVolumePannerNode);
      temperaturePannerNode.connect(masterVolumePannerNode);
      humidityPannerNode.connect(masterVolumePannerNode);
      drumsPannerNode.connect(masterVolumePannerNode);

      masterVolumePannerNode.connect(masterVolumeGainNode);
      masterVolumeGainNode.connect(masterVolumeMuteNode);
      masterVolumeMuteNode.connect(audioCtx.destination);
    }
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }
    muteSound();
  }, [mute]);

  useEffect(() => {
    if (play && incrementalData.length > 0) {
      const index = incrementalData.length - 1;
      setHighlightedIndex(index);
      const record = incrementalData[index];
      
      playChord(record.temperature, -20, 60);
      playMelody(record.displacement, 0, 10);
      playGuitarNote(record.humidity, 0, 100, false);
      playBassNote(record.soilMoisture, 0, 100, record.soilMoisture);
      playDrums(remapReversed(playbackSpeed));
    }
  }, [play, incrementalData, playbackSpeed]);

  const [volume, setVolume] = useState(100);
  const volumeSet = volume => {
    setVolume(volume);
    const audioCtx = audioCtxRef.current;
    const masterVolumeGainNode = masterVolumeGainNodeRef.current;
    masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume), audioCtx.currentTime + 0.01);
  };

  const muteSound = () => {
    const audioCtx = audioCtxRef.current;
    const masterVolumeMuteNode = masterVolumeMuteNodeRef.current;
    if (mute) masterVolumeMuteNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.01);
    else masterVolumeMuteNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume), audioCtx.currentTime + 0.01);
  };

  const stopSound = () => {
    muteSound();
  }

  const graphRef = useRef();
  const stopOnClick = () => {
    setPlay(false);
    setPause(false);
    setStop(true);
    setInitialiseVisuals(true);
    stopSound();
    setIncrementalData([]);
    currentIndexRef.current = 0;
    graphRef?.current?.clearChart();
  };

  useEffect(() => {
    if (!initialiseVisuals) {
      stopOnClick();
      playOnClick();
    }
  }, [dataSource, dataRange]);

  const treeClick = () => {
    const modalElement = document.getElementById('tree');
    if (modalElement) {
      const modal = new bsModal(modalElement);
      modal.show();
    }
  };
  const aboutClick = () => {
    const modalElement = document.getElementById('about');
    if (modalElement) {
      const modal = new bsModal(modalElement);
      modal.show();
    }
  };
  const helpClick = () => {
    const modalElement = document.getElementById('help');
    if (modalElement) {
      const modal = new bsModal(modalElement);
      modal.show();
    }
  };
  const helpNavigateClick = () => {
    const modalElement = document.getElementById('help');
    if (modalElement) {
      const modal = new bsModal(modalElement);
      modal.hide();
      const backdrop = document.querySelector('.modal-backdrop');
      if (backdrop) backdrop.parentNode.removeChild(backdrop);
      document.body.classList.remove('modal-open');
      document.body.style.overflow = '';
      navigate('/help/contact-us');
    }
  }

  const getSocketPort = dataSource => {
    switch (dataSource) {
      case 'northern_1':
        return 3001;
      case 'northern_2':
        return 3002;
      case 'northern_3':
        return 3003;
      case 'northern_4':
        return 3004;
      case 'northern_5':
        return 3005;
      case 'northern_6':
        return 3006;
      case 'northern_7':
        return 3007;
      default:
        return 3001;
    }
  }

  const { data, loading } = useRealtimeUpdates({
    apiUrl: dataSource,
    socketPort: getSocketPort(dataSource),
    socketName: dataSource.replace('_', '-')
  });

  const currentIndexRef = useRef(0);
  const intervalRef = useRef(0);
  
  const remap = (value, inMin=0, inMax=100, outMin=100, outMax=1000) => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  function remapReversed(value, inputMin = 0, inputMax = 100, outputMin = 0, outputMax = 1000) {
    const ratio = (value - inputMin) / (inputMax - inputMin);
    const inverted = 1 - ratio;
    return inverted * (outputMax - outputMin) + outputMin;
  }

useEffect(() => {
    if (!refinedDataValues || !Array.isArray(refinedDataValues)) return;
    if (pause || stop || !play || currentIndexRef.current >= refinedDataValues.length) return;
    intervalRef.current = setInterval(() => {
      const idx = currentIndexRef.current;
      if (idx >= refinedDataValues.length) {
        clearInterval(intervalRef.current);
        return;
      }
      setIncrementalData(prevData => [...prevData, refinedDataValues[idx]]);
      currentIndexRef.current += 1; 
    }, remapReversed(playbackSpeed));
    return () => clearInterval(intervalRef.current);
  }, [refinedDataValues, data, pause, play, stop, playbackSpeed]);

useEffect(() => {
  if (dataRange === '-1') {
    if (data && data.length > 0) {
      setRefinedDataValues([data[data.length - 1]]);
    } else {
      setRefinedDataValues([]);
    }
    return;
  }
  if (dataRange === '0') {
    setRefinedDataValues(data);
    return;
  }
  const hours = Number(dataRange);
  if (isNaN(hours) || hours <= 0) {
    setRefinedDataValues(data);
    return;
  }
  const now = Date.now();
  const cutoff = now - hours * 60 * 60 * 1000; 
  setRefinedDataValues(data.filter(item => {
    const timestamp = (item.timestamp instanceof Date) ? item.timestamp.getTime() : new Date(item.timestamp).getTime();
    return timestamp >= cutoff;
  }));
}, [dataRange, data]);


// Define the visible variables to be passed to the Scene sketch
const sceneVariables = [
  {
    key: 'displacement',
    label: 'Displacement'
  },
  {
    key: 'soilMoisture',
    label: 'Soil Moisture'
  },
  {
    key: 'temperature',
    label: 'Temperature'
  },
  {
    key: 'humidity',
    label: 'Humidity'
  }
];



  return (
    <PageLayout title='Primary Data Preset 5' backLink='primary-data' help helpOnClick={helpClick} dataControls treeOnClick={treeClick} aboutOnClick={aboutClick}>
      {
          loading
            ? <h4>Loading...</h4>
            : hide
              ? <div style={{ height: '40em', width: '100%', marginBottom: '2rem', backgroundColor: 'whitesmoke', border: '1px solid lightgray' }}>
                  <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                      <img src={logo} alt='Sensing the Forest Logo' style={{ width: 'auto', height: '7rem' }} />
                      <i className="bi bi-soundwave" style={{ fontSize: '7rem', color: 'green' }}></i>
                      <h3 style={{ fontWeight: 'bold' }}>Visualisation Hidden</h3>
                  </div>
                </div>
              : initialiseVisuals
                ? <div style={{ height: '40em', width: '100%', marginBottom: '2rem', backgroundColor: 'whitesmoke', border: '1px solid lightgray' }}>
                    <div className='d-flex flex-column justify-content-center align-items-center h-100'>
                        <img src={logo} alt='Sensing the Forest Logo' style={{ width: 'auto', height: '7rem' }} />
                        <i className="bi bi-soundwave" style={{ fontSize: '7rem', color: 'green' }}></i>
                        <h3 style={{ fontWeight: 'bold' }}>Press Play to start sonification and visualisation</h3>
                    </div>
                  </div>
                : <div style={{ height: '40em', width: `${scene ? '100' : remap(graphZoom)}%` }}><ForestScene ref={graphRef}  variables={sceneVariables} data={incrementalData} highlightedIndex={highlightedIndex} loading={loading} /></div>
      }
      <Controls playMode={play} playOnClick={playOnClick} pauseMode={pause} pauseOnClick={pauseOnClick} stopMode={stop} stopOnClick={stopOnClick} hideMute={hideMute} muteMode={mute} muteOnClick={muteOnClick} hideMode={hide} hideOnClick={hideOnClick} />
      <PresetOptionsPanel
        endpoints={endpoints}
        dataRange={dataRange}
        dataRangeSet={dataRangeSet}
        playbackSpeed={playbackSpeed}
        playbackSpeedSet={playbackSpeedSet}
        zoomHide={scene}
        dataSource={dataSource}
        dataSourceSet={dataSourceSet}
        volume={volume}
        setVolume={volumeSet}
        hideMute={hideMute}
        variable0Name='Displacement'
        variable0Volume={variable0Volume}
        variable0SetVolume={variable0SetVolume}
        variable0MuteMode={variable0Mute}
        variable0MuteOnClick={variable0MuteOnClick}
        variable0HideHide={scene}
        variable1Name='Soil Moisture'
        variable1Volume={variable1Volume}
        variable1SetVolume={variable1SetVolume}
        variable1MuteMode={variable1Mute}
        variable1MuteOnClick={variable1MuteOnClick}
        variable1HideHide={scene}
        variable2Name='Temperature'
        variable2Volume={variable2Volume}
        variable2SetVolume={variable2SetVolume}
        variable2MuteMode={variable2Mute}
        variable2MuteOnClick={variable2MuteOnClick}
        variable2HideHide={scene}
        variable3Name='Humidity'
        variable3Volume={variable3Volume}
        variable3SetVolume={variable3SetVolume}
        variable3MuteMode={variable3Mute}
        variable3MuteOnClick={variable3MuteOnClick}
        variable3HideHide={scene}
      />
      {
        (dataSource === 'northern_1') ? <TreeN1Modal modalName='tree' /> : (dataSource === 'northern_2') ? <TreeN2Modal modalName='tree' /> : <TreeAnonModal modalName='tree' />
      }
      {/* FINISH THE BELOW SENTENCES WITH THE AUDIO MAPPINGS */}
      <AboutPrimaryDataModal 
        modalName='about'
        displacementMapping="The displacement value is represented by the centre tree's size. As the displacement value reduces, the tree becomes smaller, highlighting a slowing of water uptake. It is also mapped to a piano instrument sound playing a melody, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener."
        soilMoistureMapping='The soil moisture value is represented by the soil colour. As the soil moisture value reduces, the soil colour turns lighter brown, eventually displaying cracks, highlighting a lack of water within the soil. It is also mapped to a bass guitar instrument sound playing a bassline, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener. The soil moisture is further mapped to a lowpass filter, which becomes increasingly active when the soil moisture level reduces to below 70%, indicating that the tree requires watering.'
        temperatureMapping='The temperature value is represented by the sun colour and size, and sky colour. As the temperature value reduces, the sun becomes darker and smaller, and the sky becomes bluer, highlighting a colder temperature. It is also mapped to a piano instrument sound playing chords, using a logarithmic scale similar to human perception, to a corresponding root musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the cloud size and number. As the humidity value reduces, fewer, smaller clouds are visible, highlighting a lack of water vapour within the air. It is also mapped to an electric guitar instrument sound, using a logarithmic scale similar to human perception, to a corresponding accompanying musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
      />
      <PresetHelpModal
        modalName='help'
        helpNavigate={helpNavigateClick}
      />
    </PageLayout>
  )
}