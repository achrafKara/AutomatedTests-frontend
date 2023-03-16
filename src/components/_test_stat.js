import React from 'react';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function getTimeStr(s) {
    return moment("00:00:00.000", "hh:mm:ss.SSS").add(Math.ceil(s), "s").format("mm:ss");
}

function TestStat ({attr}) {

    if (!attr) return null;

    const {tests, failures, errors, time} = attr;
    const passed= tests - failures;

    const data = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                label: 'Tests',
                data: [passed, failures],
                backgroundColor: [
                    'rgba(28,187,140,.15)',
                    'rgba(220,53,69,.15)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1 className="display-6 mt-4">Statistics</h1>
            <div className='card'>
                <div className='row w-100 p-3'>
                    <div className='col-12 col-md-4'>
                        <div className='row h-50'>
                            <div className="col card card-stat text-success m-2">
                                <div className="card-body text-center">
                                < h3 className="card-text">{tests}</h3>
                                    <h4 className="card-title">Tests</h4>
                                </div>
                            </div>
                            <div className="col card card-stat text-danger m-2">
                                <div className="card-body text-center">
                                    <h3 className="card-text">{getTimeStr(time)}</h3>
                                    <h4 className="card-title">Minutes</h4>
                                </div>
                            </div>
                        </div>
                        <div className='row h-50'>
                            <div className={`col card card-stat ${failures === '0' ? '' : 'card-stat-error' } text-danger m-2`}>
                                <div className="card-body text-center">
                                    <h3 className="card-text">{failures}</h3>
                                    <h4 className="card-title">Failures</h4>
                                </div>
                            </div>
                            <div className={`col card card-stat ${errors === '0' ? '' : 'card-stat-error' } text-danger m-2`}>
                                <div className="card-body text-center">
                                    <h3 className="card-text">{errors}</h3>
                                    <h4 className="card-title">Errors</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-8 d-flex justify-content-center align-items-center flex-fill">
                        <div className='w-100 max-w-50'>
                            <Pie data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default TestStat;
