import React, {useContext} from 'react';
import AlertContext from '../context/alert/AlertContext';

const Alert = () => { 
    const alertContext = useContext(AlertContext);

    const { alert, removeAlert } =  alertContext;

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
