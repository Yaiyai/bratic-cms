import React from 'react'
import ReceivingContainer from './ReceivingContainer'

const ViewArea = ({ selectedPost, dragOverReceptor, drop, counter, handleSaveContent }) => {
    return (
        <div className="view-area">
            <div className="titles-btn">
                <div>
                    {
                        selectedPost.title && <h1>{ selectedPost.title }</h1>
                    }
                    {
                        selectedPost.subtitle && <h2>{ selectedPost.subtitle }</h2>
                    }
                </div>
                <button className="my-btn mini" onClick={ () => handleSaveContent() }>Guardar Contenido Ordenado</button>
            </div>
            <hr />
            <h6>Arrastra elementos para ordenarlos como quieras que aparezcan en la web :)</h6>
            {[...Array(counter)].map((elm, idx) => (
                idx !== 0 && (
                    <ReceivingContainer key={ `er-contenedo-${idx}` } dragOverReceptor={ dragOverReceptor } drop={ drop } idx={ idx } />
                )
            ))
            }

        </div>

    )
}

export default ViewArea
