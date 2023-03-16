import { useState, useContext } from 'react';
import TestStat from '../components/_test_stat';
import TestImages from '../components/_test_images';
import TestReport from '../components/_test_report';
import MainLayout from './layouts/main';
import { suits } from '../data/test_suits';
import { AuthContext } from '../context/authentication';

function Tests() {

  const { appUser } = useContext(AuthContext);
  const { roles } = appUser;

  const [testCase, setTestCase] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [QRs, setQRs] = useState(null);

  const suitsComp = () => {
    let arr=[<option value="" key={0}>Choose a test</option>];
    for (const [key, value] of Object.entries(suits)) {
      arr.push(<option value={key} key={key}>{value}</option>)
    }
    return arr;
  }

  const change = (e) => {
    let {value} = e.target;
    setTestCase(value)
  }

  const submit = () => {

    if (!testCase) return;

    setLoading(true);
    setReport(null);
    setQRs(null);

    fetch(`http://localhost:3000/exec`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({user: appUser.username, suit: testCase}),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);
        if (resJson.err) return console.log(resJson);
        const {result, QRs} = resJson
        console.log(result, QRs);
        setReport(result);
        setQRs(QRs);
      })
      .catch((err) => console.error(err));
  }

  return (
    <MainLayout roles={roles} 
    user={{
      name: appUser.name,
      username: appUser.username, 
      photo: appUser.photo 
    }}>
      <div className="container-fluid p-0">
        <form className='d-flex flex-row'>
          
          <div className="form-group my-2 pe-2 col-9">
            <select name="suit" className="form-select"
            onChange={(v)=> change(v)}>
              {suitsComp()}
            </select>
          </div>

          <button className="btn btn-primary col-3 my-2" 
          type="button"
          onClick={submit}
          disabled={loading}>
            {
              loading
              ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"/>
              : null
            }
            <span> Run</span>
          </button>
        </form>
      </div>

      <div className="container-fluid p-0 mt-4">
        <TestStat attr={report?._attributes} />

        <TestImages imgs={QRs} />

        <TestReport report={report} /> 
      </div>
    </MainLayout>
  );
}

export default Tests;
