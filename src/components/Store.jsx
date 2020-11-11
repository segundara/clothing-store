import React, { useEffect, useState } from 'react'
import FetchHandler from '../DataHandler/FetchHandler'

function Store() {
    const [res1, loading1, hasError1] = FetchHandler(`${process.env.REACT_APP_API_URL}/products/jackets`)
    const [res2, loading2, hasError2] = FetchHandler(`${process.env.REACT_APP_API_URL}/products/shirts`)
    const [res3, loading3, hasError3] = FetchHandler(`${process.env.REACT_APP_API_URL}/products/accessories`)

    return (
        <div>
            {console.log(res1.slice(10, 20))}
            {console.log(res2.slice(10, 20))}
            {console.log(res3.slice(10, 20))}
        </div>
    )
}

export default Store
