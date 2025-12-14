import { useState } from 'react';

const RangeSlider = ({
  minValue = 0,
  maxValue = 100,
  minVal = 0,
  maxVal = 100,
  setMinVal = () => {},
  setMaxVal = () => {},
  decimal = false,
  disabled = false,
}) => {

  const validateMin = val => Math.min(Math.max(val, minValue), maxVal);
  const validateMax = val => Math.max(Math.min(val, maxValue), minVal);

  const handleMinChange = e => {
    let val = decimal ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (decimal) val = Math.round(val * 100) / 100;
      setMinVal(validateMin(val));
    }
  };

  const handleMaxChange = e => {
    let val = decimal ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (decimal) val = Math.round(val * 100) / 100;
      setMaxVal(validateMax(val));
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', gap: '1rem' }}>
      {/* Min slider */}
      <div className='d-flex flex-column align-items-start' style={{ flex: 1, width: '100%' }}>
        <div className='d-flex flex-row gap-3' style={{ width: '100%' }}>
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={minVal}
            onChange={handleMinChange}
            disabled={disabled}
            style={{ width: '100%' }}
          />
          <input
            type="number"
            min={minValue}
            max={maxValue}
            value={minVal}
            onChange={handleMinChange}
            style={{ width: '100px' }}
            disabled={disabled}
          />
        </div>
        <h5>Minimum</h5>
      </div>
      {/* Max slider */}
      <div className='d-flex flex-column align-items-start' style={{ flex: 1, width: '100%' }}>
        <div className='d-flex flex-row gap-3' style={{ width: '100%' }}>
          <input
            type="range"
            min={minValue}
            max={maxValue}
            value={maxVal}
            onChange={handleMaxChange}
            disabled={disabled}
            style={{ width: '100%' }}
          />
          <input
            type="number"
            min={minValue}
            max={maxValue}
            value={maxVal}
            onChange={handleMaxChange}
            style={{ width: '100px' }}
            disabled={disabled}
          />
        </div>
        <h5>Maximum</h5>
      </div>
    </div>
  );
};


export default RangeSlider;
