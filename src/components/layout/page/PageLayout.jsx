import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Logo from '../../ui/header/Logo';
import Button from '../../ui/button/Button';
import { useEffect} from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../ui/breadcrumb/Breadcrumb';
import Header from '../../ui/header/Header';
import NavBar from '../../ui/header/NavBar';
import Footer from '../../ui/footer/Footer';
import { Helmet } from 'react-helmet';
import { closeAudioContext } from '../../context/AudioContext';
import { useLocation } from 'react-router-dom';


export default function PageLayout({ children, title='', back=true, backLink='', help=false, helpOnClick=()=>{}, dataControls=false, treeOnClick=()=>{}, aboutOnClick=()=>{}  }) {
//   const navigate = useNavigate();
const location = useLocation();
useEffect(() => {
    closeAudioContext()
  }, [location.pathname]);
  return (
    <div id='root'>
    <Helmet><title>StF | Tree Analyser | {title}</title></Helmet>
        { back ? (<Header backLink={backLink} />) : (<Logo />) }
        <NavBar />
        <div className='main-content'>
          <Breadcrumb back={back} help={help} helpOnClick={helpOnClick} dataControls={dataControls} treeOnClick={treeOnClick} aboutOnClick={aboutOnClick} />
          { title && <h1 className='flex-grow-1 text-center m-0 m-5'>{ title }</h1> }
          { children }
        </div>
      <Footer />
    </div>
  )
}