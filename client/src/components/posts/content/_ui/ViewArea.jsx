import React from 'react'

const ViewArea = ({ selectedPost, handleSaveContent }) => {
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

        </div>

    )
}

export default ViewArea
