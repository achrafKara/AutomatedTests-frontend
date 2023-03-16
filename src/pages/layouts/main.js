import { useState } from 'react';
import SideBar from '../../components/_sideBar';
import Header from '../../components/_header';

function MainLayout({children, roles, user}) {

    const [collapsed, setCollapsed] = useState(false);

    const toggle = () => {
        setCollapsed(prev => !prev)
    };

    return (
        <div className="wrapper">

            <SideBar collapsed={collapsed} roles={roles}/>

            <div className="main">

                <Header toggle={toggle} user={user} />

                <main className="content">

                    {children}

                </main>
            </div>
        </div>
    );
}

export default MainLayout;
