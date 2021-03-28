import React from 'react'
import ReceivingContainer from './ReceivingContainer'
import RenderContentByTypeEdit from './RenderContentByTypeEdit'

const ViewAreaEdit = ({ selectedPost, dragStart, dragOver, decrement, dragOverReceptor, drop, counter, handleSaveContent, setContent }) => {
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
            {
                selectedPost?.orderedContent?.length > 0 && <RenderContentByTypeEdit content={ selectedPost.orderedContent } setContent={ setContent } dragStart={ dragStart } dragOver={ dragOver } decrement={ decrement } />
            }
            {
                [...Array(counter)].map((elm, idx) => (
                    idx > selectedPost?.orderedContent?.length && (
                        <ReceivingContainer key={ `er-contenedo-${idx}` } dragOverReceptor={ dragOverReceptor } drop={ drop } idx={ idx } />
                    )
                )
                )
            }

        </div>

    )
}

export default ViewAreaEdit
