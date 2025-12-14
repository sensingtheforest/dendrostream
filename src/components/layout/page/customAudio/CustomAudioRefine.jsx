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

export default function CustomAudioRefine({ endpoints={} }) {
  const navigate = useNavigate();

  // { value: 'droneSine', title: 'Drone - Sine Wave' },
  // { value: 'droneTriangle', title: 'Drone - Triangle Wave' },
  // { value: 'droneSawtooth', title: 'Drone - Sawtooth Wave' },
  // { value: 'fmSynthSine', title: 'FM Synthesis - Sine Wave' },
  // { value: 'instrumentPiano', title: 'Instrument - Piano' },
  // { value: 'instrumentPluckedGuitar', title: 'Instrument - Plucked Guitar' },
  // { value: 'instrumentLeadSynth', title: 'Instrument - Lead Synthesiser' },
  // { value: 'instrumentFlute', title: 'Instrument - Flute' },
  // { value: 'instrumentPercussion', title: 'Instrument - Percussion' },
  // { value: 'musicChords', title: 'Music Chords - Triangle Wave Synthesiser' },
  // { value: 'musicMelody', title: 'Music Melody - Triangle Wave Synthesiser' },
  // { value: 'musicCleanElectricGuitar', title: 'Music Melody - Clean Electric Guitar' },
  // { value: 'musicDistortedElectricGuitar', title: 'Music Melody - Distorted Electric Guitar' },
  // { value: 'musicBassGuitar', title: 'Music Bassline - Bass Guitar' }

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
    setVariable5InstrumentOptions
  } = useCustomAudio();
  
    const variable0InstrumentCarrierWaveformTypeSelect = carrierWaveformType => { setVariable0InstrumentOptions(prev => ({ ...prev, carrierWaveformType: carrierWaveformType })); };
    const variable0InstrumentModulatorWaveformTypeSelect = modulatorWaveformType => { setVariable0InstrumentOptions(prev => ({ ...prev, modulatorWaveformType: modulatorWaveformType })); };
    const variable1InstrumentCarrierWaveformTypeSelect = carrierWaveformType => { setVariable1InstrumentOptions(prev => ({ ...prev, carrierWaveformType: carrierWaveformType })); };
    const variable1InstrumentModulatorWaveformTypeSelect = modulatorWaveformType => { setVariable1InstrumentOptions(prev => ({ ...prev, modulatorWaveformType: modulatorWaveformType })); };
    const variable2InstrumentCarrierWaveformTypeSelect = carrierWaveformType => { setVariable2InstrumentOptions(prev => ({ ...prev, carrierWaveformType: carrierWaveformType })); };
    const variable2InstrumentModulatorWaveformTypeSelect = modulatorWaveformType => { setVariable2InstrumentOptions(prev => ({ ...prev, modulatorWaveformType: modulatorWaveformType })); };
    const variable3InstrumentCarrierWaveformTypeSelect = carrierWaveformType => { setVariable3InstrumentOptions(prev => ({ ...prev, carrierWaveformType: carrierWaveformType })); };
    const variable3InstrumentModulatorWaveformTypeSelect = modulatorWaveformType => { setVariable3InstrumentOptions(prev => ({ ...prev, modulatorWaveformType: modulatorWaveformType })); };
    const variable4InstrumentCarrierWaveformTypeSelect = carrierWaveformType => { setVariable4InstrumentOptions(prev => ({ ...prev, carrierWaveformType: carrierWaveformType })); };
    const variable4InstrumentModulatorWaveformTypeSelect = modulatorWaveformType => { setVariable4InstrumentOptions(prev => ({ ...prev, modulatorWaveformType: modulatorWaveformType })); };
    const variable5InstrumentCarrierWaveformTypeSelect = carrierWaveformType => { setVariable5InstrumentOptions(prev => ({ ...prev, carrierWaveformType: carrierWaveformType })); };
    const variable5InstrumentModulatorWaveformTypeSelect = modulatorWaveformType => { setVariable5InstrumentOptions(prev => ({ ...prev, modulatorWaveformType: modulatorWaveformType })); };
  

  const waveformTypeOptions = [
    { value: 'sine', title: 'Sine Wave' },
    { value: 'triangle', title: 'Triangle Wave' },
    { value: 'square', title: 'Square Wave' },
    { value: 'sawtooth', title: 'Sawtooth Wave' }
  ]

  const titleCase = str => 
    (str === 'fmSynth') ? 'FM Synth' : str
    .replace(/([a-z])([A-Z])/g, '$1 $2')     // Split before capitals (camelCase to spaced)
    .replace(/[_\-]+/g, ' ')                 // Replace underscores/hyphens with spaces
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case


  return (
    <PageLayout title='Custom Audio - Refine'>
      <DropdownSonifierStepper selected='refine' />
      <div className='p-5'>
        <h4>Refine the selected sounds or instruments, to customise their sound:</h4>
      </div>
      <div className=''>
        {
          (variable0InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement: {titleCase(variable0InstrumentOptions.instrument)}</h4>
              {
                (variable0InstrumentOptions.instrument === 'drone' || variable0InstrumentOptions.instrument === 'fmSynth' || variable0InstrumentOptions.instrument === 'leadSynth' || variable0InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{(variable0InstrumentOptions.instrument === 'drone') ? 'Drone' : 'Carrier'} Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable0InstrumentOptions.carrierWaveformType}
                            onSelect={variable0InstrumentCarrierWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Modulator Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable0InstrumentOptions.modulatorWaveformType}
                            onSelect={variable0InstrumentModulatorWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument !== 'drone' && variable0InstrumentOptions.instrument !== 'fmSynth' && variable0InstrumentOptions.instrument !== 'leadSynth' && variable0InstrumentOptions.instrument !== 'synth')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
        {
          (variable1InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture: {titleCase(variable1InstrumentOptions.instrument)}</h4>
              {
                (variable1InstrumentOptions.instrument === 'drone' || variable1InstrumentOptions.instrument === 'fmSynth' || variable1InstrumentOptions.instrument === 'leadSynth' || variable1InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{(variable1InstrumentOptions.instrument === 'drone') ? 'Drone' : 'Carrier'} Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable1InstrumentOptions.carrierWaveformType}
                            onSelect={variable1InstrumentCarrierWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Modulator Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable1InstrumentOptions.modulatorWaveformType}
                            onSelect={variable1InstrumentModulatorWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument !== 'drone' && variable1InstrumentOptions.instrument !== 'fmSynth' && variable1InstrumentOptions.instrument !== 'leadSynth' && variable1InstrumentOptions.instrument !== 'synth')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
        {
          (variable2InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature: {titleCase(variable2InstrumentOptions.instrument)}</h4>
              {
                (variable2InstrumentOptions.instrument === 'drone' || variable2InstrumentOptions.instrument === 'fmSynth' || variable2InstrumentOptions.instrument === 'leadSynth' || variable2InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{(variable2InstrumentOptions.instrument === 'drone') ? 'Drone' : 'Carrier'} Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable2InstrumentOptions.carrierWaveformType}
                            onSelect={variable2InstrumentCarrierWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Modulator Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable3InstrumentOptions.modulatorWaveformType}
                            onSelect={variable2InstrumentModulatorWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument !== 'drone' && variable2InstrumentOptions.instrument !== 'fmSynth' && variable2InstrumentOptions.instrument !== 'leadSynth' && variable2InstrumentOptions.instrument !== 'synth')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
        {
          (variable3InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity: {titleCase(variable3InstrumentOptions.instrument)}</h4>
              {
                (variable3InstrumentOptions.instrument === 'drone' || variable3InstrumentOptions.instrument === 'fmSynth' || variable3InstrumentOptions.instrument === 'leadSynth' || variable3InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{(variable3InstrumentOptions.instrument === 'drone') ? 'Drone' : 'Carrier'} Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable3InstrumentOptions.carrierWaveformType}
                            onSelect={variable3InstrumentCarrierWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Modulator Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable3InstrumentOptions.modulatorWaveformType}
                            onSelect={variable3InstrumentModulatorWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument !== 'drone' && variable3InstrumentOptions.instrument !== 'fmSynth' && variable3InstrumentOptions.instrument !== 'leadSynth' && variable3InstrumentOptions.instrument !== 'synth')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
        {
          (variable4InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Vapour Pressure Deficit (VPD): {titleCase(variable4InstrumentOptions.instrument)}</h4>
              {
                (variable4InstrumentOptions.instrument === 'drone' || variable4InstrumentOptions.instrument === 'fmSynth' || variable4InstrumentOptions.instrument === 'leadSynth' || variable4InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{(variable4InstrumentOptions.instrument === 'drone') ? 'Drone' : 'Carrier'} Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable4InstrumentOptions.carrierWaveformType}
                            onSelect={variable4InstrumentCarrierWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Modulator Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable4InstrumentOptions.modulatorWaveformType}
                            onSelect={variable4InstrumentModulatorWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument !== 'drone' && variable4InstrumentOptions.instrument !== 'fmSynth' && variable4InstrumentOptions.instrument !== 'leadSynth' && variable4InstrumentOptions.instrument !== 'synth')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
        {
          (variable5InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth: {titleCase(variable5InstrumentOptions.instrument)}</h4>
              {
                (variable5InstrumentOptions.instrument === 'drone' || variable5InstrumentOptions.instrument === 'fmSynth' || variable5InstrumentOptions.instrument === 'leadSynth' || variable5InstrumentOptions.instrument === 'synth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{(variable5InstrumentOptions.instrument === 'drone') ? 'Drone' : 'Carrier'} Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable5InstrumentOptions.carrierWaveformType}
                            onSelect={variable5InstrumentCarrierWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Modulator Waveform Type</h4>
                        <Dropdown 
                            options={waveformTypeOptions}
                            selectedOption={setVariable5InstrumentOptions.modulatorWaveformType}
                            onSelect={variable5InstrumentModulatorWaveformTypeSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument !== 'drone' && variable5InstrumentOptions.instrument !== 'fmSynth' && variable5InstrumentOptions.instrument !== 'leadSynth' && variable5InstrumentOptions.instrument !== 'synth')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/sounds')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/tone')} hasTitle title='Next' />
      </div>

{/* THE INSTRUMENT/SOUND ENHANCEMENT SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}