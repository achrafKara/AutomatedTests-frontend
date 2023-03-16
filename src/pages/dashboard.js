import React, { useContext } from 'react';
import MainLayout from './layouts/main';
import { AuthContext } from '../context/authentication';

function Dashboard () {

    const { appUser } = useContext(AuthContext);
    const { roles } = appUser;
    
    return (
        <MainLayout roles={roles}
        user={{
            name: appUser.name,
            username: appUser.username, 
            photo: appUser.photo 
          }}>
            <div className="container-fluid p-0">
                Dashboard page
            </div>
        </MainLayout>
    )
};

export default Dashboard;
