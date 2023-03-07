import { useState } from 'react';
// import Chart from 'chart.js/auto';
import Dashboard from '../components/_dashboard';
import { suits } from '../data/test_suits';

const users = [
  'isabel', 'kim', 'loan', 'mohamed', 'achraf'
];

function Home() {

  const [data, setData] = useState({
    user: 'isabel',
    suit: 's1'
  });
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState(null);
  const [QRs, setQRs] = useState(null);

  const suitsComp = () => {
    let arr=[];
    for (const [key, value] of Object.entries(suits)) {
      arr.push(<option value={key} key={key}>{value}</option>)
    }
    return arr;
  }

  const usersComp = () => {
    let arr=[];
    users.forEach((value, index)=>{
      arr.push(<option value={value} key={index}>{value}</option>)
    })
    return arr;
  }

  const QRImgs = () => {

    if ( !QRs || !QRs.length) return null;

    const qrs=  QRs.map((qr, i) => { 
        if ( !qr ) return null;

        const { browser, img} = qr;

        return (
            <div className="card m-2" key={i} >
                <img className="card-img-top" src={`data:image/jpeg;base64,${img}`} alt={browser} />
                <div className="card-body">
                    <h5 className="card-title">{browser}</h5>
                </div>
            </div>
        ) 
    })

    return (
        <div>
            <h1 className="display-6 mt-4">Results</h1>
            <div className="d-flex flex-row ">
                {qrs}
            </div>
        </div>
    )

  }

  const reportComp = (report) => {
    const {_attributes, testsuite}= report;
    const testsuiteArr = testsuite instanceof Array ? testsuite : [testsuite];
    const suits= [];

    testsuiteArr.forEach((value, index) => {
      const {_attributes : attr, testcase} = value;
      const testcases = testcase instanceof Array ? testcase: [testcase];
      suits.push(
      <tr key={`suit${index}`} className="suit">
        <th>suit-{index}</th>
        <td className='fw-bold'>{attr.name}</td>
        <td className='fw-bold'>{attr.tests}</td>
        <td className='fw-bold'>{attr.time}</td>
        <td>
          {
            attr.failures === '0'
            ? <span className="badge bg-success fw-bold">Passed all</span>
            : attr.failures < attr.tests 
              ? <>
                  <span className="badge bg-success fw-bold"
                  >Passed {attr.tests - attr.failures}</span> <span className="badge bg-danger fw-bold"
                  >Failed {attr.failures}</span> 
                </>
              : <span className="badge bg-danger fw-bold">Failed all</span> 
          }
          
        </td>
      </tr>)

    
      testcases.forEach((val, ind)=> {
        const {_attributes: attr, failure}= val;

        suits.push(
          <tr key={'s'+index+'t'+ind}>
            <th>test-{ind}</th>
            <td>{attr.name}</td>
            <td></td>
            <td>{attr.time}</td>
            <td>
              {
                failure ? <span className='status-failed'>Failed</span> :  <span className='status-passed'>Passed</span>
              }
            </td>
          </tr>
        )
      })
    })
      

    return <div>

        <Dashboard attr= {_attributes}/>

        { QRImgs() }

        <div>
            <h1 className="display-6 mt-4">Report</h1>
            <table className="table m-2 mt-4">
                <thead>
                <tr>
                    <td></td>
                    <th scope="col">File</th>
                    <th scope="col">Tests</th>
                    <th scope="col">Time</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                <tbody>
                {suits}
                </tbody>
            </table>
        </div>
    </div>
  }

  // const dashboard = () => {
  //   const {_attributes}= report;

  // }

  const change = (e) => {
    let {name, value} = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const submit = () => {

    setLoading(true);
    setReport(null);
    setQRs(null);

    fetch(`http://localhost:3000/exec`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((resJson) => {
        setLoading(false);
        // if (resJson.err) console.log(resJson.err)
        const {result, QRs} = resJson
        console.log(result, QRs);
        setReport(result);
        setQRs(QRs);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="container">

      <nav className="navbar navbar-light bg-white">
        <div className="container-fluid">
          <img src="/img/top-header.png" alt="logo" width="200" className="d-inline-block align-text-top"/>
          <h2 className="header-title">Testing Interface</h2>
        </div>
      </nav>

      <div className="wrapper">

		    <div className="main">

			    <main className="content">
				    <div className="container-fluid p-0 mt-4">
              <form className='d-flex flex-row px-2'>
                
                <div className="form-group my-2 col-5">
                  <select name="suit" className="form-select"
                  onChange={(v)=> change(v)}>
                    {suitsComp()}
                  </select>
                </div>

                <div className="form-group my-2 px-2 col-5">
                  <select name="user" className="form-select"
                  onChange={(v)=> change(v)}>
                    {usersComp()}
                  </select>
                </div>

                <button className="btn btn-primary col-2 my-2" 
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
              { report ? reportComp(report) : null }
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Home;
