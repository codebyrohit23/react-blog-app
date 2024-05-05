import React from 'react'
import {Alert} from 'react-bootstrap';
import  '../App.css';

const AlertBox = (props) => {
  return (
    <>
    <div style={{height:"70px"}} className="sticky-top-alert">
        {props.alert && <Alert variant={props.alert.variant === 'warning' || props.alert.variant === 'danger' ? 'danger' : props.alert.variant}>
            <strong className="me-4"> {props.alert.variant.charAt(0).toUpperCase() + props.alert.variant.slice(1)} : </strong> <span>{props.alert.message}</span>
        </Alert>
        }
    </div>
    </>
    
  )
}

export default AlertBox
