import React, { useContext } from 'react'
import { AuthContext } from '../../../reducers/auth/AuthContext'

const SectionTitle = ({ title, instructions, image }) => {
    const { user } = useContext(AuthContext)
    return (
        <>
            <p className="dashboard-user">Conectad@ como <span>{ user.name }</span></p>
            <div className="section-title">
                <h1>{ title }</h1>
                <p>{ instructions }</p>
                <img src={ image } alt="" />
            </div>
        </>
    )
}

export default SectionTitle
