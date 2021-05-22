import React from 'react'
import { Link } from 'react-router-dom'

const SectionCard = ({ section }) => {
    return (

        <Link className="each-section" to={ `/bratic/seccion/${section._id}` }>{ section.sectionName }</Link>

    )
}

export default SectionCard
