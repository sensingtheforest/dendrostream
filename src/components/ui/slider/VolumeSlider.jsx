import { useState } from 'react';

const VolumeSlider = ({ volume=100, setVolume=()=>{}, disabled=false }) => {

  const validateVolume = input => Math.max(0, Math.min(100, input));

  const handleSliderChange = e => setVolume(Number(e.target.value));

  const handleInputChange = e => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setVolume(validateVolume(val));
    else setVolume(0);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <input
        id="volume-slider"
        type="range"
        min="0"
        max="100"
        value={volume}
        onChange={handleSliderChange}
        style={{ width: '100%' }}
        disabled={disabled}
      />
      <input
        type="number"
        min="0"
        max="100"
        value={volume}
        onChange={handleInputChange}
        style={{ width: '4em' }}
        disabled={disabled}
      />
    </div>
  );
};

export default VolumeSlider;
