import React from 'react';

function TestImages ({imgs}) {

    if ( !imgs?.length) return null;

    const images=  imgs.map((value, index) => { 
        if ( !value ) return null;

        const { browser, img} = value;

        return (
            <div className="card m-2" key={index} >
                <img className="card-img-top" src={`data:image/jpeg;base64,${img}`} alt={browser} />
                <div className="card-body">
                    <h5 className="card-title">{browser}</h5>
                </div>
            </div>
        ) 
    })

    return (
        <div>
            <h1 className="display-6 mt-4">Resulted images</h1>
            <div className="d-flex flex-row ">
                {images}
            </div>
        </div>
    )
};

export default TestImages;
