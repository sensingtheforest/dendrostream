import { useState } from 'react';

const SpatialAudioSlider = ({ width=0, setWidth=()=>{}, depth=0, setDepth=()=>{}, height=0, setHeight=()=>{}, disabled=false }) => {

  const validateValue = input => Math.max(-10, Math.min(10, input));

  const handleWidthSliderChange = e => setWidth(Number(e.target.value));
  const handleDepthSliderChange = e => setDepth(Number(e.target.value));
  const handleHeightSliderChange = e => setHeight(Number(e.target.value));

  const handleWidthInputChange = e => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setWidth(validateValue(val));
    else setWidth(0);
  };
  const handleDepthInputChange = e => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setDepth(validateValue(val));
    else setDepth(0);
  };
  const handleHeightInputChange = e => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setHeight(validateValue(val));
    else setHeight(0);
  };

  return (
    <div className='responsive-header responsive-personalised-sound' style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div className='d-flex flex-column'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    id="width-slider"
                    type="range"
                    min="-10"
                    max="10"
                    value={width}
                    onChange={handleWidthSliderChange}
                    style={{ width: '100%' }}
                    disabled={disabled}
                />
                <input
                    type="number"
                    min="-10"
                    max="10"
                    value={width}
                    onChange={handleWidthInputChange}
                    style={{ width: '4em' }}
                    disabled={disabled}
                />
            </div>
            <h6 style={{ textAlign: 'left' }}>Width</h6>
        </div>
        <div className='d-flex flex-column'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    id="volume-slider"
                    type="range"
                    min="-10"
                    max="10"
                    value={depth}
                    onChange={handleDepthSliderChange}
                    style={{ width: '100%' }}
                    disabled={disabled}
                />
                <input
                    type="number"
                    min="-10"
                    max="10"
                    value={depth}
                    onChange={handleDepthInputChange}
                    style={{ width: '4em' }}
                    disabled={disabled}
                />
            </div>
            <h6 style={{ textAlign: 'left' }}>Depth</h6>
        </div>
        <div className='d-flex flex-column'>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                    id="volume-slider"
                    type="range"
                    min="-10"
                    max="10"
                    value={height}
                    onChange={handleHeightSliderChange}
                    style={{ width: '100%' }}
                    disabled={disabled}
                />
                <input
                    type="number"
                    min="-10"
                    max="10"
                    value={height}
                    onChange={handleHeightInputChange}
                    style={{ width: '4em' }}
                    disabled={disabled}
                />
            </div>
            <h6 style={{ textAlign: 'left' }}>Height</h6>
        </div>
    </div>
  );
};

export default SpatialAudioSlider;
