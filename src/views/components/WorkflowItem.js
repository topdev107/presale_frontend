import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'

const WorkflowItem = (props) => {
    var stepState = props.active ? ('active') : (props.verified ? 'verified' : '');
    return (
        <div className={`d-flex flex-column justify-content-start p-4 workflow ${stepState}`}>
            <div className='step pb-3'>STEP {props.stemNumber}</div>
            <div className='title pb-2'>{props.title}</div>
            <div className='description'>{props.desc}</div>
        </div>
    )
}

export default WorkflowItem