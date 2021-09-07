import React from 'react';
import './loading.css';

export const Loading = () => {
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}