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

export default function CustomAudioTone({ endpoints={} }) {
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

  const electricGuitarToneOptions = [
    { value: 'clean', title: 'Clean' },
    { value: 'distorted', title: 'Distorted' }
  ];

  const titleCase = str => 
    (str === 'fmSynth') ? 'FM Synth' : str
    .replace(/([a-z])([A-Z])/g, '$1 $2')     // Split before capitals (camelCase to spaced)
    .replace(/[_\-]+/g, ' ')                 // Replace underscores/hyphens with spaces
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case

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

    const variable0InstrumentModulationFrequencySet = modulationFrequency => { setVariable0InstrumentOptions(prev => ({ ...prev, modulationFrequency: modulationFrequency })); };
    const variable0InstrumentHarmonicitySet = harmonicity => { setVariable0InstrumentOptions(prev => ({ ...prev, harmonicity: harmonicity })); };
    const variable0InstrumentModulationIndexSet = modulationIndex => { setVariable0InstrumentOptions(prev => ({ ...prev, modulationIndex: modulationIndex })); };
    const variable0InstrumentAttackSet = attack => { setVariable0InstrumentOptions(prev => ({ ...prev, attack: attack })); };
    const variable0InstrumentDecaySet = decay => { setVariable0InstrumentOptions(prev => ({ ...prev, decay: decay })); };
    const variable0InstrumentSustainSet = sustain => { setVariable0InstrumentOptions(prev => ({ ...prev, sustain: sustain })); };
    const variable0InstrumentReleaseSet = release => { setVariable0InstrumentOptions(prev => ({ ...prev, release: release })); };
    const variable0InstrumentVibratoDepthSet = vibratoDepth => { setVariable0InstrumentOptions(prev => ({ ...prev, vibratoDepth: vibratoDepth })); };
    const variable0InstrumentVibratoFrequencySet = vibratoFrequency => { setVariable0InstrumentOptions(prev => ({ ...prev, vibratoFrequency: vibratoFrequency })); };
    const variable0InstrumentTremoloDepthSet = tremoloDepth => { setVariable0InstrumentOptions(prev => ({ ...prev, tremoloDepth: tremoloDepth })); };
    const variable0InstrumentTremoloRateSet = tremoloRate => { setVariable0InstrumentOptions(prev => ({ ...prev, tremoloRate: tremoloRate })); };
    const variable0InstrumentElectricGuitarToneSelect = electricGuitarTone => { setVariable0InstrumentOptions(prev => ({ ...prev, electricGuitarTone: electricGuitarTone })); };

    const variable1InstrumentModulationFrequencySet = modulationFrequency => { setVariable1InstrumentOptions(prev => ({ ...prev, modulationFrequency: modulationFrequency })); };
    const variable1InstrumentHarmonicitySet = harmonicity => { setVariable1InstrumentOptions(prev => ({ ...prev, harmonicity: harmonicity })); };
    const variable1InstrumentModulationIndexSet = modulationIndex => { setVariable1InstrumentOptions(prev => ({ ...prev, modulationIndex: modulationIndex })); };
    const variable1InstrumentAttackSet = attack => { setVariable1InstrumentOptions(prev => ({ ...prev, attack: attack })); };
    const variable1InstrumentDecaySet = decay => { setVariable1InstrumentOptions(prev => ({ ...prev, decay: decay })); };
    const variable1InstrumentSustainSet = sustain => { setVariable1InstrumentOptions(prev => ({ ...prev, sustain: sustain })); };
    const variable1InstrumentReleaseSet = release => { setVariable1InstrumentOptions(prev => ({ ...prev, release: release })); };
    const variable1InstrumentVibratoDepthSet = vibratoDepth => { setVariable1InstrumentOptions(prev => ({ ...prev, vibratoDepth: vibratoDepth })); };
    const variable1InstrumentVibratoFrequencySet = vibratoFrequency => { setVariable1InstrumentOptions(prev => ({ ...prev, vibratoFrequency: vibratoFrequency })); };
    const variable1InstrumentTremoloDepthSet = tremoloDepth => { setVariable1InstrumentOptions(prev => ({ ...prev, tremoloDepth: tremoloDepth })); };
    const variable1InstrumentTremoloRateSet = tremoloRate => { setVariable1InstrumentOptions(prev => ({ ...prev, tremoloRate: tremoloRate })); };
    const variable1InstrumentElectricGuitarToneSelect = electricGuitarTone => { setVariable1InstrumentOptions(prev => ({ ...prev, electricGuitarTone: electricGuitarTone })); };

    const variable2InstrumentModulationFrequencySet = modulationFrequency => { setVariable2InstrumentOptions(prev => ({ ...prev, modulationFrequency: modulationFrequency })); };
    const variable2InstrumentHarmonicitySet = harmonicity => { setVariable2InstrumentOptions(prev => ({ ...prev, harmonicity: harmonicity })); };
    const variable2InstrumentModulationIndexSet = modulationIndex => { setVariable2InstrumentOptions(prev => ({ ...prev, modulationIndex: modulationIndex })); };
    const variable2InstrumentAttackSet = attack => { setVariable2InstrumentOptions(prev => ({ ...prev, attack: attack })); };
    const variable2InstrumentDecaySet = decay => { setVariable2InstrumentOptions(prev => ({ ...prev, decay: decay })); };
    const variable2InstrumentSustainSet = sustain => { setVariable2InstrumentOptions(prev => ({ ...prev, sustain: sustain })); };
    const variable2InstrumentReleaseSet = release => { setVariable2InstrumentOptions(prev => ({ ...prev, release: release })); };
    const variable2InstrumentVibratoDepthSet = vibratoDepth => { setVariable2InstrumentOptions(prev => ({ ...prev, vibratoDepth: vibratoDepth })); };
    const variable2InstrumentVibratoFrequencySet = vibratoFrequency => { setVariable2InstrumentOptions(prev => ({ ...prev, vibratoFrequency: vibratoFrequency })); };
    const variable2InstrumentTremoloDepthSet = tremoloDepth => { setVariable2InstrumentOptions(prev => ({ ...prev, tremoloDepth: tremoloDepth })); };
    const variable2InstrumentTremoloRateSet = tremoloRate => { setVariable2InstrumentOptions(prev => ({ ...prev, tremoloRate: tremoloRate })); };
    const variable2InstrumentElectricGuitarToneSelect = electricGuitarTone => { setVariable2InstrumentOptions(prev => ({ ...prev, electricGuitarTone: electricGuitarTone })); };

    const variable3InstrumentModulationFrequencySet = modulationFrequency => { setVariable3InstrumentOptions(prev => ({ ...prev, modulationFrequency: modulationFrequency })); };
    const variable3InstrumentHarmonicitySet = harmonicity => { setVariable3InstrumentOptions(prev => ({ ...prev, harmonicity: harmonicity })); };
    const variable3InstrumentModulationIndexSet = modulationIndex => { setVariable3InstrumentOptions(prev => ({ ...prev, modulationIndex: modulationIndex })); };
    const variable3InstrumentAttackSet = attack => { setVariable3InstrumentOptions(prev => ({ ...prev, attack: attack })); };
    const variable3InstrumentDecaySet = decay => { setVariable3InstrumentOptions(prev => ({ ...prev, decay: decay })); };
    const variable3InstrumentSustainSet = sustain => { setVariable3InstrumentOptions(prev => ({ ...prev, sustain: sustain })); };
    const variable3InstrumentReleaseSet = release => { setVariable3InstrumentOptions(prev => ({ ...prev, release: release })); };
    const variable3InstrumentVibratoDepthSet = vibratoDepth => { setVariable3InstrumentOptions(prev => ({ ...prev, vibratoDepth: vibratoDepth })); };
    const variable3InstrumentVibratoFrequencySet = vibratoFrequency => { setVariable3InstrumentOptions(prev => ({ ...prev, vibratoFrequency: vibratoFrequency })); };
    const variable3InstrumentTremoloDepthSet = tremoloDepth => { setVariable3InstrumentOptions(prev => ({ ...prev, tremoloDepth: tremoloDepth })); };
    const variable3InstrumentTremoloRateSet = tremoloRate => { setVariable3InstrumentOptions(prev => ({ ...prev, tremoloRate: tremoloRate })); };
    const variable3InstrumentElectricGuitarToneSelect = electricGuitarTone => { setVariable3InstrumentOptions(prev => ({ ...prev, electricGuitarTone: electricGuitarTone })); };

    const variable4InstrumentModulationFrequencySet = modulationFrequency => { setVariable4InstrumentOptions(prev => ({ ...prev, modulationFrequency: modulationFrequency })); };
    const variable4InstrumentHarmonicitySet = harmonicity => { setVariable4InstrumentOptions(prev => ({ ...prev, harmonicity: harmonicity })); };
    const variable4InstrumentModulationIndexSet = modulationIndex => { setVariable4InstrumentOptions(prev => ({ ...prev, modulationIndex: modulationIndex })); };
    const variable4InstrumentAttackSet = attack => { setVariable4InstrumentOptions(prev => ({ ...prev, attack: attack })); };
    const variable4InstrumentDecaySet = decay => { setVariable4InstrumentOptions(prev => ({ ...prev, decay: decay })); };
    const variable4InstrumentSustainSet = sustain => { setVariable4InstrumentOptions(prev => ({ ...prev, sustain: sustain })); };
    const variable4InstrumentReleaseSet = release => { setVariable4InstrumentOptions(prev => ({ ...prev, release: release })); };
    const variable4InstrumentVibratoDepthSet = vibratoDepth => { setVariable4InstrumentOptions(prev => ({ ...prev, vibratoDepth: vibratoDepth })); };
    const variable4InstrumentVibratoFrequencySet = vibratoFrequency => { setVariable4InstrumentOptions(prev => ({ ...prev, vibratoFrequency: vibratoFrequency })); };
    const variable4InstrumentTremoloDepthSet = tremoloDepth => { setVariable4InstrumentOptions(prev => ({ ...prev, tremoloDepth: tremoloDepth })); };
    const variable4InstrumentTremoloRateSet = tremoloRate => { setVariable4InstrumentOptions(prev => ({ ...prev, tremoloRate: tremoloRate })); };
    const variable4InstrumentElectricGuitarToneSelect = electricGuitarTone => { setVariable4InstrumentOptions(prev => ({ ...prev, electricGuitarTone: electricGuitarTone })); };

    const variable5InstrumentModulationFrequencySet = modulationFrequency => { setVariable5InstrumentOptions(prev => ({ ...prev, modulationFrequency: modulationFrequency })); };
    const variable5InstrumentHarmonicitySet = harmonicity => { setVariable5InstrumentOptions(prev => ({ ...prev, harmonicity: harmonicity })); };
    const variable5InstrumentModulationIndexSet = modulationIndex => { setVariable5InstrumentOptions(prev => ({ ...prev, modulationIndex: modulationIndex })); };
    const variable5InstrumentAttackSet = attack => { setVariable5InstrumentOptions(prev => ({ ...prev, attack: attack })); };
    const variable5InstrumentDecaySet = decay => { setVariable5InstrumentOptions(prev => ({ ...prev, decay: decay })); };
    const variable5InstrumentSustainSet = sustain => { setVariable5InstrumentOptions(prev => ({ ...prev, sustain: sustain })); };
    const variable5InstrumentReleaseSet = release => { setVariable5InstrumentOptions(prev => ({ ...prev, release: release })); };
    const variable5InstrumentVibratoDepthSet = vibratoDepth => { setVariable5InstrumentOptions(prev => ({ ...prev, vibratoDepth: vibratoDepth })); };
    const variable5InstrumentVibratoFrequencySet = vibratoFrequency => { setVariable5InstrumentOptions(prev => ({ ...prev, vibratoFrequency: vibratoFrequency })); };
    const variable5InstrumentTremoloDepthSet = tremoloDepth => { setVariable5InstrumentOptions(prev => ({ ...prev, tremoloDepth: tremoloDepth })); };
    const variable5InstrumentTremoloRateSet = tremoloRate => { setVariable5InstrumentOptions(prev => ({ ...prev, tremoloRate: tremoloRate })); };
    const variable5InstrumentElectricGuitarToneSelect = electricGuitarTone => { setVariable5InstrumentOptions(prev => ({ ...prev, electricGuitarTone: electricGuitarTone })); };


  return (
    <PageLayout title='Custom Audio - Tone'>
      <DropdownSonifierStepper selected='tone' />
      <div className='p-5'>
        <h4>Customise the tone of the selected sounds or instruments:</h4>
      </div>
      <div className=''>
        {
          (variable0InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement: {titleCase(variable0InstrumentOptions.instrument)}</h4>
              {
                (variable0InstrumentOptions.instrument === 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Frequency (Hz)</h4>
                          <CustomSlider value={variable0InstrumentOptions.modulationFrequency} setValue={variable0InstrumentModulationFrequencySet} minValue={0.1} maxValue={8000} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Harmonicity</h4>
                          <CustomSlider value={variable0InstrumentOptions.harmonicity} setValue={variable0InstrumentHarmonicitySet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Index</h4>
                          <CustomSlider value={variable0InstrumentOptions.modulationIndex} setValue={variable0InstrumentModulationIndexSet} minValue={0} maxValue={30} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Attack (ms)</h4>
                          <CustomSlider value={variable0InstrumentOptions.attack} setValue={variable0InstrumentAttackSet} minValue={0.001} maxValue={5} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Decay (ms)</h4>
                          <CustomSlider value={variable0InstrumentOptions.decay} setValue={variable0InstrumentDecaySet} minValue={0.01} maxValue={3} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Sustain (Gain)</h4>
                          <CustomSlider value={variable0InstrumentOptions.sustain} setValue={variable0InstrumentSustainSet} minValue={0} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Release (ms)</h4>
                          <CustomSlider value={variable0InstrumentOptions.release} setValue={variable0InstrumentReleaseSet} minValue={0.01} maxValue={5} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument === 'leadSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Depth (Hz)</h4>
                          <CustomSlider value={variable0InstrumentOptions.vibratoDepth} setValue={variable0InstrumentVibratoDepthSet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Frequency (Hz)</h4>
                          <CustomSlider value={variable0InstrumentOptions.vibratoFrequency} setValue={variable0InstrumentVibratoFrequencySet} minValue={1} maxValue={20} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument === 'flute') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Depth (Gain)</h4>
                          <CustomSlider value={variable0InstrumentOptions.tremoloDepth} setValue={variable0InstrumentTremoloDepthSet} minValue={0.1} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Rate (Hz)</h4>
                          <CustomSlider value={variable0InstrumentOptions.tremoloRate} setValue={variable0InstrumentTremoloRateSet} minValue={1} maxValue={12} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument === 'electricGuitar') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Electric Guitar Tone</h4>
                        <Dropdown 
                            options={electricGuitarToneOptions}
                            selectedOption={variable0InstrumentOptions.electricGuitarTone}
                            onSelect={variable0InstrumentElectricGuitarToneSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument !== 'fmSynth' && variable0InstrumentOptions.instrument !== 'leadSynth' && variable0InstrumentOptions.instrument !== 'flute' && variable0InstrumentOptions.instrument !== 'electricGuitar')
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
                (variable1InstrumentOptions.instrument === 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Frequency (Hz)</h4>
                          <CustomSlider value={variable1InstrumentOptions.modulationFrequency} setValue={variable1InstrumentModulationFrequencySet} minValue={0.1} maxValue={8000} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Harmonicity</h4>
                          <CustomSlider value={variable1InstrumentOptions.harmonicity} setValue={variable1InstrumentHarmonicitySet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Index</h4>
                          <CustomSlider value={variable1InstrumentOptions.modulationIndex} setValue={variable1InstrumentModulationIndexSet} minValue={0} maxValue={30} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Attack (ms)</h4>
                          <CustomSlider value={variable1InstrumentOptions.attack} setValue={variable1InstrumentAttackSet} minValue={0.001} maxValue={5} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Decay (ms)</h4>
                          <CustomSlider value={variable1InstrumentOptions.decay} setValue={variable1InstrumentDecaySet} minValue={0.01} maxValue={3} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Sustain (Gain)</h4>
                          <CustomSlider value={variable1InstrumentOptions.sustain} setValue={variable1InstrumentSustainSet} minValue={0} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Release (ms)</h4>
                          <CustomSlider value={variable1InstrumentOptions.release} setValue={variable1InstrumentReleaseSet} minValue={0.01} maxValue={5} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument === 'leadSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Depth (Hz)</h4>
                          <CustomSlider value={variable1InstrumentOptions.vibratoDepth} setValue={variable1InstrumentVibratoDepthSet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Frequency (Hz)</h4>
                          <CustomSlider value={variable1InstrumentOptions.vibratoFrequency} setValue={variable1InstrumentVibratoFrequencySet} minValue={1} maxValue={20} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument === 'flute') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Depth (Gain)</h4>
                          <CustomSlider value={variable1InstrumentOptions.tremoloDepth} setValue={variable1InstrumentTremoloDepthSet} minValue={0.1} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Rate (Hz)</h4>
                          <CustomSlider value={variable1InstrumentOptions.tremoloRate} setValue={variable1InstrumentTremoloRateSet} minValue={1} maxValue={12} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument === 'electricGuitar') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Electric Guitar Tone</h4>
                        <Dropdown 
                            options={electricGuitarToneOptions}
                            selectedOption={variable1InstrumentOptions.electricGuitarTone}
                            onSelect={variable1InstrumentElectricGuitarToneSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument !== 'fmSynth' && variable1InstrumentOptions.instrument !== 'leadSynth' && variable1InstrumentOptions.instrument !== 'flute' && variable1InstrumentOptions.instrument !== 'electricGuitar')
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
                (variable2InstrumentOptions.instrument === 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Frequency (Hz)</h4>
                          <CustomSlider value={variable2InstrumentOptions.modulationFrequency} setValue={variable2InstrumentModulationFrequencySet} minValue={0.1} maxValue={8000} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Harmonicity</h4>
                          <CustomSlider value={variable2InstrumentOptions.harmonicity} setValue={variable2InstrumentHarmonicitySet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Index</h4>
                          <CustomSlider value={variable2InstrumentOptions.modulationIndex} setValue={variable2InstrumentModulationIndexSet} minValue={0} maxValue={30} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Attack (ms)</h4>
                          <CustomSlider value={variable2InstrumentOptions.attack} setValue={variable2InstrumentAttackSet} minValue={0.001} maxValue={5} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Decay (ms)</h4>
                          <CustomSlider value={variable2InstrumentOptions.decay} setValue={variable2InstrumentDecaySet} minValue={0.01} maxValue={3} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Sustain (Gain)</h4>
                          <CustomSlider value={variable2InstrumentOptions.sustain} setValue={variable2InstrumentSustainSet} minValue={0} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Release (ms)</h4>
                          <CustomSlider value={variable2InstrumentOptions.release} setValue={variable2InstrumentReleaseSet} minValue={0.01} maxValue={5} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument === 'leadSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Depth (Hz)</h4>
                          <CustomSlider value={variable2InstrumentOptions.vibratoDepth} setValue={variable2InstrumentVibratoDepthSet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Frequency (Hz)</h4>
                          <CustomSlider value={variable2InstrumentOptions.vibratoFrequency} setValue={variable2InstrumentVibratoFrequencySet} minValue={1} maxValue={20} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument === 'flute') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Depth (Gain)</h4>
                          <CustomSlider value={variable2InstrumentOptions.tremoloDepth} setValue={variable2InstrumentTremoloDepthSet} minValue={0.1} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Rate (Hz)</h4>
                          <CustomSlider value={variable2InstrumentOptions.tremoloRate} setValue={variable2InstrumentTremoloRateSet} minValue={1} maxValue={12} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument === 'electricGuitar') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Electric Guitar Tone</h4>
                        <Dropdown 
                            options={electricGuitarToneOptions}
                            selectedOption={variable2InstrumentOptions.electricGuitarTone}
                            onSelect={variable2InstrumentElectricGuitarToneSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument !== 'fmSynth' && variable2InstrumentOptions.instrument !== 'leadSynth' && variable2InstrumentOptions.instrument !== 'flute' && variable2InstrumentOptions.instrument !== 'electricGuitar')
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
                (variable3InstrumentOptions.instrument === 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Frequency (Hz)</h4>
                          <CustomSlider value={variable3InstrumentOptions.modulationFrequency} setValue={variable3InstrumentModulationFrequencySet} minValue={0.1} maxValue={8000} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Harmonicity</h4>
                          <CustomSlider value={variable3InstrumentOptions.harmonicity} setValue={variable3InstrumentHarmonicitySet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Index</h4>
                          <CustomSlider value={variable3InstrumentOptions.modulationIndex} setValue={variable3InstrumentModulationIndexSet} minValue={0} maxValue={30} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Attack (ms)</h4>
                          <CustomSlider value={variable3InstrumentOptions.attack} setValue={variable3InstrumentAttackSet} minValue={0.001} maxValue={5} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Decay (ms)</h4>
                          <CustomSlider value={variable3InstrumentOptions.decay} setValue={variable3InstrumentDecaySet} minValue={0.01} maxValue={3} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Sustain (Gain)</h4>
                          <CustomSlider value={variable3InstrumentOptions.sustain} setValue={variable3InstrumentSustainSet} minValue={0} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Release (ms)</h4>
                          <CustomSlider value={variable3InstrumentOptions.release} setValue={variable3InstrumentReleaseSet} minValue={0.01} maxValue={5} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument === 'leadSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Depth (Hz)</h4>
                          <CustomSlider value={variable3InstrumentOptions.vibratoDepth} setValue={variable3InstrumentVibratoDepthSet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Frequency (Hz)</h4>
                          <CustomSlider value={variable3InstrumentOptions.vibratoFrequency} setValue={variable3InstrumentVibratoFrequencySet} minValue={1} maxValue={20} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument === 'flute') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Depth (Gain)</h4>
                          <CustomSlider value={variable3InstrumentOptions.tremoloDepth} setValue={variable3InstrumentTremoloDepthSet} minValue={0.1} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Rate (Hz)</h4>
                          <CustomSlider value={variable3InstrumentOptions.tremoloRate} setValue={variable3InstrumentTremoloRateSet} minValue={1} maxValue={12} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument === 'electricGuitar') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Electric Guitar Tone</h4>
                        <Dropdown 
                            options={electricGuitarToneOptions}
                            selectedOption={variable3InstrumentOptions.electricGuitarTone}
                            onSelect={variable3InstrumentElectricGuitarToneSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument !== 'fmSynth' && variable3InstrumentOptions.instrument !== 'leadSynth' && variable3InstrumentOptions.instrument !== 'flute' && variable3InstrumentOptions.instrument !== 'electricGuitar')
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
                (variable4InstrumentOptions.instrument === 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Frequency (Hz)</h4>
                          <CustomSlider value={variable4InstrumentOptions.modulationFrequency} setValue={variable4InstrumentModulationFrequencySet} minValue={0.1} maxValue={8000} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Harmonicity</h4>
                          <CustomSlider value={variable4InstrumentOptions.harmonicity} setValue={variable4InstrumentHarmonicitySet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Index</h4>
                          <CustomSlider value={variable4InstrumentOptions.modulationIndex} setValue={variable4InstrumentModulationIndexSet} minValue={0} maxValue={30} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Attack (ms)</h4>
                          <CustomSlider value={variable4InstrumentOptions.attack} setValue={variable4InstrumentAttackSet} minValue={0.001} maxValue={5} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Decay (ms)</h4>
                          <CustomSlider value={variable4InstrumentOptions.decay} setValue={variable4InstrumentDecaySet} minValue={0.01} maxValue={3} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Sustain (Gain)</h4>
                          <CustomSlider value={variable4InstrumentOptions.sustain} setValue={variable4InstrumentSustainSet} minValue={0} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Release (ms)</h4>
                          <CustomSlider value={variable4InstrumentOptions.release} setValue={variable4InstrumentReleaseSet} minValue={0.01} maxValue={5} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument === 'leadSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Depth (Hz)</h4>
                          <CustomSlider value={variable4InstrumentOptions.vibratoDepth} setValue={variable4InstrumentVibratoDepthSet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Frequency (Hz)</h4>
                          <CustomSlider value={variable4InstrumentOptions.vibratoFrequency} setValue={variable4InstrumentVibratoFrequencySet} minValue={1} maxValue={20} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument === 'flute') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Depth (Gain)</h4>
                          <CustomSlider value={variable4InstrumentOptions.tremoloDepth} setValue={variable4InstrumentTremoloDepthSet} minValue={0.1} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Rate (Hz)</h4>
                          <CustomSlider value={variable4InstrumentOptions.tremoloRate} setValue={variable4InstrumentTremoloRateSet} minValue={1} maxValue={12} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument === 'electricGuitar') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Electric Guitar Tone</h4>
                        <Dropdown 
                            options={electricGuitarToneOptions}
                            selectedOption={variable4InstrumentOptions.electricGuitarTone}
                            onSelect={variable4InstrumentElectricGuitarToneSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument !== 'fmSynth' && variable4InstrumentOptions.instrument !== 'leadSynth' && variable4InstrumentOptions.instrument !== 'flute' && variable4InstrumentOptions.instrument !== 'electricGuitar')
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
                (variable5InstrumentOptions.instrument === 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Frequency (Hz)</h4>
                          <CustomSlider value={variable5InstrumentOptions.modulationFrequency} setValue={variable5InstrumentModulationFrequencySet} minValue={0.1} maxValue={8000} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Harmonicity</h4>
                          <CustomSlider value={variable5InstrumentOptions.harmonicity} setValue={variable5InstrumentHarmonicitySet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Modulation Index</h4>
                          <CustomSlider value={variable5InstrumentOptions.modulationIndex} setValue={variable5InstrumentModulationIndexSet} minValue={0} maxValue={30} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Attack (ms)</h4>
                          <CustomSlider value={variable5InstrumentOptions.attack} setValue={variable5InstrumentAttackSet} minValue={0.001} maxValue={5} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Decay (ms)</h4>
                          <CustomSlider value={variable5InstrumentOptions.decay} setValue={variable5InstrumentDecaySet} minValue={0.01} maxValue={3} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Sustain (Gain)</h4>
                          <CustomSlider value={variable5InstrumentOptions.sustain} setValue={variable5InstrumentSustainSet} minValue={0} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Release (ms)</h4>
                          <CustomSlider value={variable5InstrumentOptions.release} setValue={variable5InstrumentReleaseSet} minValue={0.01} maxValue={5} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument === 'leadSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Depth (Hz)</h4>
                          <CustomSlider value={variable5InstrumentOptions.vibratoDepth} setValue={variable5InstrumentVibratoDepthSet} minValue={0.1} maxValue={10} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Vibrato Frequency (Hz)</h4>
                          <CustomSlider value={variable5InstrumentOptions.vibratoFrequency} setValue={variable5InstrumentVibratoFrequencySet} minValue={1} maxValue={20} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument === 'flute') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Depth (Gain)</h4>
                          <CustomSlider value={variable5InstrumentOptions.tremoloDepth} setValue={variable5InstrumentTremoloDepthSet} minValue={0.1} maxValue={1} decimal />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Tremolo Rate (Hz)</h4>
                          <CustomSlider value={variable5InstrumentOptions.tremoloRate} setValue={variable5InstrumentTremoloRateSet} minValue={1} maxValue={12} decimal />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument === 'electricGuitar') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Electric Guitar Tone</h4>
                        <Dropdown 
                            options={electricGuitarToneOptions}
                            selectedOption={variable5InstrumentOptions.electricGuitarTone}
                            onSelect={variable5InstrumentElectricGuitarToneSelect}
                        />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument !== 'fmSynth' && variable5InstrumentOptions.instrument !== 'leadSynth' && variable5InstrumentOptions.instrument !== 'flute' && variable5InstrumentOptions.instrument !== 'electricGuitar')
                ? <h4 className='m-5'>No refinements available.</h4> 
                : <></>
              }
            </>
          )
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/refine')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/beat')} hasTitle title='Next' />
      </div>

{/* THE INSTRUMENT/SOUND TIMBRE SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}