import React from 'react';

const TestReport = ({report}) => {

    if (!report) return null;

    const { testsuite}= report;
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

        <div>
            <h1 className="display-6 mt-4">Report</h1>
            <div className="card">
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
    </div>
  }

export default TestReport;
