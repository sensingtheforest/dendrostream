import { useNavigate, useLocation, Link } from 'react-router-dom';
import treeIcon from '../../../assets/tree-icon.jpg';


export default function Breadcrumbs({ back=true, help=false, helpOnClick=()=>{}, dataControls=false, treeOnClick=()=>{}, aboutOnClick=()=>{} }) {
  const navigate = useNavigate();
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav aria-label='breadcrumb' className='d-flex flex-row justify-content-between align-items-center responsive-help'>
      { back &&
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center', marginTop: '2rem', fontSize: '18px'}}>
            <Link to='/' className='breadcrumb-link'>Home</Link>
            {pathnames.map((name, index) => {
            const routeTo = '/' + pathnames.slice(0, index + 1).join('/');
            const isLast = index === pathnames.length - 1;
            const label = decodeURIComponent(name).split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
            return (
                <span key={name} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>{'>'}</span>
                {isLast ? (
                    <span><b>{label}</b></span>
                ) : (
                    <Link to={routeTo} className='breadcrumb-link'>{label}</Link>
                )}
                </span>
            );
            })}
        </div>
      }
        <div className="d-flex justify-content-end" style={{ gap: '1.25rem' }}>
            {
                dataControls &&
                    <>
                        <div style={{ cursor: 'pointer' }} onClick={() => treeOnClick()}>
                            <img src={treeIcon} style={{ width: '2.6em', marginTop: '0.1em', marginBottom: '0.3rem' }} alt='Tree Icon' />
                            <h4>Tree</h4>
                        </div>
                        <div style={{ cursor: 'pointer' }} onClick={() => aboutOnClick()}>
                            <i className="bi bi-info-circle" style={{ fontSize: '2em' }}></i>
                            <h4>About</h4>
                        </div>
                    </>
            }
            {  help && 
                <div style={{ cursor: 'pointer' }} onClick={() => helpOnClick()}>
                    <i className="bi bi-question-circle" style={{ fontSize: '2em' }}></i>
                    <h4>Help</h4>
                </div>
            }
        </div>
    </nav>
  );
}
