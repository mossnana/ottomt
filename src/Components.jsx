import React from 'react'

import './Components.css'

export const LoadingComponent = () => {
    return (
        <div className="lds-ripple">
            <div></div>
            <div></div>
        </div>
    )
}

export const PhaseCard = props => {
    return (
        <div className='flex flex-col shadow-md'>
            <div key={props.uid} className='flex h-20 p-1 justify-between items-center'>
                <div>
                    <p>{props.en}</p>
                </div>
                <div>
                    {props.th}
                </div>
            </div>
            <div className='flex p-1 justify-end'>
                <PhaseCardControlIcon
                    uid={props.uid}
                    label='Delete'
                    labelColor='red'
                    onClick={props.onDelete}
                />
            </div>
        </div>
    )
}

export const PhaseCardControlIcon = props => {
    return (
        <button
            name={props.uid}
            className={`h-10 shadow-md px-3 mr-1 bg-white text-${props.labelColor}-500 font-bold`}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    )
}
