import React from 'react';

const Toggle = ({ value=false, onChange=()=>{}, disabled=false }) => {
  return (
    <div className='form-check form-switch'>
      <input
        className='form-check-input'
        style={{ transform: 'scale(1.5)', transformOrigin: 'left center' }}
        type='checkbox'
        role='switch'
        id='flexSwitchCheckDefault'
        checked={value}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};

export default Toggle;