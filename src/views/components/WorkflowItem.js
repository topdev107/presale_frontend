import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'

const WorkflowItem = (props) => {
    return (
        <div className="d-flex flex-row justify-content-start">
            <div className="w-30 h-30" style={{ marginRight: '7px' }}>
                {
                    props.active ? (
                        <div className="circle-30-active" >{props.stemNumber}</div>
                    ) : (
                        props.verified ? (
                            <div className="circle-30-verified" ><FontAwesomeIcon icon={faCheck} /></div>
                        ) : (
                            <div className="circle-30" >{props.stemNumber}</div>
                        )
                    )
                }
            </div>
            <div>
                <div className="d-flex flex-row justify-content-start">
                    <div>
                        {
                            props.active ? (
                                <p className="mb-2 white-space-nowrap text-color-accent">{props.title}</p>
                            ) : (
                                <p className="mb-2 white-space-nowrap">{props.title}</p>
                            )
                        }

                    </div>
                    {/* <div className="white-line c-ml-5 c-mt-15 flex-remain-full-width"/> */}
                </div>
                <div>
                    <div className="col-sm-8">
                        {
                            props.active ? (
                                <p className="small-text-sz text-color-accent">{props.desc}</p>
                            ) : (
                                <p className="small-text-sz">{props.desc}</p>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkflowItem