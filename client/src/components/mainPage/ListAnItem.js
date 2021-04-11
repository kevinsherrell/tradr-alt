import React, {useEffect, useState} from 'react'

const ListAnItem = (props)=> {

    const [mobile, setMobile]= useState(false)
    const [browserWidth, setBrowserWidth]= useState(window.innerWidth)

    const mobileToggle = (e) => {
        if (browserWidth < 767) {
            setMobile(!mobile)
        }

    }
    const browserWidthListener = (e) => {
        window.addEventListener('resize', () => {
            setBrowserWidth(window.innerWidth)
        })
    }

    useEffect(()=>{
        browserWidthListener()
    })




        return (
            <section className="list-an-item">
                <div className="container" onClick={props.togglePostItem}>
                    {browserWidth < 1000 && (
                        <p className={'list-an-item__link'}>List an item!</p>
                    )}
                </div>
            </section>
        )


}

export default ListAnItem;