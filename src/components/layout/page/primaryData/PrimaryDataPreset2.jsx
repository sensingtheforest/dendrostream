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
import AboutPrimaryDataModal from '../../../ui/modal/AboutPrimaryDataModal';
import PresetHelpModal from '../../../ui/modal/PresetHelpModal';
import useRealtimeUpdates from '../../../hook/useRealtimeUpdates';
import SingleLineGraph from '../../../ui/visualisation/graph/SingleLineGraph';
import logo from '../../../../assets/stf-logo.png';
import TreeSelectModal from '../../../ui/modal/TreeSelectModal';
import { getAudioContext } from '../../../context/AudioContext';

export default function PrimaryDataPreset2({ endpoints={} }) {
  const navigate = useNavigate();

  const [incrementalData1, setIncrementalData1] = useState([]);
  const [incrementalData2, setIncrementalData2] = useState([]);

  const [highlightedIndex1, setHighlightedIndex1] = useState(0);
  const [highlightedIndex2, setHighlightedIndex2] = useState(0);

  const audioCtxRef = useRef(null);
  const isFirstRender = useRef(true);

  const displacement1OscillatorRef = useRef(null);
  const soilMoisture1OscillatorRef = useRef(null);
  const temperature1OscillatorRef = useRef(null);
  const humidity1OscillatorRef = useRef(null);
  const displacement2OscillatorRef = useRef(null);
  const soilMoisture2OscillatorRef = useRef(null);
  const temperature2OscillatorRef = useRef(null);
  const humidity2OscillatorRef = useRef(null);
  const referenceNoteOscillatorRef = useRef(null);

  const displacement1GainNodeRef = useRef(null);
  const soilMoisture1GainNodeRef = useRef(null);
  const temperature1GainNodeRef = useRef(null);
  const humidity1GainNodeRef = useRef(null);
  const displacement2GainNodeRef = useRef(null);
  const soilMoisture2GainNodeRef = useRef(null);
  const temperature2GainNodeRef = useRef(null);
  const humidity2GainNodeRef = useRef(null);
  const referenceNoteGainNodeRef = useRef(null);
  const masterVolumeGainNodeRef = useRef(null);

  const displacement1MuteNodeRef = useRef(null);
  const soilMoisture1MuteNodeRef = useRef(null);
  const temperature1MuteNodeRef = useRef(null);
  const humidity1MuteNodeRef = useRef(null);
  const displacement2MuteNodeRef = useRef(null);
  const soilMoisture2MuteNodeRef = useRef(null);
  const temperature2MuteNodeRef = useRef(null);
  const humidity2MuteNodeRef = useRef(null);
  const referenceNoteMuteNodeRef = useRef(null);
  const masterVolumeMuteNodeRef = useRef(null);

  const displacement1PannerNodeRef = useRef(null);
  const soilMoisture1PannerNodeRef = useRef(null);
  const temperature1PannerNodeRef = useRef(null);
  const humidity1PannerNodeRef = useRef(null);
  const displacement2PannerNodeRef = useRef(null);
  const soilMoisture2PannerNodeRef = useRef(null);
  const temperature2PannerNodeRef = useRef(null);
  const humidity2PannerNodeRef = useRef(null);
  const referenceNotePannerNodeRef = useRef(null);
  const graph1StereoPannerNodeRef = useRef(null);
  const graph2StereoPannerNodeRef = useRef(null);
  const masterVolumePannerNodeRef = useRef(null);

  const [hide, setHide] = useState(false);
  const hideOnClick = () => setHide(!hide);
  const [mute, setMute] = useState(false);
  const muteOnClick = () => setMute(!mute);
  const [pause, setPause] = useState(false);
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(true);
  const [initialiseVisuals, setInitialiseVisuals] = useState(true);
  const [refinedDataValues1, setRefinedDataValues1] = useState([]);
  const [refinedDataValues2, setRefinedDataValues2] = useState([]);
  const [hideMute, setHideMute] = useState(true);

  useEffect(() => {
    if (masterVolumeMuteNodeRef.current) setHideMute(false);
    else setHideMute(true);
  }, [play, masterVolumeMuteNodeRef.current]);

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
    const displacement1GainNode = displacement1GainNodeRef.current;
    const displacement2GainNode = displacement2GainNodeRef.current;
    displacement1GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
    displacement2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
  };
  const [variable0Mute, setVariable0Mute] = useState(false);
  const variable0MuteOnClick = () => setVariable0Mute(!variable0Mute);
    
  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const displacement1MuteNode = displacement1MuteNodeRef.current;
    const displacement2MuteNode = displacement2MuteNodeRef.current;
    if (variable0Mute) {
      displacement1MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      displacement2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    }
    else {
      displacement1MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      displacement2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
    }
  }, [variable0Mute]);

  const [variable1Volume, setVariable1Volume] = useState(100);
  const variable1SetVolume = volume => {
    setVariable1Volume(volume);
    const audioCtx = audioCtxRef.current;
    const soilMoisture1GainNode = soilMoisture1GainNodeRef.current;
    const soilMoisture2GainNode = soilMoisture2GainNodeRef.current;
    soilMoisture1GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
    soilMoisture2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
  };
  const [variable1Mute, setVariable1Mute] = useState(false);
  const variable1MuteOnClick = () => setVariable1Mute(!variable1Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const soilMoisture1MuteNode = soilMoisture1MuteNodeRef.current;
    const soilMoisture2MuteNode = soilMoisture2MuteNodeRef.current;
    if (variable1Mute) {
      soilMoisture1MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      soilMoisture2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    }
    else {
      soilMoisture1MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      soilMoisture2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
    }
  }, [variable1Mute]);

  const [variable2Volume, setVariable2Volume] = useState(100);
  const variable2SetVolume = volume => {
    setVariable2Volume(volume);
    const audioCtx = audioCtxRef.current;
    const temperature1GainNode = temperature1GainNodeRef.current;
    const temperature2GainNode = temperature2GainNodeRef.current;
    temperature1GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    temperature2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
  };
  const [variable2Mute, setVariable2Mute] = useState(false);
  const variable2MuteOnClick = () => setVariable2Mute(!variable2Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const temperature1MuteNode = temperature1MuteNodeRef.current;
    const temperature2MuteNode = temperature2MuteNodeRef.current;
    if (variable2Mute) {
      temperature1MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      temperature2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    }
    else {
      temperature1MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      temperature2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
    }
  }, [variable2Mute]);

  const [variable3Volume, setVariable3Volume] = useState(100);
  const variable3SetVolume = volume => {
    setVariable3Volume(volume);
    const audioCtx = audioCtxRef.current;
    const humidity1GainNode = humidity1GainNodeRef.current;
    const humidity2GainNode = humidity2GainNodeRef.current;
    humidity1GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    humidity2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
  };
  const [variable3Mute, setVariable3Mute] = useState(false);
  const variable3MuteOnClick = () => setVariable3Mute(!variable3Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const humidity1MuteNode = humidity1MuteNodeRef.current;
    const humidity2MuteNode = humidity2MuteNodeRef.current;
    if (variable3Mute) {
      humidity1MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      humidity2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
    }
    else {
      humidity1MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
      humidity2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
    }
  }, [variable3Mute]);

  const [playbackSpeed, setPlaybackSpeed] = useState(50);
  const playbackSpeedSet = playbackSpeed => setPlaybackSpeed(playbackSpeed);
  const [graphZoom, setGraphZoom] = useState(0);
  const graphZoomSet = graphZoom => setGraphZoom(graphZoom);
  const [dataSource1, setDataSource1] = useState('northern_1');
  const dataSourceSet1 = dataSource => setDataSource1(dataSource);
  const [dataSource2, setDataSource2] = useState('northern_2');
  const dataSourceSet2 = dataSource => setDataSource2(dataSource);
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

  const playSound = () => {
    if (!play) {
      const audioCtx = getAudioContext();
      audioCtxRef.current = audioCtx;

      const displacement1Oscillator = audioCtx.createOscillator();
      displacement1OscillatorRef.current = displacement1Oscillator;
      const soilMoisture1Oscillator = audioCtx.createOscillator();
      soilMoisture1OscillatorRef.current = soilMoisture1Oscillator;
      const temperature1Oscillator = audioCtx.createOscillator();
      temperature1OscillatorRef.current = temperature1Oscillator;
      const humidity1Oscillator = audioCtx.createOscillator();
      humidity1OscillatorRef.current = humidity1Oscillator;
      const displacement2Oscillator = audioCtx.createOscillator();
      displacement2OscillatorRef.current = displacement2Oscillator;
      const soilMoisture2Oscillator = audioCtx.createOscillator();
      soilMoisture2OscillatorRef.current = soilMoisture2Oscillator;
      const temperature2Oscillator = audioCtx.createOscillator();
      temperature2OscillatorRef.current = temperature2Oscillator;
      const humidity2Oscillator = audioCtx.createOscillator();
      humidity2OscillatorRef.current = humidity2Oscillator;
      const referenceNoteOscillator = audioCtx.createOscillator();
      referenceNoteOscillatorRef.current = referenceNoteOscillator;

      const displacement1GainNode = audioCtx.createGain();
      displacement1GainNodeRef.current = displacement1GainNode;
      const soilMoisture1GainNode = audioCtx.createGain();
      soilMoisture1GainNodeRef.current = soilMoisture1GainNode;
      const temperature1GainNode = audioCtx.createGain();
      temperature1GainNodeRef.current = temperature1GainNode;
      const humidity1GainNode = audioCtx.createGain();
      humidity1GainNodeRef.current = humidity1GainNode;
      const displacement2GainNode = audioCtx.createGain();
      displacement2GainNodeRef.current = displacement2GainNode;
      const soilMoisture2GainNode = audioCtx.createGain();
      soilMoisture2GainNodeRef.current = soilMoisture2GainNode;
      const temperature2GainNode = audioCtx.createGain();
      temperature2GainNodeRef.current = temperature2GainNode;
      const humidity2GainNode = audioCtx.createGain();
      humidity2GainNodeRef.current = humidity2GainNode;
      const referenceNoteGainNode = audioCtx.createGain();
      referenceNoteGainNodeRef.current = referenceNoteGainNode;

      const displacement1MuteNode = audioCtx.createGain();
      displacement1MuteNodeRef.current = displacement1MuteNode;
      const soilMoisture1MuteNode = audioCtx.createGain();
      soilMoisture1MuteNodeRef.current = soilMoisture1MuteNode;
      const temperature1MuteNode = audioCtx.createGain();
      temperature1MuteNodeRef.current = temperature1MuteNode;
      const humidity1MuteNode = audioCtx.createGain();
      humidity1MuteNodeRef.current = humidity1MuteNode;
      const displacement2MuteNode = audioCtx.createGain();
      displacement2MuteNodeRef.current = displacement2MuteNode;
      const soilMoisture2MuteNode = audioCtx.createGain();
      soilMoisture2MuteNodeRef.current = soilMoisture2MuteNode;
      const temperature2MuteNode = audioCtx.createGain();
      temperature2MuteNodeRef.current = temperature2MuteNode;
      const humidity2MuteNode = audioCtx.createGain();
      humidity2MuteNodeRef.current = humidity2MuteNode;
      const referenceNoteMuteNode = audioCtx.createGain();
      referenceNoteMuteNodeRef.current = referenceNoteMuteNode;

      const masterVolumeGainNode = audioCtx.createGain();
      masterVolumeGainNodeRef.current = masterVolumeGainNode;
      const masterVolumeMuteNode = audioCtx.createGain();
      masterVolumeMuteNodeRef.current = masterVolumeMuteNode;

      const displacement1PannerNode = audioCtx.createPanner();
      displacement1PannerNodeRef.current = displacement1PannerNode;
      displacement1PannerNode.panningModel = 'HRTF';
      displacement1PannerNode.distanceModel = 'inverse';
      displacement1PannerNode.setPosition(-2, -2, -1); // 2m left, 2m down, 1m back
      const displacement2PannerNode = audioCtx.createPanner();
      displacement2PannerNodeRef.current = displacement2PannerNode;
      displacement2PannerNode.panningModel = 'HRTF';
      displacement2PannerNode.distanceModel = 'inverse';
      displacement2PannerNode.setPosition(-2, -2, -1); // 2m left, 2m down, 1m back

      const soilMoisture1PannerNode = audioCtx.createPanner();
      soilMoisture1PannerNodeRef.current = soilMoisture1PannerNode;
      soilMoisture1PannerNode.panningModel = 'HRTF';
      soilMoisture1PannerNode.distanceModel = 'inverse';
      soilMoisture1PannerNode.setPosition(2, 2, -1); // 2m right, 2m up, 1m back
      const soilMoisture2PannerNode = audioCtx.createPanner();
      soilMoisture2PannerNodeRef.current = soilMoisture2PannerNode;
      soilMoisture2PannerNode.panningModel = 'HRTF';
      soilMoisture2PannerNode.distanceModel = 'inverse';
      soilMoisture2PannerNode.setPosition(2, 2, -1); // 2m right, 2m up, 1m back

      const temperature1PannerNode = audioCtx.createPanner();
      temperature1PannerNodeRef.current = temperature1PannerNode;
      temperature1PannerNode.panningModel = 'HRTF';
      temperature1PannerNode.distanceModel = 'inverse';
      temperature1PannerNode.setPosition(-5, -5, 1); // 5m left, 5m down, 1m front
      const temperature2PannerNode = audioCtx.createPanner();
      temperature2PannerNodeRef.current = temperature2PannerNode;
      temperature2PannerNode.panningModel = 'HRTF';
      temperature2PannerNode.distanceModel = 'inverse';
      temperature2PannerNode.setPosition(-5, -5, 1); // 5m left, 5m down, 1m front

      const humidity1PannerNode = audioCtx.createPanner();
      humidity1PannerNodeRef.current = humidity1PannerNode;
      humidity1PannerNode.panningModel = 'HRTF';
      humidity1PannerNode.distanceModel = 'inverse';
      humidity1PannerNode.setPosition(5, 5, 1); // 5m right, 5m up, 1m front
      const humidity2PannerNode = audioCtx.createPanner();
      humidity2PannerNodeRef.current = humidity2PannerNode;
      humidity2PannerNode.panningModel = 'HRTF';
      humidity2PannerNode.distanceModel = 'inverse';
      humidity2PannerNode.setPosition(5, 5, 1); // 5m right, 5m up, 1m front

      const referenceNotePannerNode = audioCtx.createPanner();
      referenceNotePannerNodeRef.current = referenceNotePannerNode;
      referenceNotePannerNode.panningModel = 'HRTF';
      referenceNotePannerNode.distanceModel = 'inverse';
      referenceNotePannerNode.setPosition(0, 0, 0); // Centre

      const graph1StereoPannerNode = audioCtx.createStereoPanner();
      graph1StereoPannerNodeRef.current = graph1StereoPannerNode;
      graph1StereoPannerNode.pan.value = -1.0;

      const graph2StereoPannerNode = audioCtx.createStereoPanner();
      graph2StereoPannerNodeRef.current = graph2StereoPannerNode;
      graph2StereoPannerNode.pan.value = 1.0;

      const masterVolumePannerNode = audioCtx.createPanner();
      masterVolumePannerNodeRef.current = masterVolumePannerNode;
      masterVolumePannerNode.panningModel = 'HRTF';
      masterVolumePannerNode.distanceModel = 'inverse';
      masterVolumePannerNode.setPosition(0, 0, 0); // Centre

      displacement1GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      soilMoisture1GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      temperature1GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      humidity1GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume  * 1.5), audioCtx.currentTime + 0.01);
      displacement2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      soilMoisture2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      temperature2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume  * 1.5), audioCtx.currentTime + 0.01);
      humidity2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume  * 1.5), audioCtx.currentTime + 0.01);
      masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 1.5), audioCtx.currentTime + 0.01);

      displacement1Oscillator.connect(displacement1GainNode);
      soilMoisture1Oscillator.connect(soilMoisture1GainNode);
      temperature1Oscillator.connect(temperature1GainNode);
      humidity1Oscillator.connect(humidity1GainNode);
      displacement2Oscillator.connect(displacement2GainNode);
      soilMoisture2Oscillator.connect(soilMoisture2GainNode);
      temperature2Oscillator.connect(temperature2GainNode);
      humidity2Oscillator.connect(humidity2GainNode);
      referenceNoteOscillator.connect(referenceNoteGainNode);

      displacement1GainNode.connect(displacement1MuteNode);
      soilMoisture1GainNode.connect(soilMoisture1MuteNode);
      temperature1GainNode.connect(temperature1MuteNode);
      humidity1GainNode.connect(humidity1MuteNode);
      displacement2GainNode.connect(displacement2MuteNode);
      soilMoisture2GainNode.connect(soilMoisture2MuteNode);
      temperature2GainNode.connect(temperature2MuteNode);
      humidity2GainNode.connect(humidity2MuteNode);
      referenceNoteGainNode.connect(referenceNoteMuteNode);

      displacement1MuteNode.connect(displacement1PannerNode);
      soilMoisture1MuteNode.connect(soilMoisture1PannerNode);
      temperature1MuteNode.connect(temperature1PannerNode);
      humidity1MuteNode.connect(humidity1PannerNode);
      displacement2MuteNode.connect(displacement2PannerNode);
      soilMoisture2MuteNode.connect(soilMoisture2PannerNode);
      temperature2MuteNode.connect(temperature2PannerNode);
      humidity2MuteNode.connect(humidity2PannerNode);
      referenceNoteMuteNode.connect(referenceNotePannerNode);

      displacement1PannerNode.connect(graph1StereoPannerNode);
      soilMoisture1PannerNode.connect(graph1StereoPannerNode);
      temperature1PannerNode.connect(graph1StereoPannerNode);
      humidity1PannerNode.connect(graph1StereoPannerNode);
      displacement2PannerNode.connect(graph2StereoPannerNode);
      soilMoisture2PannerNode.connect(graph2StereoPannerNode);
      temperature2PannerNode.connect(graph2StereoPannerNode);
      humidity2PannerNode.connect(graph2StereoPannerNode);

      graph1StereoPannerNode.connect(masterVolumePannerNode);
      graph2StereoPannerNode.connect(masterVolumePannerNode);
      referenceNotePannerNode.connect(masterVolumePannerNode);

      masterVolumePannerNode.connect(masterVolumeGainNode);
      masterVolumeGainNode.connect(masterVolumeMuteNode);
      masterVolumeMuteNode.connect(audioCtx.destination);

      displacement1Oscillator.type = 'sine';
      soilMoisture1Oscillator.type = 'triangle';
      temperature1Oscillator.type = 'sine';
      humidity1Oscillator.type = 'triangle';
      displacement2Oscillator.type = 'sine';
      soilMoisture2Oscillator.type = 'triangle';
      temperature2Oscillator.type = 'sine';
      humidity2Oscillator.type = 'triangle';

      displacement1Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      soilMoisture1Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      temperature1Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      humidity1Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      displacement2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      soilMoisture2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      temperature2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      humidity2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);

      referenceNoteOscillator.frequency.setValueAtTime(632.46, audioCtx.currentTime);
      referenceNoteGainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      referenceNoteGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      referenceNoteMuteNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      referenceNoteOscillator.start();

      displacement1Oscillator.start();
      soilMoisture1Oscillator.start();
      temperature1Oscillator.start();
      humidity1Oscillator.start();
      displacement2Oscillator.start();
      soilMoisture2Oscillator.start();
      temperature2Oscillator.start();
      humidity2Oscillator.start();
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
    if (play && incrementalData1.length > 0) {
      const audioCtx = audioCtxRef.current;
      const displacement1Oscillator = displacement1OscillatorRef.current;
      const soilMoisture1Oscillator = soilMoisture1OscillatorRef.current;
      const temperature1Oscillator = temperature1OscillatorRef.current;
      const humidity1Oscillator = humidity1OscillatorRef.current;

      const index = incrementalData1.length - 1
      setHighlightedIndex1(index);
      const record = incrementalData1[index];

      displacement1Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 10, 200, 2000, record?.displacement), audioCtx.currentTime);
      soilMoisture1Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture), audioCtx.currentTime);
      temperature1Oscillator.frequency.setValueAtTime(rescaleFrequency(-20, 60, 200, 2000, record?.temperature), audioCtx.currentTime);
      humidity1Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 2000, record?.humidity), audioCtx.currentTime);
    }
  }, [play, incrementalData1]);

  useEffect(() => {
    if (play && incrementalData2.length > 0) {
      const audioCtx = audioCtxRef.current;
      const displacement2Oscillator = displacement2OscillatorRef.current;
      const soilMoisture2Oscillator = soilMoisture2OscillatorRef.current;
      const temperature2Oscillator = temperature2OscillatorRef.current;
      const humidity2Oscillator = humidity2OscillatorRef.current;

      const index = incrementalData2.length - 1
      setHighlightedIndex2(index);
      const record = incrementalData2[index];

      displacement2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 10, 200, 2000, record?.displacement), audioCtx.currentTime);
      soilMoisture2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture), audioCtx.currentTime);
      temperature2Oscillator.frequency.setValueAtTime(rescaleFrequency(-20, 60, 200, 2000, record?.temperature), audioCtx.currentTime);
      humidity2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 2000, record?.humidity), audioCtx.currentTime);
    }
  }, [play, incrementalData2]);

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
    const displacement1Oscillator = displacement1OscillatorRef.current;
    const soilMoisture1Oscillator = soilMoisture1OscillatorRef.current;
    const temperature1Oscillator = temperature1OscillatorRef.current;
    const humidity1Oscillator = humidity1OscillatorRef.current;
    const displacement2Oscillator = displacement2OscillatorRef.current;
    const soilMoisture2Oscillator = soilMoisture2OscillatorRef.current;
    const temperature2Oscillator = temperature2OscillatorRef.current;
    const humidity2Oscillator = humidity2OscillatorRef.current;
    muteSound();
    if (play) {
      displacement1Oscillator.stop(audioCtx.currentTime + 0.25);
      soilMoisture1Oscillator.stop(audioCtx.currentTime + 0.25);
      temperature1Oscillator.stop(audioCtx.currentTime + 0.25);
      humidity1Oscillator.stop(audioCtx.currentTime + 0.25);
      displacement2Oscillator.stop(audioCtx.currentTime + 0.25);
      soilMoisture2Oscillator.stop(audioCtx.currentTime + 0.25);
      temperature2Oscillator.stop(audioCtx.currentTime + 0.25);
      humidity2Oscillator.stop(audioCtx.currentTime + 0.25);
    }
  }

  const graph1Ref = useRef();
  const graph2Ref = useRef();
  const stopOnClick = () => {
    setPlay(false);
    setPause(false);
    setStop(true);
    setInitialiseVisuals(true);
    stopSound();
    setIncrementalData1([]);
    setIncrementalData2([]);
    currentIndex1Ref.current = 0;
    currentIndex2Ref.current = 0;
    graph1Ref?.current?.clearChart();
    graph2Ref?.current?.clearChart();
  };

  useEffect(() => {
    if (!initialiseVisuals) {
      stopOnClick();
      playOnClick();
    }
  }, [dataSource1, dataSource2, dataRange]);

  const [variable0Hide, setVariable0Hide] = useState(false);
  const variable0HideOnClick = () => {
    setVariable0Hide(!variable0Hide);
    graph1Ref.current.toggleVariableVisibility('displacement', variable0Hide);
    graph2Ref.current.toggleVariableVisibility('displacement', variable0Hide);
  };
  const [variable1Hide, setVariable1Hide] = useState(false);
  const variable1HideOnClick = () => {
    setVariable1Hide(!variable1Hide);
    graph1Ref.current.toggleVariableVisibility('soilMoisture', variable1Hide);
    graph2Ref.current.toggleVariableVisibility('soilMoisture', variable1Hide);
  };
  const [variable2Hide, setVariable2Hide] = useState(false);
  const variable2HideOnClick = () => {
    setVariable2Hide(!variable2Hide);
    graph1Ref.current.toggleVariableVisibility('temperature', variable2Hide);
    graph2Ref.current.toggleVariableVisibility('temperature', variable2Hide);
  };
  const [variable3Hide, setVariable3Hide] = useState(false);
  const variable3HideOnClick = () => {
    setVariable3Hide(!variable3Hide);
    graph1Ref.current.toggleVariableVisibility('humidity', variable3Hide);
    graph2Ref.current.toggleVariableVisibility('humidity', variable3Hide);
  };

  const treeClick = () => {
    const modalElement = document.getElementById('treeselect');
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
  const treeN1Click = () => {
    const modalElement = document.getElementById('treeselect');
    const modalInstance = bsModal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
    modalElement.addEventListener('hidden.bs.modal', () => {
      const modal2Element = document.getElementById('treen1');
      if (modal2Element) {
        const modal2Instance = new bsModal(modal2Element);
        modal2Instance.show();
      }
    }, { once: true });
  };

  const treeN2Click = () => {
    const modalElement = document.getElementById('treeselect');
    const modalInstance = bsModal.getInstance(modalElement);
    if (modalInstance) modalInstance.hide();
    modalElement.addEventListener('hidden.bs.modal', () => {
      const modal2Element = document.getElementById('treen2');
      if (modal2Element) {
        const modal2Instance = new bsModal(modal2Element);
        modal2Instance.show();
      }
    }, { once: true });
  };

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

  const { data: data1, loading: loading1 } = useRealtimeUpdates({
    apiUrl: dataSource1,
    socketPort: getSocketPort(dataSource1),
    socketName: dataSource1.replace('_', '-')
  });
  const { data: data2, loading: loading2 } = useRealtimeUpdates({
    apiUrl: dataSource2,
    socketPort: getSocketPort(dataSource2),
    socketName: dataSource2.replace('_', '-')
  });
  
  const currentIndex1Ref = useRef(0);
  const currentIndex2Ref = useRef(0);
  const interval1Ref = useRef(0);
  const interval2Ref = useRef(0);

  
  const remap = (value, inMin=0, inMax=100, outMin=100, outMax=1000) => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  function remapReversed(value, inputMin = 0, inputMax = 100, outputMin = 0, outputMax = 1000) {
    const ratio = (value - inputMin) / (inputMax - inputMin);
    const inverted = 1 - ratio;
    return inverted * (outputMax - outputMin) + outputMin;
  }

useEffect(() => {
    if (!refinedDataValues1 || !Array.isArray(refinedDataValues1)) return;
    if (pause || stop || !play || currentIndex1Ref.current >= refinedDataValues1.length) return;
    interval1Ref.current = setInterval(() => {
      const idx = currentIndex1Ref.current;
      if (idx >= refinedDataValues1.length) {
        clearInterval(interval1Ref.current);
        return;
      }
      setIncrementalData1(prevData => [...prevData, refinedDataValues1[idx]]);
      currentIndex1Ref.current += 1; 
    }, remapReversed(playbackSpeed));
    return () => clearInterval(interval1Ref.current);
  }, [refinedDataValues1, data1, pause, play, stop, playbackSpeed]);

  useEffect(() => {
    if (!refinedDataValues2 || !Array.isArray(refinedDataValues2)) return;
    if (pause || stop || !play || currentIndex2Ref.current >= refinedDataValues2.length) return;
    interval2Ref.current = setInterval(() => {
      const idx = currentIndex2Ref.current;
      if (idx >= refinedDataValues2.length) {
        clearInterval(interval2Ref.current);
        return;
      }
      setIncrementalData2(prevData => [...prevData, refinedDataValues2[idx]]);
      currentIndex2Ref.current += 1; 
    }, remapReversed(playbackSpeed));
    return () => clearInterval(interval2Ref.current);
  }, [refinedDataValues2, data2, pause, play, stop, playbackSpeed]);

useEffect(() => {
  if (dataRange === '-1') {
    if (data1 && data1.length > 0) setRefinedDataValues1([data1[data1.length - 1]]);
    else setRefinedDataValues1([]);
    return;
  }
  if (dataRange === '0') {
    setRefinedDataValues1(data1);
    return;
  }
  const hours = Number(dataRange);
  if (isNaN(hours) || hours <= 0) {
    setRefinedDataValues1(data1);
    return;
  }
  const now = Date.now();
  const cutoff = now - hours * 60 * 60 * 1000; 
  setRefinedDataValues1(data1.filter(item => {
    const timestamp = (item.timestamp instanceof Date) ? item.timestamp.getTime() : new Date(item.timestamp).getTime();
    return timestamp >= cutoff;
  }));
}, [dataRange, data1]);

useEffect(() => {
  if (dataRange === '-1') {
    if (data2 && data2.length > 0) setRefinedDataValues2([data2[data2.length - 1]]);
    else setRefinedDataValues2([]);
    return;
  }
  if (dataRange === '0') {
    setRefinedDataValues2(data2);
    return;
  }
  const hours = Number(dataRange);
  if (isNaN(hours) || hours <= 0) {
    setRefinedDataValues2(data2);
    return;
  }
  const now = Date.now();
  const cutoff = now - hours * 60 * 60 * 1000; 
  setRefinedDataValues2(data2.filter(item => {
    const timestamp = (item.timestamp instanceof Date) ? item.timestamp.getTime() : new Date(item.timestamp).getTime();
    return timestamp >= cutoff;
  }));
}, [dataRange, data2]);


  return (
    <PageLayout title='Primary Data Preset 2' backLink='primary-data' help helpOnClick={helpClick} dataControls treeOnClick={treeClick} aboutOnClick={aboutClick}>
      {
          loading1 || loading2
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
                : <div className='d-flex flex-column'>
                  <h4>Northern 1</h4>
                  <div style={{ height: '20em', width: `${remap(graphZoom)}%`, marginBottom: '2rem' }}>
                    <SingleLineGraph ref={graph1Ref} data={incrementalData1} highlightedIndex={highlightedIndex1} zoom={remap(graphZoom)} loading={loading1} />
                  </div>
                  <h4>Northern 2</h4>
                  <div style={{ height: '20em', width: `${remap(graphZoom)}%`, marginBottom: '2rem' }}>
                    <SingleLineGraph ref={graph2Ref} data={incrementalData2} highlightedIndex={highlightedIndex2} zoom={remap(graphZoom)} loading={loading2} />
                  </div>
                </div>
      }
      <Controls playMode={play} playOnClick={playOnClick} pauseMode={pause} pauseOnClick={pauseOnClick} stopMode={stop} stopOnClick={stopOnClick} hideMute={hideMute} muteMode={mute} muteOnClick={muteOnClick} hideMode={hide} hideOnClick={hideOnClick} />
      <PresetOptionsPanel
        endpoints={endpoints}
        dataRange={dataRange}
        dataRangeSet={dataRangeSet}
        playbackSpeed={playbackSpeed}
        playbackSpeedSet={playbackSpeedSet}
        dataSourceHide={true}
        zoom={graphZoom}
        zoomSet={graphZoomSet}
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
      <TreeSelectModal modalName='treeselect'>
        <Button onClick={treeN1Click}>Northern 1</Button>
        <Button onClick={treeN2Click}>Northern 2</Button>
      </TreeSelectModal>
      <TreeN1Modal modalName='treen1' />
      <TreeN2Modal modalName='treen2' />
      <AboutPrimaryDataModal 
        modalName='about'
        referenceTone={true}
        dualSonification={true}
        displacementMapping='The displacement value is represented by the red line on the graph. It is also mapped to an audible sine wave, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener.'
        soilMoistureMapping='The soil moisture value is represented by the green line on the graph. It is also mapped to an audible triangle wave, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 1000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener.'
        temperatureMapping='The temperature value is represented by the blue line on the graph. It is also mapped to an audible sine wave, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the orange line on the graph. It is also mapped to an audible triangle wave, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
      />
      <PresetHelpModal
        modalName='help'
        helpNavigate={helpNavigateClick}
      />
    </PageLayout>
  )
}