import React from 'react'

const PostState = ({ postState, savePostState }) => {


    const selectThis = ({ target }) => {
        savePostState(target.value)
    }

    return (
        <>
            <label className="post-state-instructions">Cambia el estado de la publicación para que se vea en la web. Por defecto, se crean en modo "borrador"</label>
            <select onChange={ selectThis }>
                <option value='default' defaultValue> { postState ? postState : 'Cambiar Estado de la publicación...' } </option>
                { postState !== 'borrador' && <option value="borrador">Borrador</option> }
                { postState !== 'publicado' && <option value="publicado">Publicada</option> }
            </select>
        </>
    )
}

export default PostState
