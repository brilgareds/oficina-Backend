import React from 'react';

export const ImportantBottons = () => {
    return (
        <div className="col-md-12 text-center" style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 47%), 1fr))', paddingRight: '0', paddingLeft: '0', marginTop: '2.5rem' }}>
            <div className="text-end">
                <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice zoom" type="submit" name="submit">
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span><i className="bi bi-door-open-fill" style={{ fontSize: '1.7rem' }}></i></span>
                        <span style={{ marginLeft: '0.3rem' }}>Control de ingreso y salida</span>
                    </span>
                </button>
            </div>
            <div className="text-start">
                <button className="btn btnVumOffice d-block w-100 mt-3 fontBtnVumOffice zoom" type="submit" name="submit">
                    <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <span><i className="bi bi-bookmark-star-fill" style={{ fontSize: '1.7rem' }}></i></span>
                        <span style={{ marginLeft: '0.3rem' }}>Califícanos y comunícate</span>
                    </span>
                </button>
            </div>
        </div>
    )
}
