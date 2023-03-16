import React from 'react';
import { Link, useLocation } from "react-router-dom";
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

function SideBar ({collapsed, roles}) {

    const location = useLocation().pathname; 
    const admin = roles.includes('ADMIN');

    return (
        <nav id="sidebar" className={`sidebar js-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <SimpleBar className='sidebar-content js-simplebar'>
                <a className="sidebar-brand" href="à">
                    <img src="img/logo-white.png" className="w-75" alt="Charles Hall" />
                    <span className="align-middle mt-2">Testing Interface</span>
                </a>

                <ul className="sidebar-nav">

                    <li className="sidebar-header mb-2">
                        Pages
                    </li>

                    <li className={`sidebar-item ${location === '/' ? 'active' : ''}`}>
                        <Link to='/' className="sidebar-link">
                            <FontAwesomeIcon icon={['fas', 'flask-vial']} size="lg" 
                            /> <span className="align-middle">Tests</span>
                        </Link>
                    </li>

                    <li className={`sidebar-item ${location === '/dashboard' ? 'active' : ''}`}>
                        <Link to='/dashboard' className="sidebar-link">
                            <FontAwesomeIcon icon={['fas', 'chart-pie']} size="lg" 
                            /> <span className="align-middle">Dashboard</span>
                        </Link>
                    </li>

                    <li className={`sidebar-item ${location === '/descriptions' ? 'active' : ''}`}>
                        <Link to='/descriptions' className="sidebar-link">
                            <FontAwesomeIcon icon={['fas', 'file-invoice']} size="lg" 
                            /> <span className="align-middle">Descriptions</span>
                        </Link>
                    </li>

                    {
                        admin 
                        ? <li className={`sidebar-item ${location === '/create-user' ? 'active' : ''}`}>
                                <Link to='/create-user' className="sidebar-link">
                                    <FontAwesomeIcon icon={['fas', 'user-plus']} size="lg" 
                                    /> <span className="align-middle">Create users</span>
                                </Link>
                            </li>
                        : null
                    }
                    
                </ul>
            
            </SimpleBar>
        </nav>
    )
};

export default SideBar;
