import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import PageLayout from '../../PageLayout';
import { useLocation, useNavigate } from 'react-router-dom';
import DerivedDataPreset from '../presets/derivedData/DerivedDataPreset';


export default function DerivedDataHelpPreset5() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Derived Data Preset 5 Help' backLink='help/derived-data'>
      <DerivedDataPreset 
        ambience={true}
        displacementMapping="The displacement value is represented by the centre tree's size. As the displacement value reduces, the tree becomes smaller, highlighting a slowing of water uptake. It is also mapped to a piano instrument sound playing a melody, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres left, 2 metres down, and 1 metre behind the listener."
        soilMoistureMapping='The soil moisture value is represented by the soil colour. As the soil moisture value reduces, the soil colour turns lighter brown, eventually displaying cracks, highlighting a lack of water within the soil. It is also mapped to a bass guitar instrument sound playing a bassline, using a logarithmic scale similar to human perception, to a corresponding musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 2 metres right, 2 metres up, and 1 metre behind the listener. The soil moisture is further mapped to a lowpass filter, which becomes increasingly active when the soil moisture level reduces to below 70%, indicating that the tree requires watering.'
        temperatureMapping='The temperature value is represented by the sun colour and size, and sky colour. As the temperature value reduces, the sun becomes darker and smaller, and the sky becomes bluer, highlighting a colder temperature. It is also mapped to a piano instrument sound playing chords, using a logarithmic scale similar to human perception, to a corresponding root musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres left, 5 metres down, and 1 metre in front of the listener.'
        humidityMapping='The humidity value is represented by the cloud size and number. As the humidity value reduces, fewer, smaller clouds are visible, highlighting a lack of water vapour within the air. It is also mapped to an electric guitar instrument sound, using a logarithmic scale similar to human perception, to a corresponding accompanying musical note of a frequency between 200 Hz and 2000 Hz, based on the data value. Best heard using headphones, its sound is located 5 metres right, 5 metres up, and 1 metre in front of the listener.'
        vpd={true}
        vpdMapping='The VPD value is represented by the facial expression and colour. When the VPD value is within acceptable range (between 0.8 and 2.2 kPa), thus the tree is not stressed, a green smiley face is displayed, highlighting that the tree is unstressed. When the VPD value is outside of this acceptable range, thus the tree is stressed, a red sad face is displayed, highlighting that the tree is stressed. It is also mapped to the musical scale used, with an acceptable VPD setting the scale to major and the guitar sound to clean, and an out-of-range VPD setting the scale to minor, and the guitar sound to distorted, based on the data value.'
        helpNavigate={() => navigate('/help/contact-us')}
      />
    </PageLayout>
  )
}