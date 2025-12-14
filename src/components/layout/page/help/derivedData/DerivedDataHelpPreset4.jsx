import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageLayout from '../../PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import DerivedDataPreset from '../presets/derivedData/DerivedDataPreset';


export default function DerivedDataHelpPreset4() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Derived Data Preset 4 Help' backLink='help/derived-data'>
      <DerivedDataPreset 
        variability
        displacementMapping='The displacement value is represented by the red dial on the dashboard. It is also mapped to a piano instrument sound, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener.'
        soilMoistureMapping='The soil moisture value is represented by the green dial on the dashboard. It is also mapped to a plucked guitar instrument sound, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 1000 Hz, transposed one octave, based on the data value. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener.'
        temperatureMapping='The temperature value is represented by the blue dial on the dashboard. It is also mapped to a lead synthesiser instrument sound, using a logarithmic scale similar to human perception, to a corresponding vibrato musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the orange dial on the dashboard. It is also mapped to a flute instrument sound, using a logarithmic scale similar to human perception, to a corresponding tremolo musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
        vpd={true}
        vpdMapping='The VPD value is represented by the purple dial on the dashboard. It is also mapped to a percussive instrument sound, using a logarithmic scale similar to human perception, to a corresponding playing rate between 2 and 6 hits per second, based on the data value. Best heard using headphones, its sound is located direct centre, in front of the listener.'
        helpNavigate={() => navigate('/help/contact-us')}
      />
    </PageLayout>
  )
}