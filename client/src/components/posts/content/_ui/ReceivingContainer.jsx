import React from 'react'

const ReceivingContainer = ({ drop, dragOverReceptor, idx, component = false }) => {
    return (
        <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ idx } key={ `receiving-container-${idx}` } className="receiving-container">
            <div className="container-number">
                <p> { idx } </p>
            </div>
            {component && component }
        </div>
    )
}

export default ReceivingContainer
