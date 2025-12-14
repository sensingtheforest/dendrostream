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
import Dials from '../../../ui/visualisation/animation/Dials';
import { getAudioContext } from '../../../context/AudioContext';

export default function PrimaryDataPreset4({ endpoints={} }) {
  const navigate = useNavigate();

  const [incrementalData, setIncrementalData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const audioCtxRef = useRef(null);
  const isFirstRender = useRef(true);

  const displacementGainNodeRef = useRef(null);
  const soilMoistureGainNodeRef = useRef(null);
  const temperatureGainNodeRef = useRef(null);
  const humidityGainNodeRef = useRef(null);
  const masterVolumeGainNodeRef = useRef(null);

  const displacementMuteNodeRef = useRef(null);
  const soilMoistureMuteNodeRef = useRef(null);
  const temperatureMuteNodeRef = useRef(null);
  const humidityMuteNodeRef = useRef(null);
  const masterVolumeMuteNodeRef = useRef(null);

  const displacementPannerNodeRef = useRef(null);
  const soilMoisturePannerNodeRef = useRef(null);
  const temperaturePannerNodeRef = useRef(null);
  const humidityPannerNodeRef = useRef(null);
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

  const dials = true;

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
    displacementGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
  };
  const [variable0Mute, setVariable0Mute] = useState(false);
  const variable0MuteOnClick = () => setVariable0Mute(!variable0Mute);
    
  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const displacementMuteNode = displacementMuteNodeRef.current;
    if (variable0Mute) displacementMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else displacementMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
  }, [variable0Mute]);

  const [variable1Volume, setVariable1Volume] = useState(100);
  const variable1SetVolume = volume => {
    setVariable1Volume(volume);
    const audioCtx = audioCtxRef.current;
    const soilMoistureGainNode = soilMoistureGainNodeRef.current;
    soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
  };
  const [variable1Mute, setVariable1Mute] = useState(false);
  const variable1MuteOnClick = () => setVariable1Mute(!variable1Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const soilMoistureMuteNode = soilMoistureMuteNodeRef.current;
    if (variable1Mute) soilMoistureMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else soilMoistureMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
  }, [variable1Mute]);

  const [variable2Volume, setVariable2Volume] = useState(100);
  const variable2SetVolume = volume => {
    setVariable2Volume(volume);
    const audioCtx = audioCtxRef.current;
    const temperatureGainNode = temperatureGainNodeRef.current;
    temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
  };
  const [variable2Mute, setVariable2Mute] = useState(false);
  const variable2MuteOnClick = () => setVariable2Mute(!variable2Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const temperatureMuteNode = temperatureMuteNodeRef.current;
    if (variable2Mute) temperatureMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else temperatureMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
  }, [variable2Mute]);

  const [variable3Volume, setVariable3Volume] = useState(100);
  const variable3SetVolume = volume => {
    setVariable3Volume(volume);
    const audioCtx = audioCtxRef.current;
    const humidityGainNode = humidityGainNodeRef.current;
    humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
  };
  const [variable3Mute, setVariable3Mute] = useState(false);
  const variable3MuteOnClick = () => setVariable3Mute(!variable3Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const humidityMuteNode = humidityMuteNodeRef.current;
    if (variable3Mute) humidityMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    else humidityMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
  }, [variable3Mute]);

  const [playbackSpeed, setPlaybackSpeed] = useState(50);
  const playbackSpeedSet = playbackSpeed => setPlaybackSpeed(playbackSpeed);
  const [graphZoom, setGraphZoom] = useState(0);
  const graphZoomSet = graphZoom => setGraphZoom(graphZoom);
  const [dataSource, setDataSource] = useState('northern_1');
  const dataSourceSet = dataSource => setDataSource(dataSource);
  const [dataRange, setDataRange] = useState('-1');
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

const SCALES = {
  dorian: [0, 2, 3, 5, 7, 9, 10],
  aeolian: [0, 2, 3, 5, 7, 8, 10],
  major: [0, 2, 4, 5, 7, 9, 11]  // Added major scale
};
let currentScaleName = 'dorian';
let currentScale = SCALES[currentScaleName];
let rootMidiNote = 48; // C3-ish base
let currentOctave = 2;

const DATA_RANGES = {
  displacement: [0, 10],
  soilMoisture: [0, 100],
  temperature: [-20, 60],
  humidity: [0, 100]
};

const instruments = {
  displacement: createPianoVoice,
  soilMoisture: createPluckedGuitarVoice,
  temperature: createSmoothLeadVoice,
  humidity: createFluteLikeVoice,
};

const INSTRUMENT_OCTAVE_OFFSETS = {
  displacement: 0,       // base octave
  soilMoisture: 0,     // base octave
  temperature: 0,      // base octave
  humidity: 12         // +1 octave
};

let activeInstruments = new Set(Object.keys(instruments));

const activeVoices = {};

function freqFromValue(value, variable) {
  // Override scale if vpd in major scale range
  const index = incrementalData.length - 1;
  const record = incrementalData[index];
  let scaleToUse = currentScale;
  if (record.vpd >= 0.8 && record.vpd <= 2.2) {
    scaleToUse = SCALES.major;
  }

  const [min, max] = DATA_RANGES[variable];
  const norm = Math.min(Math.max((value - min) / (max - min), 0), 1);
  const scaleLength = scaleToUse.length;
  const totalNotes = scaleLength * 2;
  const scaledIndex = Math.floor(norm * totalNotes);
  const scaleDegree = scaleToUse[scaledIndex % scaleLength];
  const octaveShift = Math.floor(scaledIndex / scaleLength);

  // Add per-instrument octave offset in semitones:
  const octaveOffsetSemitones = INSTRUMENT_OCTAVE_OFFSETS[variable] || 0;

  const midiNote = rootMidiNote + scaleDegree + octaveShift * 12 + currentOctave * 12 + octaveOffsetSemitones;

  return 440 * Math.pow(2, (midiNote - 69) / 12);
}

function createEnvelope(duration = 3) {
  const audioCtx = audioCtxRef.current;
  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);
  gain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.1);
  gain.gain.setTargetAtTime(0, audioCtx.currentTime + duration, 1);
  return gain;
}

function createPianoVoice(freq) {
  const audioCtx = audioCtxRef.current;
  const displacementGainNode = displacementGainNodeRef.current;
  const output = audioCtx.createGain();

  // Fundamental + 2 partials for richness
  const partials = [1, 2, 3];
  partials.forEach((mult) => {
    const osc = audioCtx.createOscillator();
    osc.type = 'triangle';  // Warmer than sine
    osc.frequency.value = freq * mult;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.3 / mult;
    osc.connect(gain).connect(output);
    osc.start();

    // Store oscillators for stopping later
    if (!activeVoices.pianoOscs) activeVoices.pianoOscs = [];
    activeVoices.pianoOscs.push(osc);
  });

  const env = createEnvelope(5);
  output.connect(env).connect(displacementGainNode);

  return {
    stop: () => {
      activeVoices.pianoOscs.forEach((osc) => osc.stop());
      activeVoices.pianoOscs = [];
      env.gain.cancelScheduledValues(audioCtx.currentTime);
      env.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
    },
    output,
  };
}

function createPluckedGuitarVoice(freq) {
  const audioCtx = audioCtxRef.current;
  const soilMoistureGainNode = soilMoistureGainNodeRef.current;
  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1200;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);

  osc.connect(filter).connect(gain).connect(soilMoistureGainNode);

  gain.gain.linearRampToValueAtTime(0.4, audioCtx.currentTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 3.5);

  osc.start();

  return {
    stop: () => {
      gain.gain.cancelScheduledValues(audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
      osc.stop(audioCtx.currentTime + 0.4);
    },
  };
}

function createFluteLikeVoice(freq) {
  const audioCtx = audioCtxRef.current;
  const humidityGainNode = humidityGainNodeRef.current;
  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);

  const tremolo = audioCtx.createOscillator();
  tremolo.type = 'sine';
  tremolo.frequency.value = 5;

  const tremoloGain = audioCtx.createGain();
  tremoloGain.gain.value = 0.07; // reduced tremolo depth

  tremolo.connect(tremoloGain);
  tremoloGain.connect(gain.gain);

  osc.connect(gain).connect(humidityGainNode);

  gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.5);
  gain.gain.setTargetAtTime(0, audioCtx.currentTime + 6, 2);

  osc.start();
  tremolo.start();

  return {
    stop: () => {
      gain.gain.cancelScheduledValues(audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      osc.stop(audioCtx.currentTime + 0.6);
      tremolo.stop(audioCtx.currentTime + 0.6);
    },
  };
}

function createSmoothLeadVoice(freq) {
  const audioCtx = audioCtxRef.current;
  const temperatureGainNode = temperatureGainNodeRef.current;
  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);

  const vibrato = audioCtx.createOscillator();
  vibrato.frequency.value = 5;

  const vibratoGain = audioCtx.createGain();
  vibratoGain.gain.value = 2; // reduced vibrato depth

  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc.frequency);

  vibrato.start();

  osc.connect(gain).connect(temperatureGainNode);

  gain.gain.linearRampToValueAtTime(0.25, audioCtx.currentTime + 0.3);
  gain.gain.setTargetAtTime(0, audioCtx.currentTime + 5, 1.5);

  osc.start();

  return {
    stop: () => {
      gain.gain.cancelScheduledValues(audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      osc.stop(audioCtx.currentTime + 0.6);
      vibrato.stop(audioCtx.currentTime + 0.6);
    },
  };
}

function playVoices(record, activeInstruments) {
  // Stop ALL active voices immediately
  for (const variable in activeVoices) {
    if (activeVoices[variable]?.stop) activeVoices[variable].stop();
  }
  // Clear the activeVoices map
  Object.keys(activeVoices).forEach(key => delete activeVoices[key]);

  // Start voices only for active instruments
  for (const variable of Object.keys(instruments)) {
    if (!activeInstruments.has(variable)) continue;

    const freq = freqFromValue(record[variable], variable);
    const voice = instruments[variable](freq);
    voice.freq = freq;
    activeVoices[variable] = voice;
  }
}

  function randomiseInstruments() {
    const allVars = Object.keys(instruments);
    if (Math.random() < 0.4) {
      activeInstruments = new Set(allVars);
    } else {
      activeInstruments = new Set(
        allVars.filter(() => Math.random() > 0.3)
      );
      if (activeInstruments.size === 0) {
        const forced = allVars[Math.floor(Math.random() * allVars.length)];
        activeInstruments.add(forced);
      }
    }
  }

  setInterval(() => {
    const scaleNames = Object.keys(SCALES);
    currentScaleName = scaleNames[Math.floor(Math.random() * scaleNames.length)];
    currentScale = SCALES[currentScaleName];
  }, 300000);

  setInterval(() => {
    currentOctave = 0 + Math.floor(Math.random() * 3);
  }, 300000);

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

        const displacementMuteNode = audioCtx.createGain();
        displacementMuteNodeRef.current = displacementMuteNode;
        const soilMoistureMuteNode = audioCtx.createGain();
        soilMoistureMuteNodeRef.current = soilMoistureMuteNode;
        const temperatureMuteNode = audioCtx.createGain();
        temperatureMuteNodeRef.current = temperatureMuteNode;
        const humidityMuteNode = audioCtx.createGain();
        humidityMuteNodeRef.current = humidityMuteNode;

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

        const masterVolumePannerNode = audioCtx.createPanner();
        masterVolumePannerNodeRef.current = masterVolumePannerNode;
        masterVolumePannerNode.panningModel = 'HRTF';
        masterVolumePannerNode.distanceModel = 'inverse';
        masterVolumePannerNode.setPosition(0, 0, 0); // Centre

        displacementGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
        soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
        temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
        humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
        masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 1.5), audioCtx.currentTime + 0.01);

        displacementGainNode.connect(displacementMuteNode);
        soilMoistureGainNode.connect(soilMoistureMuteNode);
        temperatureGainNode.connect(temperatureMuteNode);
        humidityGainNode.connect(humidityMuteNode);

        displacementMuteNode.connect(displacementPannerNode);
        soilMoistureMuteNode.connect(soilMoisturePannerNode);
        temperatureMuteNode.connect(temperaturePannerNode);
        humidityMuteNode.connect(humidityPannerNode);

        displacementPannerNode.connect(masterVolumePannerNode);
        soilMoisturePannerNode.connect(masterVolumePannerNode);
        temperaturePannerNode.connect(masterVolumePannerNode);
        humidityPannerNode.connect(masterVolumePannerNode);

        masterVolumePannerNode.connect(masterVolumeGainNode);
        masterVolumeGainNode.connect(masterVolumeMuteNode);
        masterVolumeMuteNode.connect(audioCtx.destination);

        randomiseInstruments();

        setInterval(() => { randomiseInstruments(); }, 1000);
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
    if (!play || incrementalData.length === 0) return;

    let activeInstruments = new Set(Object.keys(instruments)); // initial all active
    let index = incrementalData.length - 1;
    setHighlightedIndex(index);

    // Play voices for the newest data immediately
    playVoices(incrementalData[index], activeInstruments);

    // Set up interval to randomize instruments every 3 seconds, 
    // and re-play voices with the same latest data
    const intervalId = setInterval(() => {
      const allVars = Object.keys(instruments);
      if (Math.random() < 0.4) {
        activeInstruments = new Set(allVars);
      } else {
        activeInstruments = new Set(
          allVars.filter(() => Math.random() > 0.3)
        );
        if (activeInstruments.size === 0) {
          const forced = allVars[Math.floor(Math.random() * allVars.length)];
          activeInstruments.add(forced);
        }
      }

      // Always use the latest data from incrementalData array on every tick
      const latestIndex = incrementalData.length - 1;
      setHighlightedIndex(latestIndex);
      playVoices(incrementalData[latestIndex], activeInstruments);

    }, 3000);

    // Cleanup on unmount or when dependencies change
    return () => clearInterval(intervalId);

  }, [play, incrementalData]);


    const [volume, setVolume] = useState(100);
    const volumeSet = volume => {
      setVolume(volume);
      const audioCtx = audioCtxRef.current;
      const masterVolumeGainNode = masterVolumeGainNodeRef.current;
      masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    };

    const muteSound = () => {
      const audioCtx = audioCtxRef.current;
      const humidityGainNode = humidityGainNodeRef.current;
      humidityGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
      const masterVolumeMuteNode = masterVolumeMuteNodeRef.current;
      if (mute) masterVolumeMuteNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.01);
      else masterVolumeMuteNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    };

    const stopSound = () => {
    muteSound();
    if (play) {
      const noInstruments = new Set(); // no instruments active
      playVoices({}, noInstruments);  // ensures everything stops
    }
  };

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

  const [variable0Hide, setVariable0Hide] = useState(false);
  const variable0HideOnClick = () => {
    setVariable0Hide(!variable0Hide);
    if (!dials) graphRef.current.toggleVariableVisibility('displacement', variable0Hide);
  };
  const [variable1Hide, setVariable1Hide] = useState(false);
  const variable1HideOnClick = () => {
    setVariable1Hide(!variable1Hide);
    if (!dials) graphRef.current.toggleVariableVisibility('soilMoisture', variable1Hide);
  };
  const [variable2Hide, setVariable2Hide] = useState(false);
  const variable2HideOnClick = () => {
    setVariable2Hide(!variable2Hide);
    if (!dials) graphRef.current.toggleVariableVisibility('temperature', variable2Hide);
  };
  const [variable3Hide, setVariable3Hide] = useState(false);
  const variable3HideOnClick = () => {
    setVariable3Hide(!variable3Hide);
    if (!dials) graphRef.current.toggleVariableVisibility('humidity', variable3Hide);
  };

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


// Define the visible variables to be passed to the Dials sketch
const dialVariables = [
  {
    key: 'displacement',
    color: 'red',
    label: 'Displacement',
    minValue: 0,
    maxValue: 10,
    visible: !variable0Hide
  },
  {
    key: 'soilMoisture',
    color: 'green',
    label: 'Soil Moisture',
    minValue: 0,
    maxValue: 100,
    visible: !variable1Hide
  },
  {
    key: 'temperature',
    color: 'blue',
    label: 'Temperature',
    minValue: -20,
    maxValue: 60,
    visible: !variable2Hide
  },
  {
    key: 'humidity',
    color: 'orange',
    label: 'Humidity',
    minValue: 0,
    maxValue: 100,
    visible: !variable3Hide
  }
];



  return (
    <PageLayout title='Primary Data Preset 4' backLink='primary-data' help helpOnClick={helpClick} dataControls treeOnClick={treeClick} aboutOnClick={aboutClick}>
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
                : <div style={{ height: '60em', width: `${dials ? '100' : remap(graphZoom)}%`, marginBottom: '-15rem' }}><Dials ref={graphRef} variables={dialVariables} data={incrementalData} highlightedIndex={highlightedIndex} loading={loading} /></div>
      }
      <Controls playMode={play} playOnClick={playOnClick} pauseMode={pause} pauseOnClick={pauseOnClick} stopMode={stop} stopOnClick={stopOnClick} hideMute={hideMute} muteMode={mute} muteOnClick={muteOnClick} hideMode={hide} hideOnClick={hideOnClick} />
      <PresetOptionsPanel
        endpoints={endpoints}
        dataRange={dataRange}
        dataRangeSet={dataRangeSet}
        playbackSpeed={playbackSpeed}
        playbackSpeedSet={playbackSpeedSet}
        zoomHide={dials}
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
        variable0HideMode={variable0Hide}
        variable0HideOnClick={variable0HideOnClick}
        variable1Name='Soil Moisture'
        variable1Volume={variable1Volume}
        variable1SetVolume={variable1SetVolume}
        variable1MuteMode={variable1Mute}
        variable1MuteOnClick={variable1MuteOnClick}
        variable1HideMode={variable1Hide}
        variable1HideOnClick={variable1HideOnClick}
        variable2Name='Temperature'
        variable2Volume={variable2Volume}
        variable2SetVolume={variable2SetVolume}
        variable2MuteMode={variable2Mute}
        variable2MuteOnClick={variable2MuteOnClick}
        variable2HideMode={variable2Hide}
        variable2HideOnClick={variable2HideOnClick}
        variable3Name='Humidity'
        variable3Volume={variable3Volume}
        variable3SetVolume={variable3SetVolume}
        variable3MuteMode={variable3Mute}
        variable3MuteOnClick={variable3MuteOnClick}
        variable3HideMode={variable3Hide}
        variable3HideOnClick={variable3HideOnClick}
      />
      {
        (dataSource === 'northern_1') ? <TreeN1Modal modalName='tree' /> : (dataSource === 'northern_2') ? <TreeN2Modal modalName='tree' /> : <TreeAnonModal modalName='tree' />
      }
      <AboutPrimaryDataModal 
        modalName='about'
        variability
        displacementMapping='The displacement value is represented by the red dial on the dashboard. It is also mapped to a piano instrument sound, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener.'
        soilMoistureMapping='The soil moisture value is represented by the green dial on the dashboard. It is also mapped to a plucked guitar instrument sound, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 1000 Hz, transposed one octave, based on the data value. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener.'
        temperatureMapping='The temperature value is represented by the blue dial on the dashboard. It is also mapped to a lead synthesiser instrument sound, using a logarithmic scale similar to human perception, to a corresponding vibrato musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the orange dial on the dashboard. It is also mapped to a flute instrument sound, using a logarithmic scale similar to human perception, to a corresponding tremolo musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
      />
      <PresetHelpModal
        modalName='help'
        helpNavigate={helpNavigateClick}
      />
    </PageLayout>
  )
}