import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css'

import Home from './components/layout/page/home/Home'
import Acknowledgements from './components/layout/page/Acknowledgements';

import PrimaryDataMenu from './components/layout/page/primaryData/PrimaryDataMenu';
import PrimaryDataPreset1 from './components/layout/page/primaryData/PrimaryDataPreset1';
import PrimaryDataPreset2 from './components/layout/page/primaryData/PrimaryDataPreset2';
import PrimaryDataPreset3 from './components/layout/page/primaryData/PrimaryDataPreset3';
import PrimaryDataPreset4 from './components/layout/page/primaryData/PrimaryDataPreset4';
import PrimaryDataPreset5 from './components/layout/page/primaryData/PrimaryDataPreset5';

import DerivedDataMenu from './components/layout/page/derivedData/DerivedDataMenu';
import DerivedDataPreset1 from './components/layout/page/derivedData/DerivedDataPreset1';
import DerivedDataPreset2 from './components/layout/page/derivedData/DerivedDataPreset2';
import DerivedDataPreset3 from './components/layout/page/derivedData/DerivedDataPreset3';
import DerivedDataPreset4 from './components/layout/page/derivedData/DerivedDataPreset4';
import DerivedDataPreset5 from './components/layout/page/derivedData/DerivedDataPreset5';

import PersonalisedData from './components/layout/page/personalisedData/PersonalisedData';

import CustomAudio from './components/layout/page/customAudio/CustomAudio';
import CustomAudioSounds from './components/layout/page/customAudio/CustomAudioSounds';
import CustomAudioRefine from './components/layout/page/customAudio/CustomAudioRefine';
import CustomAudioTone from './components/layout/page/customAudio/CustomAudioTone';
import CustomAudioBeat from './components/layout/page/customAudio/CustomAudioBeat';
import CustomAudioPitch from './components/layout/page/customAudio/CustomAudioPitch';
import CustomAudioLayers from './components/layout/page/customAudio/CustomAudioLayers';
import CustomAudioEffects from './components/layout/page/customAudio/CustomAudioEffects';
import CustomAudioDone from './components/layout/page/customAudio/CustomAudioDone';

import SourceData from './components/layout/page/sourceData/SourceData';

import About from './components/layout/page/about/About';
import AboutProject from './components/layout/page/about/AboutProject';
import AboutTrees from './components/layout/page/about/AboutTrees';
import AboutTreeTalkerDevices from './components/layout/page/about/AboutTreeTalkerDevices';
import AboutSensorDataValues from './components/layout/page/about/AboutSensorDataValues';
import AboutTeam from './components/layout/page/about/AboutTeam';

import Help from './components/layout/page/help/Help';
import PrimaryDataHelp from './components/layout/page/help/primaryData/PrimaryDataHelp';
import PrimaryDataHelpPreset1 from './components/layout/page/help/primaryData/PrimaryDataHelpPreset1';
import PrimaryDataHelpPreset2 from './components/layout/page/help/primaryData/PrimaryDataHelpPreset2';
import PrimaryDataHelpPreset3 from './components/layout/page/help/primaryData/PrimaryDataHelpPreset3';
import PrimaryDataHelpPreset4 from './components/layout/page/help/primaryData/PrimaryDataHelpPreset4';
import PrimaryDataHelpPreset5 from './components/layout/page/help/primaryData/PrimaryDataHelpPreset5';
import DerivedDataHelp from './components/layout/page/help/derivedData/DerivedDataHelp';
import DerivedDataHelpPreset1 from './components/layout/page/help/derivedData/DerivedDataHelpPreset1';
import DerivedDataHelpPreset2 from './components/layout/page/help/derivedData/DerivedDataHelpPreset2';
import DerivedDataHelpPreset3 from './components/layout/page/help/derivedData/DerivedDataHelpPreset3';
import DerivedDataHelpPreset4 from './components/layout/page/help/derivedData/DerivedDataHelpPreset4';
import DerivedDataHelpPreset5 from './components/layout/page/help/derivedData/DerivedDataHelpPreset5';
import HelpPersonalisedData from './components/layout/page/help/personalisedData/HelpPersonalisedData';
import HelpContactUs from './components/layout/page/help/HelpContactUs';
import { EndpointProvider } from './components/context/EndpointContext';
import { useEndpoints } from './components/context/EndpointContext';
import { CustomAudioProvider } from './components/context/CustomAudioContext';

function App() {
  

  return (
    <BrowserRouter>
      <EndpointProvider>
        <CustomAudioProvider>
          <AppRoutes />
        </CustomAudioProvider>
      </EndpointProvider>
    </BrowserRouter>
  )
}

function AppRoutes() {
  const endpoints = useEndpoints();

  return (
    <Routes>
      <Route exact path='/' element={<Home />} />
      <Route exact path='/acknowledgements' element={<Acknowledgements />} />

      <Route exact path='/primary-data' element={<PrimaryDataMenu />} />
      <Route exact path='/primary-data/preset-1' element={<PrimaryDataPreset1 endpoints={endpoints} />} />
      <Route exact path='/primary-data/preset-2' element={<PrimaryDataPreset2 endpoints={endpoints} />} />
      <Route exact path='/primary-data/preset-3' element={<PrimaryDataPreset3 endpoints={endpoints} />} />
      <Route exact path='/primary-data/preset-4' element={<PrimaryDataPreset4 endpoints={endpoints} />} />
      <Route exact path='/primary-data/preset-5' element={<PrimaryDataPreset5 endpoints={endpoints} />} />

      <Route exact path='/derived-data' element={<DerivedDataMenu />} />
      <Route exact path='/derived-data/preset-1' element={<DerivedDataPreset1 endpoints={endpoints} />} />
      <Route exact path='/derived-data/preset-2' element={<DerivedDataPreset2 endpoints={endpoints} />} />
      <Route exact path='/derived-data/preset-3' element={<DerivedDataPreset3 endpoints={endpoints} />} />
      <Route exact path='/derived-data/preset-4' element={<DerivedDataPreset4 endpoints={endpoints} />} />
      <Route exact path='/derived-data/preset-5' element={<DerivedDataPreset5 endpoints={endpoints} />} />

      <Route exact path='/personalised-data' element={<PersonalisedData endpoints={endpoints} />} />

      <Route exact path='/custom-audio' element={<CustomAudio endpoints={endpoints} />} />
      <Route exact path='/custom-audio/sounds' element={<CustomAudioSounds endpoints={endpoints} />} />
      <Route exact path='/custom-audio/refine' element={<CustomAudioRefine endpoints={endpoints} />} />
      <Route exact path='/custom-audio/tone' element={<CustomAudioTone endpoints={endpoints} />} />
      <Route exact path='/custom-audio/beat' element={<CustomAudioBeat endpoints={endpoints} />} />
      <Route exact path='/custom-audio/pitch' element={<CustomAudioPitch endpoints={endpoints} />} />
      <Route exact path='/custom-audio/layers' element={<CustomAudioLayers endpoints={endpoints} />} />
      <Route exact path='/custom-audio/effects' element={<CustomAudioEffects endpoints={endpoints} />} />
      <Route exact path='/custom-audio/done' element={<CustomAudioDone endpoints={endpoints} />} />

      <Route exact path='/source-data' element={<SourceData />} />

      <Route exact path='/about' element={<About />} />
      <Route exact path='/about/project' element={<AboutProject />} />
      <Route exact path='/about/trees' element={<AboutTrees />} />
      <Route exact path='/about/tree-talker-devices' element={<AboutTreeTalkerDevices />} />
      <Route exact path='/about/sensor-data-values' element={<AboutSensorDataValues />} />
      <Route exact path='/about/team' element={<AboutTeam />} />

      <Route exact path='/help' element={<Help />} />
      <Route exact path='/help/primary-data' element={<PrimaryDataHelp />} />
      <Route exact path='/help/primary-data/preset-1' element={<PrimaryDataHelpPreset1 />} />
      <Route exact path='/help/primary-data/preset-2' element={<PrimaryDataHelpPreset2 />} />
      <Route exact path='/help/primary-data/preset-3' element={<PrimaryDataHelpPreset3 />} />
      <Route exact path='/help/primary-data/preset-4' element={<PrimaryDataHelpPreset4 />} />
      <Route exact path='/help/primary-data/preset-5' element={<PrimaryDataHelpPreset5 />} />
      <Route exact path='/help/derived-data' element={<DerivedDataHelp />} />
      <Route exact path='/help/derived-data/preset-1' element={<DerivedDataHelpPreset1 />} />
      <Route exact path='/help/derived-data/preset-2' element={<DerivedDataHelpPreset2 />} />
      <Route exact path='/help/derived-data/preset-3' element={<DerivedDataHelpPreset3 />} />
      <Route exact path='/help/derived-data/preset-4' element={<DerivedDataHelpPreset4 />} />
      <Route exact path='/help/derived-data/preset-5' element={<DerivedDataHelpPreset5 />} />
      <Route exact path='/help/personalised-data' element={<HelpPersonalisedData />} />
      <Route exact path='/help/contact-us' element={<HelpContactUs />} />
    </Routes>
  )
}

export default App
