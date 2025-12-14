import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DropdownSonifierStepper from '../../../ui/stepper/DropdownSonifierStepper';
import CustomSlider from '../../../ui/slider/CustomSlider';
import Dropdown from '../../../ui/dropdown/Dropdown';
import RangeSlider from '../../../ui/slider/RangeSlider';
import { useCustomAudio } from '../../../context/CustomAudioContext';

export default function CustomAudioLayers({ endpoints={} }) {
  const navigate = useNavigate();

  const titleCase = str => 
    (str === 'fmSynth') ? 'FM Synth' : str
    .replace(/([a-z])([A-Z])/g, '$1 $2')     // Split before capitals (camelCase to spaced)
    .replace(/[_\-]+/g, ' ')                 // Replace underscores/hyphens with spaces
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case

  const binaryOptions = [
    { value: 'on', title: 'On' },
    { value: 'off', title: 'Off' }
  ];

  const playingRoleOptions = [
    { value: 'melody', title: 'Melody' },
    { value: 'chords', title: 'Chords' }
  ];

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

  const drumsSelect = drums => { setPlaybackOptions(prev => ({ ...prev, drums: drums })); };
  const ambientSoundsSelect = ambientSounds => { setPlaybackOptions(prev => ({ ...prev, ambientSounds: ambientSounds })); };
  const variable0InstrumentPlayingRoleSelect = playingRole => { setVariable0InstrumentOptions(prev => ({ ...prev, playingRole: playingRole })); };
  const variable1InstrumentPlayingRoleSelect = playingRole => { setVariable1InstrumentOptions(prev => ({ ...prev, playingRole: playingRole })); };
  const variable2InstrumentPlayingRoleSelect = playingRole => { setVariable2InstrumentOptions(prev => ({ ...prev, playingRole: playingRole })); };
  const variable3InstrumentPlayingRoleSelect = playingRole => { setVariable3InstrumentOptions(prev => ({ ...prev, playingRole: playingRole })); };
  const variable4InstrumentPlayingRoleSelect = playingRole => { setVariable4InstrumentOptions(prev => ({ ...prev, playingRole: playingRole })); };
  const variable5InstrumentPlayingRoleSelect = playingRole => { setVariable5InstrumentOptions(prev => ({ ...prev, playingRole: playingRole })); };


  return (
    <PageLayout title='Custom Audio - Layers'>
      <DropdownSonifierStepper selected='layers' />
      <div className='p-5'>
        <h4>Customise the layers of the selected sounds or instruments:</h4>
      </div>
      <div className=''>
        {/* <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Additional Layers</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Drums</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.drums}
                  onSelect={drumsSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Ambient Sounds</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.ambientSounds}
                  onSelect={ambientSoundsSelect}
              />
          </div>
        </div> */}
        {
          (variable0InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement: {titleCase(variable0InstrumentOptions.instrument)}</h4>
              {
                (variable0InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playing Role</h4>
                        <Dropdown 
                          options={playingRoleOptions}
                          selectedOption={variable0InstrumentOptions.playingRole}
                          onSelect={variable0InstrumentPlayingRoleSelect}
                        />
                    </div>
                  </div>
                ) : <h4 className='m-5'>No playing role options available.</h4> 
              }
            </>
          )
        }
        {
          (variable1InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture: {titleCase(variable1InstrumentOptions.instrument)}</h4>
              {
                (variable1InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playing Role</h4>
                        <Dropdown 
                          options={playingRoleOptions}
                          selectedOption={variable1InstrumentOptions.playingRole}
                          onSelect={variable1InstrumentPlayingRoleSelect}
                        />
                    </div>
                  </div>
                ) : <h4 className='m-5'>No playing role options available.</h4> 
              }
            </>
          )
        }
        {
          (variable2InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature: {titleCase(variable2InstrumentOptions.instrument)}</h4>
              {
                (variable2InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playing Role</h4>
                        <Dropdown 
                          options={playingRoleOptions}
                          selectedOption={variable2InstrumentOptions.playingRole}
                          onSelect={variable2InstrumentPlayingRoleSelect}
                        />
                    </div>
                  </div>
                ) : <h4 className='m-5'>No playing role options available.</h4> 
              }
            </>
          )
        }
        {
          (variable3InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity: {titleCase(variable3InstrumentOptions.instrument)}</h4>
              {
                (variable3InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playing Role</h4>
                        <Dropdown 
                          options={playingRoleOptions}
                          selectedOption={variable3InstrumentOptions.playingRole}
                          onSelect={variable3InstrumentPlayingRoleSelect}
                        />
                    </div>
                  </div>
                ) : <h4 className='m-5'>No playing role options available.</h4> 
              }
            </>
          )
        }
        {
          (variable4InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Vapour Pressure Deficit (VPD): {titleCase(variable4InstrumentOptions.instrument)}</h4>
              {
                (variable4InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playing Role</h4>
                        <Dropdown 
                          options={playingRoleOptions}
                          selectedOption={variable4InstrumentOptions.playingRole}
                          onSelect={variable4InstrumentPlayingRoleSelect}
                        />
                    </div>
                  </div>
                ) : <h4 className='m-5'>No playing role options available.</h4> 
              }
            </>
          )
        }
        {
          (variable5InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth: {titleCase(variable5InstrumentOptions.instrument)}</h4>
              {
                (variable5InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playing Role</h4>
                        <Dropdown 
                          options={playingRoleOptions}
                          selectedOption={variable5InstrumentOptions.playingRole}
                          onSelect={variable5InstrumentPlayingRoleSelect}
                        />
                    </div>
                  </div>
                ) : <h4 className='m-5'>No playing role options available.</h4> 
              }
            </>
          )
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/pitch')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/effects')} hasTitle title='Next' />
      </div>

{/* THE CHORDS/DRUMS SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}