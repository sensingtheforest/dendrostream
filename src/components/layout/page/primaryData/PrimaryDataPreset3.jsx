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
import BarChart from '../../../ui/visualisation/graph/BarChart';
import logo from '../../../../assets/stf-logo.png';
import { getAudioContext } from '../../../context/AudioContext';
import FMSynth from '../../../ui/audio/FMSynth';

export default function PrimaryDataPreset3({ endpoints={} }) {
  const navigate = useNavigate();

  const [incrementalData, setIncrementalData] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [triggerEnvelope, setTriggerEnvelope] = useState(true);

  const audioCtxRef = useRef(null);
  const isFirstRender = useRef(true);

  const displacementSynthRef = useRef(null);
  const soilMoistureSynthRef = useRef(null);
  const temperatureSynthRef = useRef(null);
  const humiditySynthRef = useRef(null);

  const referenceNoteOscillatorRef = useRef(null);

  const displacementGainNodeRef = useRef(null);
  const soilMoistureGainNodeRef = useRef(null);
  const temperatureGainNodeRef = useRef(null);
  const humidityGainNodeRef = useRef(null);
  const referenceNoteGainNodeRef = useRef(null);
  const masterVolumeGainNodeRef = useRef(null);

  const displacementMuteNodeRef = useRef(null);
  const soilMoistureMuteNodeRef = useRef(null);
  const temperatureMuteNodeRef = useRef(null);
  const humidityMuteNodeRef = useRef(null);
  const referenceNoteMuteNodeRef = useRef(null);
  const masterVolumeMuteNodeRef = useRef(null);

  const displacementPannerNodeRef = useRef(null);
  const soilMoisturePannerNodeRef = useRef(null);
  const temperaturePannerNodeRef = useRef(null);
  const humidityPannerNodeRef = useRef(null);
  const referenceNotePannerNodeRef = useRef(null);
  const temperatureStereoPannerNodeRef = useRef(null);
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
  const avg = true;

  const pauseOnClick = () => {
    setPlay(false);
    setPause(true);
    setStop(false);
    stopSound();
    setTriggerEnvelope(true);
  }
  const playOnClick = () => {
    setInitialiseVisuals(false);
    setPlay(true);
    setPause(false);
    setStop(false);
    playSound();
  }

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
  const [dataAveragingPeriod, setDataAveragingPeriod] = useState('0');
  const dataAveragingPeriodSet = dataAveragingPeriod => setDataAveragingPeriod(dataAveragingPeriod);

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

  const rescaleWholeAudioParameter = (valueMin, valueMax, parameterMin, parameterMax, value) => {
    const clamped = Math.max(valueMin, Math.min(value, valueMax));
    const scaled = ((clamped - valueMin) / (valueMax - valueMin)) * (parameterMax - parameterMin) + parameterMin;
    return Math.round(scaled);
  };

  const playSound = () => {
    if (!play) {
      const audioCtx = getAudioContext();
      audioCtxRef.current = audioCtx;

      const displacementSynth = new FMSynth(audioCtxRef.current);
      displacementSynthRef.current = displacementSynth;
      const soilMoistureSynth = new FMSynth(audioCtxRef.current);
      soilMoistureSynthRef.current = soilMoistureSynth;
      const temperatureSynth = new FMSynth(audioCtxRef.current);
      temperatureSynthRef.current = temperatureSynth;
      const humiditySynth = new FMSynth(audioCtxRef.current);
      humiditySynthRef.current = humiditySynth;
      
      const referenceNoteOscillator = audioCtx.createOscillator();
      referenceNoteOscillatorRef.current = referenceNoteOscillator;

      const displacementGainNode = audioCtx.createGain();
      displacementGainNodeRef.current = displacementGainNode;
      const soilMoistureGainNode = audioCtx.createGain();
      soilMoistureGainNodeRef.current = soilMoistureGainNode;
      const temperatureGainNode = audioCtx.createGain();
      temperatureGainNodeRef.current = temperatureGainNode;
      const humidityGainNode = audioCtx.createGain();
      humidityGainNodeRef.current = humidityGainNode;
      const referenceNoteGainNode = audioCtx.createGain();
      referenceNoteGainNodeRef.current = referenceNoteGainNode;

      const displacementMuteNode = audioCtx.createGain();
      displacementMuteNodeRef.current = displacementMuteNode;
      const soilMoistureMuteNode = audioCtx.createGain();
      soilMoistureMuteNodeRef.current = soilMoistureMuteNode;
      const temperatureMuteNode = audioCtx.createGain();
      temperatureMuteNodeRef.current = temperatureMuteNode;
      const humidityMuteNode = audioCtx.createGain();
      humidityMuteNodeRef.current = humidityMuteNode;
      const referenceNoteMuteNode = audioCtx.createGain();
      referenceNoteMuteNodeRef.current = referenceNoteMuteNode;

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

      const referenceNotePannerNode = audioCtx.createPanner();
      referenceNotePannerNodeRef.current = referenceNotePannerNode;
      referenceNotePannerNode.panningModel = 'HRTF';
      referenceNotePannerNode.distanceModel = 'inverse';
      referenceNotePannerNode.setPosition(0, 0, 0); // Centre

      const temperatureStereoPannerNode = audioCtx.createStereoPanner();
      temperatureStereoPannerNodeRef.current = temperatureStereoPannerNode;
      temperatureStereoPannerNode.pan.value = 0;

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

      displacementSynth.connect(displacementGainNode);
      soilMoistureSynth.connect(soilMoistureGainNode);
      temperatureSynth.connect(temperatureGainNode);
      humiditySynth.connect(humidityGainNode);
      referenceNoteOscillator.connect(referenceNoteGainNode);

      displacementGainNode.connect(displacementMuteNode);
      soilMoistureGainNode.connect(soilMoistureMuteNode);
      temperatureGainNode.connect(temperatureMuteNode);
      humidityGainNode.connect(humidityMuteNode);
      referenceNoteGainNode.connect(referenceNoteMuteNode);

      displacementMuteNode.connect(displacementPannerNode);
      soilMoistureMuteNode.connect(soilMoisturePannerNode);
      temperatureMuteNode.connect(temperaturePannerNode);
      humidityMuteNode.connect(humidityPannerNode);
      referenceNoteMuteNode.connect(referenceNotePannerNode);

      displacementPannerNode.connect(temperatureStereoPannerNode);
      soilMoisturePannerNode.connect(temperatureStereoPannerNode);
      temperaturePannerNode.connect(temperatureStereoPannerNode);
      humidityPannerNode.connect(temperatureStereoPannerNode);

      temperatureStereoPannerNode.connect(masterVolumePannerNode);
      referenceNotePannerNode.connect(masterVolumePannerNode);

      masterVolumePannerNode.connect(masterVolumeGainNode);
      masterVolumeGainNode.connect(masterVolumeMuteNode);
      masterVolumeMuteNode.connect(audioCtx.destination);

      displacementSynth.setCarrierFrequency(0.000001);
      soilMoistureSynth.setCarrierFrequency(0.000001);
      temperatureSynth.setCarrierFrequency(0.000001);
      humiditySynth.setCarrierFrequency(0.000001);

      displacementSynth.setCarrierWaveform('sine');
      displacementSynth.setModulatorWaveform('triangle');
      soilMoistureSynth.setCarrierWaveform('sine');
      soilMoistureSynth.setModulatorWaveform('triangle');
      temperatureSynth.setCarrierWaveform('sine');
      temperatureSynth.setModulatorWaveform('triangle');
      humiditySynth.setCarrierWaveform('sine');
      humiditySynth.setModulatorWaveform('triangle');

      referenceNoteOscillator.frequency.setValueAtTime(632.46, audioCtx.currentTime);
      referenceNoteGainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      referenceNoteGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      referenceNoteMuteNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      referenceNoteOscillator.start();

      displacementSynth.start();
      soilMoistureSynth.start();
      temperatureSynth.start();
      humiditySynth.start();
      referenceNoteOscillator.stop(audioCtx.currentTime + 0.75);
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
      const displacementSynth = displacementSynthRef.current;
      const soilMoistureSynth = soilMoistureSynthRef.current;
      const temperatureSynth = temperatureSynthRef.current;
      const humiditySynth = humiditySynthRef.current;
      const temperatureStereoPannerNode = temperatureStereoPannerNodeRef.current;

      const index = incrementalData.length - 1
      setHighlightedIndex(index);
      const record = incrementalData[index];

      temperatureStereoPannerNode.pan.value = rescaleAudioParameter(-20, 60, -1, 1, record?.temperature);

      displacementSynth.releaseEnvelope();
      soilMoistureSynth.releaseEnvelope();
      temperatureSynth.releaseEnvelope();
      humiditySynth.releaseEnvelope();

      displacementSynth.setCarrierFrequency(rescaleFrequency(0, 10, 200, 2000, record?.displacement));
      soilMoistureSynth.setCarrierFrequency(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture));
      temperatureSynth.setCarrierFrequency(rescaleFrequency(-20, 60, 200, 2000, record?.temperature));
      humiditySynth.setCarrierFrequency(rescaleFrequency(0, 100, 200, 2000, record?.humidity));

      if(triggerEnvelope) {
        displacementSynth.triggerEnvelope();
        soilMoistureSynth.triggerEnvelope();
        temperatureSynth.triggerEnvelope();
        humiditySynth.triggerEnvelope();
        setTriggerEnvelope(false);
      }

      displacementSynth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      displacementSynth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      displacementSynth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      soilMoistureSynth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      soilMoistureSynth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      soilMoistureSynth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      temperatureSynth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      temperatureSynth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      temperatureSynth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      humiditySynth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      humiditySynth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      humiditySynth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));
    }
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
    const masterVolumeMuteNode = masterVolumeMuteNodeRef.current;
    if (mute) masterVolumeMuteNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.01);
    else masterVolumeMuteNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 1.5), audioCtx.currentTime + 0.01);
  };

  const stopSound = () => {
    const audioCtx = audioCtxRef.current;
    const displacementSynth = displacementSynthRef.current;
    const soilMoistureSynth = soilMoistureSynthRef.current;
    const temperatureSynth = temperatureSynthRef.current;
    const humiditySynth = humiditySynthRef.current;
    muteSound();
    if (play) {
      displacementSynth.stop(audioCtx.currentTime + 0.25);
      soilMoistureSynth.stop(audioCtx.currentTime + 0.25);
      temperatureSynth.stop(audioCtx.currentTime + 0.25);
      humiditySynth.stop(audioCtx.currentTime + 0.25);
    }
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
  }, [dataSource, dataAveragingPeriod]);

  const [variable0Hide, setVariable0Hide] = useState(false);
  const variable0HideOnClick = () => {
    setVariable0Hide(!variable0Hide);
    graphRef.current.toggleVariableVisibility('displacement', variable0Hide);
  };
  const [variable1Hide, setVariable1Hide] = useState(false);
  const variable1HideOnClick = () => {
    setVariable1Hide(!variable1Hide);
    graphRef.current.toggleVariableVisibility('soilMoisture', variable1Hide);
  };
  const [variable2Hide, setVariable2Hide] = useState(false);
  const variable2HideOnClick = () => {
    setVariable2Hide(!variable2Hide);
    graphRef.current.toggleVariableVisibility('temperature', variable2Hide);
  };
  const [variable3Hide, setVariable3Hide] = useState(false);
  const variable3HideOnClick = () => {
    setVariable3Hide(!variable3Hide);
    graphRef.current.toggleVariableVisibility('humidity', variable3Hide);
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
    if (!data || data.length === 0) {
      setRefinedDataValues([]);
      return;
    }
    const periodHours = Number(dataAveragingPeriod);
    if (isNaN(periodHours) || periodHours <= 0) {
      setRefinedDataValues(data);
      return;
    }
    const msPerBin = periodHours * 60 * 60 * 1000;
    const sortedData = [...data].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    const startTime = new Date(sortedData[0].timestamp).getTime();
    const endTime = new Date(sortedData[sortedData.length - 1].timestamp).getTime();
    const result = [];
    for (let binStart = startTime; binStart <= endTime; binStart += msPerBin) {
      const binEnd = binStart + msPerBin;
      const binData = sortedData.filter(d => {
        const ts = new Date(d.timestamp).getTime();
        return ts >= binStart && ts < binEnd;
      });
      if (binData.length === 0) continue;
      const keys = Object.keys(binData[0]).filter(key => key !== 'timestamp');
      const averagedEntry = {
        timestamp: new Date(binStart),
        binStart: new Date(binStart),
        binEnd: new Date(binEnd),
        count: binData.length
      };
      keys.forEach(key => {
        const sum = binData.reduce((acc, d) => acc + (Number(d[key]) || 0), 0);
        averagedEntry[key] = sum / binData.length;
      });
      result.push(averagedEntry);
    }
    console.log(result);
    setRefinedDataValues(result);
  }, [dataAveragingPeriod, data]);


  return (
    <PageLayout title='Primary Data Preset 3' backLink='primary-data' help helpOnClick={helpClick} dataControls treeOnClick={treeClick} aboutOnClick={aboutClick}>
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
                : <div style={{ height: '40em', width: `${remap(graphZoom)}%`, marginBottom: '2rem' }}><BarChart ref={graphRef} data={incrementalData} avg={avg} highlightedIndex={highlightedIndex} zoom={remap(graphZoom)} loading={loading} /></div>
      }
      <Controls playMode={play} playOnClick={playOnClick} pauseMode={pause} pauseOnClick={pauseOnClick} stopMode={stop} stopOnClick={stopOnClick} hideMute={hideMute} muteMode={mute} muteOnClick={muteOnClick} hideMode={hide} hideOnClick={hideOnClick} />
      <PresetOptionsPanel
        endpoints={endpoints}
        dataRange={dataAveragingPeriod}
        dataRangeSet={dataAveragingPeriodSet}
        playbackSpeed={playbackSpeed}
        playbackSpeedSet={playbackSpeedSet}
        zoom={graphZoom}
        zoomSet={graphZoomSet}
        averagingPeriod
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
        displacementMapping='The displacement value is represented by the red line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The displacement value is additionally mapped to the harmonicity ratio (from harmonic to inharmonic sounds) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener.'
        soilMoistureMapping='The soil moisture value is represented by the green line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 1000 Hz, based on the data value. The soil moisture value is additionally mapped to the modulator frequency (from vibrato to harsh sounds) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener.'
        temperatureMapping='The temperature value is represented by the blue line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The temperature value is additionally mapped to the stereo panning (from left to right) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the orange line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The humidity value is additionally mapped to the modulation index (from subtle to complex sounds) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
      />
      <PresetHelpModal
        modalName='help'
        helpNavigate={helpNavigateClick}
        averagingPeriod={true}
      />
    </PageLayout>
  )
}