import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DropdownSonifierStepper from '../../../ui/stepper/DropdownSonifierStepper';
import CustomSlider from '../../../ui/slider/CustomSlider';
import Dropdown from '../../../ui/dropdown/Dropdown';
import RangeSlider from '../../../ui/slider/RangeSlider';
import VolumeSlider from '../../../ui/slider/VolumeSlider';
import SpatialAudioSlider from '../../../ui/slider/SpatialAudioSlider';
import useRealtimeUpdates from '../../../hook/useRealtimeUpdates';
import TreeN1Modal from '../../../ui/modal/TreeN1Modal';
import TreeN2Modal from '../../../ui/modal/TreeN2Modal';
import TreeAnonModal from '../../../ui/modal/TreeAnonModal';
import AboutPersonalisedDataModal from '../../../ui/modal/AboutPersonalisedDataModal';
import PersonalisedDataHelpModal from '../../../ui/modal/PersonalisedDataHelpModal';

import { useCustomAudio } from '../../../context/CustomAudioContext';
import { getAudioContext } from '../../../context/AudioContext';
import FMSynth from '../../../ui/audio/FMSynth';

export default function CustomAudioDone({ endpoints={} }) {
  const navigate = useNavigate();

  const { variable0InstrumentOptions, 
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
    } = useCustomAudio();

  const dataRangeOptions = [
    { value: '-1', title: 'Live' },
    { value: '24', title: 'Previous 24 Hours' },
    { value: '168', title: 'Previous 7 Days' },
    { value: '336', title: 'Previous 14 Days' },
    { value: '672', title: 'Previous 28 Days' },
    { value: '2192', title: 'Previous 3 Months' },
    { value: '4384', title: 'Previous 6 Months' },
    { value: '8760', title: 'Previous 1 Year' },
    { value: '0', title: 'All Data' },
  ];

  const averagingPeriodOptions = [
    { value: '24', title: 'Previous 24 Hours' },
    { value: '168', title: 'Previous 7 Days' },
    { value: '336', title: 'Previous 14 Days' },
    { value: '672', title: 'Previous 28 Days' },
    { value: '2192', title: 'Previous 3 Months' },
    { value: '4384', title: 'Previous 6 Months' },
    { value: '8760', title: 'Previous 1 Year' },
    { value: '0', title: 'All Data' },
  ];

  const titleCase = str => 
    (str === 'fmSynth') ? 'FM Synth' : str
    .replace(/([a-z])([A-Z])/g, '$1 $2')     // Split before capitals (camelCase to spaced)
    .replace(/[_\-]+/g, ' ')                 // Replace underscores/hyphens with spaces
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case

  const [incrementalData, setIncrementalData] = useState([]);

  const audioCtxRef = useRef(null);
  const isFirstRender = useRef(true);
  const currentIndexRef = useRef(0);

  const referenceNoteOscillatorRef = useRef(null);

  const displacementGainNodeRef = useRef(null);
  const soilMoistureGainNodeRef = useRef(null);
  const temperatureGainNodeRef = useRef(null);
  const humidityGainNodeRef = useRef(null);
  const vpdGainNodeRef = useRef(null);
  const treeMeanGrowthGainNodeRef = useRef(null);
  const referenceNoteGainNodeRef = useRef(null);
  const masterVolumeGainNodeRef = useRef(null);

  const displacementMuteNodeRef = useRef(null);
  const soilMoistureMuteNodeRef = useRef(null);
  const temperatureMuteNodeRef = useRef(null);
  const humidityMuteNodeRef = useRef(null);
  const vpdMuteNodeRef = useRef(null);
  const treeMeanGrowthMuteNodeRef = useRef(null);
  const referenceNoteMuteNodeRef = useRef(null);
  const masterVolumeMuteNodeRef = useRef(null);

  const displacementPannerNodeRef = useRef(null);
  const soilMoisturePannerNodeRef = useRef(null);
  const temperaturePannerNodeRef = useRef(null);
  const humidityPannerNodeRef = useRef(null);
  const vpdPannerNodeRef = useRef(null);
  const treeMeanGrowthPannerNodeRef = useRef(null);
  const referenceNotePannerNodeRef = useRef(null);
  const masterVolumePannerNodeRef = useRef(null);

  const [mute, setMute] = useState(false);
  const muteOnClick = () => setMute(!mute);
  const [pause, setPause] = useState(false);
  const [play, setPlay] = useState(false);
  const [stop, setStop] = useState(true);

  const [initialiseVisuals, setInitialiseVisuals] = useState(true);
  const [refinedDataValues, setRefinedDataValues] = useState([]);
  const [averagedDataValues, setAveragedDataValues] = useState([]);
  const [hideMute, setHideMute] = useState(true);

  useEffect(() => {
    if (masterVolumeMuteNodeRef.current) setHideMute(false);
    else setHideMute(true);
  }, [play, masterVolumeMuteNodeRef.current]);
  
  const [masterPanningHeight, setMasterPanningHeight] = useState(0);
  const masterPanningHeightSet = height => { setMasterPanningHeight(height); };
  const [masterPanningWidth, setMasterPanningWidth] = useState(0);
  const masterPanningWidthSet = width => { setMasterPanningWidth(width); };
  const [masterPanningDepth, setMasterPanningDepth] = useState(0);
  const masterPanningDepthSet = depth => { setMasterPanningDepth(depth); };

  const [variable0PanningHeight, setVariable0PanningHeight] = useState(-2);
  const variable0PanningHeightSet = height => { setVariable0PanningHeight(height); };
  const [variable0PanningWidth, setVariable0PanningWidth] = useState(-2);
  const variable0PanningWidthSet = width => { setVariable0PanningWidth(width); };
  const [variable0PanningDepth, setVariable0PanningDepth] = useState(-1);
  const variable0PanningDepthSet = depth => { setVariable0PanningDepth(depth); };

  const [variable1PanningHeight, setVariable1PanningHeight] = useState(2);
  const variable1PanningHeightSet = height => { setVariable1PanningHeight(height); };
  const [variable1PanningWidth, setVariable1PanningWidth] = useState(2);
  const variable1PanningWidthSet = width => { setVariable1PanningWidth(width); };
  const [variable1PanningDepth, setVariable1PanningDepth] = useState(-1);
  const variable1PanningDepthSet = depth => { setVariable1PanningDepth(depth); };

  const [variable2PanningHeight, setVariable2PanningHeight] = useState(-5);
  const variable2PanningHeightSet = height => { setVariable2PanningHeight(height); };
  const [variable2PanningWidth, setVariable2PanningWidth] = useState(-5);
  const variable2PanningWidthSet = width => { setVariable2PanningWidth(width); };
  const [variable2PanningDepth, setVariable2PanningDepth] = useState(1);
  const variable2PanningDepthSet = depth => { setVariable2PanningDepth(depth); };

  const [variable3PanningHeight, setVariable3PanningHeight] = useState(5);
  const variable3PanningHeightSet = height => { setVariable3PanningHeight(height); };
  const [variable3PanningWidth, setVariable3PanningWidth] = useState(5);
  const variable3PanningWidthSet = width => { setVariable3PanningWidth(width); };
  const [variable3PanningDepth, setVariable3PanningDepth] = useState(1);
  const variable3PanningDepthSet = depth => { setVariable3PanningDepth(depth); };

  const [variable4PanningHeight, setVariable4PanningHeight] = useState(0);
  const variable4PanningHeightSet = height => { setVariable4PanningHeight(height); };
  const [variable4PanningWidth, setVariable4PanningWidth] = useState(0);
  const variable4PanningWidthSet = width => { setVariable4PanningWidth(width); };
  const [variable4PanningDepth, setVariable4PanningDepth] = useState(0);
  const variable4PanningDepthSet = depth => { setVariable4PanningDepth(depth); };

  const [variable5PanningHeight, setVariable5PanningHeight] = useState(0);
  const variable5PanningHeightSet = height => { setVariable5PanningHeight(height); };
  const [variable5PanningWidth, setVariable5PanningWidth] = useState(0);
  const variable5PanningWidthSet = width => { setVariable5PanningWidth(width); };
  const [variable5PanningDepth, setVariable5PanningDepth] = useState(0);
  const variable5PanningDepthSet = depth => { setVariable5PanningDepth(depth); };

  useEffect(() => {
    if (masterVolumePannerNodeRef?.current) {
      const masterVolumePannerNode = masterVolumePannerNodeRef.current;
      masterVolumePannerNode.setPosition(masterPanningWidth, masterPanningHeight, masterPanningDepth);
    }
  }, [masterPanningWidth, masterPanningHeight, masterPanningDepth]);

  useEffect(() => {
    if (displacementPannerNodeRef?.current) {
      const displacementPannerNode = displacementPannerNodeRef.current;
      displacementPannerNode.setPosition(variable0PanningWidth, variable0PanningHeight, variable0PanningDepth);
    }
  }, [variable0PanningWidth, variable0PanningHeight, variable0PanningDepth]);

  useEffect(() => {
    if (soilMoisturePannerNodeRef?.current) {
      const soilMoisturePannerNode = soilMoisturePannerNodeRef.current;
      soilMoisturePannerNode.setPosition(variable1PanningWidth, variable1PanningHeight, variable1PanningDepth);
    }
  }, [variable1PanningWidth, variable1PanningHeight, variable1PanningDepth]);

  useEffect(() => {
    if (temperaturePannerNodeRef?.current) {
      const temperaturePannerNode = temperaturePannerNodeRef.current;
      temperaturePannerNode.setPosition(variable2PanningWidth, variable2PanningHeight, variable2PanningDepth);
    }
  }, [variable2PanningWidth, variable2PanningHeight, variable2PanningDepth]);

  useEffect(() => {
    if (humidityPannerNodeRef?.current) {
      const humidityPannerNode = humidityPannerNodeRef.current;
      humidityPannerNode.setPosition(variable3PanningWidth, variable3PanningHeight, variable3PanningDepth);
    }
  }, [variable3PanningWidth, variable3PanningHeight, variable3PanningDepth]);

  useEffect(() => {
    if (vpdPannerNodeRef?.current) {
      const vpdPannerNode = vpdPannerNodeRef.current;
      vpdPannerNode.setPosition(variable4PanningWidth, variable4PanningHeight, variable4PanningDepth);
    }
  }, [variable4PanningWidth, variable4PanningHeight, variable4PanningDepth]);

  useEffect(() => {
    if (treeMeanGrowthPannerNodeRef?.current) {
      const treeMeanGrowthPannerNode = treeMeanGrowthPannerNodeRef.current;
      treeMeanGrowthPannerNode.setPosition(variable5PanningWidth, variable5PanningHeight, variable5PanningDepth);
    }
  }, [variable5PanningWidth, variable5PanningHeight, variable5PanningDepth]);

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
  
  const [variable4Volume, setVariable4Volume] = useState(100);
    const variable4SetVolume = volume => {
      setVariable4Volume(volume);
      const audioCtx = audioCtxRef.current;
      const vpdGainNode = vpdGainNodeRef.current;
      vpdGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.75), audioCtx.currentTime + 0.01);
    };
    const [variable4Mute, setVariable4Mute] = useState(false);
    const variable4MuteOnClick = () => setVariable4Mute(!variable4Mute);
  
    useEffect(() => {
      if (isFirstRender.current) return; 
      const audioCtx = audioCtxRef.current;
      const vpdMuteNode = vpdMuteNodeRef.current;
     if (variable4Mute) vpdMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      else vpdMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable4Volume * 0.75), audioCtx.currentTime + 0.01);
    }, [variable4Mute]);
  
    const [variable5Volume, setVariable5Volume] = useState(100);
    const variable5SetVolume = volume => {
      setVariable5Volume(volume);
      const audioCtx = audioCtxRef.current;
      const treeMeanGrowthGainNode = treeMeanGrowthGainNodeRef.current;
      treeMeanGrowthGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.75), audioCtx.currentTime + 0.01);
    };
    const [variable5Mute, setVariable5Mute] = useState(false);
    const variable5MuteOnClick = () => setVariable5Mute(!variable5Mute);
  
    useEffect(() => {
      if (isFirstRender.current) return; 
      const audioCtx = audioCtxRef.current;
      const treeMeanGrowthMuteNode = treeMeanGrowthMuteNodeRef.current;
      if (variable5Mute) treeMeanGrowthMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      else treeMeanGrowthMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable5Volume * 0.75), audioCtx.currentTime + 0.01);
    }, [variable5Mute]);

    const [dataSource, setDataSource] = useState('northern_1');
    const dataSourceSet = dataSource => setDataSource(dataSource);
    const [dataRange, setDataRange] = useState('0');
    const dataRangeSet = dataRange => setDataRange(dataRange);
    const [averagingPeriod, setAveragingPeriod] = useState('0');
    const averagingPeriodSet = averagingPeriod => setAveragingPeriod(averagingPeriod);

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

    const displacementOscillatorRef = useRef(null);
    const soilMoistureOscillatorRef = useRef(null);
    const temperatureOscillatorRef = useRef(null);
    const humidityOscillatorRef = useRef(null);
    const vpdOscillatorRef = useRef(null);
    const treeMeanGrowthOscillatorRef = useRef(null);

    function playDrone() {
      const audioCtx = getAudioContext();
      audioCtxRef.current = audioCtx;

      const displacementOscillator = audioCtx.createOscillator();
      displacementOscillatorRef.current = displacementOscillator;
      const soilMoistureOscillator = audioCtx.createOscillator();
      soilMoistureOscillatorRef.current = soilMoistureOscillator;
      const temperatureOscillator = audioCtx.createOscillator();
      temperatureOscillatorRef.current = temperatureOscillator;
      const humidityOscillator = audioCtx.createOscillator();
      humidityOscillatorRef.current = humidityOscillator;
      const vpdOscillator = audioCtx.createOscillator();
      vpdOscillatorRef.current = vpdOscillator;
      const treeMeanGrowthOscillator = audioCtx.createOscillator();
      treeMeanGrowthOscillatorRef.current = treeMeanGrowthOscillator;

      displacementOscillator.type = variable0InstrumentOptions.carrierWaveformType;
      soilMoistureOscillator.type = variable1InstrumentOptions.carrierWaveformType;
      temperatureOscillator.type = variable2InstrumentOptions.carrierWaveformType;
      humidityOscillator.type = variable3InstrumentOptions.carrierWaveformType;
      vpdOscillator.type = variable4InstrumentOptions.carrierWaveformType;
      treeMeanGrowthOscillator.type = variable5InstrumentOptions.carrierWaveformType;

      displacementOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      soilMoistureOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      temperatureOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      humidityOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      vpdOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      treeMeanGrowthOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);

      displacementOscillator.start();
      soilMoistureOscillator.start();
      temperatureOscillator.start();
      humidityOscillator.start();
      vpdOscillator.start();
      treeMeanGrowthOscillator.start();
    }

    useEffect(() => {
      if (play) {
        const displacementOscillator = displacementOscillatorRef.current;
        const soilMoistureOscillator = soilMoistureOscillatorRef.current;
        const temperatureOscillator = temperatureOscillatorRef.current;
        const humidityOscillator = humidityOscillatorRef.current;
        const vpdOscillator = vpdOscillatorRef.current;
        const treeMeanGrowthOscillator = treeMeanGrowthOscillatorRef.current;

        const displacementSynth = displacementSynthRef.current;
        const soilMoistureSynth = soilMoistureSynthRef.current;
        const temperatureSynth = temperatureSynthRef.current;
        const humiditySynth = humiditySynthRef.current;
        const vpdSynth = vpdSynthRef.current;
        const treeMeanGrowthSynth = treeMeanGrowthSynthRef.current;

        const displacementGainNode = displacementGainNodeRef.current;
        const soilMoistureGainNode = soilMoistureGainNodeRef.current;
        const temperatureGainNode = temperatureGainNodeRef.current;
        const humidityGainNode = humidityGainNodeRef.current;
        const vpdGainNode = vpdGainNodeRef.current;
        const treeMeanGrowthGainNode = treeMeanGrowthGainNodeRef.current;

        // Drone-Based Sonification Disconnects
        try { displacementOscillator.disconnect(displacementGainNode); } catch (e) { };
        try { soilMoistureOscillator.disconnect(soilMoistureGainNode); } catch (e) { };
        try { temperatureOscillator.disconnect(temperatureGainNode); } catch (e) { };
        try { humidityOscillator.disconnect(humidityGainNode); } catch (e) { };
        try { vpdOscillator.disconnect(vpdGainNode); } catch (e) { };
        try { treeMeanGrowthOscillator.disconnect(treeMeanGrowthGainNode); } catch (e) { };

        // FM Synthesis Sonification Disconnects
        try { displacementSynth.disconnect(displacementGainNode); } catch (e) { };
        try { soilMoistureSynth.disconnect(soilMoistureGainNode); } catch (e) { };
        try { temperatureSynth.disconnect(temperatureGainNode); } catch (e) { };
        try { humiditySynth.disconnect(humidityGainNode); } catch (e) { };
        try { vpdSynth.disconnect(vpdGainNode); } catch (e) { };
        try { treeMeanGrowthSynth.disconnect(treeMeanGrowthGainNode); } catch (e) { };

        // Drone-Based Sonification
        if (variable0InstrumentOptions.instrument === 'drone') displacementOscillator.connect(displacementGainNode);
        if (variable1InstrumentOptions.instrument === 'drone') soilMoistureOscillator.connect(soilMoistureGainNode);
        if (variable2InstrumentOptions.instrument === 'drone') temperatureOscillator.connect(temperatureGainNode);
        if (variable3InstrumentOptions.instrument === 'drone') humidityOscillator.connect(humidityGainNode);
        if (variable4InstrumentOptions.instrument === 'drone') vpdOscillator.connect(vpdGainNode);
        if (variable5InstrumentOptions.instrument === 'drone') treeMeanGrowthOscillator.connect(treeMeanGrowthGainNode);

        // FM Synthesis Sonification
        if (variable0InstrumentOptions.instrument === 'fmSynth') displacementSynth.connect(displacementGainNode);
        if (variable1InstrumentOptions.instrument === 'fmSynth') soilMoistureSynth.connect(soilMoistureGainNode);
        if (variable2InstrumentOptions.instrument === 'fmSynth') temperatureSynth.connect(temperatureGainNode);
        if (variable3InstrumentOptions.instrument === 'fmSynth') humiditySynth.connect(humidityGainNode);
        if (variable4InstrumentOptions.instrument === 'fmSynth') vpdSynth.connect(vpdGainNode);
        if (variable5InstrumentOptions.instrument === 'fmSynth') treeMeanGrowthSynth.connect(treeMeanGrowthGainNode);
      }    
    }, [play, variable0InstrumentOptions.instrument, variable1InstrumentOptions.instrument, variable2InstrumentOptions.instrument, variable3InstrumentOptions.instrument, variable4InstrumentOptions.instrument, variable5InstrumentOptions.instrument]);

    const [triggerEnvelope, setTriggerEnvelope] = useState(true);
    const displacementSynthRef = useRef(null);
    const soilMoistureSynthRef = useRef(null);
    const temperatureSynthRef = useRef(null);
    const humiditySynthRef = useRef(null);
    const vpdSynthRef = useRef(null);
    const treeMeanGrowthSynthRef = useRef(null);

    const playSynth = () => {
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
        const vpdSynth = new FMSynth(audioCtxRef.current);
        vpdSynthRef.current = vpdSynth;
        const treeMeanGrowthSynth = new FMSynth(audioCtxRef.current);
        treeMeanGrowthSynthRef.current = treeMeanGrowthSynth;
    
        displacementSynth.setCarrierFrequency(0.000001);
        soilMoistureSynth.setCarrierFrequency(0.000001);
        temperatureSynth.setCarrierFrequency(0.000001);
        humiditySynth.setCarrierFrequency(0.000001);
        vpdSynth.setCarrierFrequency(0.000001);
        treeMeanGrowthSynth.setCarrierFrequency(0.000001);
    
        displacementSynth.setCarrierWaveform(variable0InstrumentOptions.carrierWaveformType);
        displacementSynth.setModulatorWaveform(variable0InstrumentOptions.modulatorWaveformType);
        displacementSynth.setModulatorFrequency(variable0InstrumentOptions.modulationFrequency);
        displacementSynth.setHarmonicity(variable0InstrumentOptions.harmonicity);
        displacementSynth.setModulationIndex(variable0InstrumentOptions.modulationIndex);

        soilMoistureSynth.setCarrierWaveform(variable1InstrumentOptions.carrierWaveformType);
        soilMoistureSynth.setModulatorWaveform(variable1InstrumentOptions.modulatorWaveformType);
        soilMoistureSynth.setModulatorFrequency(variable1InstrumentOptions.modulationFrequency);
        soilMoistureSynth.setHarmonicity(variable1InstrumentOptions.harmonicity);
        soilMoistureSynth.setModulationIndex(variable1InstrumentOptions.modulationIndex);

        temperatureSynth.setCarrierWaveform(variable2InstrumentOptions.carrierWaveformType);
        temperatureSynth.setModulatorWaveform(variable2InstrumentOptions.modulatorWaveformType);
        temperatureSynth.setModulatorFrequency(variable2InstrumentOptions.modulationFrequency);
        temperatureSynth.setHarmonicity(variable2InstrumentOptions.harmonicity);
        temperatureSynth.setModulationIndex(variable2InstrumentOptions.modulationIndex);

        humiditySynth.setCarrierWaveform(variable3InstrumentOptions.carrierWaveformType);
        humiditySynth.setModulatorWaveform(variable3InstrumentOptions.modulatorWaveformType);
        humiditySynth.setModulatorFrequency(variable3InstrumentOptions.modulationFrequency);
        humiditySynth.setHarmonicity(variable3InstrumentOptions.harmonicity);
        humiditySynth.setModulationIndex(variable3InstrumentOptions.modulationIndex);

        vpdSynth.setCarrierWaveform(variable4InstrumentOptions.carrierWaveformType);
        vpdSynth.setModulatorWaveform(variable4InstrumentOptions.modulatorWaveformType);
        vpdSynth.setModulatorFrequency(variable4InstrumentOptions.modulationFrequency);
        vpdSynth.setHarmonicity(variable4InstrumentOptions.harmonicity);
        vpdSynth.setModulationIndex(variable4InstrumentOptions.modulationIndex);

        treeMeanGrowthSynth.setCarrierWaveform(variable5InstrumentOptions.carrierWaveformType);
        treeMeanGrowthSynth.setModulatorWaveform(variable5InstrumentOptions.modulatorWaveformType);
        treeMeanGrowthSynth.setModulatorFrequency(variable5InstrumentOptions.modulationFrequency);
        treeMeanGrowthSynth.setHarmonicity(variable5InstrumentOptions.harmonicity);
        treeMeanGrowthSynth.setModulationIndex(variable5InstrumentOptions.modulationIndex);
    
        displacementSynth.start();
        soilMoistureSynth.start();
        temperatureSynth.start();
        humiditySynth.start();
        vpdSynth.start();
        treeMeanGrowthSynth.start();
      };

    let currentPercussionVoice = null;
    const SCALES = {
      major: [0, 2, 4, 5, 7, 9, 11],
      minor: [0, 2, 3, 5, 7, 8, 10],
      'pentatonic-major': [0, 2, 4, 7, 9],
      'pentatonic-minor': [0, 3, 5, 7, 10],
      blues: [0, 3, 5, 6, 7, 10]
    };

    // TODO: MIGHT NEED TO LOOK INTO THIS PART
    let currentScale = SCALES[playbackOptions.scale];
    let rootMidiNote = 48; // C3-ish base
    let currentOctave = 2;

    const DATA_RANGES = {
      displacement: [0, 10],
      soilMoisture: [0, 100],
      temperature: [-20, 60],
      humidity: [0, 100],
      vpd: [0, 2.5],
      treeMeanGrowth: [0, 10]
    };

    const selectInstrument = instrument => {
    switch (instrument) {
      case 'piano':
        return createPianoVoice;
      case 'pluckedGuitar':
        return createPluckedGuitarVoice;
      case 'leadSynth':
        return createSmoothLeadVoice;
      case 'flute':
        return createFluteLikeVoice;
      case 'percussion':
        return createSoftPercussiveVoice;
      default:
        return createPianoVoice;
    }
  };

  const instruments = {
    displacement: selectInstrument(variable0InstrumentOptions.instrument),
    soilMoisture: selectInstrument(variable1InstrumentOptions.instrument),
    temperature: selectInstrument(variable2InstrumentOptions.instrument),
    humidity: selectInstrument(variable3InstrumentOptions.instrument),
    vpd: selectInstrument(variable4InstrumentOptions.instrument),
    treeMeanGrowth: selectInstrument(variable5InstrumentOptions.instrument)
  };

  const INSTRUMENT_OCTAVE_OFFSETS = {
    displacement: 0,
    soilMoisture: 0,
    temperature: 0,
    humidity: 0,
    vpd: 0,
    treeMeanGrowth: 0
  };

  let activeVoices = {};

// function freqFromValue(value, variable) {
//   let scaleToUse = currentScale;

//   const [min, max] = DATA_RANGES[variable];
//   const norm = Math.min(Math.max((value - min) / (max - min), 0), 1);
//   const scaleLength = scaleToUse.length;
//   const totalNotes = scaleLength * 2;
//   const scaledIndex = Math.floor(norm * totalNotes);
//   const scaleDegree = scaleToUse[scaledIndex % scaleLength];
//   const octaveShift = Math.floor(scaledIndex / scaleLength);

//   const midiNote = rootMidiNote + scaleDegree + octaveShift * 12 + currentOctave * 12; // TODO: Might need to look into this

//   return 440 * Math.pow(2, (midiNote - 69) / 12);
// }

const NOTE_TO_MIDI = { C: 0, 'C#': 1, D: 2, 'D#': 3, E: 4, F: 5, 'F#': 6, G: 7, 'G#': 8, A: 9, 'A#': 10, B: 11 };

// function freqFromValue(value, variable, instrument) {
//   const scalePattern = SCALES[playbackOptions.scale]; // e.g., [0, 2, 4, 5, 7, 9, 11]
//   const keyOffset = NOTE_TO_MIDI[playbackOptions.key]; // e.g., "C"=0, "D"=2, etc.

//   const [min, max] = DATA_RANGES[variable];
//   const norm = Math.min(Math.max((value - min) / (max - min), 0), 1);

//   const lowestMidi = NOTE_TO_MIDI[instrument.note] + instrument.lowestOctave * 12;
//   const highestMidi = NOTE_TO_MIDI[instrument.note] + instrument.highestOctave * 12;

//   const totalScaleNotes = scalePattern.length * (instrument.highestOctave - instrument.lowestOctave + 1);

//   const scaledIndex = Math.floor(norm * totalScaleNotes);
//   const scaleDegree = scalePattern[scaledIndex % scalePattern.length];
//   const octaveShift = Math.floor(scaledIndex / scalePattern.length);

//   let midiNote = lowestMidi + keyOffset + scaleDegree + octaveShift * 12;
  
//   if (midiNote > highestMidi) midiNote = highestMidi;

//   return 440 * Math.pow(2, (midiNote - 69) / 12);
// }
function freqFromValue(value, variable, instrument) {
  const scalePattern = SCALES[playbackOptions.scale];
  const keyOffset = NOTE_TO_MIDI[playbackOptions.key]; // NOTE_TO_MIDI same as your NOTE_TO_SEMITONE

  const [min, max] = DATA_RANGES[variable];
  const norm = Math.min(Math.max((value - min) / (max - min), 0), 1);

  const lowestMidi = (instrument.lowestOctave + 1) * 12 + NOTE_TO_MIDI[instrument.note];
  const highestMidi = (instrument.highestOctave + 1) * 12 + NOTE_TO_MIDI[instrument.note];

  const totalScaleNotes = scalePattern.length * (instrument.highestOctave - instrument.lowestOctave + 1);
  const scaledIndex = Math.floor(norm * totalScaleNotes);
  const scaleDegree = scalePattern[scaledIndex % scalePattern.length];
  const octaveShift = Math.floor(scaledIndex / scalePattern.length);

  let midiNote = lowestMidi + keyOffset + scaleDegree + octaveShift * 12;

  midiNote = Math.min(Math.max(midiNote, lowestMidi), highestMidi);

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

function createPianoVoice(freq, targetOutput, settings) {
  const audioCtx = audioCtxRef.current;
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
  output.connect(env);
  env.connect(targetOutput);

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

function createPluckedGuitarVoice(freq, targetOutput, settings) {
  const audioCtx = audioCtxRef.current;
  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 1200;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);

  osc.connect(filter).connect(gain)
  gain.connect(targetOutput);

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

function createFluteLikeVoice(freq, targetOutput, settings) {
  const audioCtx = audioCtxRef.current;

  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  // Base gain for overall volume envelope
  const baseGain = audioCtx.createGain();
  baseGain.gain.setValueAtTime(0, audioCtx.currentTime);

  // Tremolo gain node (modulated by tremolo oscillator)
  const tremoloGain = audioCtx.createGain();
  tremoloGain.gain.value = settings.tremoloRate; // base tremolo amplitude

  // Tremolo oscillator modulating tremoloGain.gain
  const tremoloOsc = audioCtx.createOscillator();
  tremoloOsc.type = 'sine';
  tremoloOsc.frequency.value = 5;

  const tremoloOscGain = audioCtx.createGain();
  tremoloOscGain.gain.value = settings.tremoloDepth; // tremolo depth

  tremoloOsc.connect(tremoloOscGain);
  tremoloOscGain.connect(tremoloGain.gain);

  // Connect oscillator chain
  osc.connect(tremoloGain).connect(baseGain);
  baseGain.connect(targetOutput);

  // Envelope for baseGain
  baseGain.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.5);
  baseGain.gain.setTargetAtTime(0, audioCtx.currentTime + 6, 2);

  // Start oscillators
  osc.start();
  tremoloOsc.start();

  return {
    stop: () => {

  const now = audioCtx.currentTime;
  const stopTime = now + 0.5;

  // Cancel scheduled gain changes and immediately ramp to 0
  baseGain.gain.cancelScheduledValues(now);
  baseGain.gain.setValueAtTime(0, now); // fix current value
  baseGain.gain.linearRampToValueAtTime(0, stopTime);

  // Immediately mute tremoloGain to silence modulation
  tremoloGain.gain.cancelScheduledValues(now);
  tremoloGain.gain.setValueAtTime(0, now);

  // Schedule oscillator stops
  osc.stop(stopTime);
  tremoloOsc.stop(stopTime);

  // Disconnect all nodes shortly after stopTime
  setTimeout(() => {
    try {
      osc.disconnect();
      tremoloOsc.disconnect();
      tremoloOscGain.disconnect();
      tremoloGain.disconnect();
      baseGain.disconnect();
    } catch (e) {
      // safe ignore
    }
  }, 0.0);
}

  };
}

function createSmoothLeadVoice(freq, targetOutput, settings) {
  const audioCtx = audioCtxRef.current;
  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  const gain = audioCtx.createGain();
  gain.gain.setValueAtTime(0, audioCtx.currentTime);

  const vibrato = audioCtx.createOscillator();
  vibrato.frequency.value = settings.vibratoFrequency;

  const vibratoGain = audioCtx.createGain();
  vibratoGain.gain.value = settings.vibratoDepth; // reduced vibrato depth

  vibrato.connect(vibratoGain);
  vibratoGain.connect(osc.frequency);

  vibrato.start();

  osc.connect(gain);
  gain.connect(targetOutput);

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

function createSoftPercussiveVoice(targetOutput) {
  const audioCtx = audioCtxRef.current;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.25;

  let percussionIntervalId = null;

  function triggerHit() {
    const bufferSize = audioCtx.sampleRate * 0.08;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize / 10));
    }
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = noiseBuffer;

    const hitGain = audioCtx.createGain();
    hitGain.gain.setValueAtTime(0, audioCtx.currentTime);
    hitGain.gain.linearRampToValueAtTime(1.0, audioCtx.currentTime + 0.005);
    hitGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.08);

    noiseSource.connect(hitGain).connect(gain);
    noiseSource.start();
    noiseSource.stop(audioCtx.currentTime + 0.1);
    gain.connect(targetOutput);
  }

  function startPercussionLoop(speed) {
    stop(); // important!
    const intervalMs = Math.max(100, 1000 / speed);
    percussionIntervalId = setInterval(triggerHit, intervalMs);
  }

  function stop() {
    if (percussionIntervalId) {
      clearInterval(percussionIntervalId);
      percussionIntervalId = null;
    }
    gain.gain.cancelScheduledValues(audioCtx.currentTime);
    gain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.3);
  }

  return {
    updateSpeed: startPercussionLoop,
    stop,
  };
}

const dataToSpeed = data => 2 + (data / 3) * 4; // from 2 to 6 hits/sec

function getPrimaryVariableOutputNode(variable) {
  // Use your custom per-variable routing if needed
  switch (variable) {
    case 'displacement':
      return displacementGainNodeRef.current;
    case 'soilMoisture':
      return soilMoistureGainNodeRef.current;
    case 'temperature':
      return temperatureGainNodeRef.current;
    case 'humidity':
      return humidityGainNodeRef.current;
    case 'vpd':
      return vpdGainNodeRef.current;
    case 'treeMeanGrowth':
      return treeMeanGrowthGainNodeRef.current;
    default:
      return masterVolumeGainNodeRef.current;
  }
}

const instrumentSettingsMap = {
  displacement: variable0InstrumentOptions,
  soilMoisture: variable1InstrumentOptions,
  temperature: variable2InstrumentOptions,
  humidity: variable3InstrumentOptions,
  vpd: variable4InstrumentOptions,
  treeMeanGrowth: variable5InstrumentOptions
};


function playVoices(record, activeInstruments) {
  const audioCtx = audioCtxRef.current;
  // Stop ALL active voices
  for (const voice of Object.values(activeVoices)) {
    if (voice?.stop) voice.stop();
  }
  activeVoices = {};
  if (record) {
    for (const variable of Object.keys(instruments)) {
      if (!activeInstruments.has(variable)) continue;

      const settings = instrumentSettingsMap[variable];

      if (settings.instrument === 'percussion') {
        const speed = dataToSpeed(record[variable]);
        const voice = instruments[variable](speed, getPrimaryVariableOutputNode(variable));
        if (currentPercussionVoice?.stop) currentPercussionVoice.stop();
        activeVoices[variable] = voice;
        currentPercussionVoice = voice;
        continue;
      }

      const freq = freqFromValue(record[variable], variable, settings);
      const outputNode = getPrimaryVariableOutputNode(variable);
      const voice = instruments[variable](freq, outputNode, settings);
      voice.freq = freq;
      activeVoices[variable] = voice;

    // for (const variable of Object.keys(instruments)) {
    //   if (!activeInstruments.has(variable)) continue;
    //   if (variable0InstrumentOptions.instrument === 'percussion') {
    //     const speed = dataToSpeed(record.displacement);
    //     const voice = instruments[variable](speed, displacementGainNodeRef.current);
    //     if (currentPercussionVoice?.stop) {
    //       currentPercussionVoice.stop();
    //     }
    //     activeVoices[variable] = voice;
    //     currentPercussionVoice = voice;
    //     continue;
    //   }
    //   if (variable1InstrumentOptions.instrument === 'percussion') {
    //     const speed = dataToSpeed(record.soilMoisture);
    //     const voice = instruments[variable](speed, soilMoistureGainNodeRef.current);
    //     if (currentPercussionVoice?.stop) {
    //       currentPercussionVoice.stop();
    //     }
    //     activeVoices[variable] = voice;
    //     currentPercussionVoice = voice;
    //     continue;
    //   }
    //   if (variable2InstrumentOptions.instrument === 'percussion') {
    //     const speed = dataToSpeed(record.temperature);
    //     const voice = instruments[variable](speed, temperatureGainNodeRef.current);
    //     if (currentPercussionVoice?.stop) {
    //       currentPercussionVoice.stop();
    //     }
    //     activeVoices[variable] = voice;
    //     currentPercussionVoice = voice;
    //     continue;
    //   }
    //   if (variable3InstrumentOptions.instrument === 'percussion') {
    //     const speed = dataToSpeed(record.humidity);
    //     const voice = instruments[variable](speed, humidityGainNodeRef.current);
    //     if (currentPercussionVoice?.stop) {
    //       currentPercussionVoice.stop();
    //     }
    //     activeVoices[variable] = voice;
    //     currentPercussionVoice = voice;
    //     continue;
    //   }
    //   if (variable4InstrumentOptions.instrument === 'percussion') {
    //     const speed = dataToSpeed(record.vpd);
    //     const voice = instruments[variable](speed, vpdGainNodeRef.current);
    //     if (currentPercussionVoice?.stop) {
    //       currentPercussionVoice.stop();
    //     }
    //     activeVoices[variable] = voice;
    //     currentPercussionVoice = voice;
    //     continue;
    //   }
    //   if (variable5InstrumentOptions.instrument === 'percussion') {
    //     const speed = dataToSpeed(record.treeMeanGrowth);
    //     const voice = instruments[variable](speed, treeMeanGrowthGainNodeRef.current);
    //     if (currentPercussionVoice?.stop) {
    //       currentPercussionVoice.stop();
    //     }
    //     activeVoices[variable] = voice;
    //     currentPercussionVoice = voice;
    //     continue;
    //   }
    //   const freq = freqFromValue(record[variable], variable);
    //   const outputNode = getPrimaryVariableOutputNode(variable);
    //   const voice = instruments[variable](freq, outputNode);
    //   voice.freq = freq;
    //   activeVoices[variable] = voice;
    }
  }
}

function createSynth(freq, type = 'sine', duration = 0.5, gainLevel = 0.3, outputNode) {
  const audioCtx = audioCtxRef.current;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.frequency.value = freq || 261.63;
  osc.type = type;
  gain.gain.value = gainLevel;

  osc.connect(gain).connect(outputNode || gain);
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
}

// function playChord(rootValue, min, max, outputNode, type) {
//   const rootNote = getNoteFromValue(rootValue, min, max);
//   const chordOffsets = [0, 4, 7]; // Major triad
//   chordOffsets.forEach(offset => {
//     const freq = midiToFreq(rootNote + offset);
//     createSynth(freq, type, duration, gainLevel, outputNode);
//   });
// }
function playChord(rootValue, variable, instrument, outputNode, type) {
  const rootFreq = freqFromValue(rootValue, variable, instrument);
  const chordOffsets = [0, 4, 7];
  chordOffsets.forEach(offset => {
    const freq = rootFreq * Math.pow(2, offset / 12); // Shift frequency by semitones
    createSynth(freq, type, duration, gainLevel, outputNode);
  });
}

function playMelody(value, variable, instrument, outputNode, type) {
  let freq = freqFromValue(value, variable, instrument);
  
  // Optionally clamp frequency to MIDI note 126 max equivalent frequency
  // MIDI 126 → freq ~ 12543 Hz, you can add clamp logic here if needed
  
  createSynth(freq, type, duration, gainLevel, outputNode);
}

function playGuitarNote(value, variable, instrument, outputNode, distorted = false) {
  const audioCtx = audioCtxRef.current;
  const freq = freqFromValue(value, variable, instrument);

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
  gain.connect(outputNode || gain);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function playBassNote(value, variable, instrument, outputNode) {
  const audioCtx = audioCtxRef.current;
  let freq = freqFromValue(value, variable, instrument);

  // One octave lower = divide frequency by 2
  freq /= 2;

  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  gain.gain.value = 0.25;
  osc.frequency.value = freq;
  osc.type = 'sine';

  osc.connect(gain).connect(outputNode || gain);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.5);
}



// function playMelody(value, min, max, outputNode, type) {
//   let note = getNoteFromValue(value, min, max);
//   if (note > 126) note = 91;
//   const freq = midiToFreq(note);
//   createSynth(freq, type, duration, gainLevel, outputNode);
// }

// function playGuitarNote(value, min, max, outputNode, distorted=false) {
//   const audioCtx = audioCtxRef.current;
//   const note = getNoteFromValue(value, min, max);
//   const freq = midiToFreq(note);
//   const osc = audioCtx.createOscillator();
//   const gain = audioCtx.createGain();
//   let output = gain;

//   if (distorted) {
//     const waveShaper = audioCtx.createWaveShaper();
//     waveShaper.curve = new Float32Array([0, 1, -1, 0]);
//     waveShaper.oversample = '4x';
//     osc.connect(waveShaper).connect(gain);
//   } else {
//     osc.connect(gain);
//   }

//   gain.gain.value = 0.25;
//   osc.frequency.value = freq;
//   osc.type = 'sawtooth';
//   gain.connect(outputNode || gain);

//   osc.start();
//   osc.stop(audioCtx.currentTime + 0.3);
// }

// function playBassNote(value, min, max, outputNode) {
//   const audioCtx = audioCtxRef.current;
//   const note = getNoteFromValue(value, min, max);
//   const freq = midiToFreq(note - 12);
//   const osc = audioCtx.createOscillator();
//   const gain = audioCtx.createGain();

//   gain.gain.value = 0.25;
//   osc.frequency.value = freq;
//   osc.type = 'sine';

//   osc.connect(gain).connect(outputNode || gain);
//   osc.start();
//   osc.stop(audioCtx.currentTime + 0.5);
// }

const playSound = () => {
    if (!play) {
      const audioCtx = getAudioContext();
      audioCtxRef.current = audioCtx;

      playDrone();
      playSynth();

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
      const vpdGainNode = audioCtx.createGain();
      vpdGainNodeRef.current = vpdGainNode;
      const treeMeanGrowthGainNode = audioCtx.createGain();
      treeMeanGrowthGainNodeRef.current = treeMeanGrowthGainNode;
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
      const vpdMuteNode = audioCtx.createGain();
      vpdMuteNodeRef.current = vpdMuteNode;
      const treeMeanGrowthMuteNode = audioCtx.createGain();
      treeMeanGrowthMuteNodeRef.current = treeMeanGrowthMuteNode;
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
      displacementPannerNode.setPosition(variable0PanningWidth, variable0PanningHeight, variable0PanningDepth); // 2m left, 2m down, 1m back

      const soilMoisturePannerNode = audioCtx.createPanner();
      soilMoisturePannerNodeRef.current = soilMoisturePannerNode;
      soilMoisturePannerNode.panningModel = 'HRTF';
      soilMoisturePannerNode.distanceModel = 'inverse';
      soilMoisturePannerNode.setPosition(variable1PanningWidth, variable1PanningHeight, variable1PanningDepth); // 2m right, 2m up, 1m back

      const temperaturePannerNode = audioCtx.createPanner();
      temperaturePannerNodeRef.current = temperaturePannerNode;
      temperaturePannerNode.panningModel = 'HRTF';
      temperaturePannerNode.distanceModel = 'inverse';
      temperaturePannerNode.setPosition(variable2PanningWidth, variable2PanningHeight, variable2PanningDepth); // 5m left, 5m down, 1m front

      const humidityPannerNode = audioCtx.createPanner();
      humidityPannerNodeRef.current = humidityPannerNode;
      humidityPannerNode.panningModel = 'HRTF';
      humidityPannerNode.distanceModel = 'inverse';
      humidityPannerNode.setPosition(variable3PanningWidth, variable3PanningHeight, variable3PanningDepth); // 5m right, 5m up, 1m front

      const vpdPannerNode = audioCtx.createPanner();
      vpdPannerNodeRef.current = vpdPannerNode;
      vpdPannerNode.panningModel = 'HRTF';
      vpdPannerNode.distanceModel = 'inverse';
      vpdPannerNode.setPosition(variable4PanningWidth, variable4PanningHeight, variable4PanningDepth); // Centre

      const treeMeanGrowthPannerNode = audioCtx.createPanner();
      treeMeanGrowthPannerNodeRef.current = treeMeanGrowthPannerNode;
      treeMeanGrowthPannerNode.panningModel = 'HRTF';
      treeMeanGrowthPannerNode.distanceModel = 'inverse';
      treeMeanGrowthPannerNode.setPosition(variable5PanningWidth, variable5PanningHeight, variable5PanningDepth); // Centre

      const referenceNotePannerNode = audioCtx.createPanner();
      referenceNotePannerNodeRef.current = referenceNotePannerNode;
      referenceNotePannerNode.panningModel = 'HRTF';
      referenceNotePannerNode.distanceModel = 'inverse';
      referenceNotePannerNode.setPosition(0, 0, 0); // Centre

      const masterVolumePannerNode = audioCtx.createPanner();
      masterVolumePannerNodeRef.current = masterVolumePannerNode;
      masterVolumePannerNode.panningModel = 'HRTF';
      masterVolumePannerNode.distanceModel = 'inverse';
      masterVolumePannerNode.setPosition(0, 0, 0); // Centre

      displacementGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
      vpdGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable4Volume * 0.75), audioCtx.currentTime + 0.01);
      treeMeanGrowthGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable5Volume * 0.75), audioCtx.currentTime + 0.01);
      masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.5), audioCtx.currentTime + 0.01);

      referenceNoteOscillator.connect(referenceNoteGainNode);

      displacementGainNode.connect(displacementMuteNode);
      soilMoistureGainNode.connect(soilMoistureMuteNode);
      temperatureGainNode.connect(temperatureMuteNode);
      humidityGainNode.connect(humidityMuteNode);
      vpdGainNode.connect(vpdMuteNode);
      treeMeanGrowthGainNode.connect(treeMeanGrowthMuteNode);
      referenceNoteGainNode.connect(referenceNoteMuteNode);

      displacementMuteNode.connect(displacementPannerNode);
      soilMoistureMuteNode.connect(soilMoisturePannerNode);
      temperatureMuteNode.connect(temperaturePannerNode);
      humidityMuteNode.connect(humidityPannerNode);
      vpdMuteNode.connect(vpdPannerNode);
      treeMeanGrowthMuteNode.connect(treeMeanGrowthPannerNode);
      referenceNoteMuteNode.connect(referenceNotePannerNode);

      displacementPannerNode.connect(masterVolumePannerNode);
      soilMoisturePannerNode.connect(masterVolumePannerNode);
      temperaturePannerNode.connect(masterVolumePannerNode);
      humidityPannerNode.connect(masterVolumePannerNode);
      vpdPannerNode.connect(masterVolumePannerNode);
      treeMeanGrowthPannerNode.connect(masterVolumePannerNode);
      referenceNotePannerNode.connect(masterVolumePannerNode);

      // EQ
      const lowFilter = audioCtx.createBiquadFilter();
      lowFilter.type = 'lowshelf';
      const midFilter = audioCtx.createBiquadFilter();
      midFilter.type = 'peaking';
      const highFilter = audioCtx.createBiquadFilter();
      highFilter.type = 'highshelf';
      // Set low band
      lowFilter.frequency.setValueAtTime(playbackOptions.eq.lowFrequencyCentre, audioCtx.currentTime);
      lowFilter.Q.setValueAtTime(playbackOptions.eq.lowFrequencyQ, audioCtx.currentTime);
      lowFilter.gain.setValueAtTime(playbackOptions.eq.lowFrequencyGain, audioCtx.currentTime);

      // Set mid band
      midFilter.frequency.setValueAtTime(playbackOptions.eq.midFrequencyCentre, audioCtx.currentTime);
      midFilter.Q.setValueAtTime(playbackOptions.eq.midFrequencyQ, audioCtx.currentTime);
      midFilter.gain.setValueAtTime(playbackOptions.eq.midFrequencyGain, audioCtx.currentTime);

      // Set high band
      highFilter.frequency.setValueAtTime(playbackOptions.eq.highFrequencyCentre, audioCtx.currentTime);
      highFilter.Q.setValueAtTime(playbackOptions.eq.highFrequencyQ, audioCtx.currentTime);
      highFilter.gain.setValueAtTime(playbackOptions.eq.highFrequencyGain, audioCtx.currentTime);
      
      // Compressor
      const compressor = audioCtx.createDynamicsCompressor();
      compressor.threshold.setValueAtTime(playbackOptions.compression.threshold, audioCtx.currentTime);
      compressor.ratio.setValueAtTime(playbackOptions.compression.ratio, audioCtx.currentTime);
      compressor.attack.setValueAtTime(playbackOptions.compression.attack, audioCtx.currentTime);
      compressor.release.setValueAtTime(playbackOptions.compression.release, audioCtx.currentTime);
      compressor.knee.setValueAtTime(playbackOptions.compression.knee, audioCtx.currentTime);
    
      // Distortion
      const distortion = audioCtx.createWaveShaper();
      function makeDistortionCurve(drive) {
        const k = drive * 100;
        const samples = 44100;
        const curve = new Float32Array(samples);
        const deg = Math.PI / 180;

        for (let i = 0; i < samples; ++i) {
          const x = (i * 2) / samples - 1;
          curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
        }
        return curve;
      }
    distortion.curve = makeDistortionCurve(playbackOptions.distortion.drive);
    distortion.oversample = '4x';

    // Delay
    const delay = audioCtx.createDelay();
    const feedbackGainNode = audioCtx.createGain();
    const delayWetGainNode = audioCtx.createGain();
    const delayDryGainNode = audioCtx.createGain();
    delay.connect(feedbackGainNode);
    feedbackGainNode.connect(delay);
    delay.connect(delayWetGainNode);
    delay.delayTime.setValueAtTime(playbackOptions.delay.time, audioCtx.currentTime);
    feedbackGainNode.gain.setValueAtTime(playbackOptions.delay.feedbackGain, audioCtx.currentTime);
    delayWetGainNode.gain.setValueAtTime(playbackOptions.delay.wetLevel, audioCtx.currentTime);
    delayDryGainNode.gain.setValueAtTime(1 - playbackOptions.delay.wetLevel, audioCtx.currentTime);
  
    // Reverb
    const preDelayNode = audioCtx.createDelay();
    const reverbFeedbackGain = audioCtx.createGain();
    const reverbWetGain = audioCtx.createGain();
    const reverbDryGain = audioCtx.createGain();
    preDelayNode.connect(reverbFeedbackGain);
    reverbFeedbackGain.connect(preDelayNode);
    preDelayNode.connect(reverbWetGain);
    preDelayNode.delayTime.setValueAtTime(playbackOptions.reverb.preDelayTime, audioCtx.currentTime);
    const feedbackGainValue = Math.exp(-3 / Math.max(playbackOptions.reverb.decayTime, 0.001));
    reverbFeedbackGain.gain.setValueAtTime(feedbackGainValue, audioCtx.currentTime);
    reverbWetGain.gain.setValueAtTime(playbackOptions.reverb.wetLevel, audioCtx.currentTime);
    reverbDryGain.gain.setValueAtTime(1 - playbackOptions.reverb.wetLevel, audioCtx.currentTime);

    // Chorus
    const chorusDelayNode = audioCtx.createDelay();
    const chorusWetGainNode = audioCtx.createGain();
    const chorusDryGainNode = audioCtx.createGain();
    const chorusLfo = audioCtx.createOscillator();
    const chorusLfoGain = audioCtx.createGain();
    chorusLfo.connect(chorusLfoGain);
    chorusLfoGain.connect(chorusDelayNode.delayTime);
    chorusDelayNode.connect(chorusWetGainNode);
    chorusLfo.start();
    chorusLfo.frequency.setValueAtTime(playbackOptions.chorus.rate, audioCtx.currentTime);
    chorusLfoGain.gain.setValueAtTime(playbackOptions.chorus.depth / 1000, audioCtx.currentTime);
    chorusWetGainNode.gain.setValueAtTime(playbackOptions.chorus.wetLevel, audioCtx.currentTime);
    chorusDryGainNode.gain.setValueAtTime(1 - playbackOptions.chorus.wetLevel, audioCtx.currentTime);

    // Flanger
    const flangerDelayNode = audioCtx.createDelay();
    const flangerFeedbackGainNode = audioCtx.createGain();
    const flangerWetGainNode = audioCtx.createGain();
    const flangerDryGainNode = audioCtx.createGain();
    const flangerLfo = audioCtx.createOscillator();
    const flangerLfoGain = audioCtx.createGain();
    flangerLfo.connect(flangerLfoGain);
    flangerLfoGain.connect(flangerDelayNode.delayTime);
    flangerDelayNode.connect(flangerFeedbackGainNode);
    flangerFeedbackGainNode.connect(flangerDelayNode);
    flangerDelayNode.connect(flangerWetGainNode);
    flangerLfo.start();
    flangerLfo.frequency.setValueAtTime(playbackOptions.flanger.rate, audioCtx.currentTime);
    flangerLfoGain.gain.setValueAtTime(playbackOptions.flanger.depth / 1000, audioCtx.currentTime);
    flangerFeedbackGainNode.gain.setValueAtTime(playbackOptions.flanger.feedback, audioCtx.currentTime);
    flangerWetGainNode.gain.setValueAtTime(playbackOptions.flanger.wetLevel, audioCtx.currentTime);
    flangerDryGainNode.gain.setValueAtTime(1 - playbackOptions.flanger.wetLevel, audioCtx.currentTime);
  
    // Tremolo
    const tremoloGain = audioCtx.createGain();
    const tremoloLfo = audioCtx.createOscillator();
    const tremoloLfoGain = audioCtx.createGain();
    tremoloLfo.connect(tremoloLfoGain);
    tremoloLfoGain.connect(tremoloGain.gain);
    tremoloLfo.start();
    tremoloLfo.frequency.setValueAtTime(playbackOptions.tremolo.frequency, audioCtx.currentTime);
    tremoloLfoGain.gain.setValueAtTime(playbackOptions.tremolo.depth / 2, audioCtx.currentTime);
    tremoloGain.gain.setValueAtTime(1 - playbackOptions.tremolo.depth / 2, audioCtx.currentTime);

    // Vibrato
    const sourceOsc = audioCtx.createOscillator();
    sourceOsc.type = 'sine';
    sourceOsc.frequency.value = 440;
    const vibratoLFO = audioCtx.createOscillator();
    const vibratoGain = audioCtx.createGain();
    vibratoLFO.connect(vibratoGain);
    vibratoGain.connect(sourceOsc.frequency);
    sourceOsc.start();
    vibratoLFO.start();
    vibratoLFO.frequency.setValueAtTime(playbackOptions.vibrato.frequency, audioCtx.currentTime);
    vibratoGain.gain.setValueAtTime(playbackOptions.vibrato.depth, audioCtx.currentTime);
      
    // Organise the connections here, depending on what is enabled
    // masterVolumePannerNode.connect(lowFilter);
    // lowFilter.connect(midFilter);
    // midFilter.connect(highFilter);
    // highFilter.connect(compressor);
    // compressor.connect(distortion);
    // distortion.connect(delayDryGainNode);
    // distortion.connect(delayWetGainNode);
    // distortion.connect(delay);
    // delayDryGainNode.connect(reverbDryGain);
    // delayWetGainNode.connect(preDelayNode);
    // reverbDryGain.connect(chorusDryGainNode);
    // reverbWetGain.connect(chorusDelayNode);
    // chorusDryGainNode.connect(flangerDryGainNode);
    // chorusWetGainNode.connect(flangerDelayNode);
    // flangerDryGainNode.connect(tremoloGain);
    // flangerWetGainNode.connect(tremoloGain);
    // sourceOsc.connect(tremoloGain);
    // tremoloGain.connect(masterVolumePannerNode);
    // if (!playbackOptions.eq.enabled) {
    //   masterVolumePannerNode.disconnect();
    //   masterVolumePannerNode.connect(masterVolumeGainNode); 
    //   return;
    // }
    // Disconnect everything first to start fresh
    [
      lowFilter,
      midFilter,
      highFilter,
      compressor,
      distortion,
      delay,
      delayDryGainNode,
      delayWetGainNode,
      reverbDryGain,
      reverbWetGain,
      chorusDryGainNode,
      chorusWetGainNode,
      flangerDryGainNode,
      flangerWetGainNode,
      sourceOsc,
      tremoloGain
    ].forEach(node => node.disconnect());

    let currentNode = sourceOsc;

    if (playbackOptions.eq.enabled === 'on') {
      currentNode.connect(lowFilter);
      lowFilter.connect(midFilter);
      midFilter.connect(highFilter);
      currentNode = highFilter;
    }

    if (playbackOptions.compression.enabled === 'on') {
      currentNode.connect(compressor);
      currentNode = compressor;
    }

    if (playbackOptions.distortion.enabled === 'on') {
      currentNode.connect(distortion);
      currentNode = distortion;
    }

    if (playbackOptions.delay.enabled === 'on') {
      currentNode.connect(delayDryGainNode);
      currentNode.connect(delay);
      delay.connect(delayWetGainNode);

      delayDryGainNode.connect(reverbDryGain);
      delayWetGainNode.connect(reverbWetGain);
    } else {
      currentNode.connect(reverbDryGain);
      reverbWetGain.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    if (playbackOptions.reverb.enabled === 'on') {
      reverbDryGain.connect(chorusDryGainNode);
      reverbWetGain.connect(chorusWetGainNode);
    } else {
      reverbDryGain.disconnect();
      reverbDryGain.connect(chorusDryGainNode);
      reverbWetGain.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    if (playbackOptions.chorus.enabled === 'on') {
      chorusDryGainNode.connect(flangerDryGainNode);
      chorusWetGainNode.connect(flangerWetGainNode);
    } else {
      chorusDryGainNode.disconnect();
      chorusDryGainNode.connect(flangerDryGainNode);
      chorusWetGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    if (playbackOptions.flanger.enabled === 'on') {
      flangerDryGainNode.connect(tremoloGain);
      flangerWetGainNode.connect(tremoloGain);
    } else {
      flangerDryGainNode.disconnect();
      flangerDryGainNode.connect(tremoloGain);
      flangerWetGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    }

    if (playbackOptions.tremolo.enabled === 'on') {
      tremoloGain.connect(masterVolumeGainNode);
    } else {
      tremoloGain.disconnect();
      currentNode.connect(masterVolumeGainNode);
    }

      masterVolumePannerNode.connect(masterVolumeGainNode);
      masterVolumeGainNode.connect(masterVolumeMuteNode);
      masterVolumeMuteNode.connect(audioCtx.destination);

      referenceNoteOscillator.frequency.setValueAtTime(632.46, audioCtx.currentTime);
      referenceNoteGainNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      referenceNoteGainNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
      referenceNoteMuteNode.gain.linearRampToValueAtTime(1, audioCtx.currentTime + 0.01);
      referenceNoteOscillator.start();

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
          const audioCtx = audioCtxRef.current;
          const displacementOscillator = displacementOscillatorRef.current;
          const soilMoistureOscillator = soilMoistureOscillatorRef.current;
          const temperatureOscillator = temperatureOscillatorRef.current;
          const humidityOscillator = humidityOscillatorRef.current;
          const vpdOscillator = vpdOscillatorRef.current;
          const treeMeanGrowthOscillator = treeMeanGrowthOscillatorRef.current;
    
          const displacementSynth = displacementSynthRef.current;
          const soilMoistureSynth = soilMoistureSynthRef.current;
          const temperatureSynth = temperatureSynthRef.current;
          const humiditySynth = humiditySynthRef.current;
          const vpdSynth = vpdSynthRef.current;
          const treeMeanGrowthSynth = treeMeanGrowthSynthRef.current;
    
          const index = incrementalData.length - 1
          const record = incrementalData[index];

          displacementOscillator.frequency.setValueAtTime(rescaleFrequency(0, 10, variable0InstrumentOptions.minFrequency, variable0InstrumentOptions.maxFrequency, record?.displacement), audioCtx.currentTime);
          soilMoistureOscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, variable1InstrumentOptions.minFrequency, variable1InstrumentOptions.maxFrequency, record?.soilMoisture), audioCtx.currentTime);
          temperatureOscillator.frequency.setValueAtTime(rescaleFrequency(-20, 60, variable2InstrumentOptions.minFrequency, variable2InstrumentOptions.maxFrequency, record?.temperature), audioCtx.currentTime);
          humidityOscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, variable3InstrumentOptions.minFrequency, variable3InstrumentOptions.maxFrequency, record?.humidity), audioCtx.currentTime);
          vpdOscillator.frequency.setValueAtTime(rescaleFrequency(0, 2.5, variable4InstrumentOptions.minFrequency, variable4InstrumentOptions.maxFrequency, record?.vpd), audioCtx.currentTime);
          treeMeanGrowthOscillator.frequency.setValueAtTime(rescaleFrequency(0.2, 0.4, variable5InstrumentOptions.minFrequency, variable5InstrumentOptions.maxFrequency, record?.treeMeanGrowth), audioCtx.currentTime);
    
          displacementSynth.releaseEnvelope();
          soilMoistureSynth.releaseEnvelope();
          temperatureSynth.releaseEnvelope();
          humiditySynth.releaseEnvelope();
          vpdSynth.releaseEnvelope();
          treeMeanGrowthSynth.releaseEnvelope();
    
          displacementSynth.setCarrierFrequency(rescaleFrequency(0, 10, variable0InstrumentOptions.minFrequency, variable0InstrumentOptions.maxFrequency, record?.displacement));
          soilMoistureSynth.setCarrierFrequency(rescaleFrequency(0, 100, variable1InstrumentOptions.minFrequency, variable1InstrumentOptions.maxFrequency, record?.soilMoisture));
          temperatureSynth.setCarrierFrequency(rescaleFrequency(-20, 60, variable2InstrumentOptions.minFrequency, variable2InstrumentOptions.maxFrequency, record?.temperature));
          humiditySynth.setCarrierFrequency(rescaleFrequency(0, 100, variable3InstrumentOptions.minFrequency, variable3InstrumentOptions.maxFrequency, record?.humidity));
          vpdSynth.setCarrierFrequency(rescaleFrequency(0, 2.5, variable4InstrumentOptions.minFrequency, variable4InstrumentOptions.maxFrequency, record?.vpd));
          treeMeanGrowthSynth.setCarrierFrequency(rescaleFrequency(0, 10, variable5InstrumentOptions.minFrequency, variable5InstrumentOptions.maxFrequency, record?.treeMeanGrowth));
    
          if(triggerEnvelope) {
            displacementSynth.triggerEnvelope(variable0InstrumentOptions.attack, variable0InstrumentOptions.decay, variable0InstrumentOptions.sustain, variable0InstrumentOptions.release);
            soilMoistureSynth.triggerEnvelope(variable1InstrumentOptions.attack, variable1InstrumentOptions.decay, variable1InstrumentOptions.sustain, variable1InstrumentOptions.release);
            temperatureSynth.triggerEnvelope(variable2InstrumentOptions.attack, variable2InstrumentOptions.decay, variable2InstrumentOptions.sustain, variable2InstrumentOptions.release);
            humiditySynth.triggerEnvelope(variable3InstrumentOptions.attack, variable3InstrumentOptions.decay, variable3InstrumentOptions.sustain, variable3InstrumentOptions.release);
            vpdSynth.triggerEnvelope(variable4InstrumentOptions.attack, variable4InstrumentOptions.decay, variable4InstrumentOptions.sustain, variable4InstrumentOptions.release);
            treeMeanGrowthSynth.triggerEnvelope(variable5InstrumentOptions.attack, variable5InstrumentOptions.decay, variable5InstrumentOptions.sustain, variable5InstrumentOptions.release);
            setTriggerEnvelope(false);
          }
    
          let activeInstruments = new Set(Object.keys(instruments)); // initial all active
          playVoices(incrementalData[index], activeInstruments, false);
    
          const displacementGainNode = displacementGainNodeRef.current;
          const soilMoistureGainNode = soilMoistureGainNodeRef.current;
          const temperatureGainNode = temperatureGainNodeRef.current;
          const humidityGainNode = humidityGainNodeRef.current;
          const vpdGainNode = vpdGainNodeRef.current;
          const treeMeanGrowthGainNode = treeMeanGrowthGainNodeRef.current;
    
          // switch (variable0InstrumentOptions.instrument) {
          //   case 'synth':
          //     if (variable0InstrumentOptions.playingRole === 'melody') playChord(record.displacement, 0, 1, displacementGainNode, variable0InstrumentOptions.carrierWaveformType);
          //     else playMelody(record.displacement, 0, 1, displacementGainNode, variable0InstrumentOptions.carrierWaveformType);
          //     break;
          //   case 'electricGuitar':
          //     playGuitarNote(record.displacement, 0, 1, displacementGainNode, (variable0InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
          //     break;
          //   case 'bassGuitar':
          //     playBassNote(record.displacement, 0, 1, displacementGainNode);
          //     break;
          //   default:
          //     break;
          // };
    
          // switch (variable1InstrumentOptions.instrument) {
          //   case 'synth':
          //     if (variable1InstrumentOptions.playingRole === 'melody') playChord(record.soilMoisture, 0, 100, soilMoistureGainNode, variable1InstrumentOptions.carrierWaveformType);
          //     else playMelody(record.soilMoisture, 0, 100, soilMoistureGainNode, variable1InstrumentOptions.carrierWaveformType);
          //     break;
          //   case 'electricGuitar':
          //     playGuitarNote(record.soilMoisture, 0, 100, soilMoistureGainNode, (variable1InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
          //     break;
          //   case 'bassGuitar':
          //     playBassNote(record.soilMoisture, 0, 100, soilMoistureGainNode);
          //     break;
          //   default:
          //     break;
          // };
    
          // switch (variable2InstrumentOptions.instrument) {
          //   case 'synth':
          //     if (variable2InstrumentOptions.playingRole === 'melody') playChord(record.temperature, -20, 60, temperatureGainNode, variable2InstrumentOptions.carrierWaveformType);
          //     else playMelody(record.temperature, -20, 60, temperatureGainNode, variable2InstrumentOptions.carrierWaveformType);
          //     break;
          //   case 'electricGuitar':
          //     playGuitarNote(record.temperature, -20, 60, temperatureGainNode, (variable2InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
          //     break;
          //   case 'bassGuitar':
          //     playBassNote(record.temperature, -20, 60, temperatureGainNode);
          //     break;
          //   default:
          //     break;
          // };
    
          // switch (variable3InstrumentOptions.instrument) {
          //   case 'synth':
          //     if (variable3InstrumentOptions.playingRole === 'melody') playChord(record.humidity, 0, 100, humidityGainNode, variable3InstrumentOptions.carrierWaveformType);
          //     else playMelody(record.humidity, 0, 100, humidityGainNode, variable3InstrumentOptions.carrierWaveformType);
          //     break;
          //   case 'electricGuitar':
          //     playGuitarNote(record.humidity, 0, 100, humidityGainNode, (variable3InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
          //     break;
          //   case 'bassGuitar':
          //     playBassNote(record.humidity, 0, 100, humidityGainNode);
          //     break;
          //   default:
          //     break;
          // };
    
          // switch (variable4InstrumentOptions.instrument) {
          //   case 'synth':
          //     if (variable4InstrumentOptions.playingRole === 'melody') playChord(record.vpd, 0, 100, vpdGainNode, variable4InstrumentOptions.carrierWaveformType);
          //     else playMelody(record.vpd, 0, 100, vpdGainNode, variable4InstrumentOptions.carrierWaveformType);
          //     break;
          //   case 'electricGuitar':
          //     playGuitarNote(record.vpd, 0, 100, vpdGainNode, (variable4InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
          //     break;
          //   case 'bassGuitar':
          //     playBassNote(record.vpd, 0, 100, vpdGainNode);
          //     break;
          //   default:
          //     break;
          // };
    
          // switch (variable4InstrumentOptions.instrument) {
          //   case 'synth':
          //     if (variable4InstrumentOptions.playingRole === 'melody') playChord(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode, variable4InstrumentOptions.carrierWaveformType);
          //     else playMelody(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode, variable4InstrumentOptions.carrierWaveformType);
          //     break;
          //   case 'electricGuitar':
          //     playGuitarNote(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode, (variable4InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
          //     break;
          //   case 'bassGuitar':
          //     playBassNote(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode);
          //     break;
          //   default:
          //     break;
          // };

          switch (variable0InstrumentOptions.instrument) {
            case 'synth':
              if (variable0InstrumentOptions.playingRole === 'melody')
                playChord(record.displacement, 'displacement', variable0InstrumentOptions, displacementGainNode, variable0InstrumentOptions.carrierWaveformType);
              else
                playMelody(record.displacement, 'displacement', variable0InstrumentOptions, displacementGainNode, variable0InstrumentOptions.carrierWaveformType);
              break;

            case 'electricGuitar':
              playGuitarNote(record.displacement, 'displacement', variable0InstrumentOptions, displacementGainNode, (variable0InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
              break;

            case 'bassGuitar':
              playBassNote(record.displacement, 'displacement', variable0InstrumentOptions, displacementGainNode);
              break;

            default:
              break;
          }

          switch (variable1InstrumentOptions.instrument) {
            case 'synth':
              if (variable1InstrumentOptions.playingRole === 'melody')
                playChord(record.soilMoisture, 'soilMoisture', variable1InstrumentOptions, soilMoistureGainNode, variable1InstrumentOptions.carrierWaveformType);
              else
                playMelody(record.soilMoisture, 'soilMoisture', variable1InstrumentOptions, soilMoistureGainNode, variable1InstrumentOptions.carrierWaveformType);
              break;

            case 'electricGuitar':
              playGuitarNote(record.soilMoisture, 'soilMoisture', variable1InstrumentOptions, soilMoistureGainNode, (variable1InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
              break;

            case 'bassGuitar':
              playBassNote(record.soilMoisture, 'soilMoisture', variable1InstrumentOptions, soilMoistureGainNode);
              break;

            default:
              break;
          }

          switch (variable2InstrumentOptions.instrument) {
            case 'synth':
              if (variable2InstrumentOptions.playingRole === 'melody')
                playChord(record.temperature, 'temperature', variable2InstrumentOptions, temperatureGainNode, variable2InstrumentOptions.carrierWaveformType);
              else
                playMelody(record.temperature, 'temperature', variable2InstrumentOptions, temperatureGainNode, variable2InstrumentOptions.carrierWaveformType);
              break;

            case 'electricGuitar':
              playGuitarNote(record.temperature, 'temperature', variable2InstrumentOptions, temperatureGainNode, (variable2InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
              break;

            case 'bassGuitar':
              playBassNote(record.temperature, 'temperature', variable2InstrumentOptions, temperatureGainNode);
              break;

            default:
              break;
          }

          switch (variable3InstrumentOptions.instrument) {
            case 'synth':
              if (variable3InstrumentOptions.playingRole === 'melody')
                playChord(record.humidity, 'humidity', variable3InstrumentOptions, humidityGainNode, variable3InstrumentOptions.carrierWaveformType);
              else
                playMelody(record.humidity, 'humidity', variable3InstrumentOptions, humidityGainNode, variable3InstrumentOptions.carrierWaveformType);
              break;

            case 'electricGuitar':
              playGuitarNote(record.humidity, 'humidity', variable3InstrumentOptions, humidityGainNode, (variable3InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
              break;

            case 'bassGuitar':
              playBassNote(record.humidity, 'humidity', variable3InstrumentOptions, humidityGainNode);
              break;

            default:
              break;
          }

          switch (variable4InstrumentOptions.instrument) {
            case 'synth':
              if (variable4InstrumentOptions.playingRole === 'melody')
                playChord(record.vpd, 'vpd', variable4InstrumentOptions, vpdGainNode, variable4InstrumentOptions.carrierWaveformType);
              else
                playMelody(record.vpd, 'vpd', variable4InstrumentOptions, vpdGainNode, variable4InstrumentOptions.carrierWaveformType);
              break;

            case 'electricGuitar':
              playGuitarNote(record.vpd, 'vpd', variable4InstrumentOptions, vpdGainNode, (variable4InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
              break;

            case 'bassGuitar':
              playBassNote(record.vpd, 'vpd', variable4InstrumentOptions, vpdGainNode);
              break;

            default:
              break;
          }

          switch (variable5InstrumentOptions.instrument) {
            case 'synth':
              if (variable5InstrumentOptions.playingRole === 'melody')
                playChord(record.treeMeanGrowth, 'treeMeanGrowth', variable5InstrumentOptions, treeMeanGrowthGainNode, variable5InstrumentOptions.carrierWaveformType);
              else
                playMelody(record.treeMeanGrowth, 'treeMeanGrowth', variable5InstrumentOptions, treeMeanGrowthGainNode, variable5InstrumentOptions.carrierWaveformType);
              break;

            case 'electricGuitar':
              playGuitarNote(record.treeMeanGrowth, 'treeMeanGrowth', variable5InstrumentOptions, treeMeanGrowthGainNode, (variable5InstrumentOptions.electricGuitarTone === 'clean') ? false : true);
              break;

            case 'bassGuitar':
              playBassNote(record.treeMeanGrowth, 'treeMeanGrowth', variable5InstrumentOptions, treeMeanGrowthGainNode);
              break;

            default:
              break;
          }

        }
      }, [play, incrementalData]);

      const [volume, setVolume] = useState(100);
      const volumeSet = volume => {
        setVolume(volume);
        const audioCtx = audioCtxRef.current;
        const masterVolumeGainNode = masterVolumeGainNodeRef.current;
        masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.5), audioCtx.currentTime + 0.01);
      };
    
      const muteSound = () => {
        const audioCtx = audioCtxRef.current;
        // const humidityGainNode = humidityGainNodeRef.current;
        // humidityGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        const masterVolumeMuteNode = masterVolumeMuteNodeRef.current;
        if (mute) masterVolumeMuteNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.01);
        else masterVolumeMuteNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.5), audioCtx.currentTime + 0.01);
      };

  const stopSound = () => {
    const audioCtx = audioCtxRef.current;
    const displacementOscillator = displacementOscillatorRef.current;
    const soilMoistureOscillator = soilMoistureOscillatorRef.current;
    const temperatureOscillator = temperatureOscillatorRef.current;
    const humidityOscillator = humidityOscillatorRef.current;
    const vpdOscillator = vpdOscillatorRef.current;
    const treeMeanGrowthOscillator = treeMeanGrowthOscillatorRef.current;

    const displacementSynth = displacementSynthRef.current;
    const soilMoistureSynth = soilMoistureSynthRef.current;
    const temperatureSynth = temperatureSynthRef.current;
    const humiditySynth = humiditySynthRef.current;
    const treeMeanGrowthSynth = treeMeanGrowthSynthRef.current;

    muteSound();
    const noInstruments = new Set(); // no instruments active
    playVoices({}, noInstruments);  // ensures everything stops
    if (play) {
      displacementOscillator.stop(audioCtx.currentTime + 0.25);
      soilMoistureOscillator.stop(audioCtx.currentTime + 0.25);
      temperatureOscillator.stop(audioCtx.currentTime + 0.25);
      humidityOscillator.stop(audioCtx.currentTime + 0.25);
      vpdOscillator.stop(audioCtx.currentTime + 0.25);
      treeMeanGrowthOscillator.stop(audioCtx.currentTime + 0.25);

      displacementSynth.stop(audioCtx.currentTime + 0.25);
      soilMoistureSynth.stop(audioCtx.currentTime + 0.25);
      temperatureSynth.stop(audioCtx.currentTime + 0.25);
      humiditySynth.stop(audioCtx.currentTime + 0.25);
      treeMeanGrowthSynth.stop(audioCtx.currentTime + 0.25);
    }
  }

    const stopOnClick = () => {
    setPlay(false);
    setPause(false);
    setStop(true);
    setInitialiseVisuals(true);
    stopSound();
    setIncrementalData([]);
    currentIndexRef.current = 0;
  };

  useEffect(() => {
      if (!initialiseVisuals) {
        stopOnClick();
      }
  }, [dataSource, dataRange, averagingPeriod]);

  // DATA AVERAGING
    useEffect(() => {
  
    let values = [];
  
    // If dataPeriod is '0' or invalid, use full data without filtering
    if (averagingPeriod === '0') {
      values = refinedDataValues;
    } else {
      const hours = Number(averagingPeriod);
      if (isNaN(hours) || hours <= 0) {
        values = refinedDataValues;
      } else {
        // Filter data by cutoff time (last dataPeriod hours)
        const now = Date.now();
        const cutoff = now - hours * 60 * 60 * 1000;
        values = refinedDataValues.filter(item => {
          const timestamp = (item.timestamp instanceof Date) 
            ? item.timestamp.getTime() 
            : new Date(item.timestamp).getTime();
          return timestamp >= cutoff;
        });
      }
    }
  
    if (!values || values.length === 0) {
      setAveragedDataValues([]);
      return;
    }
  
    const msPerDay = 24 * 60 * 60 * 1000;
  
    // Sort filtered data ascending by timestamp
    const sortedData = values.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  
    // Align start and end times to midnight local time
    const firstDate = new Date(sortedData[0].timestamp);
    firstDate.setHours(0, 0, 0, 0);
    const startTime = firstDate.getTime();
  
    const lastDate = new Date(sortedData[sortedData.length - 1].timestamp);
    lastDate.setHours(0, 0, 0, 0);
    const endTime = lastDate.getTime();
  
    const result = [];
  
    for (let binStart = startTime; binStart <= endTime; binStart += msPerDay) {
      const binEnd = binStart + msPerDay;
  
      // Collect records in this 24h bin
      const binData = sortedData.filter(d => {
        const ts = (d.timestamp instanceof Date) ? d.timestamp.getTime() : new Date(d.timestamp).getTime();
        return ts >= binStart && ts < binEnd;
      });
  
      if (binData.length === 0) continue;
  
      const keys = Object.keys(binData[0]).filter(k => k !== 'timestamp');
      const averagedEntry = {
        timestamp: new Date(binStart),
        binStart: new Date(binStart),
        binEnd: new Date(binEnd - 1),
        count: binData.length,
      };
  
      // Average all numeric keys
      keys.forEach(key => {
        const sum = binData.reduce((acc, d) => acc + (Number(d[key]) || 0), 0);
        averagedEntry[key] = sum / binData.length;
      });
  
      // Calculate treeMeanGrowth = max displacement - min displacement
      const displacements = binData
        .map(d => Number(d.displacement))
        .filter(v => !isNaN(v));
      averagedEntry.treeMeanGrowth = displacements.length > 0
        ? Math.max(...displacements) - Math.min(...displacements)
        : null;
  
      result.push(averagedEntry);
    }
  
    setAveragedDataValues(result);
  }, [averagingPeriod, dataRange, refinedDataValues]);

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

  const intervalRef = useRef(0);

  const remap = (value, inMin=0, inMax=100, outMin=100, outMax=1000) => ((value - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
  function remapReversed(value, inputMin = 0, inputMax = 100, outputMin = 0, outputMax = 1000) {
    const ratio = (value - inputMin) / (inputMax - inputMin);
    const inverted = 1 - ratio;
    return inverted * (outputMax - outputMin) + outputMin;
  }

  useEffect(() => {
      if (!averagedDataValues || !Array.isArray(averagedDataValues)) return;
      if (pause || stop || !play || currentIndexRef.current >= averagedDataValues.length) return;
      intervalRef.current = setInterval(() => {
        const idx = currentIndexRef.current;
        if (idx >= averagedDataValues.length) {
          clearInterval(intervalRef.current);
          return;
        }
        setIncrementalData(prevData => [...prevData, averagedDataValues[idx]]);
        currentIndexRef.current += 1; 
      }, remapReversed(playbackOptions.playbackSpeed));
      return () => clearInterval(intervalRef.current);
    }, [averagedDataValues, data, pause, play, stop, playbackOptions.playbackSpeed]);


useEffect(() => {
  const updatedRecords = data.map(record => {
    const es = 0.61078 * Math.exp(17.269 * record.temperature / (237.3 + record.temperature));
    const ea = (record.humidity / 100) * es;
    const vpd = es - ea;
    return {
      ...record,
      vpd: vpd
    };
  });
  if (dataRange === '-1') {
    if (updatedRecords && updatedRecords.length > 0) {
      setRefinedDataValues([updatedRecords[updatedRecords.length - 1]]);
    } else {
      setRefinedDataValues([]);
    }
    return;
  }
  if (dataRange === '0') {
    setRefinedDataValues(updatedRecords);
    return;
  }
  const hours = Number(dataRange);
  if (isNaN(hours) || hours <= 0) {
    setRefinedDataValues(updatedRecords);
    return;
  }
  const now = Date.now();
  const cutoff = now - hours * 60 * 60 * 1000; 
  setRefinedDataValues(updatedRecords.filter(item => {
    const timestamp = (item.timestamp instanceof Date) ? item.timestamp.getTime() : new Date(item.timestamp).getTime();
    return timestamp >= cutoff;
  }));
}, [dataRange, averagingPeriod, data]);



  return (
    <PageLayout title='Custom Audio - Done'>
      <DropdownSonifierStepper selected='done' />
      <div className='p-5'>
        <h4>Play your created custom sonification:</h4>
        <h6 className='p-5'>Please note: if playback audio appears distorted, please reduce the Master Volume and/or variable volume levels. The datasets, particularly from Northern 1, may contain out-of-range values, negatively impacting the audio experience.</h6>
        <h6 className='p-3'>You may select different options to sonify the data, and return back to hear their effect. Your changes are saved until you close or refresh the browser window.</h6>
      </div>
      <div className=''>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Data Controls</h4>
        <div className='d-flex flex-column responsive-control-labels'>
          <h4 style={{ textAlign: 'left' }}>Data Source</h4>
          <Dropdown 
              options={endpoints}
              selectedOption={dataSource}
              onSelect={dataSourceSet}
          />
        </div>
        <div className='d-flex flex-column responsive-control-labels'>
          <h4 style={{ textAlign: 'left' }}>Data Range</h4>
          <Dropdown 
            options={dataRangeOptions}
            selectedOption={dataRange}
            onSelect={dataRangeSet}
          />
        </div>
      <div className='d-flex flex-column responsive-control-labels'>
        <h4 style={{ textAlign: 'left' }}>Averaging Period</h4>
        <Dropdown 
          options={averagingPeriodOptions}
          selectedOption={averagingPeriod}
          onSelect={averagingPeriodSet}
        />
      </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Playback Controls</h4>
        <div className="d-flex justify-content-center" style={{ gap: '1.25rem' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => playOnClick()}>
              <h4 style={{ fontWeight: play ? 'bold' : '' }}>Play</h4>
              <i className={`bi bi-play-circle${play ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => pauseOnClick()}>
              <h4 style={{ fontWeight: pause ? 'bold' : '' }}>Pause</h4>
              <i className={`bi bi-pause-circle${pause ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
          </div>
          <div style={{ cursor: 'pointer' }} onClick={() => stopOnClick()}>
              <h4 style={{ fontWeight: stop ? 'bold' : '' }}>Stop</h4>
              <i className={`bi bi-stop-circle${stop ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
          </div>
          {
            !hideMute && (
                <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => muteOnClick()}>
                    <h4 style={{ fontWeight: mute ? 'bold' : '' }}>{mute ? 'Unmute' : 'Mute' }</h4>
                    <i className={`bi bi-volume-mute${mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                </div>
            )
          }
        </div>
        <div className='d-flex flex-column responsive-control-labels'>
            <h4 style={{ textAlign: 'left' }}>Master Volume</h4>
            <VolumeSlider volume={volume} setVolume={volumeSet} />
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
          <div className='d-flex flex-column responsive-control-labels'>
            <h4>Master Panning</h4>
            <SpatialAudioSlider width={masterPanningWidth} setWidth={masterPanningWidthSet} depth={masterPanningDepth} setDepth={masterPanningDepthSet} height={masterPanningHeight} setHeight={masterPanningHeightSet} />
          </div>
        </div>
        {
          (variable0InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement: {titleCase(variable0InstrumentOptions.instrument)}</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                    <h4 style={{ textAlign: 'left' }}>Volume</h4>
                    <VolumeSlider volume={variable0Volume} setVolume={variable0SetVolume} />
                </div>
                {
                  !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable0MuteOnClick()}>
                      <h4 style={{ fontWeight: variable0Mute ? 'bold' : '' }}>{variable0Mute ? 'Unmute' : 'Mute' }</h4>
                      <i className={`bi bi-volume-mute${variable0Mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                  )
                }
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                  <div className='d-flex flex-column responsive-control-labels'>
                      <h4>Panning</h4>
                      <SpatialAudioSlider width={variable0PanningWidth} setWidth={variable0PanningWidthSet} depth={variable0PanningDepth} setDepth={variable0PanningDepthSet} height={variable0PanningHeight} setHeight={variable0PanningHeightSet} />
                  </div>
                </div>
              </div>
            </>
          )
        }
        {
          (variable1InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture: {titleCase(variable1InstrumentOptions.instrument)}</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                  <h4 style={{ textAlign: 'left' }}>Volume</h4>
                  <VolumeSlider volume={variable1Volume} setVolume={variable1SetVolume} />
                </div>
                {
                  !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable1MuteOnClick()}>
                      <h4 style={{ fontWeight: variable1Mute ? 'bold' : '' }}>{variable1Mute ? 'Unmute' : 'Mute' }</h4>
                      <i className={`bi bi-volume-mute${variable1Mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                  )
                }
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                  <div className='d-flex flex-column responsive-control-labels'>
                    <h4>Panning</h4>
                    <SpatialAudioSlider width={variable1PanningWidth} setWidth={variable1PanningWidthSet} depth={variable1PanningDepth} setDepth={variable1PanningDepthSet} height={variable1PanningHeight} setHeight={variable1PanningHeightSet} />
                  </div>
                </div>
              </div>
            </>
          )
        }
        {
          (variable2InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature: {titleCase(variable2InstrumentOptions.instrument)}</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                  <h4 style={{ textAlign: 'left' }}>Volume</h4>
                  <VolumeSlider volume={variable2Volume} setVolume={variable2SetVolume} />
                </div>
                {
                  !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable2MuteOnClick()}>
                      <h4 style={{ fontWeight: variable2Mute ? 'bold' : '' }}>{variable2Mute ? 'Unmute' : 'Mute' }</h4>
                      <i className={`bi bi-volume-mute${variable2Mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                  )
                }
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                  <div className='d-flex flex-column responsive-control-labels'>
                    <h4>Panning</h4>
                    <SpatialAudioSlider width={variable2PanningWidth} setWidth={variable2PanningWidthSet} depth={variable2PanningDepth} setDepth={variable2PanningDepthSet} height={variable2PanningHeight} setHeight={variable2PanningHeightSet} />
                  </div>
                </div>
              </div>
            </>
          )
        }
        {
          (variable3InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity: {titleCase(variable3InstrumentOptions.instrument)}</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                  <h4 style={{ textAlign: 'left' }}>Volume</h4>
                  <VolumeSlider volume={variable3Volume} setVolume={variable3SetVolume} />
                </div>
                {
                  !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable3MuteOnClick()}>
                      <h4 style={{ fontWeight: variable3Mute ? 'bold' : '' }}>{variable3Mute ? 'Unmute' : 'Mute' }</h4>
                      <i className={`bi bi-volume-mute${variable3Mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                  )
                }
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                  <div className='d-flex flex-column responsive-control-labels'>
                    <h4>Panning</h4>
                    <SpatialAudioSlider width={variable3PanningWidth} setWidth={variable3PanningWidthSet} depth={variable3PanningDepth} setDepth={variable3PanningDepthSet} height={variable3PanningHeight} setHeight={variable3PanningHeightSet} />
                  </div>
                </div>
              </div>
            </>
          )
        }
        {
          (variable4InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Vapour Pressure Deficit (VPD): {titleCase(variable4InstrumentOptions.instrument)}</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                  <h4 style={{ textAlign: 'left' }}>Volume</h4>
                  <VolumeSlider volume={variable4Volume} setVolume={variable4SetVolume} />
                </div>
                {
                  !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable4MuteOnClick()}>
                      <h4 style={{ fontWeight: variable4Mute ? 'bold' : '' }}>{variable4Mute ? 'Unmute' : 'Mute' }</h4>
                      <i className={`bi bi-volume-mute${variable4Mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                  )
                }
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                  <div className='d-flex flex-column responsive-control-labels'>
                    <h4>Panning</h4>
                    <SpatialAudioSlider width={variable4PanningWidth} setWidth={variable4PanningWidthSet} depth={variable4PanningDepth} setDepth={variable4PanningDepthSet} height={variable4PanningHeight} setHeight={variable4PanningHeightSet} />
                  </div>
                </div>
              </div>
            </>
          )
        }
        {
          (variable5InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth: {titleCase(variable5InstrumentOptions.instrument)}</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                  <h4 style={{ textAlign: 'left' }}>Volume</h4>
                  <VolumeSlider volume={variable5Volume} setVolume={variable5SetVolume} />
                </div>
                {
                  !hideMute && (
                    <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable5MuteOnClick()}>
                      <h4 style={{ fontWeight: variable5Mute ? 'bold' : '' }}>{variable5Mute ? 'Unmute' : 'Mute' }</h4>
                      <i className={`bi bi-volume-mute${variable5Mute ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                    </div>
                  )
                }
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                  <div className='d-flex flex-column responsive-control-labels'>
                    <h4>Panning</h4>
                    <SpatialAudioSlider width={variable5PanningWidth} setWidth={variable5PanningWidthSet} depth={variable5PanningDepth} setDepth={variable5PanningDepthSet} height={variable5PanningHeight} setHeight={variable5PanningHeightSet} />
                  </div>
                </div>
              </div>
            </>
          )
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/effects')} hasTitle title='Back' />
        <Button onClick={() => navigate('/')} hasTitle title='Done' />
      </div>

{/* THE TEMPO/RHYTHM SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}