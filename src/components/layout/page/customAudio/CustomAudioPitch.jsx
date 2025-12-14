import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DropdownSonifierStepper from '../../../ui/stepper/DropdownSonifierStepper';
import CustomSlider from '../../../ui/slider/CustomSlider';
import Dropdown from '../../../ui/dropdown/Dropdown';
import RangeSlider from '../../../ui/slider/RangeSlider';
import { useCustomAudio } from '../../../context/CustomAudioContext';

export default function CustomAudioPitch({ endpoints={} }) {
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

  const titleCase = str => 
    (str === 'fmSynth') ? 'FM Synth' : str
    .replace(/([a-z])([A-Z])/g, '$1 $2')     // Split before capitals (camelCase to spaced)
    .replace(/[_\-]+/g, ' ')                 // Replace underscores/hyphens with spaces
    .toLowerCase()
    .replace(/\b\w/g, c => c.toUpperCase()); // Title Case

  const noteOptions = [
    { value: 'C', title: 'C' },
    { value: 'C#', title: 'C♯ / D♭' },
    { value: 'D', title: 'D' },
    { value: 'D#', title: 'D♯ / E♭' },
    { value: 'E', title: 'E' },
    { value: 'F', title: 'F' },
    { value: 'F#', title: 'F♯ / G♭' },
    { value: 'G', title: 'G' },
    { value: 'G#', title: 'G♯ / A♭' },
    { value: 'A', title: 'A' },
    { value: 'A#', title: 'A♯ / B♭' },
    { value: 'B', title: 'B' }
  ];

  const scaleOptions = [
    { value: 'major', title: 'Major' },
    { value: 'minor', title: 'Minor' },
    { value: 'pentatonic-major', title: 'Pentatonic Major' },
    { value: 'pentatonic-minor', title: 'Pentatonic Minor' },
    { value: 'blues', title: 'Blues' }
  ];

  const octaveOptions = [
    { value: '0', title: 'Octave 0' },
    { value: '1', title: 'Octave 1' },
    { value: '2', title: 'Octave 2' },
    { value: '3', title: 'Octave 3' },
    { value: '4', title: 'Octave 4' },
    { value: '5', title: 'Octave 5' },
    { value: '6', title: 'Octave 6' },
    { value: '7', title: 'Octave 7' },
    { value: '8', title: 'Octave 8' }
  ];

  function noteToFrequency(note, octave) {
    // Map matches your provided note `value` fields
    const noteSemitones = {
      'C': -9,
      'C#': -8,
      'D': -7,
      'D#': -6,
      'E': -5,
      'F': -4,
      'F#': -3,
      'G': -2,
      'G#': -1,
      'A': 0,
      'A#': 1,
      'B': 2
    };
    const semitoneDistance = noteSemitones[note] + (octave - 4) * 12;
    // Calculate frequency (Equal Temperament, A4 = 440Hz)
    const freq = 440 * Math.pow(2, semitoneDistance / 12);
    return Math.round(freq * 100) / 100
  }

    useEffect(() => {
      const minFrequency = noteToFrequency(variable0InstrumentOptions.note, parseInt(variable0InstrumentOptions.lowestOctave));
      setVariable0InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency }));
    }, [variable0InstrumentOptions.note, variable0InstrumentOptions.lowestOctave]);

    useEffect(() => {
      const maxFrequency = noteToFrequency(variable0InstrumentOptions.note, parseInt(variable0InstrumentOptions.highestOctave));
      setVariable0InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency }));
    }, [variable0InstrumentOptions.note, variable0InstrumentOptions.highestOctave]);
    
    useEffect(() => {
      const minFrequency = noteToFrequency(variable1InstrumentOptions.note, parseInt(variable1InstrumentOptions.lowestOctave));
      setVariable1InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency }));
    }, [variable1InstrumentOptions.note, variable1InstrumentOptions.lowestOctave]);

    useEffect(() => {
      const maxFrequency = noteToFrequency(variable1InstrumentOptions.note, parseInt(variable1InstrumentOptions.highestOctave));
      setVariable1InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency }));
    }, [variable1InstrumentOptions.note, variable1InstrumentOptions.highestOctave]);

    useEffect(() => {
      const minFrequency = noteToFrequency(variable2InstrumentOptions.note, parseInt(variable2InstrumentOptions.lowestOctave));
      setVariable2InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency }));
    }, [variable2InstrumentOptions.note, variable2InstrumentOptions.lowestOctave]);

    useEffect(() => {
      const maxFrequency = noteToFrequency(variable2InstrumentOptions.note, parseInt(variable2InstrumentOptions.highestOctave));
      setVariable2InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency }));
    }, [variable2InstrumentOptions.note, variable2InstrumentOptions.highestOctave]);

    useEffect(() => {
      const minFrequency = noteToFrequency(variable3InstrumentOptions.note, parseInt(variable3InstrumentOptions.lowestOctave));
      setVariable3InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency }));
    }, [variable3InstrumentOptions.note, variable3InstrumentOptions.lowestOctave]);

    useEffect(() => {
      const maxFrequency = noteToFrequency(variable3InstrumentOptions.note, parseInt(variable3InstrumentOptions.highestOctave));
      setVariable3InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency }));
    }, [variable3InstrumentOptions.note, variable3InstrumentOptions.highestOctave]);

    useEffect(() => {
      const minFrequency = noteToFrequency(variable4InstrumentOptions.note, parseInt(variable4InstrumentOptions.lowestOctave));
      setVariable4InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency }));
    }, [variable4InstrumentOptions.note, variable4InstrumentOptions.lowestOctave]);

    useEffect(() => {
      const maxFrequency = noteToFrequency(variable4InstrumentOptions.note, parseInt(variable4InstrumentOptions.highestOctave));
      setVariable4InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency }));
    }, [variable4InstrumentOptions.note, variable4InstrumentOptions.highestOctave]);

    useEffect(() => {
      const minFrequency = noteToFrequency(variable5InstrumentOptions.note, parseInt(variable5InstrumentOptions.lowestOctave));
      setVariable5InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency }));
    }, [variable5InstrumentOptions.note, variable5InstrumentOptions.lowestOctave]);

    useEffect(() => {
      const maxFrequency = noteToFrequency(variable5InstrumentOptions.note, parseInt(variable5InstrumentOptions.highestOctave));
      setVariable5InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency }));
    }, [variable5InstrumentOptions.note, variable5InstrumentOptions.highestOctave]);


    // { value: 'none', title: 'None' },
    // { value: 'drone', title: 'Drone' },
    // { value: 'fmSynth', title: 'FM Synthesis' },
    // { value: 'piano', title: 'Piano' },
    // { value: 'pluckedGuitar', title: 'Plucked Guitar' },
    // { value: 'leadSynth', title: 'Lead Synthesiser' },
    // { value: 'flute', title: 'Flute' },
    // { value: 'percussion', title: 'Percussion' },
    // { value: 'synthesiser', title: 'Synthesiser' },
    // { value: 'electricGuitar', title: 'Electric Guitar' },
    // { value: 'bassGuitar', title: 'Bass Guitar' }

    const keySelect = key => { setPlaybackOptions(prev => ({ ...prev, key: key })); };
    const scaleSelect = scale => { setPlaybackOptions(prev => ({ ...prev, scale: scale })); };
    
    const variable0FrequencyMinSet = minFrequency => { setVariable0InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency })); };
    const variable0FrequencyMaxSet = maxFrequency => { setVariable0InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency })); };
    const variable0NoteSelect = note => { setVariable0InstrumentOptions(prev => ({ ...prev, note: note })); };
    const variable0LowestOctaveSelect = lowestOctave => { setVariable0InstrumentOptions(prev => ({ ...prev, lowestOctave: lowestOctave })); };
    const variable0HighestOctaveSelect = highestOctave => { setVariable0InstrumentOptions(prev => ({ ...prev, highestOctave: highestOctave })); };

    const variable1FrequencyMinSet = minFrequency => { setVariable1InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency })); };
    const variable1FrequencyMaxSet = maxFrequency => { setVariable1InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency })); };
    const variable1NoteSelect = note => { setVariable1InstrumentOptions(prev => ({ ...prev, note: note })); };
    const variable1LowestOctaveSelect = lowestOctave => { setVariable1InstrumentOptions(prev => ({ ...prev, lowestOctave: lowestOctave })); };
    const variable1HighestOctaveSelect = highestOctave => { setVariable1InstrumentOptions(prev => ({ ...prev, highestOctave: highestOctave })); };

    const variable2FrequencyMinSet = minFrequency => { setVariable2InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency })); };
    const variable2FrequencyMaxSet = maxFrequency => { setVariable2InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency })); };
    const variable2NoteSelect = note => { setVariable2InstrumentOptions(prev => ({ ...prev, note: note })); };
    const variable2LowestOctaveSelect = lowestOctave => { setVariable2InstrumentOptions(prev => ({ ...prev, lowestOctave: lowestOctave })); };
    const variable2HighestOctaveSelect = highestOctave => { setVariable2InstrumentOptions(prev => ({ ...prev, highestOctave: highestOctave })); };

    const variable3FrequencyMinSet = minFrequency => { setVariable3InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency })); };
    const variable3FrequencyMaxSet = maxFrequency => { setVariable3InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency })); };
    const variable3NoteSelect = note => { setVariable3InstrumentOptions(prev => ({ ...prev, note: note })); };
    const variable3LowestOctaveSelect = lowestOctave => { setVariable3InstrumentOptions(prev => ({ ...prev, lowestOctave: lowestOctave })); };
    const variable3HighestOctaveSelect = highestOctave => { setVariable3InstrumentOptions(prev => ({ ...prev, highestOctave: highestOctave })); };

    const variable4FrequencyMinSet = minFrequency => { setVariable4InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency })); };
    const variable4FrequencyMaxSet = maxFrequency => { setVariable4InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency })); };
    const variable4NoteSelect = note => { setVariable4InstrumentOptions(prev => ({ ...prev, note: note })); };
    const variable4LowestOctaveSelect = lowestOctave => { setVariable4InstrumentOptions(prev => ({ ...prev, lowestOctave: lowestOctave })); };
    const variable4HighestOctaveSelect = highestOctave => { setVariable4InstrumentOptions(prev => ({ ...prev, highestOctave: highestOctave })); };

    const variable5FrequencyMinSet = minFrequency => { setVariable5InstrumentOptions(prev => ({ ...prev, minFrequency: minFrequency })); };
    const variable5FrequencyMaxSet = maxFrequency => { setVariable5InstrumentOptions(prev => ({ ...prev, maxFrequency: maxFrequency })); };
    const variable5NoteSelect = note => { setVariable5InstrumentOptions(prev => ({ ...prev, note: note })); };
    const variable5LowestOctaveSelect = lowestOctave => { setVariable5InstrumentOptions(prev => ({ ...prev, lowestOctave: lowestOctave })); };
    const variable5HighestOctaveSelect = highestOctave => { setVariable5InstrumentOptions(prev => ({ ...prev, highestOctave: highestOctave })); };

  return (
    <PageLayout title='Custom Audio - Pitch'>
      <DropdownSonifierStepper selected='pitch' />
      <div className='p-5'>
        <h4>Customise the pitch of the selected sounds or instruments:</h4>
      </div>
      <div className=''>
        {
          (variable0InstrumentOptions.instrument === 'drone' && variable0InstrumentOptions.instrument === 'fmSynth' 
            && variable1InstrumentOptions.instrument === 'drone' && variable1InstrumentOptions.instrument === 'fmSynth'
            && variable2InstrumentOptions.instrument === 'drone' && variable2InstrumentOptions.instrument === 'fmSynth'
            && variable3InstrumentOptions.instrument === 'drone' && variable3InstrumentOptions.instrument === 'fmSynth'
            && variable4InstrumentOptions.instrument === 'drone' && variable4InstrumentOptions.instrument === 'fmSynth'
            && variable5InstrumentOptions.instrument === 'drone' && variable5InstrumentOptions.instrument === 'fmSynth'
          ) ? <></>
          : (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Key Signature for Musical Instruments</h4>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                    <h4 style={{ textAlign: 'left' }}>Key</h4>
                    <Dropdown 
                        options={noteOptions}
                        selectedOption={playbackOptions.key}
                        onSelect={keySelect}
                    />
                </div>
              </div>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                    <h4 style={{ textAlign: 'left' }}>Scale</h4>
                    <Dropdown 
                        options={scaleOptions}
                        selectedOption={playbackOptions.scale}
                        onSelect={scaleSelect}
                    />
                </div>
              </div>
            </>
          )
        }
        {
          (variable0InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement: {titleCase(variable0InstrumentOptions.instrument)}</h4>
              {
                (variable0InstrumentOptions.instrument === 'drone' || variable0InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Frequency Range (Hz)</h4>
                        <RangeSlider minValue={10} maxValue={20000} minVal={variable0InstrumentOptions.minFrequency} maxVal={variable0InstrumentOptions.maxFrequency} setMinVal={variable0FrequencyMinSet} setMaxVal={variable0FrequencyMaxSet} />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable0InstrumentOptions.instrument === 'percussion')
                ? <h4 className='m-5'>No pitch options available.</h4> 
                : (variable0InstrumentOptions.instrument !== 'drone' && variable0InstrumentOptions.instrument !== 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Note</h4>
                          <Dropdown 
                              options={noteOptions}
                              selectedOption={variable0InstrumentOptions.note}
                              onSelect={variable0NoteSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Lowest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable0InstrumentOptions.lowestOctave}
                              onSelect={variable0LowestOctaveSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Highest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable0InstrumentOptions.highestOctave}
                              onSelect={variable0HighestOctaveSelect}
                          />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </>
          )
        }
        {
          (variable1InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture: {titleCase(variable1InstrumentOptions.instrument)}</h4>
              {
                (variable1InstrumentOptions.instrument === 'drone' || variable1InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Frequency Range (Hz)</h4>
                        <RangeSlider minValue={10} maxValue={20000} minVal={variable1InstrumentOptions.minFrequency} maxVal={variable1InstrumentOptions.maxFrequency} setMinVal={variable1FrequencyMinSet} setMaxVal={variable1FrequencyMaxSet} />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable1InstrumentOptions.instrument === 'percussion')
                ? <h4 className='m-5'>No pitch options available.</h4> 
                : (variable1InstrumentOptions.instrument !== 'drone' && variable1InstrumentOptions.instrument !== 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Note</h4>
                          <Dropdown 
                              options={noteOptions}
                              selectedOption={variable1InstrumentOptions.note}
                              onSelect={variable1NoteSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Lowest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable1InstrumentOptions.lowestOctave}
                              onSelect={variable1LowestOctaveSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Highest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable1InstrumentOptions.highestOctave}
                              onSelect={variable1HighestOctaveSelect}
                          />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </>
          )
        }
        {
          (variable2InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature: {titleCase(variable2InstrumentOptions.instrument)}</h4>
              {
                (variable2InstrumentOptions.instrument === 'drone' || variable2InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Frequency Range (Hz)</h4>
                        <RangeSlider minValue={10} maxValue={20000} minVal={variable2InstrumentOptions.minFrequency} maxVal={variable2InstrumentOptions.maxFrequency} setMinVal={variable2FrequencyMinSet} setMaxVal={variable2FrequencyMaxSet} />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable2InstrumentOptions.instrument === 'percussion')
                ? <h4 className='m-5'>No pitch options available.</h4> 
                : (variable2InstrumentOptions.instrument !== 'drone' && variable2InstrumentOptions.instrument !== 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Note</h4>
                          <Dropdown 
                              options={noteOptions}
                              selectedOption={variable2InstrumentOptions.note}
                              onSelect={variable2NoteSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Lowest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable2InstrumentOptions.lowestOctave}
                              onSelect={variable2LowestOctaveSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Highest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable2InstrumentOptions.highestOctave}
                              onSelect={variable2HighestOctaveSelect}
                          />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </>
          )
        }
        {
          (variable3InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity: {titleCase(variable3InstrumentOptions.instrument)}</h4>
              {
                (variable3InstrumentOptions.instrument === 'drone' || variable3InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Frequency Range (Hz)</h4>
                        <RangeSlider minValue={10} maxValue={20000} minVal={variable3InstrumentOptions.minFrequency} maxVal={variable3InstrumentOptions.maxFrequency} setMinVal={variable3FrequencyMinSet} setMaxVal={variable3FrequencyMaxSet} />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable3InstrumentOptions.instrument === 'percussion')
                ? <h4 className='m-5'>No pitch options available.</h4> 
                : (variable3InstrumentOptions.instrument !== 'drone' && variable3InstrumentOptions.instrument !== 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Note</h4>
                          <Dropdown 
                              options={noteOptions}
                              selectedOption={variable3InstrumentOptions.note}
                              onSelect={variable3NoteSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Lowest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable3InstrumentOptions.lowestOctave}
                              onSelect={variable3LowestOctaveSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Highest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable3InstrumentOptions.highestOctave}
                              onSelect={variable3HighestOctaveSelect}
                          />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </>
          )
        }
        {
          (variable4InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Vapour Pressure Deficit (VPD): {titleCase(variable4InstrumentOptions.instrument)}</h4>
              {
                (variable4InstrumentOptions.instrument === 'drone' || variable4InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Frequency Range (Hz)</h4>
                        <RangeSlider minValue={10} maxValue={20000} minVal={variable4InstrumentOptions.minFrequency} maxVal={variable4InstrumentOptions.maxFrequency} setMinVal={variable4FrequencyMinSet} setMaxVal={variable4FrequencyMaxSet} />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable4InstrumentOptions.instrument === 'percussion')
                ? <h4 className='m-5'>No pitch options available.</h4> 
                : (variable4InstrumentOptions.instrument !== 'drone' && variable4InstrumentOptions.instrument !== 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Note</h4>
                          <Dropdown 
                              options={noteOptions}
                              selectedOption={variable4InstrumentOptions.note}
                              onSelect={variable4NoteSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Lowest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable4InstrumentOptions.lowestOctave}
                              onSelect={variable4LowestOctaveSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Highest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable4InstrumentOptions.highestOctave}
                              onSelect={variable4HighestOctaveSelect}
                          />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </>
          )
        }
        {
          (variable5InstrumentOptions.instrument !== 'none') && (
            <>
              <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth: {titleCase(variable5InstrumentOptions.instrument)}</h4>
              {
                (variable5InstrumentOptions.instrument === 'drone' || variable5InstrumentOptions.instrument === 'fmSynth') ? (
                  <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Frequency Range (Hz)</h4>
                        <RangeSlider minValue={10} maxValue={20000} minVal={variable5InstrumentOptions.minFrequency} maxVal={variable5InstrumentOptions.maxFrequency} setMinVal={variable5FrequencyMinSet} setMaxVal={variable5FrequencyMaxSet} />
                    </div>
                  </div>
                ) : <></>
              }
              {
                (variable5InstrumentOptions.instrument === 'percussion')
                ? <h4 className='m-5'>No pitch options available.</h4> 
                : (variable5InstrumentOptions.instrument !== 'drone' && variable5InstrumentOptions.instrument !== 'fmSynth') ? (
                  <>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Note</h4>
                          <Dropdown 
                              options={noteOptions}
                              selectedOption={variable5InstrumentOptions.note}
                              onSelect={variable5NoteSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Lowest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable5InstrumentOptions.lowestOctave}
                              onSelect={variable5LowestOctaveSelect}
                          />
                      </div>
                    </div>
                    <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                      <div className='d-flex flex-column responsive-control-labels'>
                          <h4 style={{ textAlign: 'left' }}>Highest Octave</h4>
                          <Dropdown 
                              options={octaveOptions}
                              selectedOption={variable5InstrumentOptions.highestOctave}
                              onSelect={variable5HighestOctaveSelect}
                          />
                      </div>
                    </div>
                  </>
                ) : <></>
              }
            </>
          )
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/beat')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/layers')} hasTitle title='Next' />
      </div>

{/* THE PITCH/MELODY/SCALE SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}