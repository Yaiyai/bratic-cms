import React, { useEffect, useState } from 'react'

import { getAllSections } from '../../actions/sections.action'
import SectionCard from '../_ui/SectionCard/SectionCard'
import SectionTitle from '../_ui/SectionTitle/SectionTitle'

const AllSections = () => {
    const [sections, setSections] = useState()

    const fetchSections = async () => {
        const fetchSections = await getAllSections()
        setSections(fetchSections)
    }
    useEffect(() => {
        fetchSections()

    }, [])

    return (
        <section className="all-sections">
            <SectionTitle
                image='https://res.cloudinary.com/bratic-app/image/upload/v1621695842/web/sections_r2ejno.svg'
                title="Secciones de tu web"
                instructions="Aquí verás todas las secciones que componen tu web. Pincha en cualquiera para editarla :)."
            />
            {
                sections?.length > 0 && (
                    sections.map((st) => (
                        <SectionCard key={ st._id } section={ st } />
                    ))
                )
            }
        </section>
    )
}

export default AllSections
