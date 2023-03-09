import React, { useState } from 'react';
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 

function SideBar ({collapsed}) {

    const [ activeItem, setActiveItem ] = useState('_tests');

    const toggleItem = (e) => {
        const name = e.currentTarget.getAttribute('name');
        setActiveItem(name);
    }

    return (
        <nav id="sidebar" className={`sidebar js-sidebar ${collapsed ? 'collapsed' : ''}`}>
            <SimpleBar className='sidebar-content js-simplebar'>
                <a className="sidebar-brand" href="à">
                    <img src="img/logo-white.png" className="w-75" alt="Charles Hall" />
                    <span className="align-middle mt-2">Testing Interface</span>
                </a>

                <ul className="sidebar-nav">

                    <li className="sidebar-header">
                    Tools & Components
                    </li>

                    <li className={`sidebar-item ${activeItem === '_dashboard' ? 'active' : ''}`}>
                        <div className="sidebar-link" name="_dashboard" onClick={toggleItem}>
                            <FontAwesomeIcon icon={['fas', 'chart-pie']} size="lg" 
                            /> <span className="align-middle">Dashboard</span>
                        </div>
                    </li>

                    <li className={`sidebar-item ${activeItem === '_tests' ? 'active' : ''}`}>
                        <div className="sidebar-link" name="_tests" onClick={toggleItem}>
                            <FontAwesomeIcon icon={['fas', 'flask-vial']} size="lg" 
                            /> <span className="align-middle">Tests</span>
                        </div>
                    </li>

                    <li className={`sidebar-item ${activeItem === '_report' ? 'active' : ''}`}>
                        <div className="sidebar-link" name="_report" onClick={toggleItem}>
                            <FontAwesomeIcon icon={['fas', 'table-list']} size="lg" 
                            /> <span className="align-middle">Reports</span>
                        </div>
                    </li>

                </ul>
            
            </SimpleBar>
        </nav>
    )
};

export default SideBar;
