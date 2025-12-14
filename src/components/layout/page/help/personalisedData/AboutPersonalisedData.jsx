// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AboutPersonalisedData({ children, referenceTone=true, dualSonification=true, vpd=true, treeMeanGrowth=true, aboutPage=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            <h4 style={{ textAlign: 'left' }}>About</h4>
            <p style={{ textAlign: 'left' }}>This presentation offers the opportunity to create a personalised sonification and visualisation of the tree and climate data, both received directly from the sensors of the hardware tree talker device, installed on a tree, and calculated based on the available data. Further information on the meanings and observations of the sensor and derived data variables being shown, is provided below.</p>
            <p style={{ textAlign: 'left' }}>Sensor readings are collectively recorded every 30 minutes, to allow for sufficient monitoring of the daily variability of the tree and climate, without using too much battery power from the hardware device. Please note, the hardware devices may experience downtime, thus some readings may be missing, or devices may become offline for periods of time.</p>
            { referenceTone && <p style={{ textAlign: 'left' }}>When pressing the Play button, a 632.46 Hz reference tone will play for 0.5 seconds, both indicating that the play button has been pressed, and acting as a reference point, as a (logarithmically-spaced) frequency that is perceptually halfway between the maximum and minimum data sonification frequencies. Use this tone as a guide to aid identification of sonifications with a value of 50%.</p> }
            { dualSonification && <p style={{ textAlign: 'left' }}>In the case of a tiled line graph visualisation, the top graph is sonified in the left channel, with the bottom graph being sonified in the right channel, allowing for clear comparison between the two datasets, particularly when using headphones.</p> }
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
            { 
                !aboutPage && (
                    <>
                        <h6 style={{ textAlign: 'left' }}>Mapping</h6>
                        <p style={{ textAlign: 'left' }}>The Personalised Data function allows you to generate your own visual and audible mappings, to aid in your interpretation of the data.</p>
                    </>
                )
            }
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
            { 
                !aboutPage && (
                    <>
                        <h6 style={{ textAlign: 'left' }}>Mapping</h6>
                        <p style={{ textAlign: 'left' }}>The Personalised Data function allows you to generate your own visual and audible mappings, to aid in your interpretation of the data.</p>
                    </>
                )
            }
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
            { 
                !aboutPage && (
                    <>
                        <h6 style={{ textAlign: 'left' }}>Mapping</h6>
                        <p style={{ textAlign: 'left' }}>The Personalised Data function allows you to generate your own visual and audible mappings, to aid in your interpretation of the data.</p>
                    </>
                )
            }
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
            { 
                !aboutPage && (
                    <>
                        <h6 style={{ textAlign: 'left' }}>Mapping</h6>
                        <p style={{ textAlign: 'left' }}>The Personalised Data function allows you to generate your own visual and audible mappings, to aid in your interpretation of the data.</p>
                    </>
                )
            }
            <h4 style={{ textAlign: 'left' }}>Derived Data</h4>
            {
                vpd && (
                    <>
                        <h5 style={{ textAlign: 'left' }}>Vapour Pressure Deficit (VPD)</h5>
                        <div className='d-flex flex-column justify-content-center'>
                            <i className='bi bi-cloud-sun' style={{ fontSize: '40px' }}></i>
                            <p style={{ padding: '1rem', paddingBottom: '0' }}><em>Vapour Pressure Deficit</em></p>
                        </div>
                        <h6 style={{ textAlign: 'left' }}>Meaning</h6>
                        <p style={{ textAlign: 'left' }}>Vapour Pressure Deficit (VPD) is a measure of how dry the atmosphere is, relative to its saturation point, which varies with temperature. The higher the VPD value, the drier the atmosphere, compared to the saturated atmosphere. As the atmosphere dries, water loss from the plant increases, to a point where trees are unable to push more water from the soil, causing them to either use their internal water reserves, or prevent water loss, to prevent wilting.</p>
                        <p style={{ textAlign: 'left' }}>The VPD can be estimated using the humidity and temperature readings, where dry air above the tree canopy drives water up the tree's trunk.</p>
                        <h6 style={{ textAlign: 'left' }}>Observations</h6>
                        <p style={{ textAlign: 'left' }}>The VPD can be observed in conjunction with the soil moisture and humidity readings, to identify if the tree is working hard (stressed) or can easily absorb the water it needs from the soil (unstressed). The higher the VPD, the more water flows up the tree, as when the atmosphere is dry, trees absorb more water to transpire into the atmosphere, through the canopy. The VPD allows us to work out how much water the tree should uptake.</p>
                        <p style={{ textAlign: 'left' }}>The VPD changes can be observed over the course of each day, with the VPD increasing to its highest readings with low humidity and high temperature, where the air above the canopy is at its driest, typically around 12:00 to 15:00, when the sun is at its peak, and in the summer, where the temperature is hotter and there is a lack of rain, reducing the relative humidity. rained, therefore the humidity is low. with most sunlight. The VPD will typically be lower during the evening, where the reduced sunlight lowers the air temperature, and there is a higher humidity, thus allowing the tree to more easily absorb moisture.</p>
                        <p style={{ textAlign: 'left' }}>In a dry month, the dryness in the air, and dryness in the soil moisture, means the tree trunk expansion would be small, as the tree struggles to absorb water throughout the day.</p>
                        <p style={{ textAlign: 'left' }}>Over time, the VPD readings, particularly of trees located outdoors, will vary as the seasons change, typically being lower, due to a higher humidity and lower temperature, for longer in the winter (December to February). However, unanticipated humidity changes and unusual readings, particularly those in unexpected seasons, can indicate abnormal conditions, indicative of climate change, resulting in unexpected periods of tree stress. Keep exploring over a longer period of time, to notice the VPD changes, and the effects of climate change!</p>
                        { 
                            !aboutPage && (
                                <>
                                    <h6 style={{ textAlign: 'left' }}>Mapping</h6>
                                    <p style={{ textAlign: 'left' }}>The Personalised Data function allows you to generate your own visual and audible mappings, to aid in your interpretation of the data.</p>
                                </>
                            )
                        }
                    </>
                )
            }
            {
                treeMeanGrowth && (
                    <>
                        <h5 style={{ textAlign: 'left' }}>Tree Mean Growth</h5>
                        <div className='d-flex flex-column justify-content-center'>
                            <i className='bi bi-rulers' style={{ fontSize: '40px' }}></i>
                            <p style={{ padding: '1rem', paddingBottom: '0' }}><em>Tree Mean Growth</em></p>
                        </div>
                        <h6 style={{ textAlign: 'left' }}>Meaning</h6>
                        <p style={{ textAlign: 'left' }}>Tree Mean Growth (VPD) is a measure of how much the tree has grown, on average, across the course of one day. The higher the tree mean growth value, the greater the tree has grown that day. As the temperature, humidity, soil moisture and canopy air dryness (VPD) conditions become favourable, the tree will grow faster, as it has the ideal conditions to prosper.</p>
                        <p style={{ textAlign: 'left' }}>The tree mean growth can be estimated from the daily minimum shrinkage point and maximum expansion point displacement readings from the dendrometer, where this difference offers insight into the mean growth of the tree over the course of one day.</p>
                        <h6 style={{ textAlign: 'left' }}>Observations</h6>
                        <p style={{ textAlign: 'left' }}>The tree mean growth can be observed in conjunction with all other readings, to identify if the tree's conditions are favourable, thus the tree is able to grow more quickly. The higher the tree mean growth, the greater the tree has grown over the daily period, as a factor of its environmental conditions.</p>
                        <p style={{ textAlign: 'left' }}>The tree mean growth changes can be observed over the course of a week or more, with the tree mean growth increasing to its highest readings with moderate soil moisture, temperature, humidity, and VPD readings. Where all such ideal daily conditions are met, the tree mean growth value will be higher.</p>
                        <p style={{ textAlign: 'left' }}>Over time, the tree mean growth readings, particularly of trees located outdoors, will vary as the seasons change, typically being lower, due to a lower temperature, for longer in the winter (December to February). However, unanticipated environmental conditions changes and unusual readings, particularly those in unexpected seasons, can indicate abnormal conditions, indicative of climate change, resulting in changes to the tree mean growth. Keep exploring over a longer period of time, to notice the tree mean growth changes, and the effects of climate change!</p>
                        { 
                            !aboutPage && (
                                <>
                                    <h6 style={{ textAlign: 'left' }}>Mapping</h6>
                                    <p style={{ textAlign: 'left' }}>The Personalised Data function allows you to generate your own visual and audible mappings, to aid in your interpretation of the data.</p>
                                </>
                            )
                        }
                    </>
                )
            }
            <p style={{ textAlign: 'left' }}><em>This information was based on insights provided by <a href='https://www.forestresearch.gov.uk/staff/georgios-xenakis/' target='new'>Dr George Xenakis</a>, Senior Scientist at Forest Research.</em></p>
            { children }
        </div>
    );
}