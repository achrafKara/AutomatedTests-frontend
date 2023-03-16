import React, { useState, useContext } from 'react';
import Validator from '../func/validator';
import { AuthContext } from '../context/authentication';
import { domain } from '../config';

const Signin = () => {

    const { login } = useContext(AuthContext);

    const [inputs, setInputs] = useState({
        identifier: '',
        pw: '',
    });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
    
        setInputs((prevState) => ({
          ...prevState,
          [name]: value.trim(),
        }));
    };

    const submit = (e) => {

        e.preventDefault();
    
        const { identifier, pw } = inputs;
    
        if (!identifier || !pw) return;

        let identifierVal;
        if (Validator('username', identifier)) identifierVal = `username:${identifier}`;
        else if (Validator('email', identifier)) identifierVal = `email:${identifier}`;
        else return console.log('ERROR');

        setLoading(true);
    
        fetch(`${domain}signin`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({identifier: identifierVal, pw}),
        })
          .then((res) => res.json())
          .then((resJson) => {
            if (resJson.err) {
              // empty the pw field and end the loading view
              setInputs((prevState) => ({
                ...prevState,
                pw: '',
              }));
    
            } else {
              // login through (AuthContext.js)
              login(resJson.token, resJson.user);
            }
            setLoading(false);
          })
          .catch((err) => console.error(err));
    };

    return (
        <div className='container-fluid d-flex flex-column justify-content-center align-items-center p-5'>
            <header className='text-center w-50 mb-5'>
                <img src='img/top-header.png' alt='logo' width='200px' />
            </header>
            
            <form className='card w-50 p-3'>
                <h2 className='p-2 mb-4 fw-bold text-center'>Sign In</h2>
                <div className="form-outline mb-4">
                    <input 
                    value={inputs.email}
                    name="identifier" 
                    id="form2Example1" 
                    className="form-control"
                    onChange={onChange} />
                    <label className="form-label" htmlFor="form2Example1">Email or Username</label>
                </div>


                <div className="form-outline mb-4">
                    <input 
                    value={inputs.pw}
                    type="password" 
                    name="pw" 
                    id="form2Example2" 
                    className="form-control" 
                    onChange={onChange} />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
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

                
                <div className="text-center">
                    <a href="#!" className='d-inline-block mb-2'>Forgot password?</a>
                    <p>Not a member? <strong>ask your administrator to create an account for you.</strong></p>
                </div>
            </form>
        </div>
    )
}

export default Signin;