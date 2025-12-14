export default class FMSynth {
  constructor(audioCtx) {
    this.audioCtx = audioCtx;

    // Oscillators
    this.carrierOsc = this.audioCtx.createOscillator();
    this.modulatorOsc = this.audioCtx.createOscillator();

    // Modulation index (controls how much the modulator affects the carrier)
    this.modulationGain = this.audioCtx.createGain();

    // Amplitude envelope
    this.outputGain = this.audioCtx.createGain();
    this.outputGain.gain.value = 0;

    // Connect FM routing
    this.modulatorOsc.connect(this.modulationGain);
    this.modulationGain.connect(this.carrierOsc.frequency);
    this.carrierOsc.connect(this.outputGain);
  }

  setCarrierFrequency(freq = 440) {
    this.carrierOsc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + 0.05);
  }

  setModulatorFrequency(freq = 220) {
    this.modulatorOsc.frequency.setValueAtTime(freq, this.audioCtx.currentTime + 0.05);
  }

  setHarmonicity(ratio = 2) {
    const carrierFreq = this.carrierOsc.frequency.value;
    this.setModulatorFrequency(carrierFreq * ratio);
  }

  setModulationIndex(index = 100) {
    this.modulationGain.gain.setValueAtTime(index, this.audioCtx.currentTime + 0.05);
  }

  setCarrierWaveform(type = 'sine') {
    this.carrierOsc.type = type;
  }

  setModulatorWaveform(type = 'sine') {
    this.modulatorOsc.type = type;
  }

  triggerEnvelope(attack = 0.1, decay = 0.3, sustain = 0.7, release = 0.5) {
    const now = this.audioCtx.currentTime;
    const gain = this.outputGain.gain;

    gain.cancelScheduledValues(now);
    gain.setValueAtTime(0, now);
    gain.linearRampToValueAtTime(1, now + attack); // Attack
    gain.linearRampToValueAtTime(sustain, now + attack + decay); // Decay to Sustain
    this.releaseTime = now + attack + decay;
    this.releaseLevel = sustain;
    this.releaseDuration = release;
  }

  releaseEnvelope() {
    if (this.releaseLevel === undefined || this.releaseDuration === undefined) return;
    const now = this.audioCtx.currentTime;
    const gain = this.outputGain.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(this.releaseLevel, now);
    gain.linearRampToValueAtTime(0, now + this.releaseDuration); // Release
  }

  start() {
    this.carrierOsc.start();
    this.modulatorOsc.start();
  }

  stop() {
    this.carrierOsc.stop();
    this.modulatorOsc.stop();
  }

  connect(destinationNode) {
    this.outputGain.connect(destinationNode);
    }
}