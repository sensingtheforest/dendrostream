import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import treeTalker1Image from '../../../../assets/tree-talker-1.png';
import treeTalker2Image from '../../../../assets/tree-talker-2.png';
import treeTalker3Image from '../../../../assets/tree-talker-3.jpg';
import treeTalker4Image from '../../../../assets/tree-talker-4.jpg';


export default function AboutTreeTalkerDevices() {
  const navigate = useNavigate();
  return (
    <PageLayout title='About the Tree Talker Devices' backLink='about'>
      <h2 style={{ textAlign: 'left' }}>Introduction</h2>
      <img className='m-2' src={treeTalker1Image} alt='Tree Talker Installed on Tree' style={{ height: '20rem', width: 'auto' }} />
      <p style={{ padding: '1rem' }}><em>Tree talker device with LED indicators, touchscreen LCD, and Wi-Fi antenna visible, with its dendrometer attached to an outdoor tree in Forest Research, Northern Research Station, Roslin, Midlothian, Scotland</em></p>
      <p style={{ textAlign: 'left' }}>The tree and climate data presented within the sonifications and visualisations of this tool is received from a custom DIY hardware tree talker device, designed and developed by Mr Mahmoud B. Elmokadem and Dr Krishna Nama Manjunatha, with guidance from Dr Georgios Xenakis. Professional tree talkers, such as those found in forest monitoring environments, are often very costly, and can require specialist expert installation. One key aspect of <em>Sensing the Forest</em> is to create cost-effective solutions, to democratise tree and climate data, hence the creation of an affordable monitoring solution.</p>
      <p style={{ textAlign: 'left' }}>This page details the design and development of a low-cost tree talker device, used to transmit the data presented within this tool. For further information on the design and creation of the tree talker hardware, please visit the <a href="https://sensingtheforest.github.io/2025/05/05/design-of-cost-effective-iot-dendrometer-sensor-for-environmental-monitoring/" target='new'>Sensing the Forest</a> website.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>Tree Talker Sensors</h2>
      <p style={{ textAlign: 'left' }}>The first major consideration involves the identification of the tree and environmental data variables to collect. Such data can provide significant insights into both the tree, its health and stress levels, and the surrounding environmental changes, although a combination of complementary variables can enable the calculations of even more insightful information.</p>
      <h4 style={{ textAlign: 'left', marginTop: '2rem' }}>Dendrometer</h4>
      <img className='m-2' src={treeTalker4Image} alt='Early Tree Talker Iteration Showing Custom Dendrometer Installed on Tree and Soil Moisture Sensor Placed in Pot' style={{ height: '20rem', width: 'auto' }} />
      <p style={{ padding: '1rem' }}><em>Early tree talker protoype, with the custom dendrometer installed on a Yucca's tree trunk, and the soil moisture sensor placed within the tree's pot</em></p>
      <p style={{ textAlign: 'left' }}>It was initially proposed that the tree talker device would comprise tree sap flow, soil moisture, temperature, and humidity sensors, although the tree sap flow sensor was later substituted for a dendrometer, upon the advice of Dr Xenakis. Although sap flow sensors can offer understanding of the amount of water a tree uptakes as a whole, including the trunk and all branches, this posed design and installation challenges. Namely, such sensors are complex and costly to develop, and installation involves the drilling of two holes within the tree's trunk, at a specified distance apart, to place the two probes for the value calculation. When working with citizen scientists to install the hardware devices, tasks of this nature may be restrictive to some participants, particularly if they have limited access to the equipment necessary to perform the installation, or are uncomfortable with such a complex install.</p>
      <p style={{ textAlign: 'left' }}>After consultation with Dr Xenakis, the tree talker device was redesigned to use a dendrometer sensor, rather than a sap flow sensor. This device provides similar results, measuring the tree trunk expansion and contraction over time, as the tree uptakes water to grow. A prototype dendrometer, using a spring-tensioned support and magnetic sensor design, was developed and iterated, to produce an accurate result, for a significantly lower cost than a corresponding scientific device.</p>
      <h4 style={{ textAlign: 'left', marginTop: '2rem' }}>Soil Moisture</h4>
      <p style={{ textAlign: 'left' }}>The device is equipped with a standard analogue soil moisture sensor which, when placed within the soil of the tree, measures the relative soil moisture, from dry to fully saturated with water. Such sensor allows the tree's soil moisture level to be understood, aiding in the tree's caretaker to become aware of when to water the tree, in order to benefit its health.</p>
      <h4 style={{ textAlign: 'left', marginTop: '2rem' }}>Temperature and Humidity</h4>
      <img className='m-2' src={treeTalker3Image} alt='Early Tree Talker Iteration Showing LED Indicators and Temperature and Humidity Sensor' style={{ height: '20rem', width: 'auto' }} />
      <p style={{ padding: '1rem' }}><em>Early tree talker protoype, with the LED indicators and temperature and humidity sensor visible, attached to the side of the device's case</em></p>
      <p style={{ textAlign: 'left' }}>The hardware device is also equipped with a standard digital combined temperature and humidity sensor, located on the side of the device's case. This sensor allows the environmental conditions to be identified, to highlight tree stress, as a response to poor environmental conditions, and climate change.</p>
      <h4 style={{ textAlign: 'left', marginTop: '2rem' }}>Tree Talker Device</h4>
      <img className='m-2' src={treeTalker2Image} alt='Tree Talker Internals' style={{ height: '20rem', width: 'auto' }} />
      <p style={{ padding: '1rem' }}><em>Tree talker device internals, including a rechargable power bank, Raspberry Pi, and sensor cabling, housed within a waterproof case</em></p>
      <p style={{ textAlign: 'left' }}>To interface with the aforementioned sensors, a Raspberry Pi Zero 2W was used, running from a high capacity rechargable lithium power bank, and in some environments, supported by a solar panel. The Raspberry Pi offers sufficient computational power to read and transmit the sensor data, while consuming minimal power, enabling the device to run for over two days on a full charge, without solar panel backup. Moreover, such components, alongside the generic, low-cost sensors used, ensure the device retains a cost-effective construction. The device may optionally be equipped with a 7 inch touchscreen LCD, to allow for ease of monitoring, although can be remotely managed through a remote desktop application, with its status presented via LED indicators on the case. All data records are transmitted via Wi-Fi, to a remote web server, for secure storage and access.</p>
    </PageLayout>
  )
}