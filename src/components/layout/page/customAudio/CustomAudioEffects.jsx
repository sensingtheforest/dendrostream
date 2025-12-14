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

export default function CustomAudioEffects({ endpoints={} }) {
  const navigate = useNavigate();

  const binaryOptions = [
    { value: 'on', title: 'On' },
    { value: 'off', title: 'Off' }
  ];

  const { playbackOptions, 
      setPlaybackOptions
    } = useCustomAudio();

  const eqSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, enabled: enabled } })); };
  const eqLowFrequencyCentreSet = lowFrequencyCentre => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, lowFrequencyCentre: lowFrequencyCentre } })); };
  const eqLowFrequencyQSet = lowFrequencyQ => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, lowFrequencyQ: lowFrequencyQ } })); };
  const eqLowFrequencyGainSet = lowFrequencyGain => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, lowFrequencyGain: lowFrequencyGain } })); };
  const eqMidFrequencyCentreSet = midFrequencyCentre => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, midFrequencyCentre: midFrequencyCentre } })); };
  const eqMidFrequencyQSet = midFrequencyQ => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, midFrequencyQ: midFrequencyQ } })); };
  const eqMidFrequencyGainSet = midFrequencyGain => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, midFrequencyGain: midFrequencyGain } })); };
  const eqHighFrequencyCentreSet = highFrequencyCentre => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, highFrequencyCentre: highFrequencyCentre } })); };
  const eqHighFrequencyQSet = highFrequencyQ => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, highFrequencyQ: highFrequencyQ } })); };
  const eqHighFrequencyGainSet = highFrequencyGain => { setPlaybackOptions(prev => ({ ...prev, eq: { ...prev.eq, highFrequencyGain: highFrequencyGain } })); };

  const compressionSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, compression: { ...prev.compression, enabled: enabled } })); };
  const compressionThresholdSet = threshold => { setPlaybackOptions(prev => ({ ...prev, compression: { ...prev.compression, threshold: threshold } })); };
  const compressionRatioSet = ratio => { setPlaybackOptions(prev => ({ ...prev, compression: { ...prev.compression, ratio: ratio } })); };
  const compressionAttackSet = attack => { setPlaybackOptions(prev => ({ ...prev, compression: { ...prev.compression, attack: attack } })); };
  const compressionReleaseSet = release => { setPlaybackOptions(prev => ({ ...prev, compression: { ...prev.compression, release: release } })); };
  const compressionKneeSet = knee => { setPlaybackOptions(prev => ({ ...prev, compression: { ...prev.compression, knee: knee } })); };

  const distortionSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, distortion: { ...prev.distortion, enabled: enabled } })); };
  const distortionDriveSet = drive => { setPlaybackOptions(prev => ({ ...prev, distortion: { ...prev.distortion, drive: drive } })); };

  // const bitCrusherSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, bitCrusher: { ...prev.bitCrusher, enabled: enabled } })); };
  // const bitCrusherBitDepthSet = bitDepth => { setPlaybackOptions(prev => ({ ...prev, bitCrusher: { ...prev.bitCrusher, bitDepth: bitDepth } })); };
  // const bitCrusherFrequencyReductionSet = frequencyReduction => { setPlaybackOptions(prev => ({ ...prev, bitCrusher: { ...prev.bitCrusher, frequencyReduction: frequencyReduction } })); };

  const delaySelect = enabled => { setPlaybackOptions(prev => ({ ...prev, delay: { ...prev.delay, enabled: enabled } })); };
  const delayTimeSet = time => { setPlaybackOptions(prev => ({ ...prev, delay: { ...prev.delay, time: time } })); };
  const delayFeedbackGainSet = feedbackGain => { setPlaybackOptions(prev => ({ ...prev, delay: { ...prev.delay, feedbackGain: feedbackGain } })); };
  const delayWetLevelSet = wetLevel => { setPlaybackOptions(prev => ({ ...prev, delay: { ...prev.delay, wetLevel: wetLevel } })); };

  const reverbSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, reverb: { ...prev.reverb, enabled: enabled } })); };
  const reverbPreDelayTimeSet = preDelayTime => { setPlaybackOptions(prev => ({ ...prev, reverb: { ...prev.reverb, preDelayTime: preDelayTime } })); };
  const reverbDecayTimeSet = decayTime => { setPlaybackOptions(prev => ({ ...prev, reverb: { ...prev.reverb, decayTime: decayTime } })); };
  const reverbWetLevelSet = wetLevel => { setPlaybackOptions(prev => ({ ...prev, reverb: { ...prev.reverb, wetLevel: wetLevel } })); };

  const chorusSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, chorus: { ...prev.chorus, enabled: enabled } })); };
  const chorusRateSet = rate => { setPlaybackOptions(prev => ({ ...prev, chorus: { ...prev.chorus, rate: rate } })); };
  const chorusDepthSet = depth => { setPlaybackOptions(prev => ({ ...prev, chorus: { ...prev.chorus, depth: depth } })); };
  const chorusWetLevelSet = wetLevel => { setPlaybackOptions(prev => ({ ...prev, chorus: { ...prev.chorus, wetLevel: wetLevel } })); };

  const flangerSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, flanger: { ...prev.flanger, enabled: enabled } })); };
  const flangerRateSet = rate => { setPlaybackOptions(prev => ({ ...prev, flanger: { ...prev.flanger, rate: rate } })); };
  const flangerDepthSet = depth => { setPlaybackOptions(prev => ({ ...prev, flanger: { ...prev.flanger, depth: depth } })); };
  const flangerFeedbackSet = feedback => { setPlaybackOptions(prev => ({ ...prev, flanger: { ...prev.flanger, feedback: feedback } })); };
  const flangerWetLevelSet = wetLevel => { setPlaybackOptions(prev => ({ ...prev, flanger: { ...prev.flanger, wetLevel: wetLevel } })); };

  // const phaserSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, phaser: { ...prev.phaser, enabled: enabled } })); };
  // const phaserRateSet = rate => { setPlaybackOptions(prev => ({ ...prev, phaser: { ...prev.phaser, rate: rate } })); };
  // const phaserDepthSet = depth => { setPlaybackOptions(prev => ({ ...prev, phaser: { ...prev.phaser, depth: depth } })); };
  // const phaserFeedbackSet = feedback => { setPlaybackOptions(prev => ({ ...prev, phaser: { ...prev.phaser, feedback: feedback } })); };
  // const phaserWetLevelSet = wetLevel => { setPlaybackOptions(prev => ({ ...prev, phaser: { ...prev.phaser, wetLevel: wetLevel } })); };

  const tremoloSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, tremolo: { ...prev.tremolo, enabled: enabled } })); };
  const tremoloFrequencySet = frequency => { setPlaybackOptions(prev => ({ ...prev, tremolo: { ...prev.tremolo, frequency: frequency } })); };
  const tremoloDepthSet = depth => { setPlaybackOptions(prev => ({ ...prev, tremolo: { ...prev.tremolo, depth: depth } })); };

  const vibratoSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, vibrato: { ...prev.vibrato, enabled: enabled } })); };
  const vibratoFrequencySet = frequency => { setPlaybackOptions(prev => ({ ...prev, vibrato: { ...prev.vibrato, frequency: frequency } })); };
  const vibratoDepthSet = depth => { setPlaybackOptions(prev => ({ ...prev, vibrato: { ...prev.vibrato, depth: depth } })); };

  // const autoPanSelect = enabled => { setPlaybackOptions(prev => ({ ...prev, autoPan: { ...prev.autoPan, enabled: enabled } })); };
  // const autoPanRateSet = rate => { setPlaybackOptions(prev => ({ ...prev, autoPan: { ...prev.autoPan, rate: rate } })); };
  // const autoPanDepthSet = depth => { setPlaybackOptions(prev => ({ ...prev, autoPan: { ...prev.autoPan, depth: depth } })); };

  return (
    <PageLayout title='Custom Audio - Effects'>
      <DropdownSonifierStepper selected='effects' />
      <div className='p-5'>
        <h4>Customise the effects applied to the selected sounds or instruments:</h4>
      </div>
      <div className=''>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Equalisation (EQ)</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.eq.enabled}
                  onSelect={eqSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Low Frequency Centre (Hz)</h4>
              <CustomSlider value={playbackOptions.eq.lowFrequencyCentre} setValue={eqLowFrequencyCentreSet} minValue={20} maxValue={20000} />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Low Frequency Q</h4>
              <CustomSlider value={playbackOptions.eq.lowFrequencyQ} setValue={eqLowFrequencyQSet} minValue={0.1} maxValue={18} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Low Frequency Gain</h4>
              <CustomSlider value={playbackOptions.eq.lowFrequencyGain} setValue={eqLowFrequencyGainSet} minValue={-40} maxValue={40} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Mid Frequency Centre (Hz)</h4>
              <CustomSlider value={playbackOptions.eq.midFrequencyCentre} setValue={eqMidFrequencyCentreSet} minValue={20} maxValue={20000} />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Mid Frequency Q</h4>
              <CustomSlider value={playbackOptions.eq.midFrequencyQ} setValue={eqMidFrequencyQSet} minValue={0.1} maxValue={18} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Mid Frequency Gain</h4>
              <CustomSlider value={playbackOptions.eq.midFrequencyGain} setValue={eqMidFrequencyGainSet} minValue={-40} maxValue={40} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>High Frequency Centre (Hz)</h4>
              <CustomSlider value={playbackOptions.eq.highFrequencyCentre} setValue={eqHighFrequencyCentreSet} minValue={20} maxValue={20000} />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>High Frequency Q</h4>
              <CustomSlider value={playbackOptions.eq.highFrequencyQ} setValue={eqHighFrequencyQSet} minValue={0.1} maxValue={18} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>High Frequency Gain</h4>
              <CustomSlider value={playbackOptions.eq.highFrequencyGain} setValue={eqHighFrequencyGainSet} minValue={-40} maxValue={40} decimal />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Compression</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.compression.enabled}
                  onSelect={compressionSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Threshold (dB)</h4>
              <CustomSlider value={playbackOptions.compression.threshold} setValue={compressionThresholdSet} minValue={-100} maxValue={0} />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Ratio (:1)</h4>
              <CustomSlider value={playbackOptions.compression.ratio} setValue={compressionRatioSet} minValue={1} maxValue={20} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Attack (s)</h4>
              <CustomSlider value={playbackOptions.compression.attack} setValue={compressionAttackSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Release (s)</h4>
              <CustomSlider value={playbackOptions.compression.release} setValue={compressionReleaseSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Knee (dB)</h4>
              <CustomSlider value={playbackOptions.compression.knee} setValue={compressionKneeSet} minValue={0} maxValue={40} decimal />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Distortion</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.distortion.enabled}
                  onSelect={distortionSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Drive</h4>
              <CustomSlider value={playbackOptions.distortion.drive} setValue={distortionDriveSet} minValue={0} maxValue={2} decimal />
          </div>
        </div>
        {/* <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Bit Crusher</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.bitCrusher.enabled}
                  onSelect={bitCrusherSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Bit Depth</h4>
              <CustomSlider value={playbackOptions.bitCrusher.bitDepth} setValue={bitCrusherBitDepthSet} minValue={1} maxValue={16} />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Frequency Reduction</h4>
              <CustomSlider value={playbackOptions.bitCrusher.frequencyReduction} setValue={bitCrusherFrequencyReductionSet} minValue={1} maxValue={20} />
          </div>
        </div> */}
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Delay</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.delay.enabled}
                  onSelect={delaySelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Delay Time (s)</h4>
              <CustomSlider value={playbackOptions.delay.time} setValue={delayTimeSet} minValue={0} maxValue={5} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Feedback Gain</h4>
              <CustomSlider value={playbackOptions.delay.feedbackGain} setValue={delayFeedbackGainSet} minValue={0} maxValue={0.95} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Wet Level</h4>
              <CustomSlider value={playbackOptions.delay.wetLevel} setValue={delayWetLevelSet} minValue={0.0} maxValue={1.0} decimal />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Reverb</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.reverb.enabled}
                  onSelect={reverbSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Pre-Delay Time (ms)</h4>
              <CustomSlider value={playbackOptions.reverb.preDelayTime} setValue={reverbPreDelayTimeSet} minValue={0} maxValue={100} />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Decay Time (s)</h4>
              <CustomSlider value={playbackOptions.reverb.decayTime} setValue={reverbDecayTimeSet} minValue={0.1} maxValue={10} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Wet Level</h4>
              <CustomSlider value={playbackOptions.reverb.wetLevel} setValue={reverbWetLevelSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Chorus</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.chorus.enabled}
                  onSelect={chorusSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Rate (Hz)</h4>
              <CustomSlider value={playbackOptions.chorus.rate} setValue={chorusRateSet} minValue={0.1} maxValue={5} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Depth (ms)</h4>
              <CustomSlider value={playbackOptions.chorus.depth} setValue={chorusDepthSet} minValue={0} maxValue={10} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Wet Level</h4>
              <CustomSlider value={playbackOptions.chorus.wetLevel} setValue={chorusWetLevelSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Flanger</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.flanger.enabled}
                  onSelect={flangerSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Rate (Hz)</h4>
              <CustomSlider value={playbackOptions.flanger.rate} setValue={flangerRateSet} minValue={0.1} maxValue={10} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Depth (ms)</h4>
              <CustomSlider value={playbackOptions.flanger.depth} setValue={flangerDepthSet} minValue={0} maxValue={10} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Feedback</h4>
              <CustomSlider value={playbackOptions.flanger.feedback} setValue={flangerFeedbackSet} minValue={0} maxValue={0.9} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Wet Level</h4>
              <CustomSlider value={playbackOptions.flanger.wetLevel} setValue={flangerWetLevelSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        {/* <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Phaser</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.phaser.enabled}
                  onSelect={phaserSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Rate (Hz)</h4>
              <CustomSlider value={playbackOptions.phaser.rate} setValue={phaserRateSet} minValue={0.1} maxValue={5} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Depth (ms)</h4>
              <CustomSlider value={playbackOptions.phaser.depth} setValue={phaserDepthSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Feedback</h4>
              <CustomSlider value={playbackOptions.phaser.feedback} setValue={phaserFeedbackSet} minValue={0} maxValue={0.9} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Wet Level</h4>
              <CustomSlider value={playbackOptions.phaser.wetLevel} setValue={phaserWetLevelSet} minValue={0} maxValue={1} decimal />
          </div>
        </div> */}
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Tremolo</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.tremolo.enabled}
                  onSelect={tremoloSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Frequency (Hz)</h4>
              <CustomSlider value={playbackOptions.tremolo.frequency} setValue={tremoloFrequencySet} minValue={0.1} maxValue={20} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Depth</h4>
              <CustomSlider value={playbackOptions.tremolo.depth} setValue={tremoloDepthSet} minValue={0} maxValue={1} decimal />
          </div>
        </div>
        <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Vibrato</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.vibrato.enabled}
                  onSelect={vibratoSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Frequency (Hz)</h4>
              <CustomSlider value={playbackOptions.vibrato.frequency} setValue={vibratoFrequencySet} minValue={3} maxValue={12} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Depth</h4>
              <CustomSlider value={playbackOptions.vibrato.depth} setValue={vibratoDepthSet} minValue={0} maxValue={50} decimal />
          </div>
        </div>
        {/* <h4 style={{ fontWeight: 'bold', paddingBottom: '2rem', marginBottom: '2rem', borderBottom: '1px solid black', marginLeft: '30%', marginRight: '30%' }}>Auto-Pan</h4>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Enabled</h4>
              <Dropdown 
                  options={binaryOptions}
                  selectedOption={playbackOptions.autoPan.enabled}
                  onSelect={autoPanSelect}
              />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Rate (Hz)</h4>
              <CustomSlider value={playbackOptions.autoPan.rate} setValue={autoPanRateSet} minValue={0.1} maxValue={10} decimal />
          </div>
        </div>
        <div className="d-flex justify-content-center responsive-personalised-sound" style={{ gap: '2rem',  paddingBottom: '2rem' }}>
          <div className='d-flex flex-column responsive-control-labels'>
              <h4 style={{ textAlign: 'left' }}>Depth</h4>
              <CustomSlider value={playbackOptions.autoPan.depth} setValue={autoPanDepthSet} minValue={0} maxValue={1} decimal />
          </div>
        </div> */}
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => navigate('/custom-audio/layers')} hasTitle title='Back' />
        <Button onClick={() => navigate('/custom-audio/done')} hasTitle title='Next' />
      </div>

{/* THE TEMPO/RHYTHM SELECTION */}


      {/* <Button hasTitle title='Help' onClick={() => navigate('/help/custom-audio')} /> */}
    </PageLayout>
  )
}