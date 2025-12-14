// import globalStylesheet from '../../../myStyles';

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import yuccaN1 from '../../../../../assets/n1-tree.jpg';

export default function YuccaTree({ children, yuccaTreeImage={yuccaN1}, treeName='', treeSize='50cm (~20in)', treeIndoor=true, treeLocation='', treeMapUrl='', hideTree=false, hideAboutTitle=false, hideAbout=false }) {
    // Properties ----------------------------------
    // Hooks ---------------------------------------
    // Context -------------------------------------
    // Methods -------------------------------------
    // View ----------------------------------------
    const navigate = useNavigate();

    return (
        <div>
            {
                !hideTree && (
                    <>
                        <h4 style={{ textAlign: 'left' }}>Meet the Tree</h4>
                        <img className='m-2' src={yuccaTreeImage} alt='Yucca tree with green, spiky leaves' style={{ height: '20rem', width: 'auto' }} />
                        <p style={{ padding: '1rem' }}><em>{treeName} Yucca Tree</em></p>
                        <p style={{ textAlign: 'left' }}>The data you are interacting with is being sent from the {treeName} tree talker installed on a <b>Spineless Yucca Tree</b> (<em>Yucca Elephantipes</em>), also known as: <em>Yucca Gigantea</em> or <em>Yucca Guatemalensis</em>.</p>
                        <p style={{ textAlign: 'left' }}>This Yucca is {treeSize} tall, and provides huge benefit to its {treeIndoor ? 'home' : 'outdoor'} surroundings, through improving mood, and purifying the air, through removing carbon dioxide from the atmosphere.</p>
                        <p style={{ textAlign: 'left' }}>Not only does this tree look sophisticated in its {treeIndoor ? 'indoor' : 'outdoor'} location, it is also very low maintenance, only requiring watering once per week in the summer, and even less in the winter. </p>
                        <h4 style={{ textAlign: 'left' }}>Tree Location</h4>
                        <p style={{ textAlign: 'left' }}>This Yucca tree is located {treeLocation}.</p>
                        <iframe className='p-1' src={treeMapUrl} style={{ width: "100%", height: "15rem", border: '0', marginTop: '1rem', marginBottom: '2rem' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </>
                )
            }
            {
                !hideAbout && (
                    <>
                        { !hideAboutTitle && <h4 style={{ textAlign: 'left' }}>About Yucca Trees</h4> }
                        <p style={{ textAlign: 'left' }}>The Yucca is part of the Asparagaceae family, and is native to Mexico and Central America. They may grow up to 12m (~40ft) tall and 8m (~26ft) wide, taking up to 50 years to reach this size. They require well-drained soil, preferring loam and sand, in sheltered, full sun conditions. The Yucca will flower in summer and autumn, but has green leaves all year round.</p>
                        <p style={{ textAlign: 'left' }}>Yucca trees are drought-resistant and tolerant of low temperatures, and should be placed in South or West-facing positions. They produce cream-coloured flowers.</p>
                        <p style={{ textAlign: 'left' }}><em>This information was sourced from the <a href='https://www.rhs.org.uk/plants/68706/yucca-elephantipes/details' target='new'>RHS Yucca Tree Listing</a>, which contains further information on Yucca trees.</em></p>
                    </>
                )
            }
            { children }
        </div>
    );
}
