import React, { useContext } from 'react'
import { CompanyContext } from '../../../../reducers/CompanyContext'

const PostCategories = ({ saveCategory, deleteCategory }) => {
    const { company } = useContext(CompanyContext)

    const addCategory = ({ target }) => {
        let cat = target.value
        saveCategory(cat)
    }


    return (
        <>
            <label>Categoría/s de la Publicación</label>
            <select name='category' onChange={ addCategory }>
                <option value='default' defaultValue> Añadir Categoría... </option>
                { company?.categories?.length && company?.categories?.map(cat => (
                    <option key={ cat } value={ cat }>{ cat }</option>
                )) }
            </select>

        </>
    )
}

export default PostCategories

