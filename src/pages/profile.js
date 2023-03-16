import React, { useContext } from 'react';
import MainLayout from './layouts/main';
import { AuthContext } from '../context/authentication';

function Profile () {

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

                <div className="mb-3">
                    <h1 className="h3 d-inline align-middle">Profile</h1>
                </div>

                <div>
                    <div className="card mb-3">
                        <div className="card-body text-center">
                            <img src="img/avatar.png" alt="Christina Mason" className="img-fluid rounded-circle mb-2" width="128" height="128" />
                            <h5 className="card-title mb-0">{appUser.name}</h5>
                            <div className="text-muted mb-2">@{appUser.username}</div>

                            <div>
                                <a className="btn btn-primary btn-sm m-1" href="#">Edit</a>
                            </div>
                        </div>
                        <hr className="my-0" />
                        <div className="card-body">
                            <h5 className="h6 card-title">Roles</h5>
                            {
                                appUser.roles.map((role, i) => {
                                    return <span key={i} className="badge bg-primary me-1 my-1">{role}</span>
                                })
                            }
                        </div>
                        
                    </div>
                </div>

                </div>
        </MainLayout>
    )
};

export default Profile