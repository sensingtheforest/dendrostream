import React, { useState, useRef, useEffect } from 'react';
import '../../../App.css';
import VolumeSlider from '../slider/VolumeSlider';
import Dropdown from '../dropdown/Dropdown';
import Toggle from '../toggle/Toggle';

export default function PersonalisedPresetPlaybackPanel({
    endpoints={},
    dataRange=0,
    dataRangeSet=()=>{},
    averagingPeriod=0,
    averagingPeriodSet=()=>{},
    playbackSpeed=50,
    playbackSpeedSet=()=>{},
    dataSourceHide=false,
    dataSource='northern_1',
    dataSourceSet=()=>{},
    dataSource2Hide=true,
    dataSource2='northern_2',
    dataSourceSet2=()=>{},
    // smoothValues=false,
    // smoothValuesSet=()=>{},
    // averageValues=false,
    // averageValuesSet=()=>{}
}) {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

    const averagingPeriodOptions = [
        { value: '24', title: 'Previous 24 Hours' },
        { value: '168', title: 'Previous 7 Days' },
        { value: '336', title: 'Previous 14 Days' },
        { value: '672', title: 'Previous 28 Days' },
        { value: '2192', title: 'Previous 3 Months' },
        { value: '4384', title: 'Previous 6 Months' },
        { value: '8760', title: 'Previous 1 Year' },
        { value: '0', title: 'All Data' }
    ];
    const dataRangeOptions = [
        { value: '-1', title: 'Live' },
        { value: '24', title: 'Previous 24 Hours' },
        { value: '168', title: 'Previous 7 Days' },
        { value: '336', title: 'Previous 14 Days' },
        { value: '672', title: 'Previous 28 Days' },
        { value: '2192', title: 'Previous 3 Months' },
        { value: '4384', title: 'Previous 6 Months' },
        { value: '8760', title: 'Previous 1 Year' },
        { value: '0', title: 'All Data' }
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
                                options={endpoints}
                                selectedOption={dataSource}
                                onSelect={dataSourceSet}
                            />
                        </div>)
                    }
                    {
                        !dataSource2Hide && (<div className='d-flex flex-column responsive-control-labels'>
                            <h4 style={{ textAlign: 'left' }}>Data Source 2</h4>
                            <Dropdown
                                options={endpoints}
                                selectedOption={dataSource2}
                                onSelect={dataSourceSet2}
                            />
                        </div>)
                    }
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
                    {/* <div className='d-flex justify-content-center flex-wrap' style={{ gap: '5rem' }}>
                        <div className='d-flex flex-column responsive-control-labels'>
                            <h4 style={{ textAlign: 'left' }}>Data Smoothing</h4>
                            <Toggle value={smoothValues} onChange={smoothValuesSet} />
                        </div>
                        <div className='d-flex flex-column responsive-control-labels responsive-toggle'>
                            <h4 style={{ textAlign: 'left' }}>Include Average</h4>
                            <Toggle value={averageValues} onChange={averageValuesSet} />
                        </div>
                    </div> */}
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Playback Speed</h4>
                        <VolumeSlider volume={playbackSpeed} setVolume={playbackSpeedSet} />
                    </div>
                </div>
            </div>
          </div>
        </div>
        <button className='presetOptionsPanelButton' onClick={() => setIsOpen(!isOpen)}>
          {
            isOpen ? <><i className="bi bi-arrow-bar-down p-2"></i>Playback<i className="bi bi-arrow-bar-down p-2"></i></>
                : <><i className="bi bi-arrow-bar-up p-2"></i>Playback<i className="bi bi-arrow-bar-up p-2"></i></>
          }
        </button>
      </div>
    </div>
  );
}
