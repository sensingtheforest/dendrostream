import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../../ui/button/Button';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PageLayout from '../PageLayout';
import TreeN1 from './trees/TreeN1';
import TreeN2 from './trees/TreeN2';
import YuccaTree from './trees/YuccaTree';


export default function AboutTrees() {
  const navigate = useNavigate();
  return (
    <PageLayout title='About the Trees' backLink='about'>
      <h2 style={{ textAlign: 'left' }}>Introduction</h2>
      <p style={{ textAlign: 'left' }}>This project benefits from the data collected from a wide range of trees, located in many different areas across London and the wider United Kingdom. Currently, all tree talkers are installed on Yucca trees, providing their owners with a resilient, yet stylish, easy-to-maintain tree. As all our trees are of the same size and variety, it is easier to make accurate comparisons between their respective sensor readings and growth, with changes across trees being typically as a result of their climate and environmental conditions.</p>
      <p style={{ textAlign: 'left' }}>A background into Yucca trees, alongside a complete list of the available trees, is detailed below, including their sizes and location. Feel free to explore the data from each tree, in order to better understand their climate and its effect.</p>
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>About Yucca Trees</h2>
      <YuccaTree hideAboutTitle={true} hideTree={true} />
      <h2 style={{ textAlign: 'left', marginTop: '2rem' }}>Our Trees</h2>
      <h3 style={{ textAlign: 'left', marginTop: '2rem' }}>Northern 1</h3>
      <TreeN1 hideAbout={true} />
      <h3 style={{ textAlign: 'left', marginTop: '2rem' }}>Northern 2</h3>
      <TreeN2 hideAbout={true} />
    </PageLayout>
  )
}