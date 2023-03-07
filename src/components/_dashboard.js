import React from 'react';
import moment from 'moment';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function getTimeStr(s) {
    return moment("00:00:00.000", "hh:mm:ss.SSS").add(Math.ceil(s), "s").format("mm:ss");
}

function Dashboard ({attr}) {
    const {tests, failures, errors, time} = attr;
    const passed= tests - failures;

    const data = {
        labels: ['Passed', 'Failed'],
        datasets: [
            {
                label: 'of Tests',
                data: [passed, failures],
                backgroundColor: [
                    'rgb(25, 135, 84)',
                    'rgb(220, 53, 69)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h1 className="display-6 mt-4">Dashboard</h1>
            <div className='d-flex flex-row w-100'>
                <div className='d-flex flex-column'>
                    <div className="card text-success bg-white m-2">
                        <div className="card-body text-center">
                        < h3 className="card-text">{tests}</h3>
                            <h4 className="card-title">Tests</h4>
                        </div>
                    </div>
                    <div className="card text-danger bg-white m-2">
                        <div className="card-body text-center">
                            <h3 className="card-text">{errors}</h3>
                            <h4 className="card-title">Errors</h4>
                        </div>
                    </div>
                    <div className="card text-danger bg-white m-2">
                        <div className="card-body text-center">
                            <h3 className="card-text">{failures}</h3>
                            <h4 className="card-title">Failures</h4>
                        </div>
                    </div>
                    <div className="card text-danger bg-white m-2">
                        <div className="card-body text-center">
                            <h3 className="card-text">{getTimeStr(time)}</h3>
                            <h4 className="card-title">Minutes</h4>
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center flex-fill">
                    <div className='w-50'>
                    <Pie data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
