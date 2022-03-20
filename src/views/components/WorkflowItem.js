import React from 'react'

const WorkflowItem = (props) => {
    return (
        <div className="d-flex flex-row justify-content-start">
            <div className="w-30 h-30" style={{ marginRight: '7px' }}>
                {
                    props.active ? (
                        <div className="circle-30-active" >{props.stemNumber}</div>
                    ) : (
                        <div className="circle-30" >{props.stemNumber}</div>
                    )
                }
            </div>
            <div>
                <div className="d-flex flex-row justify-content-start">
                    <div>
                        <p className="mb-2 white-space-nowrap">{props.title}</p>
                    </div>
                    {/* <div className="white-line c-ml-5 c-mt-15 flex-remain-full-width"/> */}
                </div>
                <div>
                    <div className="col-sm-8">
                        <p className="small-text-sz">{props.desc}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WorkflowItem