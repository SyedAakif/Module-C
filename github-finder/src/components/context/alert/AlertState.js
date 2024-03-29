import React, { useReducer } from 'react';
import AlertContext from './AlertContext';
import AlertReducer from './AlertReducer';
import { SET_ALERT, REMOVE_ALERT  } from '../types';

const AlertState = props => {
    const initialState = null;

    const [state, dispatch] = useReducer(AlertReducer, initialState);

    // Set Alert
    const setAlert = (msg,type) =>{
        dispatch({
            type: SET_ALERT,
            payload: { msg,type }
        })
        // Remove Alert Message after the 3 Seconds
        setTimeout(() => dispatch({ type: REMOVE_ALERT }),3000);
    }
    // Remove Alert
    const removeAlert=()=>{
        dispatch({
            type: REMOVE_ALERT
        })
    }

    return <AlertContext.Provider 
                        value={{
                            alert: state,
                            setAlert,
                            removeAlert
                        }}>
        {props.children}
    </AlertContext.Provider>

}

export default AlertState;