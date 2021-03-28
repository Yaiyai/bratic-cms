import React from 'react'

const ViewArea = ({ selectedPost, dragOverReceptor, drop, counter, handleSaveContent }) => {
    return (
        <div className="view-area">
            <button className="my-btn mini" onClick={ () => handleSaveContent() }>Guardar Contenido Ordenado</button>

            {
                selectedPost.title && <h1>{ selectedPost.title }</h1>
            }
            {
                selectedPost.subtitle && <h2>{ selectedPost.subtitle }</h2>
            }
            <h6>Orden de aparicion de los elementos</h6>
            {[...Array(counter)].map((elm, idx) => (
                idx !== 0 && (
                    <div onDrop={ drop } onDragOver={ dragOverReceptor } id={ idx } key={ `contenedor-${idx}` } className="receiving-container">
                        <p className="container-number">
                            { idx }
                        </p>
                    </div>
                )
            ))
            }

        </div>

    )
}

export default ViewArea
