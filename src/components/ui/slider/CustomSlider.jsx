import { useState } from 'react';

const CustomSlider = ({ value=100, setValue=()=>{}, minValue=0, maxValue=100, decimal=false, disabled=false }) => {

  const validateValue = input => Math.max(minValue, Math.min(maxValue, input));

  const handleSliderChange = e => setValue(Number(e.target.value));

  const handleInputChange = e => {
    let val = 0;
    if (decimal) val = parseFloat(e.target.value);
    else val = parseInt(e.target.value, 10);
    if (!isNaN(val)) setValue(validateValue(val));
    else setValue(0);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <input
        id="volume-slider"
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={handleSliderChange}
        step={decimal ? 0.01 : 1}
        style={{ width: '100%' }}
        disabled={disabled}
      />
      <input
        type="number"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={handleInputChange}
        style={{ width: '4em' }}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomSlider;
