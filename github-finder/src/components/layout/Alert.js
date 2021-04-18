import React from 'react'

export const Alert = ({alert,removeAlert}) => { 
    return (
        alert !== null && (
            <div className={`alert alert-${alert.type}`}>
                <i className="fas fa-info-circle"></i> {alert.msg}
                <button className="cross-btn" onClick={removeAlert}>x</button>
            </div>
        )
    )
}

export default Alert ;
