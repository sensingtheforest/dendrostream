import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Button from '../../ui/button/Button';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import PageLayout from './PageLayout';


export default function Acknowledgements() {
  const navigate = useNavigate();
  return (
    <PageLayout title='Acknowledgements'>
      <h2 style={{ textAlign: 'left' }}>Introduction</h2>
      <p style={{ textAlign: 'left'}}>This Sonification and Visualisation Tool was created with the assistance of a number of people and resources. We are very grateful for their work and support, which has made this project possible. This following list of credits acknowledges the individuals and technologies used in the development of this tool. Please note, this is not indicative of the knowledge base used to develop the tool, such as references to previous works built upon. For a comprehensive list of such references, please view the associated dissertation paper.</p>
      <h2 style={{ textAlign: 'left' }}>Tools and Technologies</h2>
      <ul style={{ textAlign: 'left' }}>
        <li>Microsoft Visual Studio Code</li>
        <li>npm.js</li>
        <li>Bootstrap</li>
        <li>Bootstrap Icons</li>
        <li>Express.js</li>
        <li>Socket.io/Socket.io Client</li>
        <li>Node.js</li>
        <li>React/Vite/ESLint</li>
        <li>React Helmet</li>
        <li>BS-Stepper</li>
        <li>D3.js</li>
        <li>P5.js</li>
        <li>W3C Web Audio API</li>
        <li>React Router/React Router DOM</li>
        <li>CORS</li>
        <li>DOTENV</li>
        <li>Nodemailer</li>
        <li>Freesound.org</li>
        <li>Mozilla Developer MDN Web Docs</li>
        <li>Working with the Web Audio API by Joshua Reiss</li>
      </ul>
      <p style={{ textAlign: 'left' }}>Thanks must be expressed to the above code library authors, whose code this tool uses. Moreover, the above library documentation was directly used, to understand how to implement the necessary ideas for the creation of this tool.</p>
      <h2 style={{ textAlign: 'left' }}>Other Resources</h2>
      <p style={{ textAlign: 'left' }}>Within this tool, a number of images and audio clips are displayed. Icons are credited to Bootstrap Icons, unless otherwise stated.</p>
      <h4 style={{ textAlign: 'left' }}>Image Credits</h4>
      <ul style={{ textAlign: 'left' }}>
        <li><b>Sensing the Forest Logo:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Anna Xambó Profile Image:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Georgios Xenakis Profile Image:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Gerard Roma Profile Image:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Krishna Nama Manjunatha Profile Image:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Mahmoud Elokadem Profile Image:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Tug O'Flaherty Profile Image:</b> Provided by the <a href='https://sensingtheforest.github.io/' target='new'>Sensing the Forest</a> website</li>
        <li><b>Northern 1 Tree Talker Image:</b> Anna Xambó</li>
        <li><b>Northern 2 Tree Talker Image:</b> Tug O'Flaherty</li>
        <li><b>Early Iteration Tree Talker Images:</b> Tug O'Flaherty</li>
        <li><b>Final Iteration Tree Talker Images:</b> Georgios Xenakis</li>
        <li><b>Tree Icon:</b> LENNAMATS via <a href='https://www.shutterstock.com/image-vector/tree-logo-isolated-on-white-minimalist-2464791985' target='new'>Shutterstock</a></li>
      </ul>
      <h4 style={{ textAlign: 'left' }}>Audio Credits</h4>
      <ul style={{ textAlign: 'left' }}>
        <li><b>Birdsong Sample:</b> <a href="https://freesound.org/people/squashy555/sounds/573080/">Dawn Chorus Birdsong</a> by <a href="https://freesound.org/people/squashy555/">squashy555</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a></li>
        <li><b>Cricket Sample:</b> <a href="https://freesound.org/people/ellie.vanderlip/sounds/704380/">Lone cricket with other background crickets</a> by <a href="https://freesound.org/people/ellie.vanderlip/">ellie.vanderlip</a> | License: <a href="http://creativecommons.org/publicdomain/zero/1.0/">Creative Commons 0</a></li>
      </ul>
      <h2 style={{ textAlign: 'left' }}>People</h2>
      <p style={{ textAlign: 'left' }}>Thanks are expressed to a number of members of the Sensing the Forest Team, who have kindly contributed their knowledge and expertise to the project. Further information is available on the <Link to='/about/team'>About the Team</Link> webpage.</p>
      <ul style={{ textAlign: 'left' }}>
        <li><b>Anna Xambó:</b> A huge thanks to Anna for all her help in managing, organising, and providing significant expertise towards this tool.</li>
        <li><b>George Xenakis:</b> A significant thanks to George for all his help in advising us on the science behind the project, with respect to the tree talkers, trees, data analysis, and data presentation methods.</li>
        <li><b>Mahmoud Elmokadem and Krishna Nama Manjunatha:</b> A special thanks for creating such impressive tree talker devices!</li>
        <li><b>Gerard Roma:</b> Thanks for creating and maintaining the web API used by the tree talkers.</li>
        <li><b>Participatory Design User Study Participants:</b> An enormous thank you to all participants of the participatory design user studies, for all your thoughts, ideas, feedback, and testing. This project could not have happened without all your help, for which we are hugely grateful.</li>
      </ul>
      <h2 style={{ textAlign: 'left' }}>Further Credits</h2>
      <p style={{ textAlign: 'left' }}>Apologies in advance to anyone left out in these acknowledgements. We thank you for your support. For further credits, please read the associated dissertation paper, accompanying this tool.</p>
    </PageLayout>
  )
}