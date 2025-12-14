import React, { useState, useRef, useEffect } from 'react';
import '../../../App.css';
import VolumeSlider from '../slider/VolumeSlider';
import Dropdown from '../dropdown/Dropdown';
import SpatialAudioSlider from '../slider/SpatialAudioSlider';
import Toggle from '../toggle/Toggle';

export default function PersonalisedPresetVisualsPanel({
    derivedData=false,
    variableHide=false,
    graphControls=true,
    // graphAxisAutoRescale=true,
    // graphAxisAutoRescaleSet=()=>{},
    gridBackground=false,
    gridBackgroundSet=()=>{},
    displayAllGraphData=false,
    displayAllGraphDataSet=()=>{},
    visuals='lineGraph',
    visualsSelect=()=>{},
    zoomHide=false,
    zoom=50,
    zoomSet=()=>{},
    graphColourScheme='schemeCategory10',
    graphColourSchemeSelect=()=>{},
    variable0HideMode=false,
    variable0HideOnClick=()=>{},
    variable1HideMode=false,
    variable1HideOnClick=()=>{},
    variable2HideMode=false,
    variable2HideOnClick=()=>{},
    variable3HideMode=false,
    variable3HideOnClick=()=>{},
    variable4HideMode=false,
    variable4HideOnClick=()=>{},
    variable5HideMode=false,
    variable5HideOnClick=()=>{}
}) {
  const [isOpen, setIsOpen] = useState(false);


    const visualOptions = [
        { value: 'lineGraph', title: 'Line Graph' },
        { value: 'tiledLineGraph', title: 'Tiled Line Graph' },
        { value: 'barChart', title: 'Bar Chart' },
        { value: 'dials', title: 'Dials' },
        { value: 'animation', title: 'Animation' }
    ];

    const colourOptions = [
        { value: 'schemeCategory10', title: 'Default' },
        { value: 'schemeAccent', title: 'Vibrant' },
        { value: 'schemeDark2', title: 'Dark' },
        { value: 'schemePaired', title: 'Light/Dark' },
        { value: 'schemePastel1', title: 'Pastel' },
        { value: 'schemePastel2', title: 'Soft' },
        { value: 'schemeSet1', title: 'Bright' },
        { value: 'schemeSet2', title: 'Mild' },
        { value: 'schemeSet3', title: 'Colourful' },
        { value: 'schemeTableau10', title: 'Balanced' }
    ];

  return (
    <div className='wrapper'>
        <button className={`presetOptionsRightPanelButton ${!isOpen ? 'closed' : ''}`} onClick={() => setIsOpen(!isOpen)}>
            {
                isOpen
                ? <><i className="bi bi-arrow-bar-right p-2"></i>Visuals</>
                : <><i className="bi bi-arrow-bar-left p-2"></i>Visuals</>
            }
        </button>
      <div className={`presetOptionsRightPanelContainer ${isOpen ? 'open' : 'closed'}`}>
        <div className='rightPanel'>
          <div className='content d-flex flex-column'>
            <div>
                <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Visuals</h4>
                <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: (zoomHide || !graphControls) ? '2rem' : '', borderBottom: (zoomHide || !graphControls) ? '1px solid black' : '' }}>
                    <div className='d-flex flex-column responsive-control-labels'>
                        <h4 style={{ textAlign: 'left' }}>Visuals Type</h4>
                        <Dropdown 
                            options={visualOptions}
                            selectedOption={visuals}
                            onSelect={visualsSelect}
                        />
                    </div>
                </div>
                {
                    graphControls && (
                        <>
                            <div className="d-flex justify-content-center responsive-preset-options" style={{ paddingBottom: '2rem' }}>
                                <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Graph Colour Scheme</h4>
                                    <Dropdown 
                                        options={colourOptions}
                                        selectedOption={graphColourScheme}
                                        onSelect={graphColourSchemeSelect}
                                    />
                                </div>
                            </div>
                            <div className='d-flex flex-wrap' style={{ gap: '2rem', marginBottom: '2rem' }}>
                                {/* <div className='d-flex flex-column responsive-control-labels'>
                                    <h4 style={{ textAlign: 'left' }}>Graph Axis Auto-Rescale</h4>
                                    <Toggle value={graphAxisAutoRescale} onChange={graphAxisAutoRescaleSet} />
                                </div> */}
                                <div className='d-flex flex-column responsive-control-labels responsive-toggle'>
                                    <h4 style={{ textAlign: 'left' }}>Display Graph Grid Background</h4>
                                    <Toggle value={gridBackground} onChange={gridBackgroundSet} />
                                </div>
                                <div className='d-flex flex-column responsive-control-labels responsive-toggle'>
                                    <h4 style={{ textAlign: 'left' }}>Display All Graph Data</h4>
                                    <Toggle value={displayAllGraphData} onChange={displayAllGraphDataSet} />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: zoomHide ? '' : '2rem', borderBottom: zoomHide ? '' : '1px solid black' }}>
                                {
                                    !zoomHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }}>
                                        <h4 style={{ textAlign: 'left' }}>Graph Zoom</h4>
                                        <VolumeSlider volume={zoom} setVolume={zoomSet} />
                                    </div>)
                                }
                            </div>
                        </>
                    )
                }
            </div>
            {
                !variableHide && (
                    <>
                        <div>
                            <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Displacement</h4>
                            <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                {
                                    !variableHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable0HideOnClick()}>
                                        <h4 style={{ fontWeight: variable0HideMode ? 'bold' : '' }}>{variable0HideMode ? 'Unhide' : 'Hide' }</h4>
                                        <i className={`bi bi-eye-slash${variable0HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Soil Moisture</h4>
                            <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                {
                                    !variableHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable1HideOnClick()}>
                                        <h4 style={{ fontWeight: variable1HideMode ? 'bold' : '' }}>{variable1HideMode ? 'Unhide' : 'Hide' }</h4>
                                        <i className={`bi bi-eye-slash${variable1HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Temperature</h4>
                            <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                {
                                    !variableHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable2HideOnClick()}>
                                        <h4 style={{ fontWeight: variable2HideMode ? 'bold' : '' }}>{variable2HideMode ? 'Unhide' : 'Hide' }</h4>
                                        <i className={`bi bi-eye-slash${variable2HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                    </div>)
                                }
                            </div>
                        </div>
                        <div>
                            <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Humidity</h4>
                            <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                {
                                    !variableHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable3HideOnClick()}>
                                        <h4 style={{ fontWeight: variable3HideMode ? 'bold' : '' }}>{variable3HideMode ? 'Unhide' : 'Hide' }</h4>
                                        <i className={`bi bi-eye-slash${variable3HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                    </div>)
                                }
                            </div>
                        </div>
                        {
                            derivedData && (
                                <>
                                    <div>
                                        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>VPD</h4>
                                        <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                            {
                                                !variableHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable4HideOnClick()}>
                                                    <h4 style={{ fontWeight: variable4HideMode ? 'bold' : '' }}>{variable4HideMode ? 'Unhide' : 'Hide' }</h4>
                                                    <i className={`bi bi-eye-slash${variable4HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                    <div>
                                        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tree Mean Growth</h4>
                                        <div className="d-flex justify-content-center responsive-preset-options" style={{ gap: '2rem',  paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black' }}>
                                            {
                                                !variableHide && (<div className='d-flex flex-column responsive-control-labels' style={{ cursor: 'pointer' }} onClick={() => variable5HideOnClick()}>
                                                    <h4 style={{ fontWeight: variable5HideMode ? 'bold' : '' }}>{variable5HideMode ? 'Unhide' : 'Hide' }</h4>
                                                    <i className={`bi bi-eye-slash${variable5HideMode ? '-fill' : ''}`} style={{ fontSize: '2em' }}></i>
                                                </div>)
                                            }
                                        </div>
                                    </div>
                                </>
                            )
                        }
                    </>
                )
            }
          </div>
        </div>
      </div>
    </div>
  );
}
