import React, { useState, useRef, useEffect } from 'react';
import '../../../App.css';
import VolumeSlider from '../slider/VolumeSlider';
import Dropdown from '../dropdown/Dropdown';
import SpatialAudioSlider from '../slider/SpatialAudioSlider';

export default function PersonalisedPresetSoundPanel({
    derivedData=false,
    hideMute=false,
    volume=100,
    setVolume=()=>{},
    width=0,
    setWidth=()=>{},
    height=0,
    setHeight=()=>{},
    depth=0,
    setDepth=()=>{},
    variable0Instrument='drone',
    variable0InstrumentSelect=()=>{},
    variable0Volume=100,
    variable0SetVolume=()=>{},
    variable0MuteMode=false,
    variable0MuteOnClick=()=>{},
    variable0Width=0,
    variable0SetWidth=()=>{},
    variable0Height=0,
    variable0SetHeight=()=>{},
    variable0Depth=0,
    variable0SetDepth=()=>{},
    variable1Instrument='drone',
    variable1InstrumentSelect=()=>{},
    variable1Volume=100,
    variable1SetVolume=()=>{},
    variable1MuteMode=false,
    variable1MuteOnClick=()=>{},
    variable1Width=0,
    variable1SetWidth=()=>{},
    variable1Height=0,
    variable1SetHeight=()=>{},
    variable1Depth=0,
    variable1SetDepth=()=>{},
    variable2Instrument='drone',
    variable2InstrumentSelect=()=>{},
    variable2Volume=100,
    variable2SetVolume=()=>{},
    variable2MuteMode=false,
    variable2MuteOnClick=()=>{},
    variable2Width=0,
    variable2SetWidth=()=>{},
    variable2Height=0,
    variable2SetHeight=()=>{},
    variable2Depth=0,
    variable2SetDepth=()=>{},
    variable3Instrument='drone',
    variable3InstrumentSelect=()=>{},
    variable3Volume=100,
    variable3SetVolume=()=>{},
    variable3MuteMode=false,
    variable3MuteOnClick=()=>{},
    variable3Width=0,
    variable3SetWidth=()=>{},
    variable3Height=0,
    variable3SetHeight=()=>{},
    variable3Depth=0,
    variable3SetDepth=()=>{},
    variable4Instrument='drone',
    variable4InstrumentSelect=()=>{},
    variable4Volume=100,
    variable4SetVolume=()=>{},
    variable4MuteMode=false,
    variable4MuteOnClick=()=>{},
    variable4Width=0,
    variable4SetWidth=()=>{},
    variable4Height=0,
    variable4SetHeight=()=>{},
    variable4Depth=0,
    variable4SetDepth=()=>{},
    variable5Instrument='drone',
    variable5InstrumentSelect=()=>{},
    variable5Volume=100,
    variable5SetVolume=()=>{},
    variable5MuteMode=false,
    variable5MuteOnClick=()=>{},
    variable5Width=0,
    variable5SetWidth=()=>{},
    variable5Height=0,
    variable5SetHeight=()=>{},
    variable5Depth=0,
    variable5SetDepth=()=>{}
}) {
  const [isOpen, setIsOpen] = useState(false);

    const instrumentOptions = [
        { value: 'droneSine', title: 'Drone - Sine Wave' },
        { value: 'droneTriangle', title: 'Drone - Triangle Wave' },
        { value: 'droneSawtooth', title: 'Drone - Sawtooth Wave' },
        { value: 'fmSynthSine', title: 'FM Synthesis - Sine Wave' },
        { value: 'instrumentPiano', title: 'Instrument - Piano' },
        { value: 'instrumentPluckedGuitar', title: 'Instrument - Plucked Guitar' },
        { value: 'instrumentLeadSynth', title: 'Instrument - Lead Synthesiser' },
        { value: 'instrumentFlute', title: 'Instrument - Flute' },
        { value: 'instrumentPercussion', title: 'Instrument - Percussion' },
        { value: 'musicChords', title: 'Music Chords - Triangle Wave Synthesiser' },
        { value: 'musicMelody', title: 'Music Melody - Triangle Wave Synthesiser' },
        { value: 'musicCleanElectricGuitar', title: 'Music Melody - Clean Electric Guitar' },
        { value: 'musicDistortedElectricGuitar', title: 'Music Melody - Distorted Electric Guitar' },
        { value: 'musicBassGuitar', title: 'Music Bassline - Bass Guitar' }
    ];

  return (
    <div className='wrapper'>
        <button className={`presetOptionsLeftPanelButton ${!isOpen ? 'closed' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {
                isOpen
                ? <>Sound<i className="bi bi-arrow-bar-left p-2"></i></>
                : <>Sound<i className="bi bi-arrow-bar-right p-2"></i></>
            }
        </button>
      <div className={`presetOptionsLeftPanelContainer ${isOpen ? 'open' : 'closed'}`}>
        <div className='leftPanel'>
          <div className='content d-flex flex-column'>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Sound</h4>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Master Volume</h4>
                        <VolumeSlider volume={volume} setVolume={setVolume} />
                    </div>
                </div>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Master Panning</h4>
                        <SpatialAudioSlider width={width} setWidth={setWidth} depth={depth} setDepth={setDepth} height={height} setHeight={setHeight} />
                    </div>
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement</h4>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
                        <Dropdown 
                            options={instrumentOptions}
                            selectedOption={variable0Instrument}
                            onSelect={variable0InstrumentSelect}
                        />
                    </div>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Volume</h4>
                        <VolumeSlider volume={variable0Volume} setVolume={variable0SetVolume} />
                    </div>
                    {
                        !hideMute && (
                            <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable0MuteOnClick()}>
                                <h4 style={{ fontWeight: variable0MuteMode ? 'bold' : '' }}>{variable0MuteMode ? 'Unmute' : 'Mute' }</h4>
                                <i className={`bi bi-volume-mute${variable0MuteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Panning</h4>
                        <SpatialAudioSlider width={variable0Width} setWidth={variable0SetWidth} depth={variable0Depth} setDepth={variable0SetDepth} height={variable0Height} setHeight={variable0SetHeight} />
                    </div>
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture</h4>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
                        <Dropdown 
                            options={instrumentOptions}
                            selectedOption={variable1Instrument}
                            onSelect={variable1InstrumentSelect}
                        />
                    </div>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Volume</h4>
                        <VolumeSlider volume={variable1Volume} setVolume={variable1SetVolume} />
                    </div>
                    {
                        !hideMute && (
                            <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable1MuteOnClick()}>
                                <h4 style={{ fontWeight: variable1MuteMode ? 'bold' : '' }}>{variable1MuteMode ? 'Unmute' : 'Mute' }</h4>
                                <i className={`bi bi-volume-mute${variable1MuteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Panning</h4>
                        <SpatialAudioSlider width={variable1Width} setWidth={variable1SetWidth} depth={variable1Depth} setDepth={variable1SetDepth} height={variable1Height} setHeight={variable1SetHeight} />
                    </div>
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature</h4>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
                        <Dropdown 
                            options={instrumentOptions}
                            selectedOption={variable2Instrument}
                            onSelect={variable2InstrumentSelect}
                        />
                    </div>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Volume</h4>
                        <VolumeSlider volume={variable2Volume} setVolume={variable2SetVolume} />
                    </div>
                    {
                        !hideMute && (
                            <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable2MuteOnClick()}>
                                <h4 style={{ fontWeight: variable2MuteMode ? 'bold' : '' }}>{variable2MuteMode ? 'Unmute' : 'Mute' }</h4>
                                <i className={`bi bi-volume-mute${variable2MuteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Panning</h4>
                        <SpatialAudioSlider width={variable2Width} setWidth={variable2SetWidth} depth={variable2Depth} setDepth={variable2SetDepth} height={variable2Height} setHeight={variable2SetHeight} />
                    </div>
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity</h4>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
                        <Dropdown 
                            options={instrumentOptions}
                            selectedOption={variable3Instrument}
                            onSelect={variable3InstrumentSelect}
                        />
                    </div>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Volume</h4>
                        <VolumeSlider volume={variable3Volume} setVolume={variable3SetVolume} />
                    </div>
                    {
                        !hideMute && (
                            <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable3MuteOnClick()}>
                                <h4 style={{ fontWeight: variable3MuteMode ? 'bold' : '' }}>{variable3MuteMode ? 'Unmute' : 'Mute' }</h4>
                                <i className={`bi bi-volume-mute${variable3MuteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                            </div>
                        )
                    }
                </div>
                <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Panning</h4>
                        <SpatialAudioSlider width={variable3Width} setWidth={variable3SetWidth} depth={variable3Depth} setDepth={variable3SetDepth} height={variable3Height} setHeight={variable3SetHeight} />
                    </div>
                </div>
            </div>
            {
                derivedData && (
                    <>
                        <div>
                            <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>VPD</h4>
                            <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
                                    <Dropdown 
                                        options={instrumentOptions}
                                        selectedOption={variable4Instrument}
                                        onSelect={variable4InstrumentSelect}
                                    />
                                </div>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Volume</h4>
                                    <VolumeSlider volume={variable4Volume} setVolume={variable4SetVolume} />
                                </div>
                                {
                                    !hideMute && (
                                        <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable4MuteOnClick()}>
                                            <h4 style={{ fontWeight: variable4MuteMode ? 'bold' : '' }}>{variable4MuteMode ? 'Unmute' : 'Mute' }</h4>
                                            <i className={`bi bi-volume-mute${variable4MuteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Panning</h4>
                                    <SpatialAudioSlider width={variable4Width} setWidth={variable4SetWidth} depth={variable4Depth} setDepth={variable4SetDepth} height={variable4Height} setHeight={variable4SetHeight} />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth</h4>
                            <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Instrument Type</h4>
                                    <Dropdown 
                                        options={instrumentOptions}
                                        selectedOption={variable5Instrument}
                                        onSelect={variable5InstrumentSelect}
                                    />
                                </div>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Volume</h4>
                                    <VolumeSlider volume={variable5Volume} setVolume={variable5SetVolume} />
                                </div>
                                {
                                    !hideMute && (
                                        <div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable5MuteOnClick()}>
                                            <h4 style={{ fontWeight: variable5MuteMode ? 'bold' : '' }}>{variable5MuteMode ? 'Unmute' : 'Mute' }</h4>
                                            <i className={`bi bi-volume-mute${variable5MuteMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Panning</h4>
                                    <SpatialAudioSlider width={variable5Width} setWidth={variable5SetWidth} depth={variable5Depth} setDepth={variable5SetDepth} height={variable5Height} setHeight={variable5SetHeight} />
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
