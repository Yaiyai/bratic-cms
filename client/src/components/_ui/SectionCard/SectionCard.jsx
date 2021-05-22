import React from 'react'
import { Link } from 'react-router-dom'

const SectionCard = ({ section }) => {
    return (
        <article className="each-section" >
            <Link to={ `/bratic/seccion/${section._id}` }>{ section.sectionName }</Link>
        </article>
    )
}

export default SectionCard
