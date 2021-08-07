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
        <div key={props.uid} className='flex h-20 p-1 justify-between items-center'>
            <div>
                <p>{ props.en }</p>
            </div>
            <div>
                { props.th }
            </div>
        </div>
    )
}
