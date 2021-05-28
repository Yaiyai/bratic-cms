import React, { useContext } from 'react'
import { CompanyContext } from '../../../../reducers/CompanyContext'

const PostCategories = ({ setSelectedPost, selectedPost }) => {
    const { company } = useContext(CompanyContext)

    const addCategory = ({ target }) => {
        let cat = target.value
        saveCategory(cat)
    }
    const saveCategory = (category) => {
        if (!selectedPost?.categories.includes(category)) {
            setSelectedPost(prevState => ({ ...prevState, categories: [...prevState.categories, category] }))
        }
    }

    return (
        <>
            <label>Categoría/s de la Publicación</label>
            <select name='category' onChange={ addCategory }>
                <option value='Noticias' defaultValue> Añadir Categoría... </option>
                { company?.categories?.length && company?.categories?.map(cat => (
                    <option key={ cat } value={ cat }>{ cat }</option>
                )) }
            </select>

        </>
    )
}

export default PostCategories

