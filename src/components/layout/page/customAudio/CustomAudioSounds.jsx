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

export default function CustomAudioSounds({ endpoints={} }) {
  const navigate = useNavigate();

  const instrumentOptions = [
    { value: 'none', title: 'None' },
    { value: 'drone', title: 'Drone' },
    { value: 'fmSynth', title: 'FM Synthesis' },
    { value: 'piano', title: 'Piano' },
    { value: 'pluckedGuitar', title: 'Plucked Guitar' },
    { value: 'leadSynth', title: 'Lead Synthesiser' },
    { value: 'flute', title: 'Flute' },
    { value: 'percussion', title: 'Percussion' },
    { value: 'synth', title: 'Synthesiser' },
    { value: 'electricGuitar', title: 'Electric Guitar' },
    { value: 'bassGuitar', title: 'Bass Guitar' }
  ];

  // { value: 'synthesiser', title: 'Music Chords - Triangle Wave Synthesiser' },
  // { value: 'electricGuitar', title: 'Music Melody - Clean Electric Guitar' },
  // { value: 'bassGuitar', title: 'Music Bassline - Bass Guitar' }

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
  } = useCustomAudio();

  const variable0InstrumentSelect = instrument => { setVariable0InstrumentOptions(prev => ({ ...prev, instrument: instrument })); };
  const variable1InstrumentSelect = instrument => { setVariable1InstrumentOptions(prev => ({ ...prev, instrument: instrument })); };
  const variable2InstrumentSelect = instrument => { setVariable2InstrumentOptions(prev => ({ ...prev, instrument: instrument })); };
  const variable3InstrumentSelect = instrument => { setVariable3InstrumentOptions(prev => ({ ...prev, instrument: instrument })); };
  const variable4InstrumentSelect = instrument => { setVariable4InstrumentOptions(prev => ({ ...prev, instrument: instrument })); };
  const variable5InstrumentSelect = instrument => { setVariable5InstrumentOptions(prev => ({ ...prev, instrument: instrument })); };

  return (
    <PageLayout title='Custom Audio - Sounds'>
      <DropdownSonifierStepper selected='sounds' />
      <div className='p-5'>
        <h4>Choose the sounds or instruments to sonify the data variables using:</h4>
      </div>
      <div className=''>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
              <Dropdown 
                  options={instrumentOptions}
                  selectedOption={variable0InstrumentOptions.instrument}
                  onSelect={variable0InstrumentSelect}
              />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
              <Dropdown 
                  options={instrumentOptions}
                  selectedOption={variable1InstrumentOptions.instrument}
                  onSelect={variable1InstrumentSelect}
              />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
              <Dropdown 
                  options={instrumentOptions}
                  selectedOption={variable2InstrumentOptions.instrument}
                  onSelect={variable2InstrumentSelect}
              />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
              <Dropdown 
                  options={instrumentOptions}
                  selectedOption={variable3InstrumentOptions.instrument}
                  onSelect={variable3InstrumentSelect}
              />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Vapour Pressure Deficit (VPD)</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
              <Dropdown 
                  options={instrumentOptions}
                  selectedOption={variable4InstrumentOptions.instrument}
                  onSelect={variable4InstrumentSelect}
              />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
              <Dropdown 
                  options={instrumentOptions}
                  selectedOption={variable5InstrumentOptions.instrument}
                  onSelect={variable5InstrumentSelect}
              />
          </div>
        </div>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/refine')} hasTitle title='Next' />
      </div>

{/* THE INSTRUMENT/SOUND SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}