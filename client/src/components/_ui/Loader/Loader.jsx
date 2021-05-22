import React from 'react'

const Loader = ({ loading }) => {
    return (
        <section id="loading" className={ loading ? `show` : `hide` }>
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </section>
    )
}

export default Loader
