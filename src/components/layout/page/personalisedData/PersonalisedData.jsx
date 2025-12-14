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
import BarChart from '../../../ui/visualisation/graph/BarChart';
import Dials from '../../../ui/visualisation/animation/Dials';
import ForestScene from '../../../ui/visualisation/animation/ForestScene';
import logo from '../../../../assets/stf-logo.png';
import AboutDerivedDataModal from '../../../ui/modal/AboutDerivedDataModal';
import { getAudioContext } from '../../../context/AudioContext';
import TreeAnonModal from '../../../ui/modal/TreeAnonModal';
import PersonalisedPresetPlaybackPanel from '../../../ui/panel/PersonalisedPresetPlaybackPanel';
import PersonalisedPresetSoundPanel from '../../../ui/panel/PersonalisedPresetSoundPanel';
import PersonalisedPresetVisualsPanel from '../../../ui/panel/PersonalisedPresetVisualsPanel';
import FMSynth from '../../../ui/audio/FMSynth';
import AboutPersonalisedDataModal from '../../../ui/modal/AboutPersonalisedDataModal';
import PersonalisedDataHelpModal from '../../../ui/modal/PersonalisedDataHelpModal';


export default function PersonalisedData({ endpoints={} }) {
  const navigate = useNavigate();

  const [incrementalData, setIncrementalData] = useState([]);
  const [incrementalData2, setIncrementalData2] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [highlightedIndex2, setHighlightedIndex2] = useState(0);
  const [multiSonifications, setMultiSonifications] = useState(false);
  const [variable0Instrument, setVariable0Instrument] = useState('droneSine');
  const variable0InstrumentSelect = instrument => { setVariable0Instrument(instrument); };
  const [variable1Instrument, setVariable1Instrument] = useState('droneTriangle');
  const variable1InstrumentSelect = instrument => { setVariable1Instrument(instrument); };
  const [variable2Instrument, setVariable2Instrument] = useState('droneSine');
  const variable2InstrumentSelect = instrument => { setVariable2Instrument(instrument); };
  const [variable3Instrument, setVariable3Instrument] = useState('droneTriangle');
  const variable3InstrumentSelect = instrument => { setVariable3Instrument(instrument); };
  const [variable4Instrument, setVariable4Instrument] = useState('droneSawtooth');
  const variable4InstrumentSelect = instrument => { setVariable4Instrument(instrument); };
  const [variable5Instrument, setVariable5Instrument] = useState('droneSawtooth');
  const variable5InstrumentSelect = instrument => { setVariable5Instrument(instrument); };

  const audioCtxRef = useRef(null);
  const isFirstRender = useRef(true);

  const referenceNoteOscillatorRef = useRef(null);

  const displacementGainNodeRef = useRef(null);
  const soilMoistureGainNodeRef = useRef(null);
  const temperatureGainNodeRef = useRef(null);
  const humidityGainNodeRef = useRef(null);
  const vpdGainNodeRef = useRef(null);
  const treeMeanGrowthGainNodeRef = useRef(null);
  const displacement2GainNodeRef = useRef(null);
  const soilMoisture2GainNodeRef = useRef(null);
  const temperature2GainNodeRef = useRef(null);
  const humidity2GainNodeRef = useRef(null);
  const vpd2GainNodeRef = useRef(null);
  const treeMeanGrowth2GainNodeRef = useRef(null);
  const referenceNoteGainNodeRef = useRef(null);
  const masterVolumeGainNodeRef = useRef(null);

  const displacementMuteNodeRef = useRef(null);
  const soilMoistureMuteNodeRef = useRef(null);
  const temperatureMuteNodeRef = useRef(null);
  const humidityMuteNodeRef = useRef(null);
  const vpdMuteNodeRef = useRef(null);
  const treeMeanGrowthMuteNodeRef = useRef(null);
  const displacement2MuteNodeRef = useRef(null);
  const soilMoisture2MuteNodeRef = useRef(null);
  const temperature2MuteNodeRef = useRef(null);
  const humidity2MuteNodeRef = useRef(null);
  const vpd2MuteNodeRef = useRef(null);
  const treeMeanGrowth2MuteNodeRef = useRef(null);
  const referenceNoteMuteNodeRef = useRef(null);
  const masterVolumeMuteNodeRef = useRef(null);

  const displacementPannerNodeRef = useRef(null);
  const soilMoisturePannerNodeRef = useRef(null);
  const temperaturePannerNodeRef = useRef(null);
  const humidityPannerNodeRef = useRef(null);
  const vpdPannerNodeRef = useRef(null);
  const treeMeanGrowthPannerNodeRef = useRef(null);
  const displacement2PannerNodeRef = useRef(null);
  const soilMoisture2PannerNodeRef = useRef(null);
  const temperature2PannerNodeRef = useRef(null);
  const humidity2PannerNodeRef = useRef(null);
  const vpd2PannerNodeRef = useRef(null);
  const treeMeanGrowth2PannerNodeRef = useRef(null);
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
  const [refinedDataValues, setRefinedDataValues] = useState([]);
  const [refinedDataValues2, setRefinedDataValues2] = useState([]);
  const [averagedDataValues, setAveragedDataValues] = useState([]);
  const [averagedDataValues2, setAveragedDataValues2] = useState([]);
  const [graphControls, setGraphControls] = useState(true);
  const [variableHide, setVariableHide] = useState(false);
  const [graphColourScheme, setGraphColourScheme] = useState('schemeCategory10');
  const graphColourSchemeSet = graphColourScheme => setGraphColourScheme(graphColourScheme);
  const [displayAllData, setDisplayAllData] = useState(false);
  const displayAllDataSet = () => { setDisplayAllData(!displayAllData); };
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
    if (displacement2PannerNodeRef?.current) {
      const displacement2PannerNode = displacement2PannerNodeRef.current;
      displacement2PannerNode.setPosition(variable0PanningWidth, variable0PanningHeight, variable0PanningDepth);
    }
  }, [variable0PanningWidth, variable0PanningHeight, variable0PanningDepth]);

  useEffect(() => {
    if (soilMoisturePannerNodeRef?.current) {
      const soilMoisturePannerNode = soilMoisturePannerNodeRef.current;
      soilMoisturePannerNode.setPosition(variable1PanningWidth, variable1PanningHeight, variable1PanningDepth);
    }
    if (soilMoisture2PannerNodeRef?.current) {
      const soilMoisture2PannerNode = soilMoisture2PannerNodeRef.current;
      soilMoisture2PannerNode.setPosition(variable1PanningWidth, variable1PanningHeight, variable1PanningDepth);
    }
  }, [variable1PanningWidth, variable1PanningHeight, variable1PanningDepth]);

  useEffect(() => {
    if (temperaturePannerNodeRef?.current) {
      const temperaturePannerNode = temperaturePannerNodeRef.current;
      temperaturePannerNode.setPosition(variable2PanningWidth, variable2PanningHeight, variable2PanningDepth);
    }
    if (temperature2PannerNodeRef?.current) {
      const temperature2PannerNode = temperature2PannerNodeRef.current;
      temperature2PannerNode.setPosition(variable2PanningWidth, variable2PanningHeight, variable2PanningDepth);
    }
  }, [variable2PanningWidth, variable2PanningHeight, variable2PanningDepth]);

  useEffect(() => {
    if (humidityPannerNodeRef?.current) {
      const humidityPannerNode = humidityPannerNodeRef.current;
      humidityPannerNode.setPosition(variable3PanningWidth, variable3PanningHeight, variable3PanningDepth);
    }
    if (humidity2PannerNodeRef?.current) {
      const humidity2PannerNode = humidity2PannerNodeRef.current;
      humidity2PannerNode.setPosition(variable3PanningWidth, variable3PanningHeight, variable3PanningDepth);
    }
  }, [variable3PanningWidth, variable3PanningHeight, variable3PanningDepth]);

  useEffect(() => {
    if (vpdPannerNodeRef?.current) {
      const vpdPannerNode = vpdPannerNodeRef.current;
      vpdPannerNode.setPosition(variable4PanningWidth, variable4PanningHeight, variable4PanningDepth);
    }
    if (vpd2PannerNodeRef?.current) {
      const vpd2PannerNode = vpd2PannerNodeRef.current;
      vpd2PannerNode.setPosition(variable4PanningWidth, variable4PanningHeight, variable4PanningDepth);
    }
  }, [variable4PanningWidth, variable4PanningHeight, variable4PanningDepth]);

  useEffect(() => {
    if (treeMeanGrowthPannerNodeRef?.current) {
      const treeMeanGrowthPannerNode = treeMeanGrowthPannerNodeRef.current;
      treeMeanGrowthPannerNode.setPosition(variable5PanningWidth, variable5PanningHeight, variable5PanningDepth);
    }
    if (treeMeanGrowth2PannerNodeRef?.current) {
      const treeMeanGrowth2PannerNode = treeMeanGrowth2PannerNodeRef.current;
      treeMeanGrowth2PannerNode.setPosition(variable5PanningWidth, variable5PanningHeight, variable5PanningDepth);
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
    if (displacement2GainNodeRef?.current) {
      const displacement2GainNode = displacement2GainNodeRef.current;
      displacement2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
    }
  };
  const [variable0Mute, setVariable0Mute] = useState(false);
  const variable0MuteOnClick = () => setVariable0Mute(!variable0Mute);
    
  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const displacementMuteNode = displacementMuteNodeRef.current;
    if (variable0Mute) {
      displacementMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      if (displacement2MuteNodeRef?.current) {
        const displacement2MuteNode = displacement2MuteNodeRef.current;
        displacement2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      }
    }
    else {
      displacementMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      if (displacement2MuteNodeRef?.current) {
        const displacement2MuteNode = displacement2MuteNodeRef.current;
        displacement2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      }
    }
  }, [variable0Mute]);

  const [variable1Volume, setVariable1Volume] = useState(100);
  const variable1SetVolume = volume => {
    setVariable1Volume(volume);
    const audioCtx = audioCtxRef.current;
    const soilMoistureGainNode = soilMoistureGainNodeRef.current;
    soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
    if (soilMoisture2GainNodeRef?.current) {
      const soilMoisture2GainNode = soilMoisture2GainNodeRef.current;
      soilMoisture2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume), audioCtx.currentTime + 0.01);
    }
  };
  const [variable1Mute, setVariable1Mute] = useState(false);
  const variable1MuteOnClick = () => setVariable1Mute(!variable1Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const soilMoistureMuteNode = soilMoistureMuteNodeRef.current;
    if (variable1Mute) {
      soilMoistureMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      if (soilMoisture2MuteNodeRef?.current) {
        const soilMoisture2MuteNode = soilMoisture2MuteNodeRef.current;
        soilMoisture2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      }
    }
    else {
      soilMoistureMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      if (soilMoisture2MuteNodeRef?.current) {
        const soilMoisture2MuteNode = soilMoisture2MuteNodeRef.current;
        soilMoisture2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      }
    }
  }, [variable1Mute]);

  const [variable2Volume, setVariable2Volume] = useState(100);
  const variable2SetVolume = volume => {
    setVariable2Volume(volume);
    const audioCtx = audioCtxRef.current;
    const temperatureGainNode = temperatureGainNodeRef.current;
    temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    if (temperature2GainNodeRef?.current) {
      const temperature2GainNode = temperature2GainNodeRef.current;
      temperature2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    }
  };
  const [variable2Mute, setVariable2Mute] = useState(false);
  const variable2MuteOnClick = () => setVariable2Mute(!variable2Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const temperatureMuteNode = temperatureMuteNodeRef.current;
    if (variable2Mute) {
      temperatureMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      if (temperature2MuteNodeRef?.current) {
        const temperature2MuteNode = temperature2MuteNodeRef.current;
        temperature2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      }
    }
    else {
      temperatureMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      if (temperature2MuteNodeRef?.current) {
        const temperature2MuteNode = temperature2MuteNodeRef.current;
        temperature2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      }
    }
  }, [variable2Mute]);

  const [variable3Volume, setVariable3Volume] = useState(100);
  const variable3SetVolume = volume => {
    setVariable3Volume(volume);
    const audioCtx = audioCtxRef.current;
    const humidityGainNode = humidityGainNodeRef.current;
    humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    if (humidity2GainNodeRef?.current) {
      const humidity2GainNode = humidity2GainNodeRef.current;
      humidity2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 1.5), audioCtx.currentTime + 0.01);
    }
  };
  const [variable3Mute, setVariable3Mute] = useState(false);
  const variable3MuteOnClick = () => setVariable3Mute(!variable3Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const humidityMuteNode = humidityMuteNodeRef.current;
    if (variable3Mute) {
      humidityMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      if (humidity2MuteNodeRef?.current) {
        const humidity2MuteNode = humidity2MuteNodeRef.current;
        humidity2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      }
    }
    else {
      humidityMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
      if (humidity2MuteNodeRef?.current) {
        const humidity2MuteNode = humidity2MuteNodeRef.current;
        humidity2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
      }
    }
  }, [variable3Mute]);

const [variable4Volume, setVariable4Volume] = useState(100);
  const variable4SetVolume = volume => {
    setVariable4Volume(volume);
    const audioCtx = audioCtxRef.current;
    const vpdGainNode = vpdGainNodeRef.current;
    vpdGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.75), audioCtx.currentTime + 0.01);
    if (vpd2GainNodeRef?.current) {
      const vpd2GainNode = vpd2GainNodeRef.current;
      vpd2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.75), audioCtx.currentTime + 0.01);
    }
  };
  const [variable4Mute, setVariable4Mute] = useState(false);
  const variable4MuteOnClick = () => setVariable4Mute(!variable4Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const vpdMuteNode = vpdMuteNodeRef.current;
   if (variable4Mute) {
      vpdMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      if (vpd2MuteNodeRef?.current) {
        const vpd2MuteNode = vpd2MuteNodeRef.current;
        vpd2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      }
    }
    else {
      vpdMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable4Volume * 0.75), audioCtx.currentTime + 0.01);
      if (vpd2MuteNodeRef?.current) {
        const vpd2MuteNode = vpd2MuteNodeRef.current;
        vpd2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable4Volume * 0.75), audioCtx.currentTime + 0.01);
      }
    }
  }, [variable4Mute]);

  const [variable5Volume, setVariable5Volume] = useState(100);
  const variable5SetVolume = volume => {
    setVariable5Volume(volume);
    const audioCtx = audioCtxRef.current;
    const treeMeanGrowthGainNode = treeMeanGrowthGainNodeRef.current;
    treeMeanGrowthGainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.75), audioCtx.currentTime + 0.01);
    if (treeMeanGrowth2GainNodeRef?.current) {
      const treeMeanGrowth2GainNode = treeMeanGrowth2GainNodeRef.current;
      treeMeanGrowth2GainNode.gain.linearRampToValueAtTime(rescaleVolume(volume * 0.75), audioCtx.currentTime + 0.01);
    }
  };
  const [variable5Mute, setVariable5Mute] = useState(false);
  const variable5MuteOnClick = () => setVariable5Mute(!variable5Mute);

  useEffect(() => {
    if (isFirstRender.current) return; 
    const audioCtx = audioCtxRef.current;
    const treeMeanGrowthMuteNode = treeMeanGrowthMuteNodeRef.current;
    if (variable5Mute) {
      treeMeanGrowthMuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      if (treeMeanGrowth2MuteNodeRef?.current) {
        const treeMeanGrowth2MuteNode = treeMeanGrowth2MuteNodeRef.current;
        treeMeanGrowth2MuteNode.gain.linearRampToValueAtTime(0.0, audioCtx.currentTime + 0.01);
      }
    }
    else {
      treeMeanGrowthMuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable5Volume * 0.75), audioCtx.currentTime + 0.01);
      if (treeMeanGrowth2MuteNodeRef?.current) {
        const treeMeanGrowth2MuteNode = treeMeanGrowth2MuteNodeRef.current;
        treeMeanGrowth2MuteNode.gain.linearRampToValueAtTime(rescaleVolume(variable5Volume * 0.75), audioCtx.currentTime + 0.01);
      }
    }
  }, [variable5Mute]);
  
  const [playbackSpeed, setPlaybackSpeed] = useState(50);
  const playbackSpeedSet = playbackSpeed => setPlaybackSpeed(playbackSpeed);
  const [graphZoom, setGraphZoom] = useState(0);
  const graphZoomSet = graphZoom => setGraphZoom(graphZoom);
  const [dataSource, setDataSource] = useState('northern_1');
  const dataSourceSet = dataSource => setDataSource(dataSource);
  const [dataSource2, setDataSource2] = useState('northern_2');
  const dataSourceSet2 = dataSource2 => setDataSource2(dataSource2);
  const [dataRange, setDataRange] = useState('0');
  const dataRangeSet = dataRange => setDataRange(dataRange);
  const [dataPeriod, setDataPeriod] = useState('0');
  const dataPeriodSet = dataPeriod => setDataPeriod(dataPeriod);
  const [dataSource2Hide, setDataSource2Hide] = useState(true);

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

  const getDroneWave = wave => {
    switch (wave) {
      case 'droneSine':
        return 'sine';
      case 'droneTriangle':
        return 'triangle';
      case 'droneSawtooth':
        return 'sawtooth';
      default:
        return 'sine';
    }
  };

  const displacementOscillatorRef = useRef(null);
  const soilMoistureOscillatorRef = useRef(null);
  const temperatureOscillatorRef = useRef(null);
  const humidityOscillatorRef = useRef(null);
  const vpdOscillatorRef = useRef(null);
  const treeMeanGrowthOscillatorRef = useRef(null);

  const displacement2OscillatorRef = useRef(null);
  const soilMoisture2OscillatorRef = useRef(null);
  const temperature2OscillatorRef = useRef(null);
  const humidity2OscillatorRef = useRef(null);
  const vpd2OscillatorRef = useRef(null);
  const treeMeanGrowth2OscillatorRef = useRef(null);

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

      const displacement2Oscillator = audioCtx.createOscillator();
      displacement2OscillatorRef.current = displacement2Oscillator;
      const soilMoisture2Oscillator = audioCtx.createOscillator();
      soilMoisture2OscillatorRef.current = soilMoisture2Oscillator;
      const temperature2Oscillator = audioCtx.createOscillator();
      temperature2OscillatorRef.current = temperature2Oscillator;
      const humidity2Oscillator = audioCtx.createOscillator();
      humidity2OscillatorRef.current = humidity2Oscillator;
      const vpd2Oscillator = audioCtx.createOscillator();
      vpd2OscillatorRef.current = vpd2Oscillator;
      const treeMeanGrowth2Oscillator = audioCtx.createOscillator();
      treeMeanGrowth2OscillatorRef.current = treeMeanGrowth2Oscillator;

      displacementOscillator.type = getDroneWave(variable0Instrument);
      soilMoistureOscillator.type = getDroneWave(variable1Instrument);
      temperatureOscillator.type = getDroneWave(variable2Instrument);
      humidityOscillator.type = getDroneWave(variable3Instrument);
      vpdOscillator.type = getDroneWave(variable4Instrument);
      treeMeanGrowthOscillator.type = getDroneWave(variable5Instrument);

      displacement2Oscillator.type = getDroneWave(variable0Instrument);
      soilMoisture2Oscillator.type = getDroneWave(variable1Instrument);
      temperature2Oscillator.type = getDroneWave(variable2Instrument);
      humidity2Oscillator.type = getDroneWave(variable3Instrument);
      vpd2Oscillator.type = getDroneWave(variable4Instrument);
      treeMeanGrowth2Oscillator.type = getDroneWave(variable5Instrument);

      displacementOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      soilMoistureOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      temperatureOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      humidityOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      vpdOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      treeMeanGrowthOscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);

      displacement2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      soilMoisture2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      temperature2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      humidity2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      vpd2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);
      treeMeanGrowth2Oscillator.frequency.setValueAtTime(0.000001, audioCtx.currentTime);

      displacementOscillator.start();
      soilMoistureOscillator.start();
      temperatureOscillator.start();
      humidityOscillator.start();
      vpdOscillator.start();
      treeMeanGrowthOscillator.start();

      displacement2Oscillator.start();
      soilMoisture2Oscillator.start();
      temperature2Oscillator.start();
      humidity2Oscillator.start();
      vpd2Oscillator.start();
      treeMeanGrowth2Oscillator.start();
    }

    useEffect(() => {
      if (play) {
        const displacementOscillator = displacementOscillatorRef.current;
        const soilMoistureOscillator = soilMoistureOscillatorRef.current;
        const temperatureOscillator = temperatureOscillatorRef.current;
        const humidityOscillator = humidityOscillatorRef.current;
        const vpdOscillator = vpdOscillatorRef.current;
        const treeMeanGrowthOscillator = treeMeanGrowthOscillatorRef.current;

        const displacement2Oscillator = displacement2OscillatorRef.current;
        const soilMoisture2Oscillator = soilMoisture2OscillatorRef.current;
        const temperature2Oscillator = temperature2OscillatorRef.current;
        const humidity2Oscillator = humidity2OscillatorRef.current;
        const vpd2Oscillator = vpd2OscillatorRef.current;
        const treeMeanGrowth2Oscillator = treeMeanGrowth2OscillatorRef.current;

        const displacementSynth = displacementSynthRef.current;
        const soilMoistureSynth = soilMoistureSynthRef.current;
        const temperatureSynth = temperatureSynthRef.current;
        const humiditySynth = humiditySynthRef.current;
        const vpdSynth = vpdSynthRef.current;
        const treeMeanGrowthSynth = treeMeanGrowthSynthRef.current;

        const displacement2Synth = displacement2SynthRef.current;
        const soilMoisture2Synth = soilMoisture2SynthRef.current;
        const temperature2Synth = temperature2SynthRef.current;
        const humidity2Synth = humidity2SynthRef.current;
        const vpd2Synth = vpd2SynthRef.current;
        const treeMeanGrowth2Synth = treeMeanGrowth2SynthRef.current;

        const displacementGainNode = displacementGainNodeRef.current;
        const soilMoistureGainNode = soilMoistureGainNodeRef.current;
        const temperatureGainNode = temperatureGainNodeRef.current;
        const humidityGainNode = humidityGainNodeRef.current;
        const vpdGainNode = vpdGainNodeRef.current;
        const treeMeanGrowthGainNode = treeMeanGrowthGainNodeRef.current;

        const displacement2GainNode = displacement2GainNodeRef.current;
        const soilMoisture2GainNode = soilMoisture2GainNodeRef.current;
        const temperature2GainNode = temperature2GainNodeRef.current;
        const humidity2GainNode = humidity2GainNodeRef.current;
        const vpd2GainNode = vpd2GainNodeRef.current;
        const treeMeanGrowth2GainNode = treeMeanGrowth2GainNodeRef.current;

        // Drone-Based Sonification Disconnects
        try { displacementOscillator.disconnect(displacementGainNode); } catch (e) { };
        try { soilMoistureOscillator.disconnect(soilMoistureGainNode); } catch (e) { };
        try { temperatureOscillator.disconnect(temperatureGainNode); } catch (e) { };
        try { humidityOscillator.disconnect(humidityGainNode); } catch (e) { };
        try { vpdOscillator.disconnect(vpdGainNode); } catch (e) { };
        try { treeMeanGrowthOscillator.disconnect(treeMeanGrowthGainNode); } catch (e) { };

        try { displacement2Oscillator.disconnect(displacement2GainNode); } catch (e) { };
        try { soilMoisture2Oscillator.disconnect(soilMoisture2GainNode); } catch (e) { };
        try { temperature2Oscillator.disconnect(temperature2GainNode); } catch (e) { };
        try { humidity2Oscillator.disconnect(humidity2GainNode); } catch (e) { };
        try { vpd2Oscillator.disconnect(vpd2GainNode); } catch (e) { };
        try { treeMeanGrowth2Oscillator.disconnect(treeMeanGrowth2GainNode); } catch (e) { };

        // FM Synthesis Sonification Disconnects
        try { displacementSynth.disconnect(displacementGainNode); } catch (e) { };
        try { soilMoistureSynth.disconnect(soilMoistureGainNode); } catch (e) { };
        try { temperatureSynth.disconnect(temperatureGainNode); } catch (e) { };
        try { humiditySynth.disconnect(humidityGainNode); } catch (e) { };
        try { vpdSynth.disconnect(vpdGainNode); } catch (e) { };
        try { treeMeanGrowthSynth.disconnect(treeMeanGrowthGainNode); } catch (e) { };

        try { displacement2Synth.disconnect(displacement2GainNode); } catch (e) { };
        try { soilMoisture2Synth.disconnect(soilMoisture2GainNode); } catch (e) { };
        try { temperature2Synth.disconnect(temperature2GainNode); } catch (e) { };
        try { humidity2Synth.disconnect(humidity2GainNode); } catch (e) { };
        try { vpd2Synth.disconnect(vpd2GainNode); } catch (e) { };
        try { treeMeanGrowth2Synth.disconnect(treeMeanGrowth2GainNode); } catch (e) { };

        // Drone-Based Sonification
        if (variable0Instrument.startsWith('drone')) displacementOscillator.connect(displacementGainNode);
        if (variable1Instrument.startsWith('drone')) soilMoistureOscillator.connect(soilMoistureGainNode);
        if (variable2Instrument.startsWith('drone')) temperatureOscillator.connect(temperatureGainNode);
        if (variable3Instrument.startsWith('drone')) humidityOscillator.connect(humidityGainNode);
        if (variable4Instrument.startsWith('drone')) vpdOscillator.connect(vpdGainNode);
        if (variable5Instrument.startsWith('drone')) treeMeanGrowthOscillator.connect(treeMeanGrowthGainNode);

        // FM Synthesis Sonification
        if (variable0Instrument.startsWith('fmSynth')) displacementSynth.connect(displacementGainNode);
        if (variable1Instrument.startsWith('fmSynth')) soilMoistureSynth.connect(soilMoistureGainNode);
        if (variable2Instrument.startsWith('fmSynth')) temperatureSynth.connect(temperatureGainNode);
        if (variable3Instrument.startsWith('fmSynth')) humiditySynth.connect(humidityGainNode);
        if (variable4Instrument.startsWith('fmSynth')) vpdSynth.connect(vpdGainNode);
        if (variable5Instrument.startsWith('fmSynth')) treeMeanGrowthSynth.connect(treeMeanGrowthGainNode);

        if (multiSonifications) {
          // Drone-Based Sonification
          if (variable0Instrument.startsWith('drone')) displacement2Oscillator.connect(displacement2GainNode);
          if (variable1Instrument.startsWith('drone')) soilMoisture2Oscillator.connect(soilMoisture2GainNode);
          if (variable2Instrument.startsWith('drone')) temperature2Oscillator.connect(temperature2GainNode);
          if (variable3Instrument.startsWith('drone')) humidity2Oscillator.connect(humidity2GainNode);
          if (variable4Instrument.startsWith('drone')) vpd2Oscillator.connect(vpd2GainNode);
          if (variable5Instrument.startsWith('drone')) treeMeanGrowth2Oscillator.connect(treeMeanGrowth2GainNode);

          // FM Synthesis Sonification
          if (variable0Instrument.startsWith('fmSynth')) displacement2Synth.connect(displacement2GainNode);
          if (variable1Instrument.startsWith('fmSynth')) soilMoisture2Synth.connect(soilMoisture2GainNode);
          if (variable2Instrument.startsWith('fmSynth')) temperature2Synth.connect(temperature2GainNode);
          if (variable3Instrument.startsWith('fmSynth')) humidity2Synth.connect(humidity2GainNode);
          if (variable4Instrument.startsWith('fmSynth')) vpd2Synth.connect(vpd2GainNode);
          if (variable5Instrument.startsWith('fmSynth')) treeMeanGrowth2Synth.connect(treeMeanGrowth2GainNode);
        }
      }    
    }, [play, variable0Instrument, variable1Instrument, variable2Instrument, variable3Instrument, variable4Instrument, variable5Instrument]);

  const [triggerEnvelope, setTriggerEnvelope] = useState(true);
  const displacementSynthRef = useRef(null);
  const soilMoistureSynthRef = useRef(null);
  const temperatureSynthRef = useRef(null);
  const humiditySynthRef = useRef(null);
  const vpdSynthRef = useRef(null);
  const treeMeanGrowthSynthRef = useRef(null);
  const displacement2SynthRef = useRef(null);
  const soilMoisture2SynthRef = useRef(null);
  const temperature2SynthRef = useRef(null);
  const humidity2SynthRef = useRef(null);
  const vpd2SynthRef = useRef(null);
  const treeMeanGrowth2SynthRef = useRef(null);

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

    const displacement2Synth = new FMSynth(audioCtxRef.current);
    displacement2SynthRef.current = displacement2Synth;
    const soilMoisture2Synth = new FMSynth(audioCtxRef.current);
    soilMoisture2SynthRef.current = soilMoisture2Synth;
    const temperature2Synth = new FMSynth(audioCtxRef.current);
    temperature2SynthRef.current = temperature2Synth;
    const humidity2Synth = new FMSynth(audioCtxRef.current);
    humidity2SynthRef.current = humidity2Synth;
    const vpd2Synth = new FMSynth(audioCtxRef.current);
    vpd2SynthRef.current = vpd2Synth;
    const treeMeanGrowth2Synth = new FMSynth(audioCtxRef.current);
    treeMeanGrowth2SynthRef.current = treeMeanGrowth2Synth;

    displacementSynth.setCarrierFrequency(0.000001);
    soilMoistureSynth.setCarrierFrequency(0.000001);
    temperatureSynth.setCarrierFrequency(0.000001);
    humiditySynth.setCarrierFrequency(0.000001);
    vpdSynth.setCarrierFrequency(0.000001);
    treeMeanGrowthSynth.setCarrierFrequency(0.000001);

    displacement2Synth.setCarrierFrequency(0.000001);
    soilMoisture2Synth.setCarrierFrequency(0.000001);
    temperature2Synth.setCarrierFrequency(0.000001);
    humidity2Synth.setCarrierFrequency(0.000001);
    vpd2Synth.setCarrierFrequency(0.000001);
    treeMeanGrowth2Synth.setCarrierFrequency(0.000001);

    displacementSynth.setCarrierWaveform('sine');
    displacementSynth.setModulatorWaveform('triangle');
    soilMoistureSynth.setCarrierWaveform('sine');
    soilMoistureSynth.setModulatorWaveform('triangle');
    temperatureSynth.setCarrierWaveform('sine');
    temperatureSynth.setModulatorWaveform('triangle');
    humiditySynth.setCarrierWaveform('sine');
    humiditySynth.setModulatorWaveform('triangle');
    vpdSynth.setCarrierWaveform('sine');
    vpdSynth.setModulatorWaveform('triangle');
    treeMeanGrowthSynth.setCarrierWaveform('sine');
    treeMeanGrowthSynth.setModulatorWaveform('triangle');

    displacement2Synth.setCarrierWaveform('sine');
    displacement2Synth.setModulatorWaveform('triangle');
    soilMoisture2Synth.setCarrierWaveform('sine');
    soilMoisture2Synth.setModulatorWaveform('triangle');
    temperature2Synth.setCarrierWaveform('sine');
    temperature2Synth.setModulatorWaveform('triangle');
    humidity2Synth.setCarrierWaveform('sine');
    humidity2Synth.setModulatorWaveform('triangle');
    vpd2Synth.setCarrierWaveform('sine');
    vpd2Synth.setModulatorWaveform('triangle');
    treeMeanGrowth2Synth.setCarrierWaveform('sine');
    treeMeanGrowth2Synth.setModulatorWaveform('triangle');

    displacementSynth.start();
    soilMoistureSynth.start();
    temperatureSynth.start();
    humiditySynth.start();
    vpdSynth.start();
    treeMeanGrowthSynth.start();

    displacement2Synth.start();
    soilMoisture2Synth.start();
    temperature2Synth.start();
    humidity2Synth.start();
    vpd2Synth.start();
    treeMeanGrowth2Synth.start();
  };

  let currentPercussionVoice = null;
  const SCALES = {
    dorian: [0, 2, 3, 5, 7, 9, 10],
    aeolian: [0, 2, 3, 5, 7, 8, 10],
    major: [0, 2, 4, 5, 7, 9, 11],  // Added major scale
  };
  let currentScaleName = 'dorian';
  let currentScale = SCALES[currentScaleName];
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
      case 'instrumentPiano':
        return createPianoVoice;
      case 'instrumentPluckedGuitar':
        return createPluckedGuitarVoice;
      case 'instrumentLeadSynth':
        return createSmoothLeadVoice;
      case 'instrumentFlute':
        return createFluteLikeVoice;
      case 'instrumentPercussion':
        return createSoftPercussiveVoice;
      default:
        return createPianoVoice;
    }
  };

  const instruments = {
    displacement: selectInstrument(variable0Instrument),
    soilMoisture: selectInstrument(variable1Instrument),
    temperature: selectInstrument(variable2Instrument),
    humidity: selectInstrument(variable3Instrument),
    vpd: selectInstrument(variable4Instrument),
    treeMeanGrowth: selectInstrument(variable5Instrument)
  };

  const INSTRUMENT_OCTAVE_OFFSETS = {
    displacement: 0,     // base octave
    soilMoisture: 0,     // base octave
    temperature: 0,      // base octave
    humidity: 12,        // +1 octave
    vpd: 0,              // base octave
    treeMeanGrowth: 0,   // base octave
  };

let activeVoices = {};

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

function createPianoVoice(freq, targetOutput) {
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

function createPluckedGuitarVoice(freq, targetOutput) {
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

function createFluteLikeVoice(freq, targetOutput) {
  const audioCtx = audioCtxRef.current;

  const osc = audioCtx.createOscillator();
  osc.type = 'triangle';
  osc.frequency.value = freq;

  // Base gain for overall volume envelope
  const baseGain = audioCtx.createGain();
  baseGain.gain.setValueAtTime(0, audioCtx.currentTime);

  // Tremolo gain node (modulated by tremolo oscillator)
  const tremoloGain = audioCtx.createGain();
  tremoloGain.gain.value = 0.25; // base tremolo amplitude

  // Tremolo oscillator modulating tremoloGain.gain
  const tremoloOsc = audioCtx.createOscillator();
  tremoloOsc.type = 'sine';
  tremoloOsc.frequency.value = 5;

  const tremoloOscGain = audioCtx.createGain();
  tremoloOscGain.gain.value = 0.07; // tremolo depth

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

function createSmoothLeadVoice(freq, targetOutput) {
  const audioCtx = audioCtxRef.current;
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

const vpdToSpeed = vpd => 2 + (vpd / 3) * 4; // from 2 to 6 hits/sec

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

function getSecondaryVariableOutputNode(variable) {
  // Use your custom per-variable routing if needed
  switch (variable) {
    case 'displacement':
      return displacement2GainNodeRef.current;
    case 'soilMoisture':
      return soilMoisture2GainNodeRef.current;
    case 'temperature':
      return temperature2GainNodeRef.current;
    case 'humidity':
      return humidity2GainNodeRef.current;
    case 'vpd':
      return vpd2GainNodeRef.current;
    case 'treeMeanGrowth':
      return treeMeanGrowth2GainNodeRef.current;
    default:
      return null;
  }
}


function playVoices(record, activeInstruments, secondSonification) {
  const audioCtx = audioCtxRef.current;
  // Stop ALL active voices
  for (const voice of Object.values(activeVoices)) {
    if (voice?.stop) voice.stop();
  }
  activeVoices = {};
  if (record) {
    for (const variable of Object.keys(instruments)) {
      if (!activeInstruments.has(variable)) continue;
      if (variable === 'vpd') {
        const speed = vpdToSpeed(record.vpd);
        const voice = instruments[variable](speed, masterVolumeGainNodeRef.current);
        // voice.updateSpeed(speed);
        if (currentPercussionVoice?.stop) {
          currentPercussionVoice.stop();
        }
        
        activeVoices[variable] = voice;
        currentPercussionVoice = voice;
        continue;
      }
      const freq = freqFromValue(record[variable], variable);
      const outputNode = (secondSonification) ? getPrimaryVariableOutputNode(variable) : getSecondaryVariableOutputNode(variable);
      const voice = instruments[variable](freq, outputNode);
      voice.freq = freq;
      activeVoices[variable] = voice;
    }
  }
}

const BASE_KEY = 60; // C4 (Middle C)
let scaleType = 'major';

const MUSICAL_SCALES = {
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

function playChord(rootValue, min, max, outputNode) {
  const rootNote = getNoteFromValue(rootValue, min, max);
  const chordOffsets = [0, 4, 7]; // Major triad
  chordOffsets.forEach(offset => {
    const freq = midiToFreq(rootNote + offset);
    createSynth(freq, 'triangle', 1, 0.2, outputNode);
  });
}

function playMelody(value, min, max, outputNode) {
  let note = getNoteFromValue(value, min, max);
  if (note > 126) note = 91;
  const freq = midiToFreq(note);
  createSynth(freq, 'triangle', 1, 2.5, outputNode);
}

function playGuitarNote(value, min, max, outputNode, distorted=false) {
  const audioCtx = audioCtxRef.current;
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
  gain.connect(outputNode || gain);

  osc.start();
  osc.stop(audioCtx.currentTime + 0.3);
}

function playBassNote(value, min, max, outputNode) {
  const audioCtx = audioCtxRef.current;
  const note = getNoteFromValue(value, min, max);
  const freq = midiToFreq(note - 12);
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  gain.gain.value = 0.25;
  osc.frequency.value = freq;
  osc.type = 'sine';

  osc.connect(gain).connect(outputNode || gain);
  osc.start();
  osc.stop(audioCtx.currentTime + 0.5);
}

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

      const displacement2GainNode = audioCtx.createGain();
      displacement2GainNodeRef.current = displacement2GainNode;
      const soilMoisture2GainNode = audioCtx.createGain();
      soilMoisture2GainNodeRef.current = soilMoisture2GainNode;
      const temperature2GainNode = audioCtx.createGain();
      temperature2GainNodeRef.current = temperature2GainNode;
      const humidity2GainNode = audioCtx.createGain();
      humidity2GainNodeRef.current = humidity2GainNode;
      const vpd2GainNode = audioCtx.createGain();
      vpd2GainNodeRef.current = vpd2GainNode;
      const treeMeanGrowth2GainNode = audioCtx.createGain();
      treeMeanGrowth2GainNodeRef.current = treeMeanGrowth2GainNode;

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

      const displacement2MuteNode = audioCtx.createGain();
      displacement2MuteNodeRef.current = displacement2MuteNode;
      const soilMoisture2MuteNode = audioCtx.createGain();
      soilMoisture2MuteNodeRef.current = soilMoisture2MuteNode;
      const temperature2MuteNode = audioCtx.createGain();
      temperature2MuteNodeRef.current = temperature2MuteNode;
      const humidity2MuteNode = audioCtx.createGain();
      humidity2MuteNodeRef.current = humidity2MuteNode;
      const vpd2MuteNode = audioCtx.createGain();
      vpd2MuteNodeRef.current = vpd2MuteNode;
      const treeMeanGrowth2MuteNode = audioCtx.createGain();
      treeMeanGrowth2MuteNodeRef.current = treeMeanGrowth2MuteNode;

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

      const displacement2PannerNode = audioCtx.createPanner();
      displacement2PannerNodeRef.current = displacement2PannerNode;
      displacement2PannerNode.panningModel = 'HRTF';
      displacement2PannerNode.distanceModel = 'inverse';
      displacement2PannerNode.setPosition(variable0PanningWidth, variable0PanningHeight, variable0PanningDepth); // 2m left, 2m down, 1m back

      const soilMoisture2PannerNode = audioCtx.createPanner();
      soilMoisture2PannerNodeRef.current = soilMoisture2PannerNode;
      soilMoisture2PannerNode.panningModel = 'HRTF';
      soilMoisture2PannerNode.distanceModel = 'inverse';
      soilMoisture2PannerNode.setPosition(variable1PanningWidth, variable1PanningHeight, variable1PanningDepth); // 2m right, 2m up, 1m back

      const temperature2PannerNode = audioCtx.createPanner();
      temperature2PannerNodeRef.current = temperature2PannerNode;
      temperature2PannerNode.panningModel = 'HRTF';
      temperature2PannerNode.distanceModel = 'inverse';
      temperature2PannerNode.setPosition(variable2PanningWidth, variable2PanningHeight, variable2PanningDepth); // 5m left, 5m down, 1m front

      const humidity2PannerNode = audioCtx.createPanner();
      humidity2PannerNodeRef.current = humidity2PannerNode;
      humidity2PannerNode.panningModel = 'HRTF';
      humidity2PannerNode.distanceModel = 'inverse';
      humidity2PannerNode.setPosition(variable3PanningWidth, variable3PanningHeight, variable3PanningDepth); // 5m right, 5m up, 1m front

      const vpd2PannerNode = audioCtx.createPanner();
      vpd2PannerNodeRef.current = vpd2PannerNode;
      vpd2PannerNode.panningModel = 'HRTF';
      vpd2PannerNode.distanceModel = 'inverse';
      vpd2PannerNode.setPosition(variable4PanningWidth, variable4PanningHeight, variable4PanningDepth); // Centre

      const treeMeanGrowth2PannerNode = audioCtx.createPanner();
      treeMeanGrowth2PannerNodeRef.current = treeMeanGrowth2PannerNode;
      treeMeanGrowth2PannerNode.panningModel = 'HRTF';
      treeMeanGrowth2PannerNode.distanceModel = 'inverse';
      treeMeanGrowth2PannerNode.setPosition(variable5PanningWidth, variable5PanningHeight, variable5PanningDepth); // Centre

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

      displacementGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      soilMoistureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      temperatureGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      humidityGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
      vpdGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable4Volume * 0.75), audioCtx.currentTime + 0.01);
      treeMeanGrowthGainNode.gain.linearRampToValueAtTime(rescaleVolume(variable5Volume * 0.75), audioCtx.currentTime + 0.01);
      masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.9), audioCtx.currentTime + 0.01);

      displacement2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable0Volume), audioCtx.currentTime + 0.01);
      soilMoisture2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable1Volume), audioCtx.currentTime + 0.01);
      temperature2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable2Volume * 1.5), audioCtx.currentTime + 0.01);
      humidity2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable3Volume * 1.5), audioCtx.currentTime + 0.01);
      vpd2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable4Volume * 0.75), audioCtx.currentTime + 0.01);
      treeMeanGrowth2GainNode.gain.linearRampToValueAtTime(rescaleVolume(variable5Volume * 0.75), audioCtx.currentTime + 0.01);

      referenceNoteOscillator.connect(referenceNoteGainNode);

      displacementGainNode.connect(displacementMuteNode);
      soilMoistureGainNode.connect(soilMoistureMuteNode);
      temperatureGainNode.connect(temperatureMuteNode);
      humidityGainNode.connect(humidityMuteNode);
      vpdGainNode.connect(vpdMuteNode);
      treeMeanGrowthGainNode.connect(treeMeanGrowthMuteNode);
      referenceNoteGainNode.connect(referenceNoteMuteNode);

      displacement2GainNode.connect(displacement2MuteNode);
      soilMoisture2GainNode.connect(soilMoisture2MuteNode);
      temperature2GainNode.connect(temperature2MuteNode);
      humidity2GainNode.connect(humidity2MuteNode);
      vpd2GainNode.connect(vpd2MuteNode);
      treeMeanGrowth2GainNode.connect(treeMeanGrowth2MuteNode);

      displacementMuteNode.connect(displacementPannerNode);
      soilMoistureMuteNode.connect(soilMoisturePannerNode);
      temperatureMuteNode.connect(temperaturePannerNode);
      humidityMuteNode.connect(humidityPannerNode);
      vpdMuteNode.connect(vpdPannerNode);
      treeMeanGrowthMuteNode.connect(treeMeanGrowthPannerNode);
      referenceNoteMuteNode.connect(referenceNotePannerNode);

      displacement2MuteNode.connect(displacement2PannerNode);
      soilMoisture2MuteNode.connect(soilMoisture2PannerNode);
      temperature2MuteNode.connect(temperature2PannerNode);
      humidity2MuteNode.connect(humidity2PannerNode);
      vpd2MuteNode.connect(vpd2PannerNode);
      treeMeanGrowth2MuteNode.connect(treeMeanGrowth2PannerNode);
      
      referenceNotePannerNode.connect(masterVolumePannerNode);

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
    if (play) {
      const displacementPannerNode = displacementPannerNodeRef.current;
      const soilMoisturePannerNode = soilMoisturePannerNodeRef.current;
      const temperaturePannerNode = temperaturePannerNodeRef.current;
      const humidityPannerNode = humidityPannerNodeRef.current;
      const vpdPannerNode = vpdPannerNodeRef.current;
      const treeMeanGrowthPannerNode = treeMeanGrowthPannerNodeRef.current;

      const displacement2PannerNode = displacement2PannerNodeRef.current;
      const soilMoisture2PannerNode = soilMoisture2PannerNodeRef.current;
      const temperature2PannerNode = temperature2PannerNodeRef.current;
      const humidity2PannerNode = humidity2PannerNodeRef.current;
      const vpd2PannerNode = vpd2PannerNodeRef.current;
      const treeMeanGrowth2PannerNode = treeMeanGrowth2PannerNodeRef.current;

      const graph1StereoPannerNode = graph1StereoPannerNodeRef.current;
      const graph2StereoPannerNode = graph2StereoPannerNodeRef.current;
      const masterVolumePannerNode = masterVolumePannerNodeRef.current;

      try { displacementPannerNode.disconnect(masterVolumePannerNode); } catch (e) {};
      try { soilMoisturePannerNode.disconnect(masterVolumePannerNode); } catch (e) {};
      try { temperaturePannerNode.disconnect(masterVolumePannerNode); } catch (e) {};
      try { humidityPannerNode.disconnect(masterVolumePannerNode); } catch (e) {};
      try { vpdPannerNode.disconnect(masterVolumePannerNode); } catch (e) {};
      try { treeMeanGrowthPannerNode.disconnect(masterVolumePannerNode); } catch (e) {};

      try { displacementPannerNode.disconnect(graph1StereoPannerNode); } catch (e) {};
      try { soilMoisturePannerNode.disconnect(graph1StereoPannerNode); } catch (e) {};
      try { temperaturePannerNode.disconnect(graph1StereoPannerNode); } catch (e) {};
      try { humidityPannerNode.disconnect(graph1StereoPannerNode); } catch (e) {};
      try { vpdPannerNode.disconnect(graph1StereoPannerNode); } catch (e) {};
      try { treeMeanGrowthPannerNode.disconnect(graph1StereoPannerNode); } catch (e) {};

      try { displacement2PannerNode.disconnect(graph2StereoPannerNode); } catch (e) {};
      try { soilMoisture2PannerNode.disconnect(graph2StereoPannerNode); } catch (e) {};
      try { temperature2PannerNode.disconnect(graph2StereoPannerNode); } catch (e) {};
      try { humidity2PannerNode.disconnect(graph2StereoPannerNode); } catch (e) {};
      try { vpd2PannerNode.disconnect(graph2StereoPannerNode); } catch (e) {};
      try { treeMeanGrowth2PannerNode.disconnect(graph2StereoPannerNode); } catch (e) {};

      try { graph1StereoPannerNode.disconnect(masterVolumePannerNode); } catch (e) {};
      try { graph2StereoPannerNode.disconnect(masterVolumePannerNode); } catch (e) {};

      if (multiSonifications) {
        displacement2PannerNode.connect(graph2StereoPannerNode);
        soilMoisture2PannerNode.connect(graph2StereoPannerNode);
        temperature2PannerNode.connect(graph2StereoPannerNode);
        humidity2PannerNode.connect(graph2StereoPannerNode);
        vpd2PannerNode.connect(graph2StereoPannerNode);
        treeMeanGrowth2PannerNode.connect(graph2StereoPannerNode);

        graph1StereoPannerNode.connect(masterVolumePannerNode);
        graph2StereoPannerNode.connect(masterVolumePannerNode);

        displacementPannerNode.connect(graph1StereoPannerNode);
        soilMoisturePannerNode.connect(graph1StereoPannerNode);
        temperaturePannerNode.connect(graph1StereoPannerNode);
        humidityPannerNode.connect(graph1StereoPannerNode);
        vpdPannerNode.connect(graph1StereoPannerNode);
        treeMeanGrowthPannerNode.connect(graph1StereoPannerNode);

        displacement2PannerNode.connect(graph2StereoPannerNode);
        soilMoisture2PannerNode.connect(graph2StereoPannerNode);
        temperature2PannerNode.connect(graph2StereoPannerNode);
        humidity2PannerNode.connect(graph2StereoPannerNode);
        vpd2PannerNode.connect(graph2StereoPannerNode);
        treeMeanGrowth2PannerNode.connect(graph2StereoPannerNode);

        graph1StereoPannerNode.connect(masterVolumePannerNode);
        graph2StereoPannerNode.connect(masterVolumePannerNode);
      }
      else {
        displacementPannerNode.connect(masterVolumePannerNode);
        soilMoisturePannerNode.connect(masterVolumePannerNode);
        temperaturePannerNode.connect(masterVolumePannerNode);
        humidityPannerNode.connect(masterVolumePannerNode);
        vpdPannerNode.connect(masterVolumePannerNode);
        treeMeanGrowthPannerNode.connect(masterVolumePannerNode);
      }
    }
  }, [play, multiSonifications])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; 
    }
    muteSound();
  }, [mute]);

  // Do this for the second graph also (setHighlightedIndex2)
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
      setHighlightedIndex(index);
      const record = incrementalData[index];

      displacementOscillator.frequency.setValueAtTime(rescaleFrequency(0, 10, 200, 2000, record?.displacement), audioCtx.currentTime);
      soilMoistureOscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture), audioCtx.currentTime);
      temperatureOscillator.frequency.setValueAtTime(rescaleFrequency(-20, 60, 200, 2000, record?.temperature), audioCtx.currentTime);
      humidityOscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 2000, record?.humidity), audioCtx.currentTime);
      vpdOscillator.frequency.setValueAtTime(rescaleFrequency(0, 2.5, 200, 2000, record?.vpd), audioCtx.currentTime);
      treeMeanGrowthOscillator.frequency.setValueAtTime(rescaleFrequency(0.2, 0.4, 200, 2000, record?.treeMeanGrowth), audioCtx.currentTime);

      displacementSynth.releaseEnvelope();
      soilMoistureSynth.releaseEnvelope();
      temperatureSynth.releaseEnvelope();
      humiditySynth.releaseEnvelope();
      vpdSynth.releaseEnvelope();
      treeMeanGrowthSynth.releaseEnvelope();

      displacementSynth.setCarrierFrequency(rescaleFrequency(0, 10, 200, 2000, record?.displacement));
      soilMoistureSynth.setCarrierFrequency(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture));
      temperatureSynth.setCarrierFrequency(rescaleFrequency(-20, 60, 200, 2000, record?.temperature));
      humiditySynth.setCarrierFrequency(rescaleFrequency(0, 100, 200, 2000, record?.humidity));
      vpdSynth.setCarrierFrequency(rescaleFrequency(0, 2.5, 200, 2000, record?.vpd));
      treeMeanGrowthSynth.setCarrierFrequency(rescaleFrequency(0, 10, 200, 2000, record?.treeMeanGrowth));

      if(triggerEnvelope) {
        displacementSynth.triggerEnvelope();
        soilMoistureSynth.triggerEnvelope();
        temperatureSynth.triggerEnvelope();
        humiditySynth.triggerEnvelope();
        vpdSynth.triggerEnvelope();
        treeMeanGrowthSynth.triggerEnvelope();
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

      vpdSynth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      vpdSynth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      vpdSynth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      treeMeanGrowthSynth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      treeMeanGrowthSynth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      treeMeanGrowthSynth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      let activeInstruments = new Set(Object.keys(instruments)); // initial all active
      playVoices(incrementalData[index], activeInstruments, false);

      const displacementGainNode = displacementGainNodeRef.current;
      const soilMoistureGainNode = soilMoistureGainNodeRef.current;
      const temperatureGainNode = temperatureGainNodeRef.current;
      const humidityGainNode = humidityGainNodeRef.current;
      const vpdGainNode = vpdGainNodeRef.current;
      const treeMeanGrowthGainNode = treeMeanGrowthGainNodeRef.current;

      switch (variable0Instrument) {
        case 'musicChords':
          playChord(record.displacement, 0, 1, displacementGainNode);
          break;
        case 'musicMelody':
          playMelody(record.displacement, 0, 1, displacementGainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.displacement, 0, 1, displacementGainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.displacement, 0, 1, displacementGainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.displacement, 0, 1, displacementGainNode);
          break;
        default:
          break;
      };

      switch (variable1Instrument) {
        case 'musicChords':
          playChord(record.soilMoisture, 0, 100, soilMoistureGainNode);
          break;
        case 'musicMelody':
          playMelody(record.soilMoisture, 0, 100, soilMoistureGainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.soilMoisture, 0, 100, soilMoistureGainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.soilMoisture, 0, 100, soilMoistureGainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.soilMoisture, 0, 100, soilMoistureGainNode);
          break;
        default:
          break;
      };

      switch (variable2Instrument) {
        case 'musicChords':
          playChord(record.temperature, -20, 60, temperatureGainNode);
          break;
        case 'musicMelody':
          playMelody(record.temperature, -20, 60, temperatureGainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.temperature, -20, 60, temperatureGainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.temperature, -20, 60, temperatureGainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.temperature, -20, 60, temperatureGainNode);
          break;
        default:
          break;
      };

      switch (variable3Instrument) {
        case 'musicChords':
          playChord(record.humidity, 0, 100, humidityGainNode);
          break;
        case 'musicMelody':
          playMelody(record.humidity, 0, 100, humidityGainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.humidity, 0, 100, humidityGainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.humidity, 0, 100, humidityGainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.humidity, 0, 100, humidityGainNode);
          break;
        default:
          break;
      };

      switch (variable4Instrument) {
        case 'musicChords':
          playChord(record.vpd, 0, 2.5, vpdGainNode);
          break;
        case 'musicMelody':
          playMelody(record.vpd, 0, 2.5, vpdGainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.vpd, 0, 2.5, vpdGainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.vpd, 0, 2.5, vpdGainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.vpd, 0, 2.5, vpdGainNode);
          break;
        default:
          break;
      };

      switch (variable5Instrument) {
        case 'musicChords':
          playChord(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode);
          break;
        case 'musicMelody':
          playMelody(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.treeMeanGrowth, 0, 10, treeMeanGrowthGainNode);
          break;
        default:
          break;
      };
    }
  }, [play, incrementalData]);

  useEffect(() => {
    if (play && incrementalData2.length > 0) {
      const audioCtx = audioCtxRef.current;
      const displacement2Oscillator = displacement2OscillatorRef.current;
      const soilMoisture2Oscillator = soilMoisture2OscillatorRef.current;
      const temperature2Oscillator = temperature2OscillatorRef.current;
      const humidity2Oscillator = humidity2OscillatorRef.current;
      const vpd2Oscillator = vpd2OscillatorRef.current;
      const treeMeanGrowth2Oscillator = treeMeanGrowth2OscillatorRef.current;

      const displacement2Synth = displacement2SynthRef.current;
      const soilMoisture2Synth = soilMoisture2SynthRef.current;
      const temperature2Synth = temperature2SynthRef.current;
      const humidity2Synth = humidity2SynthRef.current;
      const vpd2Synth = vpd2SynthRef.current;
      const treeMeanGrowth2Synth = treeMeanGrowth2SynthRef.current;

      const index = incrementalData2.length - 1
      setHighlightedIndex2(index);
      const record = incrementalData2[index];

      displacement2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 10, 200, 2000, record?.displacement), audioCtx.currentTime);
      soilMoisture2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture), audioCtx.currentTime);
      temperature2Oscillator.frequency.setValueAtTime(rescaleFrequency(-20, 60, 200, 2000, record?.temperature), audioCtx.currentTime);
      humidity2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 100, 200, 2000, record?.humidity), audioCtx.currentTime);
      vpd2Oscillator.frequency.setValueAtTime(rescaleFrequency(0, 2.5, 200, 2000, record?.vpd), audioCtx.currentTime);
      treeMeanGrowth2Oscillator.frequency.setValueAtTime(rescaleFrequency(0.2, 0.4, 200, 2000, record?.vpd), audioCtx.currentTime);
      
      displacement2Synth.releaseEnvelope();
      soilMoisture2Synth.releaseEnvelope();
      temperature2Synth.releaseEnvelope();
      humidity2Synth.releaseEnvelope();
      vpd2Synth.releaseEnvelope();
      treeMeanGrowth2Synth.releaseEnvelope();

      displacement2Synth.setCarrierFrequency(rescaleFrequency(0, 10, 200, 2000, record?.displacement));
      soilMoisture2Synth.setCarrierFrequency(rescaleFrequency(0, 100, 200, 1000, record?.soilMoisture));
      temperature2Synth.setCarrierFrequency(rescaleFrequency(-20, 60, 200, 2000, record?.temperature));
      humidity2Synth.setCarrierFrequency(rescaleFrequency(0, 100, 200, 2000, record?.humidity));
      vpd2Synth.setCarrierFrequency(rescaleFrequency(0, 2.5, 200, 2000, record?.vpd));
      treeMeanGrowth2Synth.setCarrierFrequency(rescaleFrequency(0, 10, 200, 2000, record?.treeMeanGrowth));

      if(triggerEnvelope) {
        displacement2Synth.triggerEnvelope();
        soilMoisture2Synth.triggerEnvelope();
        temperature2Synth.triggerEnvelope();
        humidity2Synth.triggerEnvelope();
        vpd2Synth.triggerEnvelope();
        treeMeanGrowth2Synth.triggerEnvelope();
        setTriggerEnvelope(false);
      }

      displacement2Synth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      displacement2Synth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      displacement2Synth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      soilMoisture2Synth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      soilMoisture2Synth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      soilMoisture2Synth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      temperature2Synth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      temperature2Synth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      temperature2Synth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      humidity2Synth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      humidity2Synth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      humidity2Synth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      vpd2Synth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      vpd2Synth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      vpd2Synth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      treeMeanGrowth2Synth.setModulatorFrequency(rescaleFrequency(0, 100, 20, 10000, record?.soilMoisture));
      treeMeanGrowth2Synth.setHarmonicity(rescaleWholeAudioParameter(0, 10, 1, 10, record?.displacement));
      treeMeanGrowth2Synth.setModulationIndex(rescaleAudioParameter(0, 100, 0, 100, record?.humidity));

      let activeInstruments = new Set(Object.keys(instruments)); // initial all active
      playVoices(incrementalData[index], activeInstruments, true);

      const displacement2GainNode = displacement2GainNodeRef.current;
      const soilMoisture2GainNode = soilMoisture2GainNodeRef.current;
      const temperature2GainNode = temperature2GainNodeRef.current;
      const humidity2GainNode = humidity2GainNodeRef.current;
      const vpd2GainNode = vpd2GainNodeRef.current;
      const treeMeanGrowth2GainNode = treeMeanGrowth2GainNodeRef.current;

      switch (variable0Instrument) {
        case 'musicChords':
          playChord(record.displacement, 0, 1, displacement2GainNode);
          break;
        case 'musicMelody':
          playMelody(record.displacement, 0, 1, displacement2GainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.displacement, 0, 1, displacement2GainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.displacement, 0, 1, displacement2GainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.displacement, 0, 1, displacement2GainNode);
          break;
        default:
          break;
      };

      switch (variable1Instrument) {
        case 'musicChords':
          playChord(record.soilMoisture, 0, 100, soilMoisture2GainNode);
          break;
        case 'musicMelody':
          playMelody(record.soilMoisture, 0, 100, soilMoisture2GainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.soilMoisture, 0, 100, soilMoisture2GainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.soilMoisture, 0, 100, soilMoisture2GainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.soilMoisture, 0, 100, soilMoisture2GainNode);
          break;
        default:
          break;
      };

      switch (variable2Instrument) {
        case 'musicChords':
          playChord(record.temperature, -20, 60, temperature2GainNode);
          break;
        case 'musicMelody':
          playMelody(record.temperature, -20, 60, temperature2GainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.temperature, -20, 60, temperature2GainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.temperature, -20, 60, temperature2GainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.temperature, -20, 60, temperature2GainNode);
          break;
        default:
          break;
      };

      switch (variable3Instrument) {
        case 'musicChords':
          playChord(record.humidity, 0, 100, humidity2GainNode);
          break;
        case 'musicMelody':
          playMelody(record.humidity, 0, 100, humidity2GainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.humidity, 0, 100, humidity2GainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.humidity, 0, 100, humidity2GainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.humidity, 0, 100, humidity2GainNode);
          break;
        default:
          break;
      };

      switch (variable4Instrument) {
        case 'musicChords':
          playChord(record.vpd, 0, 2.5, vpd2GainNode);
          break;
        case 'musicMelody':
          playMelody(record.vpd, 0, 2.5, vpd2GainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.vpd, 0, 2.5, vpd2GainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.vpd, 0, 2.5, vpd2GainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.vpd, 0, 2.5, vpd2GainNode);
          break;
        default:
          break;
      };

      switch (variable5Instrument) {
        case 'musicChords':
          playChord(record.treeMeanGrowth, 0, 10, treeMeanGrowth2GainNode);
          break;
        case 'musicMelody':
          playMelody(record.treeMeanGrowth, 0, 10, treeMeanGrowth2GainNode);
          break;
        case 'musicCleanElectricGuitar':
          playGuitarNote(record.treeMeanGrowth, 0, 10, treeMeanGrowth2GainNode, false);
          break;
        case 'musicDistortedElectricGuitar':
          playGuitarNote(record.treeMeanGrowth, 0, 10, treeMeanGrowth2GainNode, true);
          break;
        case 'musicBassGuitar':
          playBassNote(record.treeMeanGrowth, 0, 10, treeMeanGrowth2GainNode);
          break;
        default:
          break;
      };
    }
  }, [play, incrementalData2]);

  const [volume, setVolume] = useState(100);
  const volumeSet = volume => {
    setVolume(volume);
    const audioCtx = audioCtxRef.current;
    const masterVolumeGainNode = masterVolumeGainNodeRef.current;
    masterVolumeGainNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.9), audioCtx.currentTime + 0.01);
  };

  const muteSound = () => {
    const audioCtx = audioCtxRef.current;
    const humidityGainNode = humidityGainNodeRef.current;
    humidityGainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    const humidity2GainNode = humidity2GainNodeRef.current;
    humidity2GainNode.gain.setValueAtTime(0, audioCtx.currentTime);
    const masterVolumeMuteNode = masterVolumeMuteNodeRef.current;
    if (mute) masterVolumeMuteNode.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.01);
    else masterVolumeMuteNode.gain.linearRampToValueAtTime(rescaleMasterVolume(volume * 0.9), audioCtx.currentTime + 0.01);
  };

  const stopSound = () => {
    const audioCtx = audioCtxRef.current;
    const displacementOscillator = displacementOscillatorRef.current;
    const soilMoistureOscillator = soilMoistureOscillatorRef.current;
    const temperatureOscillator = temperatureOscillatorRef.current;
    const humidityOscillator = humidityOscillatorRef.current;
    const vpdOscillator = vpdOscillatorRef.current;
    const treeMeanGrowthOscillator = treeMeanGrowthOscillatorRef.current;

    const displacement2Oscillator = displacement2OscillatorRef.current;
    const soilMoisture2Oscillator = soilMoisture2OscillatorRef.current;
    const temperature2Oscillator = temperature2OscillatorRef.current;
    const humidity2Oscillator = humidity2OscillatorRef.current;
    const vpd2Oscillator = vpd2OscillatorRef.current;
    const treeMeanGrowth2Oscillator = treeMeanGrowth2OscillatorRef.current;

    const displacementSynth = displacementSynthRef.current;
    const soilMoistureSynth = soilMoistureSynthRef.current;
    const temperatureSynth = temperatureSynthRef.current;
    const humiditySynth = humiditySynthRef.current;
    const treeMeanGrowthSynth = treeMeanGrowthSynthRef.current;

    const displacement2Synth = displacement2SynthRef.current;
    const soilMoisture2Synth = soilMoisture2SynthRef.current;
    const temperature2Synth = temperature2SynthRef.current;
    const humidity2Synth = humidity2SynthRef.current;
    const treeMeanGrowth2Synth = treeMeanGrowth2SynthRef.current;
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

      displacement2Oscillator.stop(audioCtx.currentTime + 0.25);
      soilMoisture2Oscillator.stop(audioCtx.currentTime + 0.25);
      temperature2Oscillator.stop(audioCtx.currentTime + 0.25);
      humidity2Oscillator.stop(audioCtx.currentTime + 0.25);
      vpd2Oscillator.stop(audioCtx.currentTime + 0.25);
      treeMeanGrowth2Oscillator.stop(audioCtx.currentTime + 0.25);

      displacementSynth.stop(audioCtx.currentTime + 0.25);
      soilMoistureSynth.stop(audioCtx.currentTime + 0.25);
      temperatureSynth.stop(audioCtx.currentTime + 0.25);
      humiditySynth.stop(audioCtx.currentTime + 0.25);
      treeMeanGrowthSynth.stop(audioCtx.currentTime + 0.25);

      displacement2Synth.stop(audioCtx.currentTime + 0.25);
      soilMoisture2Synth.stop(audioCtx.currentTime + 0.25);
      temperature2Synth.stop(audioCtx.currentTime + 0.25);
      humidity2Synth.stop(audioCtx.currentTime + 0.25);
      treeMeanGrowth2Synth.stop(audioCtx.currentTime + 0.25);
    }
  }

  const [visualsType, setVisualsType] = useState('lineGraph');
  const visualsTypeSelect = visualsType => {
    setVariable0Hide(false);
    setVariable1Hide(false);
    setVariable2Hide(false);
    setVariable3Hide(false);
    setVariable4Hide(false);
    setVariable5Hide(false);
    if (visualsType === 'tiledLineGraph') {
      setDataSource2Hide(false);
      setMultiSonifications(true);
    }
    else {
      setDataSource2Hide(true);
      setMultiSonifications(false);
    }
    if (visualsType === 'dials' || visualsType === 'animation') setGraphControls(false);
    else setGraphControls(true);
    if (visualsType !== 'animation') setVariableHide(false);
    else setVariableHide(true);
    setVisualsType(visualsType);
  };

  const [gridBackground, setGridBackground] = useState(true);
  const gridBackgroundSet = () => { setGridBackground(!gridBackground); };

  const graphRef = useRef();
  const graph2Ref = useRef();
  const stopOnClick = () => {
    setPlay(false);
    setPause(false);
    setStop(true);
    setInitialiseVisuals(true);
    stopSound();
    setIncrementalData([]);
    setIncrementalData2([]);
    currentIndexRef.current = 0;
    currentIndex2Ref.current = 0;
    graphRef?.current?.clearChart();
    graph2Ref?.current?.clearChart();
  };

  useEffect(() => {
    if (!initialiseVisuals) {
      stopOnClick();
    }
  }, [dataSource, dataSource2, dataRange, dataPeriod]);

  // DATA AVERAGING
  useEffect(() => {

  let values = [];

  // If dataPeriod is '0' or invalid, use full data without filtering
  if (dataPeriod === '0') {
    values = refinedDataValues;
  } else {
    const hours = Number(dataPeriod);
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
}, [dataPeriod, dataRange, refinedDataValues]);

useEffect(() => {

  let values = [];

  // If dataPeriod is '0' or invalid, use full data without filtering
  if (dataPeriod === '0') {
    values = refinedDataValues2;
  } else {
    const hours = Number(dataPeriod);
    if (isNaN(hours) || hours <= 0) {
      values = refinedDataValues2;
    } else {
      // Filter data by cutoff time (last dataPeriod hours)
      const now = Date.now();
      const cutoff = now - hours * 60 * 60 * 1000;
      values = refinedDataValues2.filter(item => {
        const timestamp = (item.timestamp instanceof Date) 
          ? item.timestamp.getTime() 
          : new Date(item.timestamp).getTime();
        return timestamp >= cutoff;
      });
    }
  }

  if (!values || values.length === 0) {
    setAveragedDataValues2([]);
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

  setAveragedDataValues2(result);
}, [dataPeriod, dataRange, refinedDataValues2]);

  const [variable0Hide, setVariable0Hide] = useState(false);
  const variable0HideOnClick = () => {
    setVariable0Hide(!variable0Hide);
    graphRef.current.toggleVariableVisibility('displacement', variable0Hide);
    graph2Ref?.current.toggleVariableVisibility('displacement', variable0Hide);
  };
  const [variable1Hide, setVariable1Hide] = useState(false);
  const variable1HideOnClick = () => {
    setVariable1Hide(!variable1Hide);
    graphRef.current.toggleVariableVisibility('soilMoisture', variable1Hide);
    graph2Ref?.current.toggleVariableVisibility('soilMoisture', variable1Hide);
  };
  const [variable2Hide, setVariable2Hide] = useState(false);
  const variable2HideOnClick = () => {
    setVariable2Hide(!variable2Hide);
    graphRef.current.toggleVariableVisibility('temperature', variable2Hide);
    graph2Ref?.current.toggleVariableVisibility('temperature', variable2Hide);
  };
  const [variable3Hide, setVariable3Hide] = useState(false);
  const variable3HideOnClick = () => {
    setVariable3Hide(!variable3Hide);
    graphRef.current.toggleVariableVisibility('humidity', variable3Hide);
    graph2Ref?.current.toggleVariableVisibility('humidity', variable3Hide);
  };
  const [variable4Hide, setVariable4Hide] = useState(false);
  const variable4HideOnClick = () => {
    setVariable4Hide(!variable4Hide);
    graphRef.current.toggleVariableVisibility('vpd', variable4Hide);
    graph2Ref?.current.toggleVariableVisibility('vpd', variable4Hide);
  };
    const [variable5Hide, setVariable5Hide] = useState(false);
  const variable5HideOnClick = () => {
    setVariable5Hide(!variable5Hide);
    graphRef.current.toggleVariableVisibility('treeMeanGrowth', variable5Hide);
    graph2Ref?.current.toggleVariableVisibility('treeMeanGrowth', variable5Hide);
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
  const { data: data2, loading: loading2 } = useRealtimeUpdates({
    apiUrl: dataSource2,
    socketPort: getSocketPort(dataSource2),
    socketName: dataSource2.replace('_', '-')
  });
  
  const currentIndexRef = useRef(0);
  const currentIndex2Ref = useRef(0);
  const intervalRef = useRef(0);
  const interval2Ref = useRef(0);
  
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
    }, remapReversed(playbackSpeed));
    return () => clearInterval(intervalRef.current);
  }, [averagedDataValues, data, pause, play, stop, playbackSpeed]);

useEffect(() => {
    if (!averagedDataValues2 || !Array.isArray(averagedDataValues2)) return;
    if (pause || stop || !play || currentIndex2Ref.current >= averagedDataValues2.length) return;
    interval2Ref.current = setInterval(() => {
      const idx = currentIndex2Ref.current;
      if (idx >= averagedDataValues2.length) {
        clearInterval(interval2Ref.current);
        return;
      }
      setIncrementalData2(prevData => [...prevData, averagedDataValues2[idx]]);
      currentIndex2Ref.current += 1; 
    }, remapReversed(playbackSpeed));
    return () => clearInterval(interval2Ref.current);
  }, [averagedDataValues2, data2, pause, play, stop, playbackSpeed]);

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
}, [dataRange, dataPeriod, data]);

useEffect(() => {
  const updatedRecords = data2.map(record => {
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
      setRefinedDataValues2([updatedRecords[updatedRecords.length - 1]]);
    } else {
      setRefinedDataValues2([]);
    }
    return;
  }
  if (dataRange === '0') {
    setRefinedDataValues2(updatedRecords);
    return;
  }
  const hours = Number(dataRange);
  if (isNaN(hours) || hours <= 0) {
    setRefinedDataValues2(updatedRecords);
    return;
  }
  const now = Date.now();
  const cutoff = now - hours * 60 * 60 * 1000; 
  setRefinedDataValues2(updatedRecords.filter(item => {
    const timestamp = (item.timestamp instanceof Date) ? item.timestamp.getTime() : new Date(item.timestamp).getTime();
    return timestamp >= cutoff;
  }));
}, [dataRange, dataPeriod, data2]);

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
  },
  {
    key: 'vpd',
    label: 'VPD'
  },
  {
    key: 'treeMeanGrowth',
    label: 'Tree Mean Growth'
  }
];

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
  },
  {
    key: 'vpd',
    color: 'purple',
    label: 'VPD',
    minValue: 0,
    maxValue: 10,
    visible: !variable4Hide
  },
  {
    key: 'treeMeanGrowth',
    color: 'brown',
    label: 'Tree Mean Growth',
    minValue: 0.2,
    maxValue: 0.4,
    visible: !variable5Hide
  }
];

const [controlsMarginBottom, setControlsMarginBottom] = useState('2rem');

useEffect(() => {
  switch (visualsType) {
    case 'lineGraph':
      setControlsMarginBottom('2rem');
      break;
    case 'tiledLineGraph':
      setControlsMarginBottom('8rem');
      break;
    case 'barChart':
      setControlsMarginBottom('2rem');
      break;
    case 'dials':
      setControlsMarginBottom('20rem');
      break;
    case 'animation':
      setControlsMarginBottom('-5rem');
      break;
    default:
      setControlsMarginBottom('2rem');
      break;
  }
}, [visualsType]);

const displayedVisuals = () => {
  switch (visualsType) {
    case 'lineGraph':
      return <SingleLineGraph ref={graphRef} data={(displayAllData) ? averagedDataValues : incrementalData} highlightedIndex={highlightedIndex} zoom={remap(graphZoom)} loading={loading} graphColourScheme={graphColourScheme} displayGridBackground={gridBackground} />
    case 'tiledLineGraph':
      return (
        <div className='d-flex flex-column'>
          <h4>{dataSource.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</h4>
          <div style={{ height: '20em', width: `${remap(graphZoom)}%`, marginBottom: '2rem' }}>
            <SingleLineGraph ref={graphRef} data={(displayAllData) ? averagedDataValues : incrementalData} highlightedIndex={highlightedIndex} zoom={remap(graphZoom)} loading={loading} graphColourScheme={graphColourScheme} displayGridBackground={gridBackground} />
          </div>
          <h4>{dataSource2.replace(/_/g, ' ').replace(/^\w/, c => c.toUpperCase())}</h4>
          <div style={{ height: '20em', width: `${remap(graphZoom)}%`, marginBottom: '2rem' }}>
            <SingleLineGraph ref={graph2Ref} data={(displayAllData) ? averagedDataValues2 : incrementalData2} highlightedIndex={highlightedIndex2} zoom={remap(graphZoom)} loading={loading2} graphColourScheme={graphColourScheme} displayGridBackground={gridBackground} />
          </div>
        </div>
      )
    case 'barChart':
      return <BarChart ref={graphRef} data={(displayAllData) ? averagedDataValues : incrementalData} avg={true} highlightedIndex={highlightedIndex} zoom={remap(graphZoom)} loading={loading} graphColourScheme={graphColourScheme} displayGridBackground={gridBackground} />
    case 'dials':
      return <Dials ref={graphRef} variables={dialVariables} data={incrementalData} highlightedIndex={highlightedIndex} loading={loading} />
    case 'animation':
      return <ForestScene ref={graphRef}  variables={sceneVariables} data={incrementalData} highlightedIndex={highlightedIndex} loading={loading} />
  }
}


  return (
    <PageLayout title='Personalised Data' help helpOnClick={helpClick} dataControls treeOnClick={treeClick} aboutOnClick={aboutClick}>
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
                : <div style={{ height: '40em', width: `${!graphControls ? '100' : remap(graphZoom)}%`, marginBottom: controlsMarginBottom }}>
                  { displayedVisuals() }
                </div>
      }
      <Controls playMode={play} playOnClick={playOnClick} pauseMode={pause} pauseOnClick={pauseOnClick} stopMode={stop} stopOnClick={stopOnClick} hideMute={hideMute} muteMode={mute} muteOnClick={muteOnClick} hideMode={hide} hideOnClick={hideOnClick} />
      <PersonalisedPresetPlaybackPanel
        endpoints={endpoints}
        dataRange={dataRange}
        dataRangeSet={dataRangeSet}
        averagingPeriod={dataPeriod}
        averagingPeriodSet={dataPeriodSet}
        playbackSpeed={playbackSpeed}
        playbackSpeedSet={playbackSpeedSet}
        dataSource={dataSource}
        dataSourceSet={dataSourceSet}
        dataSource2Hide={dataSource2Hide}
        dataSource2={dataSource2}
        dataSourceSet2={dataSourceSet2}
      />
      <PersonalisedPresetSoundPanel 
        derivedData={true}
        hideMute={hideMute}
        volume={volume}
        setVolume={volumeSet}
        width={masterPanningWidth}
        setWidth={masterPanningWidthSet}
        height={masterPanningHeight}
        setHeight={masterPanningHeightSet}
        depth={masterPanningDepth}
        setDepth={masterPanningDepthSet}
        variable0Instrument={variable0Instrument}
        variable0InstrumentSelect={variable0InstrumentSelect}
        variable0Volume={variable0Volume}
        variable0SetVolume={variable0SetVolume}
        variable0MuteMode={variable0Mute}
        variable0MuteOnClick={variable0MuteOnClick}
        variable0Width={variable0PanningWidth}
        variable0SetWidth={variable0PanningWidthSet}
        variable0Height={variable0PanningHeight}
        variable0SetHeight={variable0PanningHeightSet}
        variable0Depth={variable0PanningDepth}
        variable0SetDepth={variable0PanningDepthSet}
        variable1Instrument={variable1Instrument}
        variable1InstrumentSelect={variable1InstrumentSelect}
        variable1Volume={variable1Volume}
        variable1SetVolume={variable1SetVolume}
        variable1MuteMode={variable1Mute}
        variable1MuteOnClick={variable1MuteOnClick}
        variable1Width={variable1PanningWidth}
        variable1SetWidth={variable1PanningWidthSet}
        variable1Height={variable1PanningHeight}
        variable1SetHeight={variable1PanningHeightSet}
        variable1Depth={variable1PanningDepth}
        variable1SetDepth={variable1PanningDepthSet}
        variable2Instrument={variable2Instrument}
        variable2InstrumentSelect={variable2InstrumentSelect}
        variable2Volume={variable2Volume}
        variable2SetVolume={variable2SetVolume}
        variable2MuteMode={variable2Mute}
        variable2MuteOnClick={variable2MuteOnClick}
        variable2Width={variable2PanningWidth}
        variable2SetWidth={variable2PanningWidthSet}
        variable2Height={variable2PanningHeight}
        variable2SetHeight={variable2PanningHeightSet}
        variable2Depth={variable2PanningDepth}
        variable2SetDepth={variable2PanningDepthSet}
        variable3Instrument={variable3Instrument}
        variable3InstrumentSelect={variable3InstrumentSelect}
        variable3Volume={variable3Volume}
        variable3SetVolume={variable3SetVolume}
        variable3MuteMode={variable3Mute}
        variable3MuteOnClick={variable3MuteOnClick}
        variable3Width={variable3PanningWidth}
        variable3SetWidth={variable3PanningWidthSet}
        variable3Height={variable3PanningHeight}
        variable3SetHeight={variable3PanningHeightSet}
        variable3Depth={variable3PanningDepth}
        variable3SetDepth={variable3PanningDepthSet}
        variable4Instrument={variable4Instrument}
        variable4InstrumentSelect={variable4InstrumentSelect}
        variable4Volume={variable4Volume}
        variable4SetVolume={variable4SetVolume}
        variable4MuteMode={variable4Mute}
        variable4MuteOnClick={variable4MuteOnClick}
        variable4Width={variable4PanningWidth}
        variable4SetWidth={variable4PanningWidthSet}
        variable4Height={variable4PanningHeight}
        variable4SetHeight={variable4PanningHeightSet}
        variable4Depth={variable4PanningDepth}
        variable4SetDepth={variable4PanningDepthSet}
        variable5Instrument={variable5Instrument}
        variable5InstrumentSelect={variable5InstrumentSelect}
        variable5Volume={variable5Volume}
        variable5SetVolume={variable5SetVolume}
        variable5MuteMode={variable5Mute}
        variable5MuteOnClick={variable5MuteOnClick}
        variable5Width={variable5PanningWidth}
        variable5SetWidth={variable5PanningWidthSet}
        variable5Height={variable5PanningHeight}
        variable5SetHeight={variable5PanningHeightSet}
        variable5Depth={variable5PanningDepth}
        variable5SetDepth={variable5PanningDepthSet}
      />
      <PersonalisedPresetVisualsPanel 
        derivedData={true}
        variableHide={variableHide}
        graphControls={graphControls}
        gridBackground={gridBackground}
        gridBackgroundSet={gridBackgroundSet}
        displayAllGraphData={displayAllData}
        displayAllGraphDataSet={displayAllDataSet}
        visuals={visualsType}
        visualsSelect={visualsTypeSelect}
        zoom={graphZoom}
        zoomSet={graphZoomSet}
        graphColourScheme={graphColourScheme}
        graphColourSchemeSelect={graphColourSchemeSet}
        variable0HideMode={variable0Hide}
        variable0HideOnClick={variable0HideOnClick}
        variable1HideMode={variable1Hide}
        variable1HideOnClick={variable1HideOnClick}
        variable2HideMode={variable2Hide}
        variable2HideOnClick={variable2HideOnClick}
        variable3HideMode={variable3Hide}
        variable3HideOnClick={variable3HideOnClick}
        variable4HideMode={variable4Hide}
        variable4HideOnClick={variable4HideOnClick}
        variable5HideMode={variable5Hide}
        variable5HideOnClick={variable5HideOnClick}
      />
      {
        (dataSource === 'northern_1') ? <TreeN1Modal modalName='tree' /> : (dataSource === 'northern_2') ? <TreeN2Modal modalName='tree' /> : <TreeAnonModal modalName='tree' />
      }
      <AboutPersonalisedDataModal 
        modalName='about'
      />
      <PersonalisedDataHelpModal
        modalName='help'
        helpNavigate={helpNavigateClick}
      />
    </PageLayout>
  )
}