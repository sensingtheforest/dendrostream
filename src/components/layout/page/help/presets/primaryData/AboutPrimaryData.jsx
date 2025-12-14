// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function AboutPrimaryData({ children, referenceTone=true, dualSonification=false, variability=false, ambience=false, displacementMapping='', soilMoistureMapping='', temperatureMapping='', humidityMapping='' }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <h4 style={{ textAlign: 'left' }}>About</h4>
            <p style={{ textAlign: 'left' }}>This presentation offers sonification and visualisation of the tree and climate data received directly from the sensors of the hardware tree talker device, installed on a tree. Further information on the meanings, observations, and mappings of the sensor variables being shown, is provided below.</p>
            <p style={{ textAlign: 'left' }}>Sensor readings are collectively recorded every 30 minutes, to allow for sufficient monitoring of the daily variability of the tree and climate, without using too much battery power from the hardware device. Please note, the hardware devices may experience downtime, thus some readings may be missing, or devices may become offline for periods of time.</p>
            { referenceTone && <p style={{ textAlign: 'left' }}>When pressing the Play button, a 632.46 Hz reference tone will play for 0.5 seconds, both indicating that the play button has been pressed, and acting as a reference point, as a (logarithmically-spaced) frequency that is perceptually halfway between the maximum and minimum data sonification frequencies. Use this tone as a guide to aid identification of sonifications with a value of 50%.</p> }
            { dualSonification && <p style={{ textAlign: 'left' }}>The top graph is sonified in the left channel, with the bottom graph being sonified in the right channel, allowing for clear comparison between the two datasets, particularly when using headphones.</p> }
            { variability && <p style={{ textAlign: 'left' }}>Every 5 minutes, the system randomly selects a new musical scale (Dorian, Aeolian or Major), overriding to Major when the VPD is in a favourable range (0.8 to 2.2 kPa). Additionally, the base octave changes between 0, 1, and 2 every 5 minutes. The instruments actively playing, change every second. These changes are made to both improve the interpretability of the data, while reducing the otherwise repetitive nature of live data with an update frequency of every 30 minutes.</p> }
            { ambience && <p style={{ textAlign: 'left' }}>The system automatically plays a drum accompaniment in time with the piece, based on the update frequency of the data. Furthermore, ambient sounds of birdsong and crickets are played automatically, when the VPD is within a favourable range (0.8 to 2.2 kPa), to indicate the overall health of the tree and its environment.</p> }
            <h4 style={{ textAlign: 'left' }}>Primary Data</h4>
            <h5 style={{ textAlign: 'left' }}>Displacement</h5>
            <div className='d-flex flex-column justify-content-center'>
                <i className='bi bi-tree' style={{ fontSize: '40px' }}></i>
                <p style={{ padding: '1rem', paddingBottom: '0' }}><em>Tree Displacement</em></p>
            </div>
            <h6 style={{ textAlign: 'left' }}>Meaning</h6>
            <p style={{ textAlign: 'left' }}>Displacement is a measure of the expansion (or contraction) of the tree's trunk, measured in micrometers (<em>&micro;m</em>). As the tree takes in water, to transpire through the canopy, the trunk will expand, increasing the displacement reading. Similarly, as the tree's water intake reduces, the tree trunk will contract, resulting in a lower displacement reading.</p>
            <h6 style={{ textAlign: 'left' }}>Observations</h6>
            <p style={{ textAlign: 'left' }}>These displacement reading changes can be observed over the course of each day, with the tree increasing to its highest displacement readings around 12:00 to 15:00, when the sun and air temperature is at its peak, before falling again. The displacement will be lower overnight, where colder temperatures and lack of sunlight reduce the tree's transpiration process.</p>
            <p style={{ textAlign: 'left' }}>Over time, the displacement readings will gradually increase, as the tree (and its trunk) grow and expand. This is usual, and shows the tree is flourishing in its environment. Keep exploring over a longer period of time, to notice it grow!</p>
            <h6 style={{ textAlign: 'left' }}>Mapping</h6>
            <p style={{ textAlign: 'left' }}>{displacementMapping}</p>
            <h5 style={{ textAlign: 'left' }}>Soil Moisture</h5>
            <div className='d-flex flex-column justify-content-center'>
                <i className='bi bi-droplet' style={{ fontSize: '40px' }}></i>
                <p style={{ padding: '1rem', paddingBottom: '0' }}><em>Tree Soil Moisture</em></p>
            </div>
            <h6 style={{ textAlign: 'left' }}>Meaning</h6>
            <p style={{ textAlign: 'left' }}>Soil moisture is a measure of the amount of water contained within the soil, measured as a relative moisture percentage of the water content (<em>%</em>). The soil moisture level ranges from completely dry (0%), to fully saturated with water (100%). As the tree takes in moisture from the soil, through its roots, the soil moisture will reduce. Simiarly, as the tree is watered, or if it rains, in the case of an outdoor tree, the soil moisture increases.</p>
            <h6 style={{ textAlign: 'left' }}>Observations</h6>
            <p style={{ textAlign: 'left' }}>The soil moisture reading changes can be observed over the course of a few days. The soil moisture level will reduce fastest during the day, when the temperature is highest, thus humidity is often the lowest (unless it has rained), as the low humidity and high temperature cause faster evaporation of water from the soil. During this time, the tree is also transpiring the most, taking water from the soil, to transpire through the canopy, thus further reducing the soil moisture level.</p>
            <p style={{ textAlign: 'left' }}>Soil moisture is also related to the air humidity, as dry air causes the soil to dry out faster, when moisture from the soil evaporates into the air, while humid air reduces evaporation, meaning the soil moisture is retained longer.</p>
            <p style={{ textAlign: 'left' }}>The soil moisture level will gradually reduce over the course of a few days, as the tree takes in water, and the water evaporates. However, the moisture level will increase significantly, if the tree is watered, or the tree is outdoors, and it rains. Keep exploring to notice the climate changes (rain, temperature and humidity effects on soil moisture), watering patterns, and tree water intake (including tree stress)!</p>
            <h6 style={{ textAlign: 'left' }}>Mapping</h6>
            <p style={{ textAlign: 'left' }}>{soilMoistureMapping}</p>
            <h5 style={{ textAlign: 'left' }}>Temperature</h5>
            <div className='d-flex flex-column justify-content-center'>
                <i className='bi bi-thermometer-half' style={{ fontSize: '40px' }}></i>
                <p style={{ padding: '1rem', paddingBottom: '0' }}><em>Air Temperature</em></p>
            </div>
            <h6 style={{ textAlign: 'left' }}>Meaning</h6>
            <p style={{ textAlign: 'left' }}>Temperature is a measure of the heat of the air surrounding the tree, measured in degrees Celcius (&deg;C). As the sunlight increases, its thermal energy causes warms the air, increasing the air temperature. Similarly, as the sunlight reduces, so too does the air temperature.</p>
            <h6 style={{ textAlign: 'left' }}>Observations</h6>
            <p style={{ textAlign: 'left' }}>These temperature reading changes can be observed over the course of each day, with the temperature increasing to its highest readings around 12:00 to 15:00, when the sun is at its peak, before falling again. The temperature will be lower overnight, where the lack of sunlight reduces the air temperature.</p>
            <p style={{ textAlign: 'left' }}>Over time, the temperature readings, particularly of trees located outdoors, will vary as the seasons change, typically being hotter for longer in the summer (June to August). However, unanticipated temperature changes and unusual readings, particularly those in unexpected seasons, are indicative of climate change. Keep exploring over a longer period of time, to notice the temperature changes, and the effects of climate change!</p>
            <h6 style={{ textAlign: 'left' }}>Mapping</h6>
            <p style={{ textAlign: 'left' }}>{temperatureMapping}</p>
            <h5 style={{ textAlign: 'left' }}>Humidity</h5>
            <div className='d-flex flex-column justify-content-center'>
                <i className='bi bi-moisture' style={{ fontSize: '40px' }}></i>
                <p style={{ padding: '1rem', paddingBottom: '0' }}><em>Air Humidity</em></p>
            </div>
            <h6 style={{ textAlign: 'left' }}>Meaning</h6>
            <p style={{ textAlign: 'left' }}>Humidity is a measure of the amount of water (vapour) within the air surrounding the tree, measured as a relative humidity percentage (%). As the sunlight and air temperature increases, the relative humidity reduces, as hotter air can hold more moisture than colder air. When moisture is added to the air, through rain, water evaporation into the air, or a humidifier device, the humidity levels will increase.</p>
            <h6 style={{ textAlign: 'left' }}>Observations</h6>
            <p style={{ textAlign: 'left' }}>The humidity reading changes can be observed over the course of each day, with the humidity increasing to its highest readings after rainfall, and when the temperature is at its lowest, usually at night when there is no sun. The humidity will typically be lower during the day, where the increased sunlight raises the air temperature, thus allowing the air to store more water vapour.</p>
            <p style={{ textAlign: 'left' }}>Over time, the humidity readings, particularly of trees located outdoors, will vary as the seasons change, typically being more humid for longer in the winter (December to February). However, unanticipated humidity changes and unusual readings, particularly those in unexpected seasons, can indicate abnormal rainfall levels, indicative of climate change. Keep exploring over a longer period of time, to notice the humidity changes, and the effects of climate change!</p>
            <h6 style={{ textAlign: 'left' }}>Mapping</h6>
            <p style={{ textAlign: 'left' }}>{humidityMapping}</p>
            <p style={{ textAlign: 'left' }}><em>This information was based on insights provided by <a href='https://www.forestresearch.gov.uk/staff/georgios-xenakis/' target='new'>Dr George Xenakis</a>, Senior Scientist at Forest Research.</em></p>
            { children }
        </div>
    );
}