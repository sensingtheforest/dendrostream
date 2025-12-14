import React, { useState, useRef, useEffect } from 'react';
import '../../../App.css';
import VolumeSlider from '../slider/VolumeSlider';
import Dropdown from '../dropdown/Dropdown';
// import { useEndpoints } from '../../context/EndpointContext';

export default function PresetOptionsPanel({
    endpoints={},
    dataRange=0,
    dataRangeSet=()=>{},
    averagingPeriod=false,
    hideLive=false,
    hideMute=false,
    playbackSpeed=50,
    playbackSpeedSet=()=>{},
    zoom=50,
    zoomSet=()=>{},
    zoomHide=false,
    dataSourceHide=false,
    dataSource='northern_1',
    dataSourceSet=()=>{},
    volume=100,
    setVolume=()=>{},
    variable0Name='',
    variable0Volume=100,
    variable0SetVolume=()=>{},
    variable0MuteMode=false,
    variable0MuteOnClick=()=>{},
    variable0HideMode=false,
    variable0HideOnClick=()=>{},
    variable0HideHide=false,
    variable1Name='',
    variable1Volume=100,
    variable1SetVolume=()=>{},
    variable1MuteMode=false,
    variable1MuteOnClick=()=>{},
    variable1HideMode=false,
    variable1HideOnClick=()=>{},
    variable1HideHide=false,
    variable2Name='',
    variable2Volume=100,
    variable2SetVolume=()=>{},
    variable2MuteMode=false,
    variable2MuteOnClick=()=>{},
    variable2HideMode=false,
    variable2HideOnClick=()=>{},
    variable2HideHide=false,
    variable3Name='',
    variable3Volume=100,
    variable3SetVolume=()=>{},
    variable3MuteMode=false,
    variable3MuteOnClick=()=>{},
    variable3HideMode=false,
    variable3HideOnClick=()=>{},
    variable3HideHide=false,
    variable4Display=false,
    variable4Name='',
    variable4Volume=100,
    variable4SetVolume=()=>{},
    variable4MuteMode=false,
    variable4MuteOnClick=()=>{},
    variable4HideMode=false,
    variable4HideOnClick=()=>{},
    variable4HideHide=false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const averagingPeriodOptions = averagingPeriod || hideLive
  ? [
      { value: '24', title: 'Previous 24 Hours' },
      { value: '168', title: 'Previous 7 Days' },
      { value: '336', title: 'Previous 14 Days' },
      { value: '672', title: 'Previous 28 Days' },
      { value: '2192', title: 'Previous 3 Months' },
      { value: '4384', title: 'Previous 6 Months' },
      { value: '8760', title: 'Previous 1 Year' },
      { value: '0', title: 'All Data' },
    ]
  : [
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


  return (
    <div className='wrapper'>
      <div className='presetOptionsPanelContainer'>
        <div className='panel' style={{ height: isOpen ? `${contentHeight}px` : '0px' }}>
          <div ref={contentRef} className='content d-flex flex-column'>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Playback</h4>
                <div className="d-flex justify-content-center responsive-preset-playback-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                    {
                        !dataSourceHide && (<div className='d-flex flex-column responsive-control-labels'>
                            <h4 style={{ textAlign: 'left' }}>Data Source</h4>
                            <Dropdown 
                                // options={[{value: 'northern_1', title: 'Northern 1'}, {value: 'northern_2', title: 'Northern 2'}]}
                                options={endpoints}
                                selectedOption={dataSource}
                                onSelect={dataSourceSet}
                            />
                        </div>)
                    }
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>{averagingPeriod ? 'Averaging Period' : 'Data Range'}</h4>
                        <Dropdown 
                            options={averagingPeriodOptions}
                            selectedOption={dataRange}
                            onSelect={dataRangeSet}
                        />
                    </div>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playback Speed</h4>
                        <VolumeSlider volume={playbackSpeed} setVolume={playbackSpeedSet} />
                    </div>
                    {
                        !zoomHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }}>
                            <h4 style={{ textAlign: 'left' }}>Graph Zoom</h4>
                            <VolumeSlider volume={zoom} setVolume={zoomSet} />
                        </div>)
                    }
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Master Volume</h4>
                        <VolumeSlider volume={volume} setVolume={setVolume} />
                    </div>
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>{variable0Name}</h4>
                <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
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
                    {
                        !variable0HideHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable0HideOnClick()}>
                            <h4 style={{ fontWeight: variable0HideMode ? 'bold' : '' }}>{variable0HideMode ? 'Unhide' : 'Hide' }</h4>
                            <i className={`bi bi-eye-slash${variable0HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                        </div>)
                    }
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>{variable1Name}</h4>
                <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
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
                    {
                        !variable1HideHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable1HideOnClick()}>
                            <h4 style={{ fontWeight: variable1HideMode ? 'bold' : '' }}>{variable1HideMode ? 'Unhide' : 'Hide' }</h4>
                            <i className={`bi bi-eye-slash${variable1HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                        </div>)
                    }
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>{variable2Name}</h4>
                <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
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
                    {
                        !variable2HideHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable2HideOnClick()}>
                            <h4 style={{ fontWeight: variable2HideMode ? 'bold' : '' }}>{variable2HideMode ? 'Unhide' : 'Hide' }</h4>
                            <i className={`bi bi-eye-slash${variable2HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                        </div>)
                    }
                </div>
            </div>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>{variable3Name}</h4>
                <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
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
                    {
                        !variable3HideHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable3HideOnClick()}>
                            <h4 style={{ fontWeight: variable3HideMode ? 'bold' : '' }}>{variable3HideMode ? 'Unhide' : 'Hide' }</h4>
                            <i className={`bi bi-eye-slash${variable3HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                        </div>)
                    }
                </div>
            </div>
            {
                variable4Display && (
                    <div>
                        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>{variable4Name}</h4>
                        <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
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
                            {
                                !variable4HideHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable4HideOnClick()}>
                                    <h4 style={{ fontWeight: variable4HideMode ? 'bold' : '' }}>{variable4HideMode ? 'Unhide' : 'Hide' }</h4>
                                    <i className={`bi bi-eye-slash${variable4HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                </div>)
                            }
                        </div>
                    </div>
                )
            }
          </div>
        </div>
        <button className='presetOptionsPanelButton' onClick={() => setIsOpen(!isOpen)}>
          {
            isOpen ? <><i className="bi bi-arrow-bar-down p-2"></i>Options<i className="bi bi-arrow-bar-down p-2"></i></>
                : <><i className="bi bi-arrow-bar-up p-2"></i>Options<i className="bi bi-arrow-bar-up p-2"></i></>
          }
        </button>
      </div>
    </div>
  );
}
