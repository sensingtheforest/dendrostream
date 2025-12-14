import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageLayout from '../../PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import DerivedDataPreset from '../presets/derivedData/DerivedDataPreset';


export default function DerivedDataHelpPreset3() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Derived Data Preset 3 Help' backLink='help/derived-data'>
      <DerivedDataPreset 
        displacementMapping='The displacement value is represented by the red line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The displacement value is additionally mapped to the harmonicity ratio (from harmonic to inharmonic sounds) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener.'
        soilMoistureMapping='The soil moisture value is represented by the green line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 1000 Hz, based on the data value. The soil moisture value is additionally mapped to the modulator frequency (from vibrato to harsh sounds) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener.'
        temperatureMapping='The temperature value is represented by the blue line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The temperature value is additionally mapped to the stereo panning (from left to right) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the orange line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The humidity value is additionally mapped to the modulation index (from subtle to complex sounds) of all FM-synthesised data value tones. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
        treeMeanGrowth={true}
        treeMeanGrowthMapping='The tree mean growth value is represented by the purple line on the graph. It is also mapped to an audible frequency modulation (FM)-synthesised tone, using a logarithmic scale similar to human perception, to a corresponding frequency between 200 Hz and 2000 Hz, based on the data value. The tree mean growth value is additionally mapped to the volume (from quiet to loud) of all FM-synthesised data value tones. Best heard using headphones, its sound is located direct centre, in front of the listener.'
        helpNavigate={() => navigate('/help/contact-us')}
      />
    </PageLayout>
  )
}