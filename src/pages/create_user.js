import React, { useState, useContext } from 'react';
// import Validator from '../func/validator';
import MainLayout from './layouts/main';
import { AuthContext } from '../context/authentication';
import { domain } from '../config';

const CreateUser = () => {

  const { appUser, jwt } = useContext(AuthContext);
  const { roles } = appUser;
  const admin = roles.includes('ADMIN');

  const [inputs, setInputs] = useState({
    username: 'Isabel',
    name: 'Isabel',
    email: 'isa@mail.com',
    roles: [],
    pw: 'password',
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  if (!admin) return <div>You are not allowed to add users, request your administrator.</div>

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs((prevState) => ({
      ...prevState,
      [name]: value.trim(),
    }));
  };

  const rolesChange = (e) => {
    const { roles } = inputs;
    const { value, checked } = e.target;

    if ( checked ) {
      if (roles.includes(value)) return;
      roles.push(value);
    } else {
      const index = roles.indexOf(value);
      if (index > -1) {
        roles.splice(index, 1);
      }
    }

    setInputs((prevState) => ({
      ...prevState,
      roles,
    }));
  };

  const submit = (e) => {

    e.preventDefault();

    setAlert(null);

    const { username, name, email, roles, pw } = inputs;

    if (!username || !name || !email || !roles.length || !pw) return;

    setLoading(true);

    fetch(`${domain}user-create`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        jwt,
      },
      body: JSON.stringify(inputs),
    })
      .then((res) => res.json())
      .then((resJson) => {
        if (resJson?.err) {
          setAlert('error')
        } else {
          // empty the inputs
          setInputs({
            username: '',
            name: '',
            email: '',
            roles: [],
            pw: '',
          });
          setAlert('success')
        }
        setLoading(false);
      })
      .catch((err) => console.error(err));
  };

  return (
    <MainLayout roles={roles}
    user={{
      name: appUser.name,
      username: appUser.username, 
      photo: appUser.photo 
    }}>
      <div className='container-fluid d-flex flex-column justify-content-center align-items-center p-0'> 
        <form className='card w-50 p-3'>
          {
            alert === 'success'
            ? <div className="alert alert-success" role="alert">
                The user is created successfully.
              </div>
            : null
          }
          {
            alert === 'error'
            ? <div className="alert alert-danger" role="alert">
                An error has occured.
              </div>
            : null
          }
          <h2 className='p-2 mb-4 fw-bold text-center'>Create a user</h2>

          <div className="form-outline mb-4">
            <input 
            value={inputs.username}
            name="username"
            className="form-control"
            onChange={onChange} />
            <label className="form-label">Username</label>
          </div>

          <div className="form-outline mb-4">
            <input 
            value={inputs.name}
            name="name"
            className="form-control"
            onChange={onChange} />
            <label className="form-label">Name</label>
          </div>

          <div className="form-outline mb-4">
            <input 
            value={inputs.email}
            name="email" 
            className="form-control"
            onChange={onChange} />
            <label className="form-label">Email</label>
          </div>

          <div className="form-outline mb-4">
            <div className='form-control'>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="tester" value="TESTER" checked disabled/>
                <label className="form-check-label" htmlFor="tester">Tester</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="admin" value="ADMIN"
                onChange={rolesChange} />
                <label className="form-check-label" htmlFor="admin">Admin</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" id="writer" value="WRITER"
                onChange={rolesChange} />
                <label className="form-check-label" htmlFor="writer">Writer</label>
              </div>
            </div>
            <label className="form-label">Roles</label>
          </div>

          <div className="form-outline mb-4">
            <input 
            value={inputs.pw}
            type="password" 
            name="pw"
            className="form-control" 
            onChange={onChange} />
            <label className="form-label">Password</label>
          </div>


          <button 
          type="button" 
          className="btn btn-primary btn-block mb-4"
          onClick={submit}
          disabled={loading}>
            {
              loading
              ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
              : null
            }
            <span> Sign in</span>
          </button>
        </form>
      </div>
    </MainLayout>
  )
}

export default CreateUser;