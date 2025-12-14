import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import DropdownSonifierStepper from '../../../ui/stepper/DropdownSonifierStepper';
import CustomSlider from '../../../ui/slider/CustomSlider';
import Dropdown from '../../../ui/dropdown/Dropdown';
import RangeSlider from '../../../ui/slider/RangeSlider';
import { useCustomAudio } from '../../../context/CustomAudioContext';

export default function CustomAudioBeat({ endpoints={} }) {
  const navigate = useNavigate();

  const playbackSpeedUnitsOptions = [
    { value: 'musical', title: 'Musical Units' },
    { value: 'raw', title: 'Absolute Values' }
  ];

  const timeSignatureOptions = [
    { value: '44', title: '4/4' },
    { value: '34', title: '3/4' },
    { value: '24', title: '2/4' },
    { value: '68', title: '6/8' },
    { value: '128', title: '12/8' },
    { value: '54', title: '5/4' },
    { value: '78', title: '7/8' }
  ];

  const {
    playbackOptions,
    setPlaybackOptions
  } = useCustomAudio();

  const bpmToMs = bpm => 60000 / bpm;
  const msToBpm = ms => 60000 / ms;

  const playbackSpeedUnitsSelect = playbackSpeedUnits => { setPlaybackOptions(prev => ({ ...prev, playbackSpeedUnits: playbackSpeedUnits })); };
  const playbackSpeedSet = playbackSpeed => { 
    setPlaybackOptions(prev => ({ ...prev, playbackSpeed: playbackSpeed }));
    const tempoPlaybackSpeed = msToBpm(playbackSpeed);
    setPlaybackOptions(prev => ({ ...prev, tempoPlaybackSpeed: tempoPlaybackSpeed }));
  };
  const tempoPlaybackSpeedSet = tempoPlaybackSpeed => {
    setPlaybackOptions(prev => ({ ...prev, tempoPlaybackSpeed: tempoPlaybackSpeed }));
    const playbackSpeed = bpmToMs(tempoPlaybackSpeed);
    setPlaybackOptions(prev => ({ ...prev, playbackSpeed: playbackSpeed })); 
  };

  const timeSignatureSelect = timeSignature => { setPlaybackOptions(prev => ({ ...prev, timeSignature: timeSignature })); };


  return (
    <PageLayout title='Custom Audio - Beat'>
      <DropdownSonifierStepper selected='beat' />
      <div className='p-5'>
        <h4>Customise the playback of the selected sounds or instruments:</h4>
      </div>
      <div className=''>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Playback Speed</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Playback Speed Units</h4>
              <Dropdown 
                  options={playbackSpeedUnitsOptions}
                  selectedOption={playbackOptions.playbackSpeedUnits}
                  onSelect={playbackSpeedUnitsSelect}
              />
          </div>
        </div>
        {
          (playbackOptions.playbackSpeedUnits === 'musical') ? (
            <>
              <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                    <h4 style={{ textAlign: 'left' }}>Tempo (BPM)</h4>
                    <CustomSlider value={playbackOptions.tempoPlaybackSpeed} setValue={tempoPlaybackSpeedSet} minValue={60} maxValue={600} />
                </div>
              </div>
              {/* <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
                <div className='d-flex flex-column responsive-control-labels'>
                    <h4 style={{ textAlign: 'left' }}>Time Signature</h4>
                    <Dropdown 
                        options={timeSignatureOptions}
                        selectedOption={playbackOptions.timeSignature}
                        onSelect={timeSignatureSelect}
                    />
                </div>
              </div> */}
            </>
          ) : (
            <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
              <div className='d-flex flex-column responsive-control-labels'>
                  <h4 style={{ textAlign: 'left' }}>Playback Speed (ms)</h4>
                  <CustomSlider value={playbackOptions.playbackSpeed} setValue={playbackSpeedSet} minValue={100} maxValue={1000} />
              </div>
            </div>
          )
        }
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/tone')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/pitch')} hasTitle title='Next' />
      </div>

{/* THE TEMPO/RHYTHM SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}